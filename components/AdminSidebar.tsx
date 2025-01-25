"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const adminLinks = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/usuarios", label: "Usuários" },
  { href: "/admin/reclamacoes", label: "Reclamações" },
  { href: "/admin/avaliacoes", label: "Moderação de Avaliações" },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-gray-100 min-h-screen p-4">
      <nav className="space-y-2">
        {adminLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "block px-4 py-2 rounded-md transition-colors",
              pathname === link.href ? "bg-voz-blue-600 text-white" : "text-gray-700 hover:bg-gray-200",
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}

