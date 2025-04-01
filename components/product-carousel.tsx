"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useProducts } from "@/contexts/product-context"

export default function ProductCarousel() {
  const { products, loading } = useProducts()

  // Seleccionar 4 productos para el carrusel
  const carouselProducts = products.slice(0, 4)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const [direction, setDirection] = useState(0)
  const autoplayRef = useRef(autoplay)

  useEffect(() => {
    autoplayRef.current = autoplay
  }, [autoplay])

  useEffect(() => {
    let interval: NodeJS.Timeout

    const startAutoplay = () => {
      interval = setInterval(() => {
        if (autoplayRef.current && carouselProducts.length > 1) {
          nextSlide()
        }
      }, 5000)
    }

    if (autoplay && carouselProducts.length > 1) {
      startAutoplay()
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [carouselProducts.length])

  // Si no hay productos o están cargando, mostrar un placeholder o nada
  if (loading) {
    return (
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <h2 className="mb-4 text-3xl font-bold text-blue-800 md:text-4xl">Nuestros Productos Destacados</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">Cargando productos...</p>
          </div>
          <div className="flex justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          </div>
        </div>
      </section>
    )
  }

  // Si no hay productos después de cargar, no mostrar el carrusel
  if (carouselProducts.length === 0) {
    return null
  }

  // Asegurarse de que currentIndex sea válido
  const safeIndex = Math.min(currentIndex, carouselProducts.length - 1)

  const nextSlide = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselProducts.length)
  }

  const prevSlide = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + carouselProducts.length) % carouselProducts.length)
  }

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
      }
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
      }
    },
  }

  const currentProduct = carouselProducts[safeIndex]

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-4 text-3xl font-bold text-blue-800 md:text-4xl">Nuestros Productos Destacados</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Descubre nuestra selección de radiadores de alta calidad diseñados para maximizar el rendimiento de tu
            maquinaria
          </p>
        </motion.div>

        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-xl bg-white shadow-lg">
          <div className="relative h-full w-full">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={safeIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="absolute inset-0 w-full"
              >
                <div className="grid h-full grid-cols-1 md:grid-cols-2">
                  <div className="relative h-64 w-full md:h-96">
                    <Image
                      src={currentProduct.image || "/placeholder.svg"}
                      alt={currentProduct.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center p-6 md:p-10">
                    <h3 className="mb-3 text-2xl font-bold text-blue-800 md:text-3xl">{currentProduct.name}</h3>
                    <div className="mb-3 flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(currentProduct.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : i < currentProduct.rating
                                ? "fill-yellow-400/50 text-yellow-400"
                                : "fill-gray-200 text-gray-200"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">({currentProduct.rating})</span>
                    </div>
                    <p className="mb-6 text-gray-600">{currentProduct.description.substring(0, 120)}...</p>
                    <ul className="mb-6 space-y-2">
                      <li className="flex items-center">
                        <span className="mr-2 h-2 w-2 rounded-full bg-blue-600"></span>
                        <span>Máxima eficiencia térmica</span>
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 h-2 w-2 rounded-full bg-blue-600"></span>
                        <span>Materiales de primera calidad</span>
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 h-2 w-2 rounded-full bg-blue-600"></span>
                        <span>Resistente a la corrosión</span>
                      </li>
                    </ul>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link
                        href={`/productos/${currentProduct.slug}`}
                        className="mt-auto inline-block rounded-md bg-yellow-500 px-6 py-3 font-medium text-blue-900 transition-colors hover:bg-yellow-400"
                      >
                        Ver Detalles
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {carouselProducts.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-blue-800 shadow-md transition-all hover:bg-white"
                aria-label="Anterior producto"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-blue-800 shadow-md transition-all hover:bg-white"
                aria-label="Siguiente producto"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                {carouselProducts.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(index > safeIndex ? 1 : -1)
                      setCurrentIndex(index)
                    }}
                    className={`h-2.5 w-2.5 rounded-full ${index === safeIndex ? "bg-blue-600" : "bg-gray-300"}`}
                    aria-label={`Ir al producto ${index + 1}`}
                  ></button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

