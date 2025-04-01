"use client"
import { useRef } from "react"
import { useScroll, useTransform } from "framer-motion"
import CategoryCarousel from "@/components/category-carousel"
import PromoBanner from "@/components/promo-banner"
import FloatingPromo from "@/components/floating-promo"
import InteractiveShowcase from "@/components/interactive-showcase"
import CategoryShowcase from "@/components/category-showcase"
import ParallaxSection from "@/components/parallax-section"
import FeaturedProductShowcase from "@/components/featured-product-showcase"
import { motion } from "framer-motion"
import { Truck, CreditCard, Award, Phone, ArrowRight } from "lucide-react"
import TestimonialSection from "@/components/testimonial-section"
import Image from "next/image"
import Link from "next/link"
import WhatsAppButton from "@/components/whatsapp-button"

export default function Home() {
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1])

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section with Parallax */}
      <ParallaxSection />

      {/* Banner promocional */}
      <PromoBanner />

      {/* Showcase interactivo */}
      <InteractiveShowcase />

      {/* Featured Product Showcase */}
      <FeaturedProductShowcase />

      {/* Showcase de categorías */}
      <CategoryShowcase />

      {/* Features Section with Animation */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div
              className="flex flex-col items-center rounded-lg bg-blue-50 p-6 text-center shadow-sm transition-all hover:shadow-md"
              variants={fadeInUp}
            >
              <Truck className="mb-4 h-12 w-12 text-blue-600" />
              <h3 className="mb-2 text-xl font-semibold">Envíos a Todo el País</h3>
              <p className="text-gray-600">Entrega rápida y segura a cualquier punto del territorio nacional</p>
            </motion.div>
            <motion.div
              className="flex flex-col items-center rounded-lg bg-blue-50 p-6 text-center shadow-sm transition-all hover:shadow-md"
              variants={fadeInUp}
            >
              <CreditCard className="mb-4 h-12 w-12 text-blue-600" />
              <h3 className="mb-2 text-xl font-semibold">Múltiples Métodos de Pago</h3>
              <p className="text-gray-600">Aceptamos efectivo, transferencias, tarjetas de crédito y débito</p>
            </motion.div>
            <motion.div
              className="flex flex-col items-center rounded-lg bg-blue-50 p-6 text-center shadow-sm transition-all hover:shadow-md"
              variants={fadeInUp}
            >
              <Award className="mb-4 h-12 w-12 text-blue-600" />
              <h3 className="mb-2 text-xl font-semibold">Garantía de Calidad</h3>
              <p className="text-gray-600">Todos nuestros productos cuentan con garantía y certificación</p>
            </motion.div>
            <motion.div
              className="flex flex-col items-center rounded-lg bg-blue-50 p-6 text-center shadow-sm transition-all hover:shadow-md"
              variants={fadeInUp}
            >
              <Phone className="mb-4 h-12 w-12 text-blue-600" />
              <h3 className="mb-2 text-xl font-semibold">Asesoramiento Técnico</h3>
              <p className="text-gray-600">Equipo de expertos disponible para resolver todas tus consultas</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section with Scroll Animation */}
      <section id="empresa" className="bg-gray-50 py-20" ref={targetRef}>
        <div className="container mx-auto px-4">
          <motion.div className="mx-auto max-w-3xl text-center" style={{ opacity, scale }}>
            <h2 className="mb-6 text-3xl font-bold text-blue-800 md:text-4xl">Nuestra Empresa</h2>
            <p className="mb-8 text-lg text-gray-700">
              En <span className="font-semibold text-blue-700">Leo Radiadores</span> nos especializamos en la
              fabricación, reparación y venta de radiadores de alta calidad para el sector agrícola e industrial. Con
              más de dos décadas de experiencia, nos hemos consolidado como líderes en el mercado gracias a nuestro
              compromiso con la excelencia y la satisfacción del cliente.
            </p>
            <motion.div
              className="grid grid-cols-1 gap-6 md:grid-cols-3"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.div className="rounded-lg bg-white p-5 shadow-sm" variants={fadeInUp}>
                <h3 className="mb-2 text-xl font-semibold text-blue-700">Misión</h3>
                <p className="text-gray-600">
                  Brindar soluciones térmicas de calidad que superen las expectativas de nuestros clientes.
                </p>
              </motion.div>
              <motion.div className="rounded-lg bg-white p-5 shadow-sm" variants={fadeInUp}>
                <h3 className="mb-2 text-xl font-semibold text-blue-700">Visión</h3>
                <p className="text-gray-600">
                  Ser referentes nacionales en sistemas de refrigeración para maquinaria agrícola e industrial.
                </p>
              </motion.div>
              <motion.div className="rounded-lg bg-white p-5 shadow-sm" variants={fadeInUp}>
                <h3 className="mb-2 text-xl font-semibold text-blue-700">Valores</h3>
                <p className="text-gray-600">
                  Calidad, innovación, responsabilidad y compromiso con nuestros clientes.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Carruseles de productos por categoría */}
      <CategoryCarousel
        categoryName="Radiadores Agrícolas"
        categorySlug="radiadores-agricolas"
        backgroundColor="bg-white"
        textColor="text-blue-800"
        accentColor="bg-blue-600"
      />

      <CategoryCarousel
        categoryName="Radiadores Industriales"
        categorySlug="radiadores-industriales"
        backgroundColor="bg-gray-50"
        textColor="text-blue-800"
        accentColor="bg-yellow-500"
      />

      <CategoryCarousel
        categoryName="Bombas de Agua"
        categorySlug="bombas-de-agua"
        backgroundColor="bg-blue-900"
        textColor="text-white"
        accentColor="bg-yellow-500"
      />

      <CategoryCarousel
        categoryName="Electroventiladores"
        categorySlug="electroventiladores"
        backgroundColor="bg-white"
        textColor="text-blue-800"
        accentColor="bg-blue-600"
      />

      {/* Testimonios */}
      <TestimonialSection />

      {/* Contact Banner with Animation */}
      <section className="relative overflow-hidden py-16">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=800&width=1600"
            alt="Background"
            fill
            className="object-cover object-center brightness-[0.2]"
          />
        </div>
        <motion.div
          className="container relative z-10 mx-auto px-4 text-center text-white"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">¿Necesitas un Radiador Especializado?</h2>
          <p className="mb-8 text-xl">Contamos con la solución perfecta para tus necesidades</p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center rounded-md bg-yellow-500 px-8 py-3 text-lg font-medium text-blue-900 transition-colors hover:bg-yellow-400"
            >
              Solicitar Presupuesto
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* WhatsApp Button */}
      <WhatsAppButton />

      {/* Floating Promo */}
      <FloatingPromo />
    </main>
  )
}

