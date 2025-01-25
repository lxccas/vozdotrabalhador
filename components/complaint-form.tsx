"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

const complaintSchema = z.object({
  title: z
    .string()
    .min(5, "O título deve ter pelo menos 5 caracteres")
    .max(100, "O título deve ter no máximo 100 caracteres"),
  category: z.string().nonempty("Selecione uma categoria"),
  description: z
    .string()
    .min(10, "A descrição deve ter pelo menos 10 caracteres")
    .max(1000, "A descrição deve ter no máximo 1000 caracteres"),
  tags: z.array(z.string()).min(1, "Selecione pelo menos uma tag").max(5, "Selecione no máximo 5 tags"),
})

type ComplaintFormData = z.infer<typeof complaintSchema>

const availableTags = [
  "Assédio",
  "Discriminação",
  "Salário",
  "Horas Extras",
  "Segurança",
  "Saúde",
  "Benefícios",
  "Demissão",
  "Contratação",
  "Ambiente de Trabalho",
]

export function ComplaintForm() {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ComplaintFormData>({
    resolver: zodResolver(complaintSchema),
  })

  const onSubmit = async (data: ComplaintFormData) => {
    // Handle form submission
    console.log(data)
  }

  const handleTagSelect = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag))
    } else if (selectedTags.length < 5) {
      setSelectedTags([...selectedTags, tag])
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input {...register("title")} placeholder="Título da reclamação" />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
      </div>
      <div>
        <Select onValueChange={(value) => register("category").onChange({ target: { value } })}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione uma categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="assedio">Assédio</SelectItem>
            <SelectItem value="discriminacao">Discriminação</SelectItem>
            <SelectItem value="condicoes_trabalho">Condições de Trabalho</SelectItem>
            <SelectItem value="salario">Salário</SelectItem>
            <SelectItem value="outro">Outro</SelectItem>
          </SelectContent>
        </Select>
        {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
      </div>
      <div>
        <Textarea {...register("description")} placeholder="Descreva sua reclamação" />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
      </div>
      <div>
        <p className="mb-2">Selecione as tags relevantes (máximo 5):</p>
        <div className="flex flex-wrap gap-2">
          {availableTags.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => handleTagSelect(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
        <input type="hidden" {...register("tags")} value={selectedTags} />
        {errors.tags && <p className="text-red-500 text-sm">{errors.tags.message}</p>}
      </div>
      <Button type="submit">Enviar Reclamação</Button>
    </form>
  )
}

