import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { VideoCard } from "@/components/video-card"
import { ContentSection } from "@/components/content-section"
import { Clock, AlarmClock, Moon, CalendarClock, Coffee } from "lucide-react"

export default function JornadaDeTrabalho() {
  return (
    <div className="space-y-8 animate-in fade-in-50">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Jornada de Trabalho</h1>
        <p className="text-lg text-muted-foreground">
          Entenda seus direitos relacionados a horários, horas extras e descanso.
        </p>
      </div>

      <Alert className="max-w-3xl mx-auto">
        <Clock className="h-4 w-4" />
        <AlertTitle>Importante</AlertTitle>
        <AlertDescription>
          O controle da jornada de trabalho é essencial para garantir seus direitos e sua qualidade de vida.
        </AlertDescription>
      </Alert>

      <div className="grid gap-8">
        <ContentSection title="Horas Extras" icon={<AlarmClock className="h-5 w-5 text-primary" />}>
          <ul>
            <li>Acréscimo mínimo de 50% sobre a hora normal</li>
            <li>Máximo de 2 horas extras por dia</li>
            <li>Necessidade de acordo prévio</li>
            <li>Direito a compensação (banco de horas)</li>
            <li>Registro obrigatório no ponto</li>
          </ul>
        </ContentSection>

        <div className="grid md:grid-cols-2 gap-6">
          <VideoCard
            title="Cálculo de Horas Extras"
            description="Aprenda a calcular suas horas extras corretamente"
            videoUrl="https://www.youtube.com/embed/pumPOmgNZS8?si=DcVOc1F89t8MsYOV"
            thumbnail="/placeholder.svg?height=200&width=400"
          />
          <VideoCard
            title="Banco de Horas"
            description="Como funciona o sistema de compensação de horas"
            videoUrl="https://www.youtube.com/embed/x82EivCLwzE?si=TQ_zLwHM4vpSSaYH"
            thumbnail="/placeholder.svg?height=200&width=400"
          />
        </div>

        <ContentSection title="Intervalos" icon={<Coffee className="h-5 w-5 text-primary" />}>
          <ul>
            <li>Intervalo mínimo de 1 hora para almoço em jornadas acima de 6 horas</li>
            <li>15 minutos de intervalo para jornadas entre 4 e 6 horas</li>
            <li>11 horas de descanso entre jornadas</li>
            <li>Descanso semanal remunerado de 24 horas consecutivas</li>
            <li>Pausas específicas para algumas profissões (ex: digitadores)</li>
          </ul>
        </ContentSection>

        <ContentSection title="Trabalho Noturno" icon={<Moon className="h-5 w-5 text-primary" />}>
          <ul>
            <li>Considerado entre 22h e 5h (área urbana)</li>
            <li>Hora noturna de 52 minutos e 30 segundos</li>
            <li>Adicional noturno de no mínimo 20%</li>
            <li>Proteção especial para menores de 18 anos</li>
          </ul>
        </ContentSection>

        <ContentSection title="Banco de Horas" icon={<CalendarClock className="h-5 w-5 text-primary" />}>
          <ul>
            <li>Acordo individual ou coletivo</li>
            <li>Compensação em até 6 meses</li>
            <li>Horas extras com acréscimo de 50%</li>
            <li>Limite de 2 horas diárias para compensação</li>
            <li>Pagamento das horas não compensadas no prazo</li>
          </ul>
        </ContentSection>
      </div>
    </div>
  )
}

