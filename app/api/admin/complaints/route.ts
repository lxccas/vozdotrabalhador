import { NextResponse } from "next/server"
import { adminAuth } from "@/middleware/adminAuth"
import prisma from "@/lib/prisma"

export async function GET(req: Request) {
  const authError = await adminAuth(req)
  if (authError) return authError

  const { searchParams } = new URL(req.url)
  const page = Number.parseInt(searchParams.get("page") || "1")
  const limit = Number.parseInt(searchParams.get("limit") || "10")
  const skip = (page - 1) * limit

  try {
    const [complaints, total] = await Promise.all([
      prisma.complaint.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: { user: { select: { name: true, email: true } } },
      }),
      prisma.complaint.count(),
    ])

    return NextResponse.json({
      complaints,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    })
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar reclamações" }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  const authError = await adminAuth(req)
  if (authError) return authError

  const { id, status } = await req.json()

  if (!id || !status) {
    return NextResponse.json({ error: "ID e status são obrigatórios" }, { status: 400 })
  }

  try {
    const updatedComplaint = await prisma.complaint.update({
      where: { id },
      data: { status },
    })

    // Create a notification for the user
    await prisma.notification.create({
      data: {
        userId: updatedComplaint.userId,
        message: `O status da sua reclamação "${updatedComplaint.title}" foi atualizado para ${status}.`,
      },
    })

    return NextResponse.json(updatedComplaint)
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar reclamação" }, { status: 500 })
  }
}

