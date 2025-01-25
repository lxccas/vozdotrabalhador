import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import prisma from "@/lib/prisma"

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const companyId = params.id

  try {
    const reviews = await prisma.review.findMany({
      where: { companyId },
      include: { user: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(reviews)
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar avaliações" }, { status: 500 })
  }
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
  }

  const companyId = params.id
  const { rating, content } = await req.json()

  if (typeof rating !== "number" || rating < 1 || rating > 5) {
    return NextResponse.json({ error: "Avaliação inválida" }, { status: 400 })
  }

  try {
    const review = await prisma.review.create({
      data: {
        rating,
        content,
        userId: session.user.id,
        companyId,
      },
      include: { user: { select: { name: true } } },
    })

    return NextResponse.json(review)
  } catch (error) {
    return NextResponse.json({ error: "Erro ao criar avaliação" }, { status: 500 })
  }
}

