"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Check, PenToolIcon as Tool, Award, Clock, Truck } from "lucide-react"

export default function InteractiveShowcase() {
  const [activeFeature, setActiveFeature] = useState(0)

  const features = [
    {
      id: 1,
      title: "Calidad Premium",
      description:
        "Todos nuestros productos están fabricados con los mejores materiales y pasan por rigurosos controles de calidad.",
      icon: <Award className="h-6 w-6" />,
      image: "/placeholder.svg?height=600&width=800&text=Calidad+Premium",
    },
    {
      id: 2,
      title: "Servicio Técnico Especializado",
      description: "Contamos con técnicos altamente capacitados para brindar asesoramiento y soluciones a medida.",
      icon: <Tool className="h-6 w-6" />,
      image: "/placeholder.svg?height=600&width=800&text=Servicio+Tecnico",
    },
    {
      id: 3,
      title: "Entrega Rápida",
      description: "Realizamos envíos a todo el país con tiempos de entrega optimizados para tu comodidad.",
      icon: <Truck className="h-6 w-6" />,
      image: "/placeholder.svg?height=600&width=800&text=Entrega+Rapida",
    },
    {
      id: 4,
      title: "Disponibilidad Inmediata",
      description: "Amplio stock de productos disponibles para entrega inmediata en todas nuestras sucursales.",
      icon: <Clock className="h-6 w-6" />,
      image: "/placeholder.svg?height=600&width=800&text=Disponibilidad+Inmediata",
    },
  ]

  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">¿Por qué elegir Leo Radiadores?</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Más de 30 años de experiencia nos respaldan como líderes en el mercado de radiadores y sistemas de
            refrigeración.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="relative h-[300px] lg:h-full overflow-hidden rounded-xl bg-white shadow-lg">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="relative h-full w-full"
              >
                <div className="absolute inset-0">
                  <Image
                    src={features[activeFeature].image || "/placeholder.svg"}
                    alt={features[activeFeature].title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="mb-2 text-2xl font-bold text-white">{features[activeFeature].title}</h3>
                  <p className="text-white/90">{features[activeFeature].description}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex flex-col justify-center space-y-4">
            {features.map((feature, index) => (
              <motion.button
                key={feature.id}
                className={`flex items-start rounded-lg border p-4 text-left transition-all ${
                  activeFeature === index
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 bg-white hover:border-blue-200 hover:bg-blue-50/50"
                }`}
                onClick={() => setActiveFeature(index)}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div
                  className={`mr-4 rounded-full p-2 ${
                    activeFeature === index ? "bg-blue-500 text-white" : "bg-blue-100 text-blue-500"
                  }`}
                >
                  {feature.icon}
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
                {activeFeature === index && (
                  <div className="ml-auto">
                    <Check className="h-5 w-5 text-blue-500" />
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

