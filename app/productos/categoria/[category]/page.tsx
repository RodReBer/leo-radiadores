"use client"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import ProductGrid from "@/components/product-grid"
import CategoryFilter from "@/components/category-filter"

// Función para formatear el nombre de la categoría
const formatCategoryName = (slug: string) => {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const categoryName = formatCategoryName(params.category)

  // Animaciones
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <main className="flex min-h-screen flex-col pt-16">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            className="mb-4 text-4xl font-bold md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {categoryName}
          </motion.h1>
          <motion.p
            className="mx-auto max-w-2xl text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Descubre nuestra selección de {categoryName.toLowerCase()} de alta calidad
          </motion.p>
          <motion.nav
            className="mt-6 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <Link href="/" className="text-blue-200 hover:text-white">
                  Inicio
                </Link>
              </li>
              <li className="flex items-center space-x-2">
                <ChevronRight className="h-4 w-4" />
                <Link href="/productos" className="text-blue-200 hover:text-white">
                  Productos
                </Link>
              </li>
              <li className="flex items-center space-x-2">
                <ChevronRight className="h-4 w-4" />
                <span>{categoryName}</span>
              </li>
            </ol>
          </motion.nav>
        </div>
      </section>

      {/* Category Description */}
      <motion.section className="bg-white py-8" variants={fadeIn} initial="hidden" animate="visible">
        <div className="container mx-auto px-4">
          <div className="rounded-lg bg-blue-50 p-6">
            <h2 className="mb-4 text-xl font-bold text-blue-800">Sobre {categoryName}</h2>
            <p className="text-gray-700">
              En Leo Radiadores ofrecemos una amplia gama de {categoryName.toLowerCase()} de la más alta calidad,
              diseñados para garantizar el máximo rendimiento y durabilidad en las condiciones más exigentes. Nuestros
              productos están fabricados con materiales de primera calidad y cuentan con garantía de fábrica.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
            {/* Sidebar with Filters */}
            <div className="lg:col-span-1">
              <CategoryFilter />
            </div>

            {/* Product Grid */}
            <div className="lg:col-span-3">
              <ProductGrid />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

