import { CompanyRating } from '@/components/company-rating'

export default function AvaliacoesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-voz-blue-600">Avaliações de Empresas</h1>
      <CompanyRating />
    </div>
  )
}

