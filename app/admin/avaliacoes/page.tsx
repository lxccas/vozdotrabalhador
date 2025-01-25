"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Star } from "lucide-react"

interface Review {
  id: string
  companyName: string
  rating: number
  content: string
  status: string
  createdAt: string
}

export default function AdminReviews() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchReviews()
  }, [currentPage])

  const fetchReviews = async () => {
    const response = await fetch(`/api/admin/reviews?page=${currentPage}&limit=10`)
    if (response.ok) {
      const data = await response.json()
      setReviews(data.reviews)
      setTotalPages(data.totalPages)
    }
  }

  const handleModeration = async (reviewId: string, newStatus: string) => {
    const response = await fetch("/api/admin/reviews", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: reviewId, status: newStatus }),
    })

    if (response.ok) {
      setReviews(reviews.map((review) => (review.id === reviewId ? { ...review, status: newStatus } : review)))
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Moderar Avaliações</h1>
      <Card>
        <CardHeader>
          <CardTitle>Lista de Avaliações</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Empresa</TableHead>
                <TableHead>Avaliação</TableHead>
                <TableHead>Conteúdo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell>{review.companyName}</TableCell>
                  <TableCell>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`inline-block w-4 h-4 ${star <= review.rating ? "text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </TableCell>
                  <TableCell>{review.content.slice(0, 50)}...</TableCell>
                  <TableCell>{review.status}</TableCell>
                  <TableCell>{new Date(review.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {review.status === "pending" && (
                      <>
                        <Button onClick={() => handleModeration(review.id, "approved")} className="mr-2">
                          Aprovar
                        </Button>
                        <Button onClick={() => handleModeration(review.id, "rejected")} variant="destructive">
                          Rejeitar
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
        </CardContent>
      </Card>
    </div>
  )
}

