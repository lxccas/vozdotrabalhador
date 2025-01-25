import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const page = Number(searchParams.get("page")) || 1
    const limit = Number(searchParams.get("limit")) || 10
    const skip = (page - 1) * limit

    const [companies, total] = await Promise.all([
      prisma.company.findMany({
        skip,
        take: limit,
        orderBy: { name: "asc" },
        include: {
          reviews: {
            where: { status: "approved" },
            select: { rating: true },
          },
        },
      }),
      prisma.company.count(),
    ])

    const formattedCompanies = companies.map((company) => {
      const totalRating = company.reviews.reduce((sum, review) => sum + review.rating, 0)
      const averageRating = company.reviews.length > 0 ? totalRating / company.reviews.length : 0

      return {
        id: company.id,
        name: company.name,
        averageRating: Number(averageRating.toFixed(1)),
        reviewCount: company.reviews.length,
      }
    })

    return NextResponse.json({
      companies: formattedCompanies,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    })
  } catch (error) {
    console.error("Erro ao buscar empresas:", error)
    return NextResponse.json({ error: "Erro ao buscar empresas" }, { status: 500 })
  }
}

