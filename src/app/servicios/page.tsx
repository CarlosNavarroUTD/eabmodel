'use client'; 

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface ServiceCardProps {
  title: string;
  description: string;
  components: string[];
  isOpen: boolean;
  onClick: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, components, isOpen, onClick }) => {
  return (
    <Card className="w-full bg-background transition-all duration-300 border-2 border-secondary text-white rounded-lg transition-all duration-300 hover:bg-[#efb810]/10 hover:scale-105 hover:border-primary">
      <CardHeader 
        className="cursor-pointer" 
        onClick={onClick}
      >
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl md:text-2xl text-white">{title}</CardTitle>
          {isOpen ? (
            <ChevronUp className="w-6 h-6 text-primary" />
          ) : (
            <ChevronDown className="w-6 h-6 text-primary" />
          )}
        </div>
      </CardHeader>
      {isOpen && (
        <CardContent className="text-gray-200">
          <p className="mb-4">{description}</p>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">Componentes clave:</h3>
            <ul className="space-y-2">
              {components.map((component, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>{component}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default function Services() {
  const [openCard, setOpenCard] = useState<number | null>(null);

  const services = [
    {
      title: "Desarrollo de Software Empresarial",
      description: "Este servicio se enfoca en el diseño, desarrollo e implementación de aplicaciones que apoyen a las empresas a optimizar sus procesos operativos y alcanzar sus objetivos comerciales.",
      components: [
        "Aplicaciones Web Personalizadas: Desarrollo de plataformas escalables y seguras, que se alineen con los requerimientos específicos de cada empresa.",
        "Sistemas de Gestión Empresarial (ERP, CRM, POS): Implementación de soluciones que ayuden a las empresas a gestionar sus recursos y relaciones con clientes.",
        "Integración de APIs: Desarrollo de interfaces para conectar sistemas de software y permitir la transferencia de datos entre aplicaciones.",
        "Automatización de Procesos de Negocio: Implementación de flujos automáticos para tareas repetitivas y manuales."
      ]
    },
    {
      title: "Consultoría en Modelos de Negocio",
      description: "Ayudamos a las empresas a crear o adaptar sus modelos de negocio para ser más competitivos y aprovechar las oportunidades tecnológicas actuales.",
      components: [
        "Diseño de Modelos de Negocio Digitales: Creación de estrategias para transformar los modelos de negocio tradicionales hacia plataformas digitales.",
        "Transformación Digital: Acompañamiento en la digitalización de procesos y adopción de herramientas colaborativas.",
        "Optimización de Procesos mediante Tecnología: Evaluación y mejora de procesos empresariales."
      ]
    },
    {
      title: "Ciberseguridad y DevSecOps",
      description: "Protegemos los activos digitales de las empresas, desde aplicaciones hasta infraestructuras en la nube.",
      components: [
        "Auditorías de Seguridad y Pruebas de Penetración: Evaluación profunda de infraestructura y aplicaciones.",
        "DevSecOps: Integración de prácticas de seguridad en el ciclo de vida del desarrollo.",
        "Protección de Datos y Cumplimiento: Implementación de estrategias para proteger datos y cumplir normativas.",
        "Seguridad en la Nube: Configuración de entornos seguros y gestión de accesos."
      ]
    },
    {
      title: "Desarrollo de Aplicaciones con IA",
      description: "Incorporamos capacidades de inteligencia artificial en sus operaciones para automatizar tareas y mejorar la toma de decisiones.",
      components: [
        "Automatización mediante IA: Implementación de algoritmos para tareas que requieren intervención humana.",
        "Chatbots y Asistentes Virtuales: Desarrollo de sistemas de comunicación automatizados.",
        "Análisis Predictivo: Uso de machine learning para predecir tendencias y comportamientos.",
        "Optimización de UX: Implementación de IA para personalizar la experiencia del usuario."
      ]
    },
    {
      title: "Desarrollo Web y Comercio Electrónico",
      description: "Creamos soluciones de comercio electrónico completas y experiencias web excepcionales.",
      components: [
        "Diseño y Desarrollo de Tiendas Online: Creación de plataformas de comercio electrónico seguras y fáciles de usar.",
        "Desarrollo de Marketplaces: Plataformas multi-vendedor con gestión completa.",
        "Optimización SEO: Estrategias para mejorar el posicionamiento en buscadores.",
        "Estrategias de Marketing Digital: Campañas publicitarias y marketing en redes sociales."
      ]
    }
  ];

  return (
    <main className="bg-background text-white min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Nuestros <span className="text-[#efb810]">Servicios</span>
            </h1>
            <p className="text-xl text-gray-300">
              Soluciones tecnológicas integrales para impulsar tu negocio
            </p>
          </div>
          
          <div className="grid gap-6">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                {...service}
                isOpen={openCard === index}
                onClick={() => setOpenCard(openCard === index ? null : index)}
              />
            ))}
          </div>

          <div className="text-center pt-8">
            <Link
              href="#contact"
              className="inline-flex items-center px-8 py-3 text-lg font-medium border-2 border-secondary text-white rounded-lg transition-all duration-300 hover:bg-[#efb810]/10 hover:scale-105 hover:border-primary"
            >
              Solicita una consulta gratuita →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}