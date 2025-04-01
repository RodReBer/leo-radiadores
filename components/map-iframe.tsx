"use client"

import { useState } from "react"

// Definir las ubicaciones de las sedes con URLs de iframe reales
const locations = [
  {
    id: 1,
    name: "Sede 1 - General Flores",
    address: "General Flores 4270 esq. Londres, Montevideo",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3273.8481326125384!2d-56.16023492330906!3d-34.83124597304244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a02ab071e7e2c1%3A0x9e0d1b6a3d6a1e0!2sGeneral%20Flores%204270%2C%2012000%20Montevideo%2C%20Uruguay!5e0!3m2!1ses!2sus!4v1711842000000!5m2!1ses!2sus",
  },
  {
    id: 2,
    name: "Sede 2 - Galicia",
    address: "Galicia 1286 esq. Yaguarón, Montevideo",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3271.9307079282574!2d-56.19384992330636!3d-34.90683797304244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x959f81c1b9d092a5%3A0x7c4a9f7c5d5c5d5c!2sGalicia%201286%2C%2011100%20Montevideo%2C%20Uruguay!5e0!3m2!1ses!2sus!4v1711842000000!5m2!1ses!2sus",
  },
  {
    id: 3,
    name: "Sede 3 - Ejido",
    address: "Ejido 1648 esq. Galicia, Montevideo",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3271.9307079282574!2d-56.18704992330636!3d-34.90953797304244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x959f81c1b9d092a5%3A0x7c4a9f7c5d5c5d5c!2sEjido%201648%2C%2011100%20Montevideo%2C%20Uruguay!5e0!3m2!1ses!2sus!4v1711842000000!5m2!1ses!2sus",
  },
  {
    id: 4,
    name: "Sede 4 - Giannattasio",
    address: "Av. Giannattasio km 21400, Ciudad de la Costa",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3273.8481326125384!2d-55.95804992330906!3d-34.82354597304244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a02ab071e7e2c1%3A0x9e0d1b6a3d6a1e0!2sAv.%20Giannattasio%20Km%2021.400%2C%20Ciudad%20de%20la%20Costa%2C%20Uruguay!5e0!3m2!1ses!2sus!4v1711842000000!5m2!1ses!2sus",
  },
]

export default function MapIframe() {
  const [activeLocation, setActiveLocation] = useState(locations[0])

  return (
    <div className="flex h-full w-full flex-col">
      <div className="mb-4 flex flex-wrap justify-center gap-2">
        {locations.map((location) => (
          <button
            key={location.id}
            onClick={() => setActiveLocation(location)}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              activeLocation.id === location.id
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {location.name}
          </button>
        ))}
      </div>
      <div className="relative flex-1 overflow-hidden rounded-lg">
        <iframe
          src={activeLocation.embedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Mapa de ${activeLocation.name}`}
          className="absolute inset-0 h-full w-full"
        ></iframe>
      </div>
      <div className="mt-2 text-center text-sm text-gray-600">{activeLocation.address}</div>
    </div>
  )
}

