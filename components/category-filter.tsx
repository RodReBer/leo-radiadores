"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, Search } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const categories = [
  {
    name: "Radiadores",
    count: 24,
    subcategories: [
      { name: "Radiadores Agrícolas", count: 12, href: "/productos/categoria/radiadores-agricolas" },
      { name: "Radiadores Industriales", count: 8, href: "/productos/categoria/radiadores-industriales" },
      { name: "Radiadores Automotrices", count: 4, href: "/productos/categoria/radiadores-automotrices" },
    ],
    href: "/productos/categoria/radiadores",
  },
  {
    name: "Abrazaderas",
    count: 15,
    href: "/productos/categoria/abrazaderas",
  },
  {
    name: "Bombas de Agua",
    count: 18,
    href: "/productos/categoria/bombas-de-agua",
  },
  {
    name: "Calefacciones",
    count: 10,
    href: "/productos/categoria/calefacciones",
  },
  {
    name: "Depósitos de Agua",
    count: 12,
    href: "/productos/categoria/depositos-de-agua",
  },
  {
    name: "Electroventiladores",
    count: 20,
    href: "/productos/categoria/electroventiladores",
  },
]

export default function CategoryFilter() {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryName) ? prev.filter((name) => name !== categoryName) : [...prev, categoryName],
    )
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-bold text-gray-900">Categorías</h2>

      {/* Search */}
      <div className="mb-6 flex items-center rounded-md border border-gray-300 bg-white">
        <input
          type="text"
          placeholder="Buscar productos..."
          className="w-full rounded-md border-0 bg-transparent px-4 py-2 text-sm focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="px-3 text-gray-400">
          <Search className="h-4 w-4" />
        </button>
      </div>

      {/* Categories */}
      <div className="space-y-2">
        {categories.map((category) => (
          <div key={category.name} className="border-b border-gray-100 pb-2">
            <div className="flex items-center justify-between">
              <Link href={category.href} className="text-sm font-medium text-gray-700 hover:text-blue-600">
                {category.name} <span className="text-xs text-gray-400">({category.count})</span>
              </Link>
              {category.subcategories && (
                <button onClick={() => toggleCategory(category.name)} className="text-gray-400 hover:text-gray-600">
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      expandedCategories.includes(category.name) ? "rotate-180" : ""
                    }`}
                  />
                </button>
              )}
            </div>

            {/* Subcategories */}
            {category.subcategories && (
              <AnimatePresence>
                {expandedCategories.includes(category.name) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-2 overflow-hidden pl-4"
                  >
                    <ul className="space-y-1">
                      {category.subcategories.map((subcategory) => (
                        <li key={subcategory.name}>
                          <Link href={subcategory.href} className="text-xs text-gray-600 hover:text-blue-600">
                            {subcategory.name} <span className="text-gray-400">({subcategory.count})</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

