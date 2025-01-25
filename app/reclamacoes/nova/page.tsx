"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const complaintSchema = z.object({
  title: z
    .string()
    .min(5, "O título deve ter pelo menos 5 caracteres")
    .max(100, "O título deve ter no máximo 100 caracteres"),
  category: z.string({
    required_error: "Selecione uma categoria",
  }),
  description: z
    .string()
    .min(10, "A descrição deve ter pelo menos 10 caracteres")
    .max(1000, "A descrição deve ter no máximo 1000 caracteres"),
})

type ComplaintFormData = z.infer<typeof complaintSchema>

const categories = [
  { value: "assedio", label: "Assédio" },
  { value: "discriminacao", label: "Discriminação" },
  { value: "condicoes_trabalho", label: "Condições de Trabalho" },
  { value: "salario", label: "Salário" },
  { value: "outro", label: "Outro" },
]

export default function NovaReclamacaoPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ComplaintFormData>({
    resolver: zodResolver(complaintSchema),
  })

  const onSubmit = async (data: ComplaintFormData) => {
    setError("")
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/complaints", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Erro ao submeter reclamação")
      }

      router.push("/dashboard")
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Ocorreu um erro ao submeter a reclamação. Por favor, tente novamente.",
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!session) {
    router.push("/login")
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Nova Reclamação</CardTitle>
          <CardDescription>Preencha os detalhes da sua reclamação abaixo</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Título
              </label>
              <Input id="title" {...register("title")} disabled={isSubmitting} />
              {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium">
                Categoria
              </label>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value} disabled={isSubmitting}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Descrição
              </label>
              <Textarea id="description" {...register("description")} rows={5} disabled={isSubmitting} />
              {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Enviando..." : "Submeter Reclamação"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

