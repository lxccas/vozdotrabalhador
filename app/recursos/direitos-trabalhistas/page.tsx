import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { VideoCard } from "@/components/video-card"
import { ContentSection } from "@/components/content-section"
import { Book, Wallet, Calendar, PiggyBank, FileText } from "lucide-react"

export default function DireitosTrabalhistas() {
  return (
    <div className="space-y-8 animate-in fade-in-50">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Direitos Trabalhistas</h1>
        <p className="text-lg text-muted-foreground">
          Guia completo sobre seus direitos fundamentais como trabalhador.
        </p>
      </div>

      <Alert className="max-w-3xl mx-auto">
        <Book className="h-4 w-4" />
        <AlertTitle>Importante</AlertTitle>
        <AlertDescription>
          Conhecer seus direitos é o primeiro passo para garantir que eles sejam respeitados.
        </AlertDescription>
      </Alert>

      <div className="grid gap-8">
        <ContentSection title="Carteira de Trabalho" icon={<FileText className="h-5 w-5 text-primary" />}>
          <ul>
            <li>Documento obrigatório para trabalhar</li>
            <li>Versão digital disponível</li>
            <li>Registro de toda vida profissional</li>
            <li>Necessária para benefícios sociais</li>
          </ul>
        </ContentSection>

        <div className="grid md:grid-cols-2 gap-6">
          <VideoCard
            title="Como obter a CTPS Digital"
            description="Passo a passo para ter sua Carteira de Trabalho Digital"
            videoUrl="https://www.youtube.com/embed/JASht-CIvss?si=2v14R40ep74j8vX4"
            thumbnail="/placeholder.svg?height=200&width=400"
          />
          <VideoCard
            title="Direitos Básicos"
            description="Conheça seus direitos fundamentais"
            videoUrl="https://www.youtube.com/embed/rP1siv_duBM?si=xwuthNIjoKY27F9m"
            thumbnail="/placeholder.svg?height=200&width=400"
          />
        </div>

        <ContentSection title="Salário Mínimo" icon={<Wallet className="h-5 w-5 text-primary" />}>
          <ul>
            <li>Valor atual e reajustes</li>
            <li>Pagamento até o 5º dia útil</li>
            <li>Direito a gratificações</li>
            <li>Proteção contra reduções</li>
          </ul>
        </ContentSection>

        <ContentSection title="13º Salário" icon={<Calendar className="h-5 w-5 text-primary" />}>
          <ul>
            <li>Primeira parcela até 30 de novembro</li>
            <li>Segunda parcela até 20 de dezembro</li>
            <li>Proporcional ao tempo trabalhado</li>
            <li>Incide sobre o salário integral</li>
          </ul>
        </ContentSection>

        <ContentSection title="FGTS" icon={<PiggyBank className="h-5 w-5 text-primary" />}>
          <ul>
            <li>8% do salário mensal</li>
            <li>Depósito obrigatório pelo empregador</li>
            <li>Saque em situações específicas</li>
            <li>Multa de 40% na demissão sem justa causa</li>
          </ul>
        </ContentSection>
      </div>
    </div>
  )
}

