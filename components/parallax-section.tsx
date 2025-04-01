"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export default function ParallaxSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.95,
    },
  }

  return (
    <section ref={ref} className="relative flex h-[100vh] items-center justify-center overflow-hidden bg-black">
      <motion.div className="absolute inset-0 z-0" style={{ y, opacity }}>
        <Image
          src="https://static.tingelmar.com/app/uy/negocios/g/79/55379/g55379-sm-0-2-0-1195171846.jpg"
          alt="Radiadores de alta calidad"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-800/60"></div>
      </motion.div>

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          className="mx-auto max-w-3xl text-center text-white"
          initial="hidden"
          animate="visible"
          variants={textVariants}
        >
          <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            Soluciones Térmicas de <span className="text-yellow-400">Excelencia</span> para el Sector Agrícola e
            Industrial
          </h1>
          <p className="mb-8 text-lg md:text-xl">
            Más de 20 años fabricando radiadores de alta calidad que garantizan el máximo rendimiento de tu maquinaria
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
              <Link
                href="/productos"
                className="inline-flex items-center justify-center rounded-md bg-yellow-500 px-6 py-3 font-medium text-blue-900 transition-colors hover:bg-yellow-400"
              >
                Ver Productos
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center rounded-md border border-white bg-transparent px-6 py-3 font-medium text-white transition-colors hover:bg-white/10"
              >
                Contactar
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  )
}

