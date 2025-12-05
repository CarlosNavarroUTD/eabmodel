'use client'; 

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp, Code, Brain, Shield, ShoppingCart, Lightbulb, Sparkles } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface ServiceCardProps {
  title: string;
  description: string;
  components: string[];
  isOpen: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  color: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, components, isOpen, onClick, icon, color }) => {
  return (
    <Card className={`w-full bg-background/50 backdrop-blur-sm transition-all duration-300 border-2 ${
      isOpen ? `border-[${color}] shadow-lg shadow-[${color}]/20` : 'border-secondary/20'
    } rounded-xl hover:scale-[1.02] hover:border-[#efb810]`}>
      <CardHeader 
        className="cursor-pointer" 
        onClick={onClick}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-lg bg-gradient-to-br from-[${color}]/20 to-[${color}]/5`}>
              {icon}
            </div>
            <CardTitle className="text-xl md:text-2xl text-white">{title}</CardTitle>
          </div>
          {isOpen ? (
            <ChevronUp className="w-6 h-6 text-[#efb810] flex-shrink-0" />
          ) : (
            <ChevronDown className="w-6 h-6 text-[#efb810] flex-shrink-0" />
          )}
        </div>
      </CardHeader>
      {isOpen && (
        <CardContent className="text-gray-200 space-y-6 animate-in slide-in-from-top-2 duration-300">
          <p className="text-lg leading-relaxed">{description}</p>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#efb810] flex items-center">
              <Sparkles className="w-5 h-5 mr-2" />
              Componentes clave:
            </h3>
            <ul className="grid gap-3">
              {components.map((component, index) => (
                <li key={index} className="flex items-start group">
                  <span className="text-[#efb810] mr-3 mt-1 text-xl group-hover:scale-125 transition-transform">•</span>
                  <span className="text-gray-200 group-hover:text-white transition-colors">{component}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="pt-4">
            <Link
              href="/contacto"
              className="inline-flex items-center px-6 py-3 text-sm font-medium bg-gradient-to-r from-[#efb810] to-[#ffd54f] text-black rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#efb810]/50"
            >
              Solicitar este servicio →
            </Link>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default function Services() {
  const [openCard, setOpenCard] = useState<number | null>(0);

  const services = [
    {
      title: "Desarrollo de Software Empresarial",
      description: "Este servicio se enfoca en el diseño, desarrollo e implementación de aplicaciones que apoyen a las empresas a optimizar sus procesos operativos y alcanzar sus objetivos comerciales.",
      icon: <Code className="w-6 h-6 text-[#3b82f6]" />,
      color: "#3b82f6",
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
      icon: <Lightbulb className="w-6 h-6 text-[#f59e0b]" />,
      color: "#f59e0b",
      components: [
        "Diseño de Modelos de Negocio Digitales: Creación de estrategias para transformar los modelos de negocio tradicionales hacia plataformas digitales.",
        "Transformación Digital: Acompañamiento en la digitalización de procesos y adopción de herramientas colaborativas.",
        "Optimización de Procesos mediante Tecnología: Evaluación y mejora de procesos empresariales."
      ]
    },
    {
      title: "Ciberseguridad y DevSecOps",
      description: "Protegemos los activos digitales de las empresas, desde aplicaciones hasta infraestructuras en la nube.",
      icon: <Shield className="w-6 h-6 text-[#10b981]" />,
      color: "#10b981",
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
      icon: <Brain className="w-6 h-6 text-[#8b5cf6]" />,
      color: "#8b5cf6",
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
      icon: <ShoppingCart className="w-6 h-6 text-[#ec4899]" />,
      color: "#ec4899",
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
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-[#efb810]/20 to-[#efb810]/5 rounded-full mb-4">
              <Code className="w-12 h-12 text-[#efb810]" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Nuestros <span className="text-[#efb810] bg-gradient-to-r from-[#efb810] to-[#ffd54f] bg-clip-text text-transparent">Servicios</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Soluciones tecnológicas integrales diseñadas para impulsar tu negocio al siguiente nivel
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-[#efb810]/10 to-transparent border border-[#efb810]/20">
              <div className="text-4xl font-bold text-[#efb810] mb-2">5+</div>
              <div className="text-gray-300">Servicios Especializados</div>
            </div>
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-[#efb810]/10 to-transparent border border-[#efb810]/20">
              <div className="text-4xl font-bold text-[#efb810] mb-2">100%</div>
              <div className="text-gray-300">Soluciones Personalizadas</div>
            </div>
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-[#efb810]/10 to-transparent border border-[#efb810]/20">
              <div className="text-4xl font-bold text-[#efb810] mb-2">24/7</div>
              <div className="text-gray-300">Soporte Técnico</div>
            </div>
          </div>
          
          {/* Services Cards */}
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

          {/* CTA Section */}
          <div className="text-center pt-12 space-y-6">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">¿No encuentras lo que buscas?</h2>
              <p className="text-gray-300 mb-8">
                Desarrollamos soluciones personalizadas para cada necesidad. Platícanos tu proyecto y lo haremos realidad.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium bg-gradient-to-r from-[#efb810] to-[#ffd54f] text-black rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#efb810]/50"
              >
                Solicita una consulta gratuita →
              </Link>
              <Link
                href="/#paquetes"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium border-2 border-[#efb810] text-white rounded-lg transition-all duration-300 hover:bg-[#efb810]/10 hover:scale-105"
              >
                Ver Paquetes
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}