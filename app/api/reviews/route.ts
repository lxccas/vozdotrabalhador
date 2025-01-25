import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import prisma from "@/lib/prisma"
import * as z from "zod"
import { sendNewReviewNotification } from "@/lib/pushNotification"

const reviewSchema = z.object({
  companyName: z.string().min(1, "Nome da empresa é obrigatório"),
  rating: z.number().min(1, "Avaliação é obrigatória").max(5, "Avaliação deve ser entre 1 e 5"),
  content: z
    .string()
    .min(10, "A avaliação deve ter pelo menos 10 caracteres")
    .max(500, "A avaliação deve ter no máximo 500 caracteres"),
})

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    const body = await req.json()

    // Validate the request body
    const validatedData = reviewSchema.parse(body)

    // Find or create the company
    const company = await prisma.company.upsert({
      where: { name: validatedData.companyName },
      update: {},
      create: { name: validatedData.companyName },
    })

    // Create the review
    const review = await prisma.review.create({
      data: {
        rating: validatedData.rating,
        content: validatedData.content,
        status: "pending",
        userId: session.user.id,
        companyId: company.id,
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    })

    // Send push notification
    await sendNewReviewNotification(company.id, company.name)

    return NextResponse.json({ success: true, review })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Dados inválidos", details: error.errors }, { status: 400 })
    }

    console.error("Erro ao criar avaliação:", error)
    return NextResponse.json({ error: "Erro ao criar avaliação" }, { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const companyId = searchParams.get("companyId")
    const page = Number(searchParams.get("page")) || 1
    const limit = Number(searchParams.get("limit")) || 10
    const skip = (page - 1) * limit

    const where = {
      status: "approved",
      ...(companyId ? { companyId } : {}),
    }

    const [reviews, total] = await Promise.all([
      prisma.review.findMany({
        where,
        include: {
          user: {
            select: {
              name: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.review.count({ where }),
    ])

    return NextResponse.json({
      reviews,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    })
  } catch (error) {
    console.error("Erro ao buscar avaliações:", error)
    return NextResponse.json({ error: "Erro ao buscar avaliações" }, { status: 500 })
  }
}

