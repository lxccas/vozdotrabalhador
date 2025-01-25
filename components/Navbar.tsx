"use client"

import Link from "next/link"
import { signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { SearchBar } from "@/components/SearchBar"
import { useRouter } from "next/navigation"
import { Menu, X } from "lucide-react"
import { useState } from "react"

export function Navbar() {
  const { data: session } = useSession()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const preloadRoute = (href: string) => {
    router.prefetch(href)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="text-2xl font-heading font-bold text-voz-blue-600 hover:text-voz-blue-500 transition-colors"
          >
            Voz do Trabalhador
          </Link>
          <div className="hidden md:block">
            <SearchBar />
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <NavLinks session={session} preloadRoute={preloadRoute} />
          </div>
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <SearchBar />
            <NavLinks session={session} preloadRoute={preloadRoute} mobile />
          </div>
        </div>
      )}
    </nav>
  )
}

function NavLinks({ session, preloadRoute, mobile = false }) {
  const linkClass = mobile
    ? "block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-voz-blue-600 hover:bg-gray-50 transition-colors"
    : "text-gray-600 hover:text-voz-blue-600 transition-colors"

  return (
    <>
      <Link
        href="/empresas"
        className={linkClass}
        onMouseEnter={() => preloadRoute("/empresas")}
        aria-label="Ver empresas avaliadas"
      >
        Empresas
      </Link>
      <Link
        href="/avaliar-empresa"
        className={linkClass}
        onMouseEnter={() => preloadRoute("/avaliar-empresa")}
        aria-label="Avaliar uma empresa"
      >
        Avaliar Empresa
      </Link>

      {session ? (
        <>
          <Link
            href="/dashboard"
            className={linkClass}
            aria-label="Acessar seu painel"
            onMouseEnter={() => preloadRoute("/dashboard")}
          >
            Dashboard
          </Link>
          <Link
            href="/reclamacoes/nova"
            className={linkClass}
            aria-label="Criar uma nova reclamação"
            onMouseEnter={() => preloadRoute("/reclamacoes/nova")}
          >
            Nova Reclamação
          </Link>
          {session.user.role === "admin" && (
            <Link
              href="/admin"
              className={linkClass}
              aria-label="Acessar painel administrativo"
              onMouseEnter={() => preloadRoute("/admin")}
            >
              Admin
            </Link>
          )}
          <Button onClick={() => signOut()} variant="outline" className="ml-4">
            Sair
          </Button>
        </>
      ) : (
        <>
          <Link
            href="/login"
            className={linkClass}
            aria-label="Acessar sua conta"
            onMouseEnter={() => preloadRoute("/login")}
          >
            Login
          </Link>
          <Link
            href="/registro"
            className={linkClass}
            aria-label="Criar uma nova conta"
            onMouseEnter={() => preloadRoute("/registro")}
          >
            Registro
          </Link>
        </>
      )}
    </>
  )
}

