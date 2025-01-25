import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { VideoCard } from "@/components/video-card"
import { ContentSection } from "@/components/content-section"
import { FileWarning, AlertTriangle, Calculator, HandCoins, FileCheck } from "lucide-react"

export default function RescisaoEDemissao() {
  return (
    <div className="space-y-8 animate-in fade-in-50">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Rescisão e Demissão</h1>
        <p className="text-lg text-muted-foreground">
          Entenda seus direitos em caso de término do contrato de trabalho.
        </p>
      </div>

      <Alert variant="destructive" className="max-w-3xl mx-auto">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Atenção</AlertTitle>
        <AlertDescription>Não assine documentos de rescisão sem entender completamente seus direitos.</AlertDescription>
      </Alert>

      <div className="grid gap-8">
        <ContentSection title="Aviso Prévio" icon={<FileWarning className="h-5 w-5 text-primary" />}>
          <ul>
            <li>Mínimo de 30 dias</li>
            <li>3 dias adicionais por ano trabalhado</li>
            <li>Pode ser trabalhado ou indenizado</li>
            <li>Redução de 2 horas diárias ou 7 dias corridos</li>
          </ul>
        </ContentSection>

        <div className="grid md:grid-cols-2 gap-6">
          <VideoCard
            title="Cálculo do Aviso Prévio"
            description="Como calcular o valor do seu aviso prévio"
            videoUrl="https://www.youtube.com/embed/LEO5O3FHgW4?si=Q4mqHxRFqPQQCvGT"
            thumbnail="/placeholder.svg?height=200&width=400"
          />
          <VideoCard
            title="Direitos na Demissão"
            description="Todos os seus direitos explicados"
            videoUrl="https://www.youtube.com/embed/u4GMFq24jtc?si=GW_VnTbK0IcJiNNG"
            thumbnail="/placeholder.svg?height=200&width=400"
          />
        </div>

        <ContentSection title="Verbas Rescisórias" icon={<Calculator className="h-5 w-5 text-primary" />}>
          <ul>
            <li>Saldo de salário</li>
            <li>Férias proporcionais + 1/3</li>
            <li>13º salário proporcional</li>
            <li>FGTS + multa de 40%</li>
          </ul>
        </ContentSection>

        <ContentSection title="Seguro Desemprego" icon={<HandCoins className="h-5 w-5 text-primary" />}>
          <ul>
            <li>3 a 5 parcelas dependendo do tempo trabalhado</li>
            <li>Necessário comprovar demissão sem justa causa</li>
            <li>Prazo de 7 a 120 dias para solicitar</li>
            <li>Valor calculado com base nos últimos salários</li>
          </ul>
        </ContentSection>

        <ContentSection title="Homologação" icon={<FileCheck className="h-5 w-5 text-primary" />}>
          <ul>
            <li>Conferência dos valores rescisórios</li>
            <li>Assistência do sindicato</li>
            <li>Prazo de 10 dias para pagamento</li>
            <li>Documentos necessários para baixa na CTPS</li>
          </ul>
        </ContentSection>
      </div>
    </div>
  )
}

