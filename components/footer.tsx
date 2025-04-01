import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4">
              <div className="relative h-12 w-36">
                <Image src="/images/logo.png" alt="Leo Radiadores" fill className="object-contain" />
              </div>
            </div>
            <p className="mb-4 text-blue-100">
              Especialistas en fabricación, reparación y venta de radiadores de alta calidad para el sector agrícola e
              industrial.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-blue-100 transition-colors hover:text-yellow-400">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-blue-100 transition-colors hover:text-yellow-400">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-blue-100 transition-colors hover:text-yellow-400">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold">Productos</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/productos/categoria/abrazaderas"
                  className="text-blue-100 transition-colors hover:text-yellow-400"
                >
                  Abrazaderas
                </Link>
              </li>
              <li>
                <Link
                  href="/productos/categoria/bombas-de-agua"
                  className="text-blue-100 transition-colors hover:text-yellow-400"
                >
                  Bombas de Agua
                </Link>
              </li>
              <li>
                <Link
                  href="/productos/categoria/calefacciones"
                  className="text-blue-100 transition-colors hover:text-yellow-400"
                >
                  Calefacciones
                </Link>
              </li>
              <li>
                <Link
                  href="/productos/categoria/depositos-de-agua"
                  className="text-blue-100 transition-colors hover:text-yellow-400"
                >
                  Depósitos de Agua
                </Link>
              </li>
              <li>
                <Link
                  href="/productos/categoria/electroventiladores"
                  className="text-blue-100 transition-colors hover:text-yellow-400"
                >
                  Electroventiladores
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold">Enlaces</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-blue-100 transition-colors hover:text-yellow-400">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/#empresa" className="text-blue-100 transition-colors hover:text-yellow-400">
                  Empresa
                </Link>
              </li>
              <li>
                <Link href="/radiadores-agricolas" className="text-blue-100 transition-colors hover:text-yellow-400">
                  Radiadores Agrícolas
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-blue-100 transition-colors hover:text-yellow-400">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold">Contacto</h3>
            <div className="mb-3 flex items-start">
              <Mail className="mr-2 h-5 w-5 flex-shrink-0 text-yellow-400" />
              <span>Leo_radiadores@hotmail.com</span>
            </div>
            <h4 className="mb-2 font-medium">Nuestras Sedes:</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 flex-shrink-0 text-yellow-400" />
                <div className="flex flex-col">
                  <span>General Flores 4270 esq. Londres</span>
                  <span className="flex items-center">
                    <Phone className="mr-1 h-4 w-4 text-yellow-400" />
                    <span className="text-sm">Cel: +59897349638</span>
                  </span>
                  <span className="flex items-center">
                    <Phone className="mr-1 h-4 w-4 text-yellow-400" />
                    <span className="text-sm">Tel: 22165577</span>
                  </span>
                </div>
              </li>
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 flex-shrink-0 text-yellow-400" />
                <div className="flex flex-col">
                  <span>Galicia 1286 esq. Yaguarón</span>
                  <span className="flex items-center">
                    <Phone className="mr-1 h-4 w-4 text-yellow-400" />
                    <span className="text-sm">Cel: +59897389245</span>
                  </span>
                  <span className="flex items-center">
                    <Phone className="mr-1 h-4 w-4 text-yellow-400" />
                    <span className="text-sm">Tel: 29004114</span>
                  </span>
                </div>
              </li>
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 flex-shrink-0 text-yellow-400" />
                <div className="flex flex-col">
                  <span>Ejido 1648 esq. Galicia</span>
                  <span className="flex items-center">
                    <Phone className="mr-1 h-4 w-4 text-yellow-400" />
                    <span className="text-sm">Cel: +59897494311</span>
                  </span>
                  <span className="flex items-center">
                    <Phone className="mr-1 h-4 w-4 text-yellow-400" />
                    <span className="text-sm">Tel: 29088647</span>
                  </span>
                </div>
              </li>
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 flex-shrink-0 text-yellow-400" />
                <div className="flex flex-col">
                  <span>Av. Giannattasio km 21400</span>
                  <span className="flex items-center">
                    <Phone className="mr-1 h-4 w-4 text-yellow-400" />
                    <span className="text-sm">Cel: +59897808609</span>
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-blue-800 pt-8 text-center">
          <p className="text-sm text-blue-200">
            &copy; {new Date().getFullYear()} Leo Radiadores. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

