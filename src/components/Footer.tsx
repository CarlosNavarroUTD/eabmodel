import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Linkedin, Github, Twitter } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-background to-black border-t border-secondary/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Columna 1: Acerca de */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[#efb810]">EABMODEL</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Transformamos empresas a través de soluciones tecnológicas inteligentes y modelos de negocio innovadores.
            </p>

          </div>

          {/* Columna 2: Enlaces rápidos */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-[#efb810] transition-colors duration-300 text-sm">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/servicios" className="text-gray-300 hover:text-[#efb810] transition-colors duration-300 text-sm">
                  Servicios
                </Link>
              </li>
              <li>
                <Link href="/paquetes" className="text-gray-300 hover:text-[#efb810] transition-colors duration-300 text-sm">
                  Paquetes
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-gray-300 hover:text-[#efb810] transition-colors duration-300 text-sm numbers-font">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Servicios */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Servicios</h3>
            <ul className="space-y-2">
              <li className="text-gray-300 text-sm">Desarrollo de Software</li>
              <li className="text-gray-300 text-sm">Consultoría de Negocio</li>
              <li className="text-gray-300 text-sm">Ciberseguridad</li>
              <li className="text-gray-300 text-sm">Aplicaciones con IA</li>
              <li className="text-gray-300 text-sm">E-commerce</li>
            </ul>
          </div>

          {/* Columna 4: Contacto */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-[#efb810] flex-shrink-0 mt-0.5" />
                <a href="mailto:carlos@eabmodel.com" className="text-gray-300 hover:text-[#efb810] transition-colors duration-300 text-sm numbers-font">
                  carlos@eabmodel.com
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-[#efb810] flex-shrink-0 mt-0.5" />
                <a href="tel:+526183347956" className="text-gray-300 hover:text-[#efb810] transition-colors duration-300 text-sm numbers-font">
                  +52 618 334 7956
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#efb810] flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm">
                  Victoria de Durango, Durango, México
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-secondary/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm numbers-font">
              © {currentYear} EABMODEL. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacidad" className="text-gray-400 hover:text-[#efb810] transition-colors duration-300 text-sm">
                Política de Privacidad
              </Link>
              <Link href="/terminos" className="text-gray-400 hover:text-[#efb810] transition-colors duration-300 text-sm">
                Términos de Servicio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}