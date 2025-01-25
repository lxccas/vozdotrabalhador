import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { OptimizedImage } from "@/components/OptimizedImage"

export default function SobrePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Sobre a Voz do Trabalhador</h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Nossa Missão</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              A Voz do Trabalhador é uma plataforma dedicada a empoderar os trabalhadores brasileiros, fornecendo
              informações, recursos e ferramentas para proteger seus direitos e melhorar suas condições de trabalho.
              Nosso objetivo é criar um ambiente de trabalho mais justo, seguro e respeitoso para todos.
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>O que oferecemos</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Sistema de denúncias anônimas</li>
                <li>Avaliações de empresas</li>
                <li>Recursos educacionais sobre direitos trabalhistas</li>
                <li>Informações sobre proteção no trabalho</li>
                <li>Comunidade de apoio mútuo</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Nossa Visão</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Imaginamos um Brasil onde todos os trabalhadores conheçam seus direitos, tenham voz ativa em seus locais
                de trabalho e sejam tratados com dignidade e respeito. Acreditamos que, juntos, podemos construir um
                mercado de trabalho mais ético e justo.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Como Funciona</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Nossa plataforma oferece várias ferramentas e recursos para apoiar os trabalhadores:
            </p>
            <ol className="list-decimal list-inside text-gray-600 space-y-2">
              <li>Registre denúncias de forma anônima e segura</li>
              <li>Avalie empresas baseado em suas práticas trabalhistas</li>
              <li>Acesse recursos educacionais sobre seus direitos</li>
              <li>Conecte-se com outros trabalhadores e compartilhe experiências</li>
              <li>Receba orientações sobre como proceder em situações difíceis</li>
            </ol>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <OptimizedImage
            src="/placeholder.svg?height=300&width=600"
            alt="Equipe Voz do Trabalhador"
            width={600}
            height={300}
            className="rounded-lg shadow-md mx-auto"
          />
          <p className="mt-4 text-gray-600">A equipe por trás da Voz do Trabalhador</p>
        </div>
      </div>
    </div>
  )
}

