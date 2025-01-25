import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(request: Request) {
  const body = await request.json()
  const { eventoId, userId } = body

  try {
    const inscricao = await prisma.inscricao.findMany({
      data: {
        eventoId,
        userId,
      },
    })

    return NextResponse.json({ success: true, inscricao })
  } catch (error) {
    console.error("Erro ao criar inscrição:", error)
    return NextResponse.json({ success: false, error: "Falha ao processar inscrição" }, { status: 500 })
  }
}
