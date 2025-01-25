import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

type Props = {
  params: {
    id: string
  }
}

export async function GET(request: Request, { params }: Props) {
  try {
    const company = await prisma.company.findUnique({
      where: { id: params.id },
      include: {
        reviews: {
          where: { status: "approved" },
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            rating: true,
            content: true,
            createdAt: true,
          },
        },
      },
    })

    if (!company) {
      return NextResponse.json({ error: "Empresa não encontrada" }, { status: 404 })
    }

    const averageRating = company.reviews.reduce((sum, review) => sum + review.rating, 0) / company.reviews.length || 0

    return NextResponse.json({
      ...company,
      averageRating: Number(averageRating.toFixed(1)),
    })
  } catch (error) {
    console.error("Erro ao buscar empresa:", error)
    return NextResponse.json({ error: "Erro ao buscar empresa" }, { status: 500 })
  }
}

