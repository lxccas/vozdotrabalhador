import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const [totalComplaints, totalCompanies, complaintsByCategory, complaintsByStatus] = await Promise.all([
      prisma.complaint.count(),
      prisma.company.count(),
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

    const statistics = {
      totalComplaints,
      totalCompanies,
      complaintsByCategory: complaintsByCategory.map((item) => ({
        name: item.category,
        value: item._count.category,
      })),
      complaintsByStatus: complaintsByStatus.map((item) => ({
        name: item.status,
        value: item._count.status,
      })),
    }

    return NextResponse.json(statistics)
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar estatísticas" }, { status: 500 })
  }
}

