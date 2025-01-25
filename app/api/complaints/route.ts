import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import prisma from "@/lib/prisma"

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const page = Number.parseInt(searchParams.get("page") || "1")
  const limit = Number.parseInt(searchParams.get("limit") || "10")
  const skip = (page - 1) * limit

  try {
    const [complaints, total] = await Promise.all([
      prisma.complaint.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.complaint.count({ where: { userId: session.user.id } }),
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

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
  }

  const { title, description, category } = await req.json()

  // Validação dos dados
  if (!title || !description || !category) {
    return NextResponse.json({ error: "Todos os campos são obrigatórios" }, { status: 400 })
  }

  if (title.length < 5 || title.length > 100) {
    return NextResponse.json({ error: "O título deve ter entre 5 e 100 caracteres" }, { status: 400 })
  }

  if (description.length < 10 || description.length > 1000) {
    return NextResponse.json({ error: "A descrição deve ter entre 10 e 1000 caracteres" }, { status: 400 })
  }

  try {
    const complaint = await prisma.complaint.create({
      data: {
        title,
        description,
        category,
        userId: session.user.id,
      },
    })

    return NextResponse.json(complaint)
  } catch (error) {
    return NextResponse.json({ error: "Erro ao criar reclamação" }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
  }

  const { id, title, description, category, status } = await req.json()

  // Validação dos dados
  if (!id || !title || !description || !category) {
    return NextResponse.json({ error: "Todos os campos são obrigatórios" }, { status: 400 })
  }

  if (title.length < 5 || title.length > 100) {
    return NextResponse.json({ error: "O título deve ter entre 5 e 100 caracteres" }, { status: 400 })
  }

  if (description.length < 10 || description.length > 1000) {
    return NextResponse.json({ error: "A descrição deve ter entre 10 e 1000 caracteres" }, { status: 400 })
  }

  try {
    const complaint = await prisma.complaint.update({
      where: {
        id,
        userId: session.user.id,
      },
      data: {
        title,
        description,
        category,
        status,
      },
    })

    // Create a notification for the status change
    if (status !== complaint.status) {
      await prisma.notification.create({
        data: {
          userId: session.user.id,
          message: `O status da sua reclamação "${complaint.title}" foi atualizado para ${status}.`,
        },
      })
    }

    return NextResponse.json({ message: "Reclamação atualizada com sucesso" })
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar reclamação" }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")

  if (!id) {
    return NextResponse.json({ error: "ID da reclamação é obrigatório" }, { status: 400 })
  }

  try {
    const complaint = await prisma.complaint.deleteMany({
      where: {
        id,
        userId: session.user.id,
      },
    })

    if (complaint.count === 0) {
      return NextResponse.json(
        { error: "Reclamação não encontrada ou você não tem permissão para excluí-la" },
        { status: 404 },
      )
    }

    return NextResponse.json({ message: "Reclamação excluída com sucesso" })
  } catch (error) {
    return NextResponse.json({ error: "Erro ao excluir reclamação" }, { status: 500 })
  }
}

