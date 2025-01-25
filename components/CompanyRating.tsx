"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Star } from "lucide-react"

interface Review {
  id: string
  rating: number
  content: string
  createdAt: string
  user: {
    name: string
  }
}

interface CompanyRatingProps {
  companyId: string
  companyName: string
  initialReviews: Review[]
}

export function CompanyRating({ companyId, companyName, initialReviews }: CompanyRatingProps) {
  const { data: session } = useSession()
  const [reviews, setReviews] = useState<Review[]>(initialReviews)
  const [rating, setRating] = useState(0)
  const [content, setContent] = useState("")

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault()
    if (rating === 0 || !content.trim()) return

    const response = await fetch(`/api/companies/${companyId}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rating, content }),
    })

    if (response.ok) {
      const review = await response.json()
      setReviews([review, ...reviews])
      setRating(0)
      setContent("")
    }
  }

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Avaliações para {companyName}</h2>
      <div className="mb-4">
        <p className="text-lg">
          Avaliação média: {averageRating.toFixed(1)} / 5 ({reviews.length} avaliações)
        </p>
      </div>
      {session && (
        <form onSubmit={handleSubmitReview} className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Adicionar avaliação</h3>
          <div className="flex mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`text-2xl ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
                aria-label={`Avaliar ${star} ${star === 1 ? "estrela" : "estrelas"}`}
              >
                <Star className="w-8 h-8" />
              </button>
            ))}
          </div>
          <p className="sr-only">Avaliação atual: {rating} estrelas</p>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Escreva sua avaliação..."
            className="mb-2"
          />
          <Button type="submit">Enviar Avaliação</Button>
        </form>
      )}
      <div>
        {reviews.map((review) => (
          <div key={review.id} className="mb-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center mb-2">
              <div className="flex mr-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${star <= review.rating ? "text-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <span className="font-semibold">{review.user.name}</span>
              <span className="text-gray-500 text-sm ml-2">{new Date(review.createdAt).toLocaleString()}</span>
            </div>
            <p>{review.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

