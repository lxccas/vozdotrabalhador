"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"

interface Review {
  id: string
  rating: number
  content: string
  createdAt: string
}

export default function CompanyReviewsPage() {
  const { id } = useParams()
  const [reviews, setReviews] = useState<Review[]>([])
  const [company, setCompany] = useState<{ name: string } | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchReviews()
    fetchCompany()
  }, [currentPage])

  const fetchReviews = async () => {
    const response = await fetch(`/api/reviews?companyId=${id}&page=${currentPage}&limit=10`)
    if (response.ok) {
      const data = await response.json()
      setReviews(data.reviews)
      setTotalPages(data.totalPages)
    }
  }

  const fetchCompany = async () => {
    const response = await fetch(`/api/companies/${id}`)
    if (response.ok) {
      const data = await response.json()
      setCompany(data)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Avaliações de {company?.name || "Empresa"}</h1>
      {reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review) => (
            <Card key={review.id}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${star <= review.rating ? "text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{review.content}</p>
                <p className="text-sm text-gray-500 mt-2">{new Date(review.createdAt).toLocaleDateString()}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p>Nenhuma avaliação encontrada para esta empresa.</p>
      )}
      <div className="mt-4 flex justify-between items-center">
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
    </div>
  )
}

