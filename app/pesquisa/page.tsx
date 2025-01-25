"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

interface SearchResult {
  type: "complaint" | "company" | "resource"
  id: string
  title: string
  content: string
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q")
  const [results, setResults] = useState<SearchResult[]>([])

  useEffect(() => {
    const fetchResults = async () => {
      if (query) {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        if (response.ok) {
          const data = await response.json()
          setResults(data.results)
        }
      }
    }
    fetchResults()
  }, [query])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Resultados da pesquisa para: {query}</h1>
      {results.length > 0 ? (
        <div className="space-y-4">
          {results.map((result) => (
            <Card key={result.id}>
              <CardHeader>
                <CardTitle>
                  <Link href={`/${result.type}s/${result.id}`} className="text-voz-blue-600 hover:underline">
                    {result.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{result.content.slice(0, 200)}...</p>
                <p className="text-sm text-gray-500 mt-2">Tipo: {result.type}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p>Nenhum resultado encontrado.</p>
      )}
    </div>
  )
}

