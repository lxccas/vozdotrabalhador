import Link from "next/link"
import { Facebook, Twitter, Instagram, Mail, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-heading font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Voz do Trabalhador
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Promovendo ambientes de trabalho justos e respeitosos em todo o Brasil.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Links Rápidos</h4>
            <ul className="space-y-3">
              <FooterLink href="/reclamacoes/nova" text="Registrar Reclamação" />
              <FooterLink href="/recursos" text="Recursos Educacionais" />
              <FooterLink href="/empresas" text="Avaliações de Empresas" />
              <FooterLink href="/faq" text="Perguntas Frequentes" />
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors">
                <Mail className="h-5 w-5" />
                <a href="mailto:contato@vozdotrabalhador.com.br">contato@vozdotrabalhador.com.br</a>
              </li>
              <li className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors">
                <Phone className="h-5 w-5" />
                <a href="tel:08001234567">0800 123 4567</a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Redes Sociais</h4>
            <div className="flex space-x-4">
              <SocialLink href="#" icon={<Facebook className="h-5 w-5" />} label="Facebook" />
              <SocialLink href="#" icon={<Twitter className="h-5 w-5" />} label="Twitter" />
              <SocialLink href="#" icon={<Instagram className="h-5 w-5" />} label="Instagram" />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-8">
          <div className="text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Voz do Trabalhador. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterLink({ href, text }: { href: string; text: string }) {
  return (
    <li>
      <Link href={href} className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2">
        <span>{text}</span>
      </Link>
    </li>
  )
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      className="bg-gray-800 p-3 rounded-full text-gray-400 hover:text-white hover:bg-primary transition-all duration-200"
      aria-label={label}
    >
      {icon}
    </a>
  )
}

