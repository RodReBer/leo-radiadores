import Link from "next/link"
import { ChevronRight } from "lucide-react"
import ProductGrid from "@/components/product-grid"
import CategoryFilter from "@/components/category-filter"

export default function ProductosPage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">Nuestros Productos</h1>
          <p className="mx-auto max-w-2xl text-lg">
            Descubre nuestra amplia gama de radiadores y componentes de refrigeración de alta calidad
          </p>
          <nav className="mt-6 flex justify-center">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <Link href="/" className="text-blue-200 hover:text-white">
                  Inicio
                </Link>
              </li>
              <li className="flex items-center space-x-2">
                <ChevronRight className="h-4 w-4" />
                <span>Productos</span>
              </li>
            </ol>
          </nav>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
            {/* Sidebar with Filters */}
            <div className="lg:col-span-1">
              <CategoryFilter />
            </div>

            {/* Product Grid */}
            <div className="lg:col-span-3">
              <ProductGrid />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

