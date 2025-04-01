"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"

export default function CategoryShowcase() {
  const categories = [
    {
      name: "Radiadores Agrícolas",
      slug: "radiadores-agricolas",
      description: "Soluciones de refrigeración para todo tipo de maquinaria agrícola",
      image: "/placeholder.svg?height=400&width=400&text=Radiadores+Agricolas",
      color: "from-green-500 to-green-700",
    },
    {
      name: "Radiadores Industriales",
      slug: "radiadores-industriales",
      description: "Alta eficiencia para aplicaciones industriales exigentes",
      image: "/placeholder.svg?height=400&width=400&text=Radiadores+Industriales",
      color: "from-blue-500 to-blue-700",
    },
    {
      name: "Bombas de Agua",
      slug: "bombas-de-agua",
      description: "Circulación óptima para sistemas de refrigeración",
      image: "/placeholder.svg?height=400&width=400&text=Bombas+de+Agua",
      color: "from-cyan-500 to-cyan-700",
    },
    {
      name: "Electroventiladores",
      slug: "electroventiladores",
      description: "Ventilación eficiente para todo tipo de radiadores",
      image: "/placeholder.svg?height=400&width=400&text=Electroventiladores",
      color: "from-purple-500 to-purple-700",
    },
    {
      name: "Calefacciones",
      slug: "calefacciones",
      description: "Confort térmico para cabinas y espacios de trabajo",
      image: "/placeholder.svg?height=400&width=400&text=Calefacciones",
      color: "from-red-500 to-red-700",
    },
    {
      name: "Depósitos de Agua",
      slug: "depositos-de-agua",
      description: "Almacenamiento seguro para líquidos refrigerantes",
      image: "/placeholder.svg?height=400&width=400&text=Depositos+de+Agua",
      color: "from-teal-500 to-teal-700",
    },
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">Nuestras Categorías</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Explora nuestra amplia gama de productos para sistemas de refrigeración y calefacción
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <motion.div
              key={category.slug}
              className="group overflow-hidden rounded-xl shadow-lg"
              whileHover={{ y: -10 }}
            >
              <Link href={`/productos/categoria/${category.slug}`} className="block h-full">
                <div className="relative">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-80`}></div>
                  </div>
                  <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                    <h3 className="mb-2 text-2xl font-bold">{category.name}</h3>
                    <p className="mb-4 text-white/90">{category.description}</p>
                    <div className="flex items-center text-sm font-medium">
                      <span>Ver productos</span>
                      <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

