import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get("q")

  if (!query) {
    return NextResponse.json({ error: "Query parameter 'q' is required" }, { status: 400 })
  }

  try {
    const [complaints, companies, resources] = await Promise.all([
      prisma.complaint.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: "insensitive" } },
            { description: { contains: query, mode: "insensitive" } },
          ],
        },
        select: {
          id: true,
          title: true,
          description: true,
        },
        take: 5,
      }),
      prisma.company.findMany({
        where: {
          name: { contains: query, mode: "insensitive" },
        },
        select: {
          id: true,
          name: true,
        },
        take: 5,
      }),
      // Simulating resource search (adjust based on your actual data structure)
      [
        { id: "direitos-trabalhistas", title: "Direitos Trabalhistas", content: "Guia sobre direitos trabalhistas..." },
        { id: "protecao-no-trabalho", title: "Proteção no Trabalho", content: "Informações sobre proteção..." },
      ].filter(
        (resource) =>
          resource.title.toLowerCase().includes(query.toLowerCase()) ||
          resource.content.toLowerCase().includes(query.toLowerCase()),
      ),
    ])

    const results = [
      ...complaints.map((c) => ({ type: "complaint", id: c.id, title: c.title, content: c.description })),
      ...companies.map((c) => ({
        type: "company",
        id: c.id,
        title: c.name,
        content: `Avaliações da empresa ${c.name}`,
      })),
      ...resources.map((r) => ({ type: "resource", id: r.id, title: r.title, content: r.content })),
    ]

    return NextResponse.json({ results })
  } catch (error) {
    console.error("Search error:", error)
    return NextResponse.json({ error: "An error occurred while searching" }, { status: 500 })
  }
}

