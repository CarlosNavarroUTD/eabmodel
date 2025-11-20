import Image from 'next/image';
import { Mail, Phone, Github } from 'lucide-react';
import { Metadata } from 'next';

// Metadata for the page
export const metadata: Metadata = {
  title: 'Nuestro Equipo - EABMODEL',
  description: 'Conoce al equipo de profesionales detrás de EABMODEL'
};

// Array simple con la información del equipo
const teamMembers = [
  {
    id: 1,
    name: 'Carlos Jair Navarro Huerta',
    position: 'Desarrollador Full Stack',
    image: '/people/Carlos Jair Navarro Huerta.jpg',
    email: 'carlos@eabmodel.com',
    phone: '+52 1 663 205 8150',
    github: 'CarlosNavarroUTD'
  },
  {
    id: 2,
    name: 'María García',
    position: 'Diseñadora UX/UI',
    image: '/default-avatar.png',
    email: 'maria.garcia@eabmodel.com',
    phone: '+0987654321',
    github: 'mariagarcia'
  },
  {
    id: 3,
    name: 'Carlos López',
    position: 'Desarrollador Backend',
    image: '/default-avatar.png',
    email: 'carlos.lopez@eabmodel.com',
    phone: '+1122334455',
    github: 'carloslopez'
  }
];

// Función para agregar nuevos miembros al equipo
export function addTeamMember(member: {
  name: string;
  position: string;
  email: string;
  phone?: string;
  github?: string;
  image?: string;
}) {
  const newMember = {
    id: teamMembers.length + 1,
    image: member.image || '/default-avatar.png',
    phone: member.phone || '',
    github: member.github || '',
    ...member
  };
  
  teamMembers.push(newMember);
  return newMember;
}

// Función para obtener todos los miembros del equipo
export function getTeamMembers() {
  return teamMembers;
}

// Función para eliminar un miembro del equipo por ID
export function removeTeamMember(id: number) {
  const index = teamMembers.findIndex(member => member.id === id);
  if (index !== -1) {
    return teamMembers.splice(index, 1)[0];
  }
  return null;
}

export default async function Nosotros() {
  const members = getTeamMembers();

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Misión y Visión section remains the same */}
          <section className="grid md:grid-cols-2 gap-10">
            {/* ... (previous Misión y Visión code) ... */}
          </section>
          
          {/* Equipo section with dynamic team members */}
          <section>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#efb810]">Nuestro Equipo</h2>
              <p className="text-xl text-gray-300 mt-4">
                Conoce a los profesionales detrás de EABMODEL
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {members.map((member) => (
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
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          {/* Valores section remains the same */}
          <section className="bg-black/30 rounded-lg p-8 backdrop-blur-sm border border-gray-800">
            {/* ... (previous Valores code) ... */}
          </section>
        </div>
      </div>
    </main>
  );
}