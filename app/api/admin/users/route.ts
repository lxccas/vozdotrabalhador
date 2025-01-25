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
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.user.count(),
    ])

    return NextResponse.json({
      users,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    })
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar usuários" }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  const authError = await adminAuth(req)
  if (authError) return authError

  const { id, role } = await req.json()

  if (!id || !role) {
    return NextResponse.json({ error: "ID e função são obrigatórios" }, { status: 400 })
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { role },
    })

    return NextResponse.json(updatedUser)
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar usuário" }, { status: 500 })
  }
}

