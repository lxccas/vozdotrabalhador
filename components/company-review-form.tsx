"use client"

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Star } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useRouter } from "next/navigation"

const reviewSchema = z.object({
  companyName: z.string().min(1, "Nome da empresa é obrigatório"),
  rating: z.number().min(1, "Avaliação é obrigatória").max(5, "Avaliação deve ser entre 1 e 5"),
  content: z
    .string()
    .min(10, "A avaliação deve ter pelo menos 10 caracteres")
    .max(500, "A avaliação deve ter no máximo 500 caracteres"),
})

type ReviewFormData = z.infer<typeof reviewSchema>

export function CompanyReviewForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
    },
  })

  const onSubmit = async (data: ReviewFormData) => {
    setIsSubmitting(true)
    setError("")

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName: data.companyName,
          rating: Number(data.rating),
          content: data.content,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Erro ao enviar avaliação")
      }

      reset()
      alert("Avaliação enviada com sucesso! Ela será revisada antes de ser publicada.")
      router.refresh()
    } catch (error) {
      setError(error instanceof Error ? error.message : "Erro ao enviar avaliação. Por favor, tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Avaliar Empresa</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="companyName" className="text-sm font-medium">
              Nome da Empresa
            </label>
            <Input id="companyName" {...register("companyName")} disabled={isSubmitting} />
            {errors.companyName && <p className="text-red-500 text-sm">{errors.companyName.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Avaliação</label>
            <Controller
              name="rating"
              control={control}
              render={({ field }) => (
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => field.onChange(star)}
                      className={`text-2xl transition-colors ${
                        star <= (field.value || 0) ? "text-yellow-400" : "text-gray-300"
                      }`}
                    >
                      <Star className="w-8 h-8" />
                    </button>
                  ))}
                </div>
              )}
            />
            {errors.rating && <p className="text-red-500 text-sm">{errors.rating.message}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="content" className="text-sm font-medium">
              Sua Avaliação
            </label>
            <Textarea id="content" {...register("content")} rows={5} disabled={isSubmitting} />
            {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Enviando..." : "Enviar Avaliação"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

