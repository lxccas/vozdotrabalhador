import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import prisma from "@/lib/prisma"
import * as z from "zod"
import { sendNewResourceNotification } from "@/lib/pushNotification"

const resourceSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  content: z.string().min(10, "O conteúdo deve ter pelo menos 10 caracteres"),
  category: z.string().min(1, "Categoria é obrigatória"),
})

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    const body = await req.json()

    // Validate the request body
    const validatedData = resourceSchema.parse(body)

    // Create the resource
    const resource = await prisma.educationalResource.create({
      data: {
        title: validatedData.title,
        content: validatedData.content,
        category: validatedData.category,
        authorId: session.user.id,
      },
    })

    // Send push notification
    await sendNewResourceNotification(resource.id, resource.title)

    return NextResponse.json({ success: true, resource })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Dados inválidos", details: error.errors }, { status: 400 })
    }

    console.error("Erro ao criar recurso educacional:", error)
    return NextResponse.json({ error: "Erro ao criar recurso educacional" }, { status: 500 })
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const category = searchParams.get("category")
  const page = Number(searchParams.get("page")) || 1
  const limit = Number(searchParams.get("limit")) || 10
  const skip = (page - 1) * limit

  try {
    const where = category ? { category } : {}

    const [resources, total] = await Promise.all([
      prisma.educationalResource.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        include: {
          author: {
            select: {
              name: true,
            },
          },
        },
      }),
      prisma.educationalResource.count({ where }),
    ])

    return NextResponse.json({
      resources,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    })
  } catch (error) {
    console.error("Erro ao buscar recursos educacionais:", error)
    return NextResponse.json({ error: "Erro ao buscar recursos educacionais" }, { status: 500 })
  }
}

