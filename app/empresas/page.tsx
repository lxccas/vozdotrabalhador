"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Star } from "lucide-react"
import { SkeletonLoader } from "@/components/SkeletonLoader"

interface Company {
  id: string
  name: string
  averageRating: number
  reviewCount: number
}

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCompanies = async () => {
      setIsLoading(true)
      const response = await fetch(`/api/companies?page=${currentPage}&limit=10`)
      if (response.ok) {
        const data = await response.json()
        setCompanies(data.companies)
        setTotalPages(data.totalPages)
      }
      setIsLoading(false)
    }
    fetchCompanies()
  }, [currentPage])

  useEffect(() => {
    const filtered = companies.filter((company) => company.name.toLowerCase().includes(searchTerm.toLowerCase()))
    setFilteredCompanies(filtered)
  }, [companies, searchTerm])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Empresas Avaliadas</h1>
      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <>
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Buscar empresas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map((company) => (
              <Card key={company.id}>
                <CardHeader>
                  <CardTitle>{company.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-5 h-5 ${
                          star <= Math.round(company.averageRating) ? "text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="ml-2">
                      {company.averageRating.toFixed(1)} ({company.reviewCount} avaliações)
                    </span>
                  </div>
                  <Link href={`/empresas/${company.id}`}>
                    <Button>Ver Avaliações</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-6 flex justify-between items-center">
            <Button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
              Anterior
            </Button>
            <span>
              Página {currentPage} de {totalPages}
            </span>
            <Button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Próxima
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

