"use client"

import { useState } from "react"

// Definir las ubicaciones de las sedes con URLs de iframe reales
const locations = [
  {
    id: 1,
    name: "Sede 1 - General Flores",
    address: "General Flores 4270 esq. Londres, Montevideo",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6548.314838637013!2d-56.162498924009306!3d-34.85227167286617!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a02a80cfaffff3%3A0xa7aca2ffb4700642!2sLeo%20Radiadores!5e0!3m2!1ses!2sus!4v1743526414871!5m2!1ses!2sus",
  },
  {
    id: 2,
    name: "Sede 2 - Galicia",
    address: "Galicia 1286 esq. Yaguarón, Montevideo",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3272.25104847476!2d-56.19155972400726!3d-34.900148872849535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x959f8117b9e790ab%3A0xb25ddfdb5994b031!2sLeo%20Radiadores!5e0!3m2!1ses!2sus!4v1743526387530!5m2!1ses!2sus",
  },
  {
    id: 3,
    name: "Sede 3 - Ejido",
    address: "Ejido 1648 esq. Galicia, Montevideo",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3272.253172040914!2d-56.18992632400738!3d-34.900095572849544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x959f8033fb452967%3A0x60f39a37d20829f6!2sLeo%20Radiadores!5e0!3m2!1ses!2sus!4v1743526317666!5m2!1ses!2sus",
  },
  {
    id: 4,
    name: "Sede 4 - Giannattasio",
    address: "Av. Giannattasio km 21400, Ciudad de la Costa",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6549.616919582815!2d-55.98720302400994!3d-34.835908072871895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x959f89f78b206bef%3A0x18b66be361ae8b55!2sLeo%20Radiadores!5e0!3m2!1ses!2sus!4v1743526205020!5m2!1ses!2sus",
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

