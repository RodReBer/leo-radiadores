"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const promos = [
  {
    id: 1,
    title: "Radiadores de alta eficiencia",
    description: "Diseñados para maximizar el rendimiento de tu maquinaria",
    cta: "Descubrir",
    link: "/productos/categoria/radiadores-agricolas",
    color: "from-blue-600 to-blue-800",
  },
  {
    id: 2,
    title: "Servicio técnico especializado",
    description: "Reparación y mantenimiento con garantía de fábrica",
    cta: "Contactar",
    link: "/contacto",
    color: "from-yellow-500 to-yellow-600",
  },
  {
    id: 3,
    title: "Envíos  el país",
    description: "Recibe tus productos donde los necesites",
    cta: "Ver productos",
    link: "/productos",
    color: "from-green-600 to-green-800",
  },
]

export default function PromoBanner() {
  const [currentPromo, setCurrentPromo] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPromo((prev) => (prev + 1) % promos.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-gray-100 py-3">
      <div className="container mx-auto px-4 ">
        <div className="relative h-20 sm:h-16 md:h-12 overflow-hidden ">
          <AnimatePresence mode="wait">
            <motion.div
              key={promos[currentPromo].id}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className={`absolute inset-0 flex items-center justify-between rounded-lg bg-gradient-to-r ${promos[currentPromo].color} px-6 text-white`}
            >
              <div className="flex items-center">
                <div>
                  <h3 className="text-sm font-bold md:text-base">{promos[currentPromo].title}</h3>
                  <p className="text-xs text-white/80 md:text-sm">{promos[currentPromo].description}</p>
                </div>
              </div>
              <Link
                href={promos[currentPromo].link}
                className="flex items-center text-xs font-medium text-white hover:underline md:text-sm"
              >
                {promos[currentPromo].cta}
                <ArrowRight className="ml-1 h-3 w-3 md:h-4 md:w-4" />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

