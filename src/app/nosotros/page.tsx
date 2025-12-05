// src/app/nosotros/page.tsx
import Image from 'next/image';
import { Mail, Phone, Github } from 'lucide-react';
import { Metadata } from 'next';
import { getTeamMembers, TeamMember } from './team';

// Metadata para la página
export const metadata: Metadata = {
  title: 'Nuestro Equipo - EABMODEL',
  description: 'Conoce al equipo de profesionales detrás de EABMODEL'
};

export default function Nosotros() {
  const members: TeamMember[] = getTeamMembers();

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Misión y Visión */}
          <section className="grid md:grid-cols-2 gap-10">
            <div className="bg-black/30 rounded-lg p-8 backdrop-blur-sm border border-gray-800">
              <h2 className="text-2xl font-bold text-[#efb810] mb-4">Nuestra Misión</h2>
              <p className="text-gray-300 leading-relaxed">
                Proporcionar soluciones innovadoras y de alta calidad que impulsen
                el éxito de nuestros clientes a través de la excelencia técnica
                y el compromiso con la innovación.
              </p>
            </div>
            
            <div className="bg-black/30 rounded-lg p-8 backdrop-blur-sm border border-gray-800">
              <h2 className="text-2xl font-bold text-[#efb810] mb-4">Nuestra Visión</h2>
              <p className="text-gray-300 leading-relaxed">
                Ser líderes reconocidos en nuestro sector, estableciendo nuevos
                estándares de calidad y siendo la primera opción para clientes
                que buscan excelencia y profesionalismo.
              </p>
            </div>
          </section>
          
          {/* Equipo */}
          <section>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#efb810]">Nuestro Equipo</h2>
              <p className="text-xl text-gray-300 mt-4">
                Conoce a los profesionales detrás de EABMODEL
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {members.map((member) => (
                <div 
                  key={member.id} 
                  className="bg-black/30 rounded-lg overflow-hidden border border-gray-800 hover:border-[#efb810]/30 transition-all duration-300 group"
                >
                  <div className="h-64 relative overflow-hidden">
                    <Image 
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-[#efb810] mb-4">{member.position}</p>
                    
                    <div className="flex space-x-4 mt-4">
                      <a 
                        href={`mailto:${member.email}`} 
                        className="text-gray-400 hover:text-white transition-colors" 
                        aria-label="Enviar correo"
                      >
                        <Mail size={20} />
                      </a>
                      
                      {member.phone && (
                        <a 
                          href={`https://wa.me/${member.phone.replace(/[^0-9]/g, '')}`} 
                          className="text-gray-400 hover:text-white transition-colors" 
                          aria-label="Contactar por WhatsApp"
                        >
                          <Phone size={20} />
                        </a>
                      )}
                      
                      {member.github && (
                        <a 
                          href={`https://github.com/${member.github}`} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-gray-400 hover:text-white transition-colors" 
                          aria-label="Perfil de GitHub"
                        >
                          <Github size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          {/* Valores */}
          <section className="bg-black/30 rounded-lg p-8 backdrop-blur-sm border border-gray-800">
            <h2 className="text-2xl font-bold text-[#efb810] mb-6">Nuestros Valores</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Innovación</h3>
                <p className="text-gray-300">
                  Buscamos constantemente nuevas formas de mejorar y evolucionar.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Excelencia</h3>
                <p className="text-gray-300">
                  Nos comprometemos con la más alta calidad en todo lo que hacemos.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Integridad</h3>
                <p className="text-gray-300">
                  Actuamos con honestidad y transparencia en todas nuestras relaciones.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Colaboración</h3>
                <p className="text-gray-300">
                  Trabajamos juntos para alcanzar objetivos comunes y crear valor.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}