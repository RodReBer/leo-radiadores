"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import Link from "next/link"

export default function FloatingPromo() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    // Comprobar si ya se ha cerrado antes
    const dismissed = localStorage.getItem("promoDissmissed")
    if (dismissed) {
      setIsDismissed(true)
      return
    }

    // Mostrar después de 3 segundos
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    // Guardar en localStorage para no mostrar de nuevo en esta sesión
    localStorage.setItem("promoDissmissed", "true")
    setIsDismissed(true)
  }

  if (isDismissed) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-6 left-6 z-40 max-w-sm overflow-hidden rounded-lg bg-white shadow-2xl"
        >
          <div className="relative">
            <button
              onClick={handleDismiss}
              className="absolute right-2 top-2 rounded-full bg-gray-200 p-1 text-gray-600 hover:bg-gray-300"
              aria-label="Cerrar promoción"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-1"></div>
            <div className="p-4">
              <h3 className="mb-1 text-lg font-bold text-blue-800">¡Oferta especial!</h3>
              <p className="mb-3 text-sm text-gray-600">
                Consulta por nuestros servicios de reparación y mantenimiento con descuentos exclusivos.
              </p>
              <Link
                href="/contacto"
                className="inline-block rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Más información
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

