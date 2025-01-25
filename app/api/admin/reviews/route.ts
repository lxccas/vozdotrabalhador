import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import prisma from "@/lib/prisma"

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const page = Number.parseInt(searchParams.get("page") || "1")
  const limit = Number.parseInt(searchParams.get("limit") || "10")
  const skip = (page - 1) * limit

  try {
    const [reviews, total] = await Promise.all([
      prisma.review.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: { company: { select: { name: true } } },
      }),
      prisma.review.count(),
    ])

    const formattedReviews = reviews.map((review) => ({
      ...review,
      companyName: review.company.name,
    }))

    return NextResponse.json({
      reviews: formattedReviews,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    })
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar avaliações" }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
  }

  const { id, status } = await req.json()

  if (!id || !status) {
    return NextResponse.json({ error: "ID e status são obrigatórios" }, { status: 400 })
  }

  try {
    const updatedReview = await prisma.review.update({
      where: { id },
      data: { status },
    })

    return NextResponse.json(updatedReview)
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar avaliação" }, { status: 500 })
  }
}

