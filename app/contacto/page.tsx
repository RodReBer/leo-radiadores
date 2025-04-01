import { Mail, Phone, MapPin, Clock } from "lucide-react"
import MapIframe from "@/components/map-iframe"

export default function ContactPage() {
  return (
    <main className="flex min-h-screen flex-col pt-16">
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">Contacto</h1>
          <p className="mx-auto max-w-2xl text-lg">
            Estamos aquí para ayudarte. Contáctanos para obtener más información sobre nuestros productos y servicios.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-2xl font-bold text-blue-800 md:text-3xl">Información de Contacto</h2>

              <div className="mb-8 space-y-6">
                <div className="flex items-start">
                  <Mail className="mr-4 h-6 w-6 flex-shrink-0 text-blue-600" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-gray-600">Leo_radiadores@hotmail.com</p>
                  </div>
                </div>

                <div className="rounded-lg bg-blue-50 p-6">
                  <h3 className="mb-4 text-xl font-semibold text-blue-800">Nuestras Sedes</h3>

                  <div className="space-y-6">
                    <div className="flex items-start">
                      <MapPin className="mr-4 h-6 w-6 flex-shrink-0 text-blue-600" />
                      <div>
                        <h4 className="font-semibold">Sede 1</h4>
                        <p className="text-gray-600">General Flores 4270 esquina Londres</p>
                        <p className="flex items-center text-gray-600">
                          <Phone className="mr-2 h-4 w-4 text-blue-600" />
                          Cel: +59897349638
                        </p>
                        <p className="flex items-center text-gray-600">
                          <Phone className="mr-2 h-4 w-4 text-blue-600" />
                          Tel: 22165577
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <MapPin className="mr-4 h-6 w-6 flex-shrink-0 text-blue-600" />
                      <div>
                        <h4 className="font-semibold">Sede 2</h4>
                        <p className="text-gray-600">Galicia 1286 esquina Yaguarón</p>
                        <p className="flex items-center text-gray-600">
                          <Phone className="mr-2 h-4 w-4 text-blue-600" />
                          Cel: +59897389245
                        </p>
                        <p className="flex items-center text-gray-600">
                          <Phone className="mr-2 h-4 w-4 text-blue-600" />
                          Tel: 29004114
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <MapPin className="mr-4 h-6 w-6 flex-shrink-0 text-blue-600" />
                      <div>
                        <h4 className="font-semibold">Sede 3</h4>
                        <p className="text-gray-600">Ejido 1648 esquina Galicia</p>
                        <p className="flex items-center text-gray-600">
                          <Phone className="mr-2 h-4 w-4 text-blue-600" />
                          Cel: +59897494311
                        </p>
                        <p className="flex items-center text-gray-600">
                          <Phone className="mr-2 h-4 w-4 text-blue-600" />
                          Tel: 29088647
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <MapPin className="mr-4 h-6 w-6 flex-shrink-0 text-blue-600" />
                      <div>
                        <h4 className="font-semibold">Sede 4</h4>
                        <p className="text-gray-600">Avenida Giannattasio km 21400</p>
                        <p className="flex items-center text-gray-600">
                          <Phone className="mr-2 h-4 w-4 text-blue-600" />
                          Cel: +59897808609
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="mr-4 h-6 w-6 flex-shrink-0 text-blue-600" />
                  <div>
                    <h3 className="font-semibold">Horario de Atención</h3>
                    <p className="text-gray-600">Lunes a Viernes: 8:00 - 18:00</p>
                    <p className="text-gray-600">Sábados: 9:00 - 13:00</p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-gray-100 p-6">
                <h3 className="mb-4 text-xl font-semibold text-blue-800">¿Necesitas un Presupuesto?</h3>
                <p className="mb-4 text-gray-600">
                  Contáctanos directamente por teléfono o completa el formulario y te responderemos a la brevedad.
                </p>
                <p className="font-medium text-blue-700">¡Respuesta garantizada en menos de 24 horas!</p>
              </div>
            </div>

            <div>
              <h2 className="mb-6 text-2xl font-bold text-blue-800 md:text-3xl">Envíanos un Mensaje</h2>

              <form className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block font-medium">
                      Nombre
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                      placeholder="Tu nombre"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-2 block font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                      placeholder="Tu email"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="mb-2 block font-medium">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="Tu teléfono"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="mb-2 block font-medium">
                    Asunto
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="Asunto del mensaje"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block font-medium">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="Escribe tu mensaje aquí..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-md bg-blue-600 px-6 py-3 font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Enviar Mensaje
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-2xl font-bold text-blue-800 md:text-3xl">Nuestras Ubicaciones</h2>
          <div className="mx-auto h-[500px] max-w-5xl overflow-hidden rounded-lg shadow-lg">
            <MapIframe />
          </div>
        </div>
      </section>
    </main>
  )
}

