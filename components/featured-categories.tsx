"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

const categories = [
  {
    id: 1,
    name: "Radiadores Agrícolas",
    description: "Soluciones térmicas para el sector agrícola",
    image: "/placeholder.svg?height=600&width=600",
    href: "/productos/categoria/radiadores-agricolas",
    color: "bg-blue-600",
  },
  {
    id: 2,
    name: "Radiadores Industriales",
    description: "Alta eficiencia para aplicaciones industriales",
    image: "/placeholder.svg?height=600&width=600",
    href: "/productos/categoria/radiadores-industriales",
    color: "bg-yellow-500",
  },
  {
    id: 3,
    name: "Bombas de Agua",
    description: "Circulación óptima del refrigerante",
    image: "/placeholder.svg?height=600&width=600",
    href: "/productos/categoria/bombas-de-agua",
    color: "bg-green-600",
  },
]

export default function FeaturedCategories() {
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-blue-800 md:text-4xl">Categorías Destacadas</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Descubre nuestra selección de productos especializados para cada necesidad
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              className="group overflow-hidden rounded-lg bg-white shadow-lg transition-all hover:shadow-xl"
            >
              <Link href={category.href} className="block">
                <div className="relative">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                    <h3 className="mb-1 text-xl font-bold">{category.name}</h3>
                    <p className="text-sm text-white/80">{category.description}</p>
                  </div>
                  <div className={`absolute left-4 top-4 h-2 w-10 ${category.color} rounded-full`}></div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

