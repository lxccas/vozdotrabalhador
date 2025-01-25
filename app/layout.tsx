import { Inter, Poppins } from "next/font/google"
import { Providers } from "@/components/Providers"
import { Navbar } from "@/components/Navbar"
import { NotificationDropdown } from "@/components/NotificationDropdown"
import { Chatbot } from "@/components/Chatbot"
import { Footer } from "@/components/Footer"
import "./globals.css"
import Script from "next/script"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const poppins = Poppins({
  weight: ["600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Voz do Trabalhador - Plataforma para denúncias e avaliações de empresas" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
      </head>
      <body className="font-sans bg-gray-50">
        <Providers>
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <div className="flex justify-end mb-4">
              <NotificationDropdown />
            </div>
            {children}
          </main>
          <Footer />
          <Chatbot />
        </Providers>
        <Script
          id="register-sw"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/service-worker.js');
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}

