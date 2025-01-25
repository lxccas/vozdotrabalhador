import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import prisma from "@/lib/prisma"

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
  }

  try {
    const [userCount, complaintCount, complaintsByCategory, complaintsByStatus] = await Promise.all([
      prisma.user.count(),
      prisma.complaint.count(),
      prisma.complaint.groupBy({
        by: ["category"],
        _count: {
          category: true,
        },
      }),
      prisma.complaint.groupBy({
        by: ["status"],
        _count: {
          status: true,
        },
      }),
    ])

    const dashboardData = {
      userCount,
      complaintCount,
      complaintsByCategory: complaintsByCategory.map((item) => ({
        name: item.category,
        value: item._count.category,
      })),
      complaintsByStatus: complaintsByStatus.map((item) => ({
        name: item.status,
        value: item._count.status,
      })),
    }

    return NextResponse.json(dashboardData)
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar dados do dashboard" }, { status: 500 })
  }
}

