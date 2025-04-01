"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ChevronDown, Settings } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"

const navigation = [
  { name: "Inicio", href: "/" },
  { name: "Empresa", href: "/#empresa" },
  {
    name: "Productos",
    href: "/productos",
    submenu: [
      { name: "Abrazaderas", href: "/productos/categoria/abrazaderas" },
      { name: "Bombas de Agua", href: "/productos/categoria/bombas-de-agua" },
      { name: "Calefacciones", href: "/productos/categoria/calefacciones" },
      { name: "Depósitos de Agua", href: "/productos/categoria/depositos-de-agua" },
      { name: "Electroventiladores", href: "/productos/categoria/electroventiladores" },
    ],
  },
  { name: "Radiadores Agrícolas", href: "/radiadores-agricolas" },
  { name: "Contacto", href: "/contacto" },
]

export default function Header() {
  const { user } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    // Inicializar el estado de scroll
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleSubmenu = (name: string) => {
    if (activeSubmenu === name) {
      setActiveSubmenu(null)
    } else {
      setActiveSubmenu(name)
    }
  }

  // Determinar el estilo del header basado en la página y el scroll
  const headerBgClass = scrolled
    ? "bg-white shadow-md fixed"
    : isHomePage
      ? "bg-transparent fixed  "
      : "bg-blue-900 fixed "

  // Determinar el color del texto basado en el scroll y la página
  const textColorClass = scrolled ? "text-gray-900 hover:text-blue-600" : "text-white hover:text-black"

  return (
    <header className={` ${headerBgClass} w-full top-0 z-50 transition-all duration-300 `}>
      <nav className="container mx-auto flex items-center justify-between p-4">
        <motion.div
          className="flex lg:flex-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Leo Radiadores</span>
            <div className="flex items-center">
              <div className="relative h-12 w-36">
                <Image src="/images/logo.png" alt="Leo Radiadores" fill className="object-contain" priority />
              </div>
            </div>
          </Link>
        </motion.div>

        <div className="flex lg:hidden">
          <button
            type="button"
            className={`-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 ${scrolled ? "text-gray-700" : "text-white"}`}
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Abrir menú</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <div key={item.name} className="relative">
              {item.submenu ? (
                <>
                  <button
                    className={`flex items-center text-sm font-semibold leading-6 ${textColorClass} transition-colors`}
                    onClick={() => toggleSubmenu(item.name)}
                  >
                    {item.name}
                    <ChevronDown
                      className={`ml-1 h-4 w-4 transition-transform ${activeSubmenu === item.name ? "rotate-180" : ""}`}
                    />
                  </button>
                  {activeSubmenu === item.name && (
                    <div className="absolute left-0 mt-2 w-56 rounded-md bg-white p-2 shadow-lg">
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.name}
                          href={subitem.href}
                          className="block rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                        >
                          {subitem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  className={`text-sm font-semibold leading-6 ${textColorClass} transition-colors`}
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          {user && user.isAdmin && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/admin/dashboard"
                className="inline-flex items-center rounded-md bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-800 shadow-sm transition-colors hover:bg-gray-300"
              >
                <Settings className="mr-2 h-4 w-4" />
                Panel Admin
              </Link>
            </motion.div>
          )}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/contacto"
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
            >
              Solicitar Presupuesto
            </Link>
          </motion.div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-white"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="fixed inset-0 flex">
              <div className="relative flex w-full max-w-sm flex-1 flex-col bg-white pb-4 pt-5">
                <div className="flex items-center justify-between px-4">
                  <div className="flex items-center">
                    <div className="relative h-10 w-28">
                      <Image src="/images/logo.png" alt="Leo Radiadores" fill className="object-contain" priority />
                    </div>
                  </div>
                  <button
                    type="button"
                    className="-m-2.5 rounded-md p-2.5 text-gray-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="sr-only">Cerrar menú</span>
                    <X className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-6 flow-root">
                  <div className="-my-6 divide-y divide-gray-200">
                    <div className="space-y-2 py-6 px-4">
                      {navigation.map((item) => (
                        <div key={item.name}>
                          {item.submenu ? (
                            <>
                              <button
                                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                onClick={() => toggleSubmenu(item.name)}
                              >
                                {item.name}
                                <ChevronDown
                                  className={`h-5 w-5 transition-transform ${activeSubmenu === item.name ? "rotate-180" : ""}`}
                                />
                              </button>
                              <AnimatePresence>
                                {activeSubmenu === item.name && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden pl-4"
                                  >
                                    {item.submenu.map((subitem) => (
                                      <Link
                                        key={subitem.name}
                                        href={subitem.href}
                                        className="block rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                                        onClick={() => setMobileMenuOpen(false)}
                                      >
                                        {subitem.name}
                                      </Link>
                                    ))}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </>
                          ) : (
                            <Link
                              href={item.href}
                              className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {item.name}
                            </Link>
                          )}
                        </div>
                      ))}

                      {user && user.isAdmin && (
                        <Link
                          href="/admin/dashboard"
                          className="flex items-center rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Settings className="mr-2 h-5 w-5" />
                          Panel Admin
                        </Link>
                      )}
                    </div>
                    <div className="py-6 px-4">
                      <Link
                        href="/contacto"
                        className="block w-full rounded-md bg-blue-600 px-4 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Solicitar Presupuesto
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

