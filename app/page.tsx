import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, BarChart2, Users, ArrowRight, Shield, Book } from "lucide-react"
import Link from "next/link"
import { OptimizedImage } from "@/components/OptimizedImage"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 hero-pattern opacity-50"></div>
          <div className="relative gradient-bg py-24">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-700">
                  Sua Voz, <br />
                  Seu Poder
                </h1>
                <p className="text-xl mb-8 text-gray-600 max-w-lg">
                  Juntos, construímos um ambiente de trabalho mais justo e respeitoso para todos os brasileiros.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                    <Link href="/reclamacoes/nova">
                      Registrar Reclamação
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary/10"
                  >
                    <Link href="/sobre">Saiba Mais</Link>
                  </Button>
                </div>
              </div>
              <div className="md:w-1/2 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-white/50 to-transparent z-10 md:hidden"></div>
                <OptimizedImage
                  src="/clt_humilhado.png?height=400&width=600"
                  alt="Trabalhadores unidos"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-heading font-bold text-center mb-4">Como Podemos Ajudar</h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Nossa plataforma oferece ferramentas e recursos para proteger seus direitos e melhorar seu ambiente de
              trabalho.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<AlertTriangle className="h-10 w-10 text-primary" />}
                title="Reclamações Anônimas"
                description="Registre suas preocupações de forma segura e anônima, sem medo de represálias."
              />
              <FeatureCard
                icon={<BarChart2 className="h-10 w-10 text-primary" />}
                title="Acompanhamento de Status"
                description="Acompanhe o progresso de suas reclamações e receba atualizações em tempo real."
              />
              <FeatureCard
                icon={<Users className="h-10 w-10 text-primary" />}
                title="Avaliações de Empresas"
                description="Contribua para a transparência avaliando anonimamente as práticas trabalhistas."
              />
            </div>
          </div>
        </section>

        <section className="py-24 bg-gray-50">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-heading font-bold text-center mb-4">Recursos Educacionais</h2>
    <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
      Conheça seus direitos e aprenda a se proteger no ambiente de trabalho.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Link href="/recursos/direitos-trabalhistas">
        <ResourceCard
          icon={<Book className="h-8 w-8 text-primary" />}
          title="Direitos Trabalhistas"
          description="Guia completo sobre seus direitos fundamentais como trabalhador."
        />
      </Link>
      <Link href="/recursos/protecao-no-trabalho">
        <ResourceCard
          icon={<Shield className="h-8 w-8 text-primary" />}
          title="Proteção no Trabalho"
          description="Aprenda a identificar e lidar com situações de assédio e discriminação."
        />
      </Link>
    </div>
    <div className="text-center mt-8">
      <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
        <Link href="/recursos">
          Ver Todos os Recursos
        </Link>
      </Button>
    </div>
  </div>
</section>

        <section className="py-24 gradient-bg relative overflow-hidden">
          <div className="absolute inset-0 hero-pattern opacity-50"></div>
          <div className="relative container mx-auto px-4 text-center">
            <h2 className="text-3xl font-heading font-bold mb-4">Pronto para fazer a diferença?</h2>
            <p className="text-xl mb-8 text-gray-600 max-w-2xl mx-auto">
              Junte-se a nós na missão de criar ambientes de trabalho mais justos e respeitosos.
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link href="/registro">
                Comece Agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <Card className="transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="mb-4 bg-primary/10 w-16 h-16 rounded-lg flex items-center justify-center">{icon}</div>
        <h3 className="text-xl font-heading font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  )
}

function ResourceCard({ icon, title, description }) {
  return (
    <Card className="transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mr-4">{icon}</div>
          <h3 className="text-xl font-heading font-semibold text-gray-900">{title}</h3>
        </div>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  )
}