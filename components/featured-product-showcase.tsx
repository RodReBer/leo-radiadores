"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, ChevronLeft, Star } from "lucide-react"
import { useProducts } from "@/contexts/product-context"

export default function FeaturedProductShowcase() {
  const { products, loading } = useProducts()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [featuredProducts, setFeaturedProducts] = useState([])

  const [autoplay, setAutoplay] = useState(true)
  const autoplayRef = useRef(autoplay)
  const intervalTime = 5000 // 5 seconds between slides

  // Update ref when autoplay changes
  useEffect(() => {
    autoplayRef.current = autoplay
  }, [autoplay])

  // Seleccionar productos destacados (los que tienen rating más alto)
  useEffect(() => {
    if (products && products.length > 0) {
      const sortedProducts = [...products].sort((a, b) => b.rating - a.rating).slice(0, 6)
      setFeaturedProducts(sortedProducts)
    }
  }, [products])

  // Set up autoplay timer
  useEffect(() => {
    const interval = setInterval(() => {
      if (autoplayRef.current && featuredProducts.length > 1) {
        setCurrentIndex((prev) => (prev + 1) % featuredProducts.length)
      }
    }, intervalTime)

    return () => clearInterval(interval)
  }, [featuredProducts.length])

  if (loading || featuredProducts.length === 0) {
    return null
  }

  const nextProduct = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredProducts.length)
  }

  const prevProduct = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length)
  }

  const currentProduct = featuredProducts[currentIndex]

  return (
    <section
      className="bg-blue-900 py-16 text-white"
      onMouseEnter={() => setAutoplay(false)}
      onMouseLeave={() => setAutoplay(true)}
    >
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Productos Destacados</h2>
          <p className="mx-auto max-w-2xl text-lg text-blue-100">
            Descubre nuestros productos mejor valorados por nuestros clientes
          </p>
        </div>

        <div className="relative mx-auto max-w-5xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid gap-8 md:grid-cols-2"
            >
              <div className="relative aspect-square overflow-hidden rounded-xl">
                <Image
                  src={currentProduct.image || "/placeholder.svg"}
                  alt={currentProduct.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <div className="mb-2 flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(currentProduct.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : i < currentProduct.rating
                            ? "fill-yellow-400/50 text-yellow-400"
                            : "fill-gray-600 text-gray-600"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm">({currentProduct.reviewCount} reseñas)</span>
                </div>
                <h3 className="mb-4 text-3xl font-bold">{currentProduct.name}</h3>
                <p className="mb-6 text-blue-100">{currentProduct.description}</p>

                <h4 className="mb-2 text-xl font-semibold">Características:</h4>
                <ul className="mb-6 space-y-2">
                  {currentProduct.features.slice(0, 3).map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2 mt-1 h-2 w-2 rounded-full bg-yellow-400"></span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href={`/productos/${currentProduct.slug}`}
                    className="inline-block rounded-md bg-yellow-500 px-6 py-3 font-medium text-blue-900 transition-colors hover:bg-yellow-400"
                  >
                    Ver Detalles
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex justify-center space-x-2">
            {featuredProducts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-3 w-3 rounded-full transition-all ${
                  index === currentIndex ? "bg-yellow-400 scale-125" : "bg-blue-400"
                }`}
                aria-label={`Ver producto ${index + 1}`}
              ></button>
            ))}
          </div>

          <button
            onClick={prevProduct}
            className="absolute left-0 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20"
            aria-label="Producto anterior"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={nextProduct}
            className="absolute right-0 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20"
            aria-label="Producto siguiente"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </section>
  )
}

