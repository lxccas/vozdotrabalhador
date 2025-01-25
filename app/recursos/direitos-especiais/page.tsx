import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { VideoCard } from "@/components/video-card"
import { ContentSection } from "@/components/content-section"
import { Heart, UserCheck, GraduationCap, Users } from "lucide-react"

export default function DireitosEspeciais() {
  return (
    <div className="space-y-8 animate-in fade-in-50">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Direitos Especiais</h1>
        <p className="text-lg text-muted-foreground">
          Direitos específicos para grupos de trabalhadores em situações especiais.
        </p>
      </div>

      <Alert className="max-w-3xl mx-auto">
        <Heart className="h-4 w-4" />
        <AlertTitle>Importante</AlertTitle>
        <AlertDescription>Conheça os direitos específicos da sua categoria e situação.</AlertDescription>
      </Alert>

      <div className="grid gap-8">
        <ContentSection title="Gestantes" icon={<Heart className="h-5 w-5 text-primary" />}>
          <ul>
            <li>Estabilidade desde a confirmação até 5 meses após o parto</li>
            <li>Direito a mudança de função se necessário</li>
            <li>6 meses de licença maternidade</li>
            <li>Intervalos para amamentação</li>
          </ul>
        </ContentSection>

        <div className="grid md:grid-cols-2 gap-6">
          <VideoCard
            title="Direitos da Gestante"
            description="Conheça todos os seus direitos durante a gestação"
            videoUrl="https://www.youtube.com/embed/bqr1yy60N78?si=aquEOU35tKQW7fP2"
            thumbnail="/placeholder.svg?height=200&width=400"
          />
          <VideoCard
            title="Licença Maternidade"
            description="Como funciona a licença maternidade"
            videoUrl="https://www.youtube.com/embed/SMlHuFR0nDI?si=bhGjDy7vhbiM7TuU"
            thumbnail="/placeholder.svg?height=200&width=400"
          />
        </div>

        <ContentSection title="PCD - Pessoa com Deficiência" icon={<UserCheck className="h-5 w-5 text-primary" />}>
          <ul>
            <li>Cotas em empresas com mais de 100 funcionários</li>
            <li>Adaptação do ambiente de trabalho</li>
            <li>Jornada adaptada quando necessário</li>
            <li>Proteção contra discriminação</li>
          </ul>
        </ContentSection>

        <ContentSection title="Aprendizes" icon={<GraduationCap className="h-5 w-5 text-primary" />}>
          <ul>
            <li>Contrato especial de até 2 anos</li>
            <li>Jornada reduzida para estudos</li>
            <li>Salário mínimo hora</li>
            <li>Acompanhamento profissional</li>
          </ul>
        </ContentSection>

        <ContentSection title="Terceirizados" icon={<Users className="h-5 w-5 text-primary" />}>
          <ul>
            <li>Mesmas condições de alimentação e transporte</li>
            <li>Responsabilidade subsidiária da contratante</li>
            <li>Proteção em caso de troca de empresa</li>
            <li>Direito a ambiente seguro de trabalho</li>
          </ul>
        </ContentSection>
      </div>
    </div>
  )
}

