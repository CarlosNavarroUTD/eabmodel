import Link from 'next/link'
import AnimatedLogo from '@/components/animated-logo'
import { Check, Zap, Shield, TrendingUp, Users, Sparkles, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export default function Home() {
  const benefits = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Velocidad de Implementación",
      description: "Entrega de proyectos en tiempo récord sin comprometer la calidad"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Seguridad Garantizada",
      description: "Protección de datos con los más altos estándares de ciberseguridad"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "ROI Comprobado",
      description: "Incrementa tu productividad hasta un 300% con nuestras soluciones"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Soporte 24/7",
      description: "Equipo dedicado disponible cuando más lo necesites"
    }
  ]

  const packages = [
    {
      name: "Mercado & Marketing",
      price: "Desde $5,000 MXN",
      description: "Estudio de mercado y estrategias de MKT",
      features: [
        "Análisis de competencia",
        "Segmentación de mercado",
        "Estrategia de contenidos",
        "Plan de medios digitales",
        "Reporte de métricas"
      ],
      highlight: false
    },
    {
      name: "Mercado & App",
      price: "Desde $15,000 MXN",
      description: "Estudio de mercado y desarrollo de aplicación",
      features: [
        "Validación de idea",
        "Diseño UI/UX",
        "Desarrollo de aplicación",
        "Pruebas de funcionalidad",
        "Despliegue básico"
      ],
      highlight: false
    },
    {
      name: "Integral 360°",
      price: "Desde $25,000 MXN",
      description: "Estudio de mercado, MKT y desarrollo",
      features: [
        "Investigación profunda",
        "Desarrollo full-stack",
        "Campaña de lanzamiento",
        "Posicionamiento SEO/SEM",
        "Soporte post-lanzamiento"
      ],
      highlight: false
    },
    {
      name: "Personalizado",
      price: "A Medida",
      description: "Contactanos para conocer más de tu negocio y entregarte la mejor solución para ti...",
      features: [
        "Consultoría inicial gratuita",
        "Análisis de requerimientos",
        "Arquitectura a medida",
        "Plan de implementación",
        "Soporte prioritario"
      ],
      highlight: false
    }
  ]

  const process = [
    { step: "01", title: "Descubrimiento", description: "Analizamos tus necesidades y objetivos" },
    { step: "02", title: "Estrategia", description: "Diseñamos la solución perfecta para ti" },
    { step: "03", title: "Desarrollo", description: "Construimos tu solución con las mejores prácticas" },
    { step: "04", title: "Lanzamiento", description: "Implementamos y optimizamos tu proyecto" }
  ]

  return (
    <main className="bg-background text-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex items-center justify-center mb-8">
          <AnimatedLogo />
        </div>
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Potenciamos tu empresa con{' '}
            <span className="text-[#efb810] bg-gradient-to-r from-[#efb810] to-[#ffd54f] bg-clip-text text-transparent">
              tecnología inteligente
            </span>{' '}
            y modelos de negocio innovadores
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
            En EABMODEL desarrollamos soluciones digitales personalizadas y optimizamos tus procesos empresariales para alcanzar el éxito.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link 
              href="/servicios"
              className="group inline-flex items-center justify-center px-8 py-4 text-lg font-medium bg-gradient-to-r from-[#efb810] to-[#ffd54f] text-black rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#efb810]/50"
            >
              Descubre cómo transformar tu negocio
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/contacto"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium border-2 border-[#efb810] text-white rounded-lg transition-all duration-300 hover:bg-[#efb810]/10 hover:scale-105"
            >
              Habla con nuestros expertos
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gradient-to-b from-background to-black/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Por qué elegir <span className="text-[#efb810]">EABMODEL</span>?
            </h2>
            <p className="text-xl text-gray-300">Ventajas que nos hacen diferentes</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <Card key={index} className="bg-background/50 border-2 border-secondary/20 backdrop-blur-sm hover:border-[#efb810] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#efb810]/20">
                <CardContent className="p-6 space-y-4">
                  <div className="text-[#efb810]">{benefit.icon}</div>
                  <h3 className="text-xl font-semibold text-white">{benefit.title}</h3>
                  <p className="text-gray-300 text-sm">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Paquetes <span className="text-[#efb810]">Diseñados para Ti</span>
            </h2>
            <p className="text-xl text-gray-300">Elige la solución que mejor se adapte a tu negocio</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg, index) => (
              <Card 
                key={index} 
                className={`bg-background border-2 ${
                  pkg.highlight 
                    ? 'border-[#efb810] shadow-lg shadow-[#efb810]/30 scale-105' 
                    : 'border-secondary/20'
                } transition-all duration-300 hover:scale-105 relative overflow-hidden`}
              >
                {pkg.highlight && (
                  <div className="absolute top-0 right-0 bg-gradient-to-l from-[#efb810] to-[#ffd54f] text-black px-4 py-1 text-sm font-bold">
                    MÁS POPULAR
                  </div>
                )}
                <CardContent className="p-8 space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                    <p className="text-3xl font-bold text-[#efb810] mb-2">{pkg.price}</p>
                    <p className="text-gray-300 text-sm">{pkg.description}</p>
                  </div>
                  <ul className="space-y-3">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <Check className="w-5 h-5 text-[#efb810] flex-shrink-0 mt-0.5" />
                        <span className="text-gray-200 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contacto"
                    className={`block w-full text-center py-3 rounded-lg font-medium transition-all duration-300 ${
                      pkg.highlight
                        ? 'bg-gradient-to-r from-[#efb810] to-[#ffd54f] text-black hover:shadow-lg hover:shadow-[#efb810]/50'
                        : 'border-2 border-[#efb810] text-white hover:bg-[#efb810]/10'
                    }`}
                  >
                    Solicitar Cotización
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gradient-to-b from-background to-black/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Nuestro <span className="text-[#efb810]">Proceso</span>
            </h2>
            <p className="text-xl text-gray-300">Metodología probada para resultados excepcionales</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {process.map((item, index) => (
              <div key={index} className="relative group">
                <div className="text-center space-y-4">
                  <div className="text-6xl font-bold text-[#efb810]/20 group-hover:text-[#efb810]/40 transition-colors duration-300">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                  <p className="text-gray-300 text-sm">{item.description}</p>
                </div>
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-1/4 -right-3 w-6 h-0.5 bg-gradient-to-r from-[#efb810] to-transparent"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="flex justify-center mb-6">
              <Sparkles className="w-12 h-12 text-[#efb810]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">
              Transformamos Ideas en <span className="text-[#efb810]">Realidad Digital</span>
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              En EABMODEL somos líderes en el diseño de aplicaciones empresariales, la ingeniería de modelos de negocio innovadores y la automatización de procesos. Nuestra misión es ayudarte a alcanzar tus objetivos con soluciones tecnológicas de última generación.
            </p>
            <div className="flex justify-center space-x-12 pt-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-[#efb810]">50+</div>
                <div className="text-gray-300">Proyectos Completados</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#efb810]">98%</div>
                <div className="text-gray-300">Satisfacción</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#efb810]">24/7</div>
                <div className="text-gray-300">Soporte</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#efb810]/10 via-[#efb810]/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold">
              ¿Listo para transformar tu negocio?
            </h2>
            <p className="text-xl text-gray-300">
              Agenda una consulta gratuita y descubre cómo podemos ayudarte a alcanzar tus objetivos
            </p>
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center px-10 py-5 text-xl font-medium bg-gradient-to-r from-[#efb810] to-[#ffd54f] text-black rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#efb810]/50"
            >
              Comienza Ahora
              <ArrowRight className="ml-2 w-6 h-6" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}