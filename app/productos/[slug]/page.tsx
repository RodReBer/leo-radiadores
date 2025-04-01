"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronRight, Star, Truck, Shield, ArrowLeft, MessageCircle, ExternalLink, Check } from "lucide-react"
import { useProducts } from "@/contexts/product-context"
import { notFound } from "next/navigation"

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const { getProductBySlug, getRelatedProducts } = useProducts()

  // Obtener el producto según el slug
  const product = getProductBySlug(params.slug)

  // Si no se encuentra el producto, mostrar la página 404
  if (!product) {
    notFound()
  }

  // Obtener productos relacionados
  const relatedProducts = getRelatedProducts(product.id)

  const [mainImage, setMainImage] = useState(product.images[0])
  const [activeTab, setActiveTab] = useState<"description" | "specifications" | "compatibility">("description")

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

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const openWhatsApp = () => {
    const message = encodeURIComponent(
      `Hola, estoy interesado en el producto: ${product.name}. ¿Podrían brindarme más información?`,
    )
    window.open(`https://wa.me/59897349638?text=${message}`, "_blank")
  }

  return (
    <main className="flex min-h-screen flex-col">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center text-sm">
            <Link href="/" className="text-gray-500 hover:text-blue-600">
              Inicio
            </Link>
            <ChevronRight className="mx-2 h-4 w-4 text-gray-400" />
            <Link href="/productos" className="text-gray-500 hover:text-blue-600">
              Productos
            </Link>
            <ChevronRight className="mx-2 h-4 w-4 text-gray-400" />
            <Link
              href={`/productos/categoria/${product.category.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-gray-500 hover:text-blue-600"
            >
              {product.category}
            </Link>
            <ChevronRight className="mx-2 h-4 w-4 text-gray-400" />
            <span className="text-gray-900">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Detail */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Product Images */}
            <motion.div className="space-y-4" initial="hidden" animate="visible" variants={fadeIn}>
              <div className="relative aspect-square overflow-hidden rounded-lg border border-gray-200 bg-white">
                <Image src={mainImage || "/placeholder.svg"} alt={product.name} fill className="object-contain p-4" />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setMainImage(image)}
                    className={`relative aspect-square overflow-hidden rounded-md border ${
                      mainImage === image ? "border-blue-600" : "border-gray-200"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} - Vista ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div className="flex flex-col" initial="hidden" animate="visible" variants={fadeIn}>
              <div className="mb-2 text-sm font-medium text-blue-600">{product.category}</div>
              <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">{product.name}</h1>

              <div className="mb-4 flex items-center">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : i < product.rating
                            ? "fill-yellow-400/50 text-yellow-400"
                            : "fill-gray-200 text-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  {product.rating} ({product.reviewCount} reseñas)
                </span>
              </div>

              <div className="mb-6">
                <p className="text-gray-700">{product.description}</p>
              </div>

              <div className="mb-6 space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Truck className="mr-2 h-5 w-5 text-blue-600" />
                  <span>Envío a todo el país</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Shield className="mr-2 h-5 w-5 text-blue-600" />
                  <span>Garantía de fábrica</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Check className="mr-2 h-5 w-5 text-green-600" />
                  <span className="font-medium text-green-600">
                    {product.inStock ? "En stock - Disponible para entrega inmediata" : "Agotado"}
                  </span>
                </div>
              </div>

              <div className="mb-8 grid grid-cols-2 gap-4">
                <motion.a
                  href="https://www.mercadolibre.com.ar/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Comprar en MercadoLibre
                  <ExternalLink className="ml-2 h-4 w-4" />
                </motion.a>
                <motion.button
                  onClick={openWhatsApp}
                  className="flex items-center justify-center rounded-md border border-blue-600 bg-white px-6 py-3 font-medium text-blue-600 transition-colors hover:bg-blue-50"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Consultar por WhatsApp
                  <MessageCircle className="ml-2 h-4 w-4" />
                </motion.button>
              </div>

              {/* Tabs */}
              <div className="mt-auto rounded-lg border border-gray-200 bg-white">
                <div className="flex border-b border-gray-200">
                  <button
                    onClick={() => setActiveTab("description")}
                    className={`flex-1 px-4 py-3 text-sm font-medium ${
                      activeTab === "description"
                        ? "border-b-2 border-blue-600 text-blue-600"
                        : "text-gray-600 hover:text-blue-600"
                    }`}
                  >
                    Características
                  </button>
                  <button
                    onClick={() => setActiveTab("specifications")}
                    className={`flex-1 px-4 py-3 text-sm font-medium ${
                      activeTab === "specifications"
                        ? "border-b-2 border-blue-600 text-blue-600"
                        : "text-gray-600 hover:text-blue-600"
                    }`}
                  >
                    Especificaciones
                  </button>
                  <button
                    onClick={() => setActiveTab("compatibility")}
                    className={`flex-1 px-4 py-3 text-sm font-medium ${
                      activeTab === "compatibility"
                        ? "border-b-2 border-blue-600 text-blue-600"
                        : "text-gray-600 hover:text-blue-600"
                    }`}
                  >
                    Compatibilidad
                  </button>
                </div>

                <div className="p-4">
                  {activeTab === "description" && (
                    <motion.ul
                      className="space-y-2 pl-5"
                      variants={staggerContainer}
                      initial="hidden"
                      animate="visible"
                    >
                      {product.features.map((feature, index) => (
                        <motion.li key={index} className="flex items-start text-gray-700" variants={fadeIn}>
                          <Check className="mr-2 h-5 w-5 flex-shrink-0 text-green-500" />
                          <span>{feature}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}

                  {activeTab === "specifications" && (
                    <motion.div className="space-y-2" variants={staggerContainer} initial="hidden" animate="visible">
                      {product.specifications.map((spec, index) => (
                        <motion.div
                          key={index}
                          className="flex border-b border-gray-100 py-2 last:border-0"
                          variants={fadeIn}
                        >
                          <span className="w-1/3 font-medium text-gray-900">{spec.name}:</span>
                          <span className="w-2/3 text-gray-700">{spec.value}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}

                  {activeTab === "compatibility" && (
                    <motion.ul
                      className="space-y-2 pl-5"
                      variants={staggerContainer}
                      initial="hidden"
                      animate="visible"
                    >
                      {product.compatibleWith.map((item, index) => (
                        <motion.li key={index} className="flex items-start text-gray-700" variants={fadeIn}>
                          <Check className="mr-2 h-5 w-5 flex-shrink-0 text-green-500" />
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-2xl font-bold text-gray-900">Productos Relacionados</h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {relatedProducts.map((relatedProduct) => (
              <motion.div
                key={relatedProduct.id}
                className="overflow-hidden rounded-lg bg-white shadow-sm transition-all hover:shadow-md"
                whileHover={{ y: -5 }}
              >
                <Link href={`/productos/${relatedProduct.slug}`}>
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={relatedProduct.image || "/placeholder.svg"}
                      alt={relatedProduct.name}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="mb-2 text-lg font-semibold text-gray-900">{relatedProduct.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                        Ver Detalles
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link href="/productos" className="inline-flex items-center text-blue-600 hover:text-blue-800">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a todos los productos
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

