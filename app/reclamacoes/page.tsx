import { ComplaintForm } from '@/components/complaint-form'

export default function ReclamacoesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-voz-blue-600">Registrar Reclamação</h1>
      <ComplaintForm />
    </div>
  )
}

