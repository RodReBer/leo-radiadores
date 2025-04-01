"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

const categories = [
  {
    id: 1,
    name: "Abrazaderas",
    image: "/placeholder.svg?height=300&width=300",
    href: "/productos/categoria/abrazaderas",
  },
  {
    id: 2,
    name: "Bombas de Agua",
    image: "/placeholder.svg?height=300&width=300",
    href: "/productos/categoria/bombas-de-agua",
  },
  {
    id: 3,
    name: "Calefacciones",
    image: "/placeholder.svg?height=300&width=300",
    href: "/productos/categoria/calefacciones",
  },
  {
    id: 4,
    name: "Depósitos de Agua",
    image: "/placeholder.svg?height=300&width=300",
    href: "/productos/categoria/depositos-de-agua",
  },
  {
    id: 5,
    name: "Electroventiladores",
    image: "/placeholder.svg?height=300&width=300",
    href: "/productos/categoria/electroventiladores",
  },
]

export default function CategorySection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
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
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-4 text-3xl font-bold text-blue-800 md:text-4xl">Categorías de Productos</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Explore nuestra amplia gama de productos para sistemas de refrigeración
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {categories.map((category) => (
            <motion.div key={category.id} variants={itemVariants} whileHover={{ y: -10 }} className="h-full">
              <Link
                href={category.href}
                className="group flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                </div>
                <div className="flex flex-1 items-center justify-center p-4">
                  <h3 className="text-lg font-semibold text-blue-800 group-hover:text-blue-600">{category.name}</h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

