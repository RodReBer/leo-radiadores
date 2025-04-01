"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { products as initialProducts } from "@/data/products"

// Tipos
export type ProductImage = string

export type ProductSpecification = {
  name: string
  value: string
}

export type Product = {
  id: number
  name: string
  slug: string
  category: string
  price: number
  oldPrice?: number
  rating: number
  reviewCount: number
  description: string
  image: string
  images: ProductImage[]
  inStock: boolean
  features: string[]
  specifications: ProductSpecification[]
  compatibleWith: string[]
}

type ProductContextType = {
  products: Product[]
  loading: boolean
  error: string | null
  addProduct: (product: Omit<Product, "id" | "slug">) => Promise<void>
  updateProduct: (id: number, product: Partial<Product>) => Promise<void>
  deleteProduct: (id: number) => Promise<void>
  getProductBySlug: (slug: string) => Product | undefined
  getRelatedProducts: (currentProductId: number, limit?: number) => Product[]
}

// Valores por defecto
const defaultProductContext: ProductContextType = {
  products: [],
  loading: true,
  error: null,
  addProduct: async () => {},
  updateProduct: async () => {},
  deleteProduct: async () => {},
  getProductBySlug: () => undefined,
  getRelatedProducts: () => [],
}

// Crear el contexto
const ProductContext = createContext<ProductContextType>(defaultProductContext)

// Hook personalizado para usar el contexto
export const useProducts = () => useContext(ProductContext)

// Función para generar un slug a partir del nombre
const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^\w\s]/gi, "")
    .replace(/\s+/g, "-")
}

// Proveedor del contexto
export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Cargar productos al iniciar
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Aquí se implementaría la carga desde Firebase
        // Por ahora usamos los datos locales
        setProducts(initialProducts)
      } catch (err) {
        setError("Error al cargar los productos")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Función para añadir un producto
  const addProduct = async (productData: Omit<Product, "id" | "slug">) => {
    try {
      setLoading(true)

      // Generar un ID único (en Firebase esto sería automático)
      const newId = Math.max(...products.map((p) => p.id), 0) + 1

      // Generar slug a partir del nombre
      const slug = generateSlug(productData.name)

      const newProduct: Product = {
        ...productData,
        id: newId,
        slug,
      }

      // Aquí se implementaría la adición a Firebase
      setProducts((prevProducts) => [...prevProducts, newProduct])

      return Promise.resolve()
    } catch (err) {
      setError("Error al añadir el producto")
      console.error(err)
      return Promise.reject(err)
    } finally {
      setLoading(false)
    }
  }

  // Función para actualizar un producto
  const updateProduct = async (id: number, productData: Partial<Product>) => {
    try {
      setLoading(true)

      // Actualizar slug si se cambió el nombre
      const updatedData = { ...productData }
      if (productData.name) {
        updatedData.slug = generateSlug(productData.name)
      }

      // Aquí se implementaría la actualización en Firebase
      setProducts((prevProducts) =>
        prevProducts.map((product) => (product.id === id ? { ...product, ...updatedData } : product)),
      )

      return Promise.resolve()
    } catch (err) {
      setError("Error al actualizar el producto")
      console.error(err)
      return Promise.reject(err)
    } finally {
      setLoading(false)
    }
  }

  // Función para eliminar un producto
  const deleteProduct = async (id: number) => {
    try {
      setLoading(true)

      // Aquí se implementaría la eliminación en Firebase
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id))

      return Promise.resolve()
    } catch (err) {
      setError("Error al eliminar el producto")
      console.error(err)
      return Promise.reject(err)
    } finally {
      setLoading(false)
    }
  }

  // Función para obtener un producto por su slug
  const getProductBySlug = (slug: string) => {
    // Añadir log para depuración
    console.log("Buscando producto con slug:", slug)
    console.log(
      "Productos disponibles:",
      products.map((p) => p.slug),
    )

    return products.find((product) => product.slug === slug)
  }

  // Función para obtener productos relacionados
  const getRelatedProducts = (currentProductId: number, limit = 3) => {
    return products.filter((product) => product.id !== currentProductId).slice(0, limit)
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductBySlug,
        getRelatedProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

