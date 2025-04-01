"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useProducts } from "@/contexts/product-context"
import ProtectedRoute from "@/components/protected-route"
import { ArrowLeft, Plus, X } from "lucide-react"
import Link from "next/link"

export default function NewProductPage() {
  const { addProduct } = useProducts()
  const router = useRouter()

  // Estado para el formulario
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    oldPrice: "",
    rating: "5",
    reviewCount: "0",
    description: "",
    image: "/placeholder.svg?height=400&width=400",
    inStock: true,
  })

  // Estados para arrays
  const [images, setImages] = useState<string[]>(["/placeholder.svg?height=600&width=600"])
  const [features, setFeatures] = useState<string[]>([""])
  const [specifications, setSpecifications] = useState<{ name: string; value: string }[]>([{ name: "", value: "" }])
  const [compatibleWith, setCompatibleWith] = useState<string[]>([""])

  // Estado para errores
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // Manejar cambios en el formulario principal
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target

    if (type === "checkbox") {
      const target = e.target as HTMLInputElement
      setFormData({
        ...formData,
        [name]: target.checked,
      })
    } else if (name === "price" || name === "oldPrice") {
      // Solo permitir números para precios
      const numericValue = value.replace(/[^0-9]/g, "")
      setFormData({
        ...formData,
        [name]: numericValue,
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  // Manejar cambios en arrays simples
  const handleArrayChange = (
    index: number,
    value: string,
    array: string[],
    setArray: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    const newArray = [...array]
    newArray[index] = value
    setArray(newArray)
  }

  // Añadir elemento a un array simple
  const handleAddArrayItem = (array: string[], setArray: React.Dispatch<React.SetStateAction<string[]>>) => {
    setArray([...array, ""])
  }

  // Eliminar elemento de un array simple
  const handleRemoveArrayItem = (
    index: number,
    array: string[],
    setArray: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    if (array.length > 1) {
      const newArray = [...array]
      newArray.splice(index, 1)
      setArray(newArray)
    }
  }

  // Manejar cambios en especificaciones
  const handleSpecificationChange = (index: number, field: "name" | "value", value: string) => {
    const newSpecifications = [...specifications]
    newSpecifications[index][field] = value
    setSpecifications(newSpecifications)
  }

  // Añadir especificación
  const handleAddSpecification = () => {
    setSpecifications([...specifications, { name: "", value: "" }])
  }

  // Eliminar especificación
  const handleRemoveSpecification = (index: number) => {
    if (specifications.length > 1) {
      const newSpecifications = [...specifications]
      newSpecifications.splice(index, 1)
      setSpecifications(newSpecifications)
    }
  }

  // Enviar formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      // Validar campos requeridos
      if (!formData.name || !formData.category || !formData.price || !formData.description) {
        throw new Error("Por favor completa todos los campos requeridos")
      }

      // Filtrar arrays para eliminar elementos vacíos
      const filteredImages = images.filter((img) => img.trim() !== "")
      const filteredFeatures = features.filter((feature) => feature.trim() !== "")
      const filteredSpecifications = specifications.filter(
        (spec) => spec.name.trim() !== "" && spec.value.trim() !== "",
      )
      const filteredCompatibleWith = compatibleWith.filter((item) => item.trim() !== "")

      // Validar que haya al menos una imagen, característica, etc.
      if (filteredImages.length === 0) {
        throw new Error("Debes agregar al menos una imagen")
      }
      if (filteredFeatures.length === 0) {
        throw new Error("Debes agregar al menos una característica")
      }
      if (filteredSpecifications.length === 0) {
        throw new Error("Debes agregar al menos una especificación")
      }
      if (filteredCompatibleWith.length === 0) {
        throw new Error("Debes agregar al menos un elemento de compatibilidad")
      }

      // Crear objeto de producto
      const newProduct = {
        name: formData.name,
        category: formData.category,
        price: Number.parseInt(formData.price),
        oldPrice: formData.oldPrice ? Number.parseInt(formData.oldPrice) : undefined,
        rating: Number.parseFloat(formData.rating),
        reviewCount: Number.parseInt(formData.reviewCount),
        description: formData.description,
        image: formData.image,
        images: filteredImages,
        inStock: formData.inStock,
        features: filteredFeatures,
        specifications: filteredSpecifications,
        compatibleWith: filteredCompatibleWith,
      }

      // Añadir producto
      await addProduct(newProduct)

      // Redirigir al dashboard
      router.push("/admin/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al crear el producto")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gray-50 pb-12 pt-24">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin/dashboard" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Volver al Dashboard
              </Link>
              <h1 className="text-2xl font-bold text-blue-800">Nuevo Producto</h1>
            </div>
          </div>

          {error && (
            <div className="mb-6 rounded-md bg-red-50 p-4 text-red-700">
              <p>{error}</p>
            </div>
          )}

          <div className="rounded-lg bg-white p-6 shadow-md">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Información básica */}
                <div>
                  <h2 className="mb-4 text-lg font-medium text-gray-900">Información básica</h2>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Nombre del producto *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                        Categoría *
                      </label>
                      <input
                        type="text"
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                        Precio *
                      </label>
                      <div className="relative mt-1 rounded-md shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <span className="text-gray-500">$</span>
                        </div>
                        <input
                          type="text"
                          id="price"
                          name="price"
                          value={formData.price}
                          onChange={handleChange}
                          required
                          className="block w-full rounded-md border border-gray-300 pl-7 pr-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="oldPrice" className="block text-sm font-medium text-gray-700">
                        Precio anterior (opcional)
                      </label>
                      <div className="relative mt-1 rounded-md shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <span className="text-gray-500">$</span>
                        </div>
                        <input
                          type="text"
                          id="oldPrice"
                          name="oldPrice"
                          value={formData.oldPrice}
                          onChange={handleChange}
                          className="block w-full rounded-md border border-gray-300 pl-7 pr-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-1/2">
                        <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                          Calificación
                        </label>
                        <select
                          id="rating"
                          name="rating"
                          value={formData.rating}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                        >
                          <option value="5">5 estrellas</option>
                          <option value="4.5">4.5 estrellas</option>
                          <option value="4">4 estrellas</option>
                          <option value="3.5">3.5 estrellas</option>
                          <option value="3">3 estrellas</option>
                          <option value="2.5">2.5 estrellas</option>
                          <option value="2">2 estrellas</option>
                          <option value="1.5">1.5 estrellas</option>
                          <option value="1">1 estrella</option>
                        </select>
                      </div>

                      <div className="w-1/2">
                        <label htmlFor="reviewCount" className="block text-sm font-medium text-gray-700">
                          Número de reseñas
                        </label>
                        <input
                          type="number"
                          id="reviewCount"
                          name="reviewCount"
                          value={formData.reviewCount}
                          onChange={handleChange}
                          min="0"
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Descripción *
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        required
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                      ></textarea>
                    </div>

                    <div>
                      <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                        Imagen principal (URL) *
                      </label>
                      <input
                        type="text"
                        id="image"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                      />
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="inStock"
                        name="inStock"
                        checked={formData.inStock}
                        onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="inStock" className="ml-2 block text-sm text-gray-700">
                        En stock
                      </label>
                    </div>
                  </div>
                </div>

                {/* Imágenes, características, especificaciones y compatibilidad */}
                <div>
                  <h2 className="mb-4 text-lg font-medium text-gray-900">Detalles adicionales</h2>

                  <div className="space-y-6">
                    {/* Imágenes */}
                    <div>
                      <div className="mb-2 flex items-center justify-between">
                        <label className="block text-sm font-medium text-gray-700">Imágenes adicionales *</label>
                        <button
                          type="button"
                          onClick={() => handleAddArrayItem(images, setImages)}
                          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                        >
                          <Plus className="mr-1 h-4 w-4" />
                          Añadir imagen
                        </button>
                      </div>
                      <div className="space-y-2">
                        {images.map((image, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={image}
                              onChange={(e) => handleArrayChange(index, e.target.value, images, setImages)}
                              className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                              placeholder="URL de la imagen"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveArrayItem(index, images, setImages)}
                              className="text-red-600 hover:text-red-800"
                              disabled={images.length <= 1}
                            >
                              <X className="h-5 w-5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Características */}
                    <div>
                      <div className="mb-2 flex items-center justify-between">
                        <label className="block text-sm font-medium text-gray-700">Características *</label>
                        <button
                          type="button"
                          onClick={() => handleAddArrayItem(features, setFeatures)}
                          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                        >
                          <Plus className="mr-1 h-4 w-4" />
                          Añadir característica
                        </button>
                      </div>
                      <div className="space-y-2">
                        {features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={feature}
                              onChange={(e) => handleArrayChange(index, e.target.value, features, setFeatures)}
                              className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                              placeholder="Característica del producto"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveArrayItem(index, features, setFeatures)}
                              className="text-red-600 hover:text-red-800"
                              disabled={features.length <= 1}
                            >
                              <X className="h-5 w-5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Especificaciones */}
                    <div>
                      <div className="mb-2 flex items-center justify-between">
                        <label className="block text-sm font-medium text-gray-700">Especificaciones *</label>
                        <button
                          type="button"
                          onClick={handleAddSpecification}
                          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                        >
                          <Plus className="mr-1 h-4 w-4" />
                          Añadir especificación
                        </button>
                      </div>
                      <div className="space-y-2">
                        {specifications.map((spec, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={spec.name}
                              onChange={(e) => handleSpecificationChange(index, "name", e.target.value)}
                              className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                              placeholder="Nombre"
                            />
                            <input
                              type="text"
                              value={spec.value}
                              onChange={(e) => handleSpecificationChange(index, "value", e.target.value)}
                              className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                              placeholder="Valor"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveSpecification(index)}
                              className="text-red-600 hover:text-red-800"
                              disabled={specifications.length <= 1}
                            >
                              <X className="h-5 w-5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Compatibilidad */}
                    <div>
                      <div className="mb-2 flex items-center justify-between">
                        <label className="block text-sm font-medium text-gray-700">Compatible con *</label>
                        <button
                          type="button"
                          onClick={() => handleAddArrayItem(compatibleWith, setCompatibleWith)}
                          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                        >
                          <Plus className="mr-1 h-4 w-4" />
                          Añadir compatibilidad
                        </button>
                      </div>
                      <div className="space-y-2">
                        {compatibleWith.map((item, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={item}
                              onChange={(e) =>
                                handleArrayChange(index, e.target.value, compatibleWith, setCompatibleWith)
                              }
                              className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                              placeholder="Compatible con..."
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveArrayItem(index, compatibleWith, setCompatibleWith)}
                              className="text-red-600 hover:text-red-800"
                              disabled={compatibleWith.length <= 1}
                            >
                              <X className="h-5 w-5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-5">
                <Link
                  href="/admin/dashboard"
                  className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Cancelar
                </Link>
                <button
                  type="submit"
                  disabled={loading}
                  className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                >
                  {loading ? "Guardando..." : "Guardar producto"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  )
}

