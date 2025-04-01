import Image from "next/image"
import { Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Carlos Rodríguez",
    role: "Propietario de Maquinaria Agrícola",
    content:
      "Los radiadores de Leo son simplemente excepcionales. Desde que los instalamos en nuestra flota de tractores, los problemas de sobrecalentamiento desaparecieron por completo.",
    rating: 5,
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "María González",
    role: "Gerente de Mantenimiento",
    content:
      "El servicio técnico y la calidad de los productos son inmejorables. Siempre encuentran la solución perfecta para nuestras necesidades específicas.",
    rating: 5,
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Juan Pérez",
    role: "Técnico Mecánico",
    content:
      "Trabajo con diferentes marcas de radiadores, pero los de Leo Radiadores destacan por su durabilidad y eficiencia. Son mi primera recomendación para mis clientes.",
    rating: 5,
    avatar: "/placeholder.svg?height=100&width=100",
  },
]

export default function TestimonialSection() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-4 text-3xl font-bold text-blue-800 md:text-4xl">Lo Que Dicen Nuestros Clientes</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            La satisfacción de nuestros clientes es nuestro mayor orgullo
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="rounded-lg bg-blue-50 p-6 shadow-sm">
              <div className="mb-4 flex">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="mb-6 text-gray-700">{testimonial.content}</p>
              <div className="flex items-center">
                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-blue-800">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

