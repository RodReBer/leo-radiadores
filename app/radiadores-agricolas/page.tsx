import Image from "next/image"
import Link from "next/link"
import { Check } from "lucide-react"

const radiadores = [
  {
    id: 1,
    name: "Radiador para Tractor Serie A",
    description: "Diseñado específicamente para tractores de alta potencia",
    image: "/placeholder.svg?height=400&width=600",
    features: ["Alta eficiencia térmica", "Resistente a vibraciones", "Materiales anticorrosivos", "Fácil instalación"],
  },
  {
    id: 2,
    name: "Radiador para Cosechadora",
    description: "Máximo rendimiento para cosechadoras de última generación",
    image: "/placeholder.svg?height=400&width=600",
    features: [
      "Diseño de alta capacidad",
      "Resistente a condiciones extremas",
      "Optimizado para trabajo continuo",
      "Bajo mantenimiento",
    ],
  },
  {
    id: 3,
    name: "Radiador para Fumigadora",
    description: "Solución térmica para equipos de fumigación agrícola",
    image: "/placeholder.svg?height=400&width=600",
    features: ["Diseño compacto", "Alta disipación de calor", "Resistente a productos químicos", "Larga vida útil"],
  },
  {
    id: 4,
    name: "Radiador para Sembradora",
    description: "Control térmico eficiente para sembradoras de precisión",
    image: "/placeholder.svg?height=400&width=600",
    features: ["Peso optimizado", "Resistente al polvo", "Excelente flujo de aire", "Adaptable a diferentes modelos"],
  },
]

export default function RadiadoresAgricolasPage() {
  return (
    <main className="flex min-h-screen flex-col pt-16">
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">Radiadores Agrícolas</h1>
          <p className="mx-auto max-w-2xl text-lg">
            Soluciones de refrigeración de alta calidad para todo tipo de maquinaria agrícola
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <h2 className="mb-4 text-3xl font-bold text-blue-800">
                Especialistas en Radiadores para el Sector Agrícola
              </h2>
              <p className="mb-4 text-lg text-gray-600">
                En Leo Radiadores nos especializamos en el diseño y fabricación de sistemas de refrigeración para todo
                tipo de maquinaria agrícola, desde tractores y cosechadoras hasta fumigadoras y sembradoras.
              </p>
              <p className="mb-6 text-lg text-gray-600">
                Nuestros radiadores están diseñados para soportar las condiciones más exigentes del trabajo en el campo,
                garantizando un rendimiento óptimo y una larga vida útil.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span>Fabricados con materiales de primera calidad</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span>Diseñados para maximizar la eficiencia térmica</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span>Resistentes a la corrosión y a condiciones extremas</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span>Compatibles con las principales marcas del mercado</span>
                </li>
              </ul>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-64 w-full max-w-md overflow-hidden rounded-lg md:h-80 lg:h-96">
                <Image
                  src="/placeholder.svg?height=500&width=700"
                  alt="Radiadores agrícolas de alta calidad"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="mb-8 text-center text-3xl font-bold text-blue-800">Nuestros Radiadores Agrícolas</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {radiadores.map((radiador) => (
                <div
                  key={radiador.id}
                  className="overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={radiador.image || "/placeholder.svg"}
                      alt={radiador.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="mb-2 text-xl font-semibold text-blue-800">{radiador.name}</h3>
                    <p className="mb-4 text-gray-600">{radiador.description}</p>
                    <ul className="mb-4 space-y-2">
                      {radiador.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <span className="mr-2 h-1.5 w-1.5 rounded-full bg-blue-600"></span>
                          <span className="text-sm text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/productos/radiador-${radiador.id}`}
                      className="mt-2 inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                    >
                      Ver Detalles
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg bg-blue-50 p-8 shadow-sm">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <h3 className="mb-4 text-2xl font-bold text-blue-800">¿Necesitas un Radiador Personalizado?</h3>
                <p className="mb-4 text-gray-700">
                  Si no encuentras el radiador que necesitas o requieres una solución personalizada para tu maquinaria
                  agrícola, nuestro equipo de expertos puede diseñar y fabricar un radiador a medida que se adapte
                  perfectamente a tus necesidades.
                </p>
                <p className="mb-6 text-gray-700">
                  Contáctanos hoy mismo para recibir asesoramiento técnico y un presupuesto sin compromiso.
                </p>
                <Link
                  href="/contacto"
                  className="inline-block rounded-md bg-yellow-500 px-6 py-3 font-medium text-blue-900 transition-colors hover:bg-yellow-400"
                >
                  Solicitar Presupuesto
                </Link>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-64 w-full max-w-md overflow-hidden rounded-lg">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Radiadores personalizados"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

