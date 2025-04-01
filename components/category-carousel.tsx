"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import { useProducts } from "@/contexts/product-context"

interface CategoryCarouselProps {
  categoryName: string
  categorySlug: string
  limit?: number
  backgroundColor?: string
  textColor?: string
  accentColor?: string
}

export default function CategoryCarousel({
  categoryName,
  categorySlug,
  limit = 6,
  backgroundColor = "bg-white",
  textColor = "text-blue-800",
  accentColor = "bg-blue-600",
}: CategoryCarouselProps) {
  const { products, loading } = useProducts()
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerPage = 4 // Número de productos visibles a la vez

  // Filtrar productos por categoría
  const categoryProducts = products
    .filter((product) => product.category.toLowerCase() === categoryName.toLowerCase())
    .slice(0, limit)

  // Si no hay productos o están cargando, no mostrar nada
  if (loading || categoryProducts.length === 0) {
    return null
  }

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + itemsPerPage, categoryProducts.length - itemsPerPage))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - itemsPerPage, 0))
  }

  const canGoNext = currentIndex < categoryProducts.length - itemsPerPage
  const canGoPrev = currentIndex > 0

  return (
    <div className={`py-10 ${backgroundColor}`}>
      <div className="container mx-auto px-4">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className={`text-2xl font-bold ${textColor}`}>{categoryName}</h2>
            <div className={`mt-1 h-1 w-20 ${accentColor} rounded-full`}></div>
          </div>
          <Link
            href={`/productos/categoria/${categorySlug}`}
            className={`text-sm font-medium ${textColor} hover:underline`}
          >
            Ver todos
          </Link>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <motion.div
              className="flex"
              initial={{ x: 0 }}
              animate={{ x: `-${currentIndex * (100 / itemsPerPage)}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {categoryProducts.map((product) => (
                <div key={product.id} className="w-full shrink-0 px-2 sm:w-1/2 md:w-1/3 lg:w-1/4">
                  <motion.div
                    whileHover={{ y: -10 }}
                    className="h-full overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg"
                  >
                    <Link href={`/productos/${product.slug}`} className="flex h-full flex-col">
                      <div className="relative aspect-square overflow-hidden">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-300 hover:scale-105"
                        />
                        {!product.inStock && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                            <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-medium text-white">
                              Agotado
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-1 flex-col p-4">
                        <h3 className="mb-2 min-h-[3rem] text-lg font-semibold text-gray-900 line-clamp-2">
                          {product.name}
                        </h3>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(product.rating)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : i < product.rating
                                      ? "fill-yellow-400/50 text-yellow-400"
                                      : "fill-gray-200 text-gray-200"
                                }`}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-xs text-gray-500">({product.reviewCount})</span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>

          {categoryProducts.length > itemsPerPage && (
            <>
              <button
                onClick={prevSlide}
                disabled={!canGoPrev}
                className={`absolute left-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-blue-800 shadow-md transition-all hover:bg-white ${
                  !canGoPrev ? "cursor-not-allowed opacity-50" : ""
                }`}
                aria-label="Productos anteriores"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <button
                onClick={nextSlide}
                disabled={!canGoNext}
                className={`absolute right-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-blue-800 shadow-md transition-all hover:bg-white ${
                  !canGoNext ? "cursor-not-allowed opacity-50" : ""
                }`}
                aria-label="Productos siguientes"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

