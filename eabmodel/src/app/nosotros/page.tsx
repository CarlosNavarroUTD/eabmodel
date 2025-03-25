import Image from 'next/image';
import { Mail, Phone, Github, Linkedin } from 'lucide-react';

// Definir el tipo para los miembros del equipo
interface TeamMember {
  id: string;
  name: string;
  position: string;
  image: string;
  email: string;
  phone?: string;
  github?: string;
  linkedin?: string;
}

// Datos de ejemplo - reemplaza con datos reales de tu base de datos
const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Ana Martínez',
    position: 'CEO / Fundadora',
    image: '/team/ana.jpg',
    email: 'ana@eabmodel.com',
    phone: '+1234567890',
    github: 'anamartinez',
    linkedin: 'ana-martinez'
  },
  {
    id: '2',
    name: 'Carlos Rodríguez',
    position: 'CTO / Arquitecto de Software',
    image: '/team/carlos.jpg',
    email: 'carlos@eabmodel.com',
    github: 'carlosrodriguez',
    linkedin: 'carlos-rodriguez'
  },
  {
    id: '3',
    name: 'Elena Sánchez',
    position: 'Directora de Desarrollo de Negocios',
    image: '/team/elena.jpg',
    email: 'elena@eabmodel.com',
    phone: '+0987654321',
    linkedin: 'elena-sanchez'
  }
];

export default function Nosotros() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Sección de Misión y Visión */}
          <section className="grid md:grid-cols-2 gap-10">
            <div className="bg-black/30 rounded-lg p-8 backdrop-blur-sm border border-gray-800 hover:border-[#efb810]/30 transition-all duration-300">
              <h2 className="text-2xl font-bold mb-4 text-[#efb810]">Nuestra Misión</h2>
              <p className="text-gray-300">
                En EABMODEL, nuestra misión es transformar empresas a través de soluciones tecnológicas 
                inteligentes y modelos de negocio innovadores que maximicen la eficiencia, incrementen 
                la rentabilidad y mejoren la experiencia tanto de empleados como de clientes.
              </p>
            </div>
            
            <div className="bg-black/30 rounded-lg p-8 backdrop-blur-sm border border-gray-800 hover:border-[#efb810]/30 transition-all duration-300">
              <h2 className="text-2xl font-bold mb-4 text-[#efb810]">Nuestra Visión</h2>
              <p className="text-gray-300">
                Aspiramos a ser reconocidos globalmente como líderes en la creación de soluciones 
                empresariales que combinen tecnología de vanguardia con estrategias de negocio 
                disruptivas, facilitando la transformación digital de empresas de todos los tamaños 
                y sectores.
              </p>
            </div>
          </section>
          
          {/* Sección de Equipo */}
          <section>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#efb810]">Nuestro Equipo</h2>
              <p className="text-xl text-gray-300 mt-4">
                Conoce a los profesionales detrás de EABMODEL
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <div key={member.id} className="bg-black/30 rounded-lg overflow-hidden border border-gray-800 hover:border-[#efb810]/30 transition-all duration-300 group">
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
                      <a href={`mailto:${member.email}`} className="text-gray-400 hover:text-white transition-colors" aria-label="Enviar correo">
                        <Mail size={20} />
                      </a>
                      
                      {member.phone && (
                        <a href={`https://wa.me/${member.phone.replace(/[^0-9]/g, '')}`} className="text-gray-400 hover:text-white transition-colors" aria-label="Contactar por WhatsApp">
                          <Phone size={20} />
                        </a>
                      )}
                      
                      {member.github && (
                        <a href={`https://github.com/${member.github}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="Perfil de GitHub">
                          <Github size={20} />
                        </a>
                      )}
                      
                      {member.linkedin && (
                        <a href={`https://linkedin.com/in/${member.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="Perfil de LinkedIn">
                          <Linkedin size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          {/* Sección de Valores */}
          <section className="bg-black/30 rounded-lg p-8 backdrop-blur-sm border border-gray-800">
            <h2 className="text-2xl font-bold mb-6 text-center text-[#efb810]">Nuestros Valores</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <h3 className="text-xl font-bold mb-2">Innovación</h3>
                <p className="text-gray-300">Buscamos constantemente nuevas formas de resolver desafíos empresariales a través de la tecnología.</p>
              </div>
              <div className="text-center p-4">
                <h3 className="text-xl font-bold mb-2">Excelencia</h3>
                <p className="text-gray-300">Nos comprometemos a ofrecer soluciones de la más alta calidad que superen las expectativas de nuestros clientes.</p>
              </div>
              <div className="text-center p-4">
                <h3 className="text-xl font-bold mb-2">Colaboración</h3>
                <p className="text-gray-300">Trabajamos estrechamente con nuestros clientes, entendiendo sus necesidades y convirtiéndonos en verdaderos socios estratégicos.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}