"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useProducts } from "@/contexts/product-context"

export default function FeaturedProducts() {
  const { products, loading } = useProducts()

  // Seleccionar 3 productos destacados
  const featuredProducts = products.slice(0, 3)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  // Si está cargando, mostrar un indicador de carga
  if (loading) {
    return (
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-blue-800 md:text-4xl">Productos Destacados</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">Cargando productos...</p>
          </div>
          <div className="flex justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          </div>
        </div>
      </section>
    )
  }

  // Si no hay productos, no mostrar la sección
  if (featuredProducts.length === 0) {
    return null
  }

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <motion.h2
            className="mb-4 text-3xl font-bold text-blue-800 md:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Productos Destacados
          </motion.h2>
          <motion.p
            className="mx-auto max-w-2xl text-lg text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Descubre nuestros productos más populares, diseñados para ofrecer el máximo rendimiento y durabilidad
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 gap-10 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {featuredProducts.map((product) => (
            <motion.div
              key={product.id}
              className="group overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:shadow-xl"
              variants={itemVariants}
            >
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              </div>
              <div className="p-6">
                <span className="mb-2 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
                  {product.category}
                </span>
                <h3 className="mb-3 text-xl font-bold text-gray-900">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <Link
                    href={`/productos/${product.slug}`}
                    className="inline-flex items-center font-medium text-blue-600 transition-colors hover:text-blue-800"
                  >
                    Ver detalles
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Link
            href="/productos"
            className="inline-flex items-center rounded-md bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
          >
            Ver todos los productos
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

