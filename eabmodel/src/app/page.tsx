import Link from 'next/link'
import AnimatedLogo from '@/components/animated-logo'

export default function Home() {
  return (
    <main className=" bg-background text-white">
      <div className="container mx-auto px-4 py-8 md:py-8">
      <div className="flex items-center justify-center">
      <AnimatedLogo />
    </div>
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Potenciamos tu empresa con{' '}
            <span className="text-[#efb810]">tecnología inteligente</span> y modelos de negocio innovadores
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200">
            En EABMODEL desarrollamos soluciones digitales personalizadas y optimizamos tus procesos empresariales para alcanzar el éxito.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link 
              href="#transform"
              className="inline-flex items-center px-8 py-3 text-lg font-medium border-2 border-secondary text-white rounded-lg transition-all duration-300 hover:bg-[#efb810]/10 hover:scale-105 hover:border-primary"
            >
              Descubre cómo transformar tu negocio →
            </Link>
            <Link 
              href="#contact"
              className="inline-flex items-center px-8 py-3 text-lg font-medium border-2 border-secondary text-white rounded-lg transition-all duration-300 hover:bg-[#efb810]/10 hover:scale-105 hover:border-primary"
            >
              Habla con nuestros expertos ahora →
            </Link>
          </div>
          
          <div className="max-w-3xl mx-auto pt-12">
            <p className="text-lg text-gray-300">
              En EABMODEL somos líderes en el diseño de aplicaciones empresariales, la ingeniería de modelos de negocio innovadores y la automatización de procesos. Nuestra misión es ayudarte a alcanzar tus objetivos con soluciones tecnológicas de última generación.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

