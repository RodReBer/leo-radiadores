import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ScrollToTop from "@/components/scroll-to-top"
import { AuthProvider } from "@/contexts/auth-context"
import { ProductProvider } from "@/contexts/product-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Leo Radiadores - Especialistas en Radiadores Agrícolas e Industriales",
  description:
    "Fabricación, reparación y venta de radiadores de alta calidad para el sector agrícola e industrial. Envíos a todo el país.",
    generator: 'Rodrigo Rey'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <AuthProvider>
          <ProductProvider>
            <ScrollToTop />
            <Header />
            {children}
            <Footer />
          </ProductProvider>
        </AuthProvider>
      </body>
    </html>
  )
}



import './globals.css'