import Image from 'next/image';
import { Mail, Phone, Github } from 'lucide-react';
import { PrismaClient } from '@prisma/client';
import { Metadata } from 'next';

// Metadata for the page
export const metadata: Metadata = {
  title: 'Nuestro Equipo - EABMODEL',
  description: 'Conoce al equipo de profesionales detrás de EABMODEL'
};

// Fetch team members from the database
async function getTeamMembers() {
  const prisma = new PrismaClient();
  
  try {
    // Fetch users with the ADMIN role
    const teamMembers = await prisma.user.findMany({
      where: {
        OR: [
          { role: 'USER' },
          // You can add additional conditions to select specific team members
          // For example, you could add a custom field like isTeamMember
        ]
      },
      select: {
        id: true,
        name: true,
        email: true,
        position: true,
        image: true,
        phone: true,
        githubAccount: {
          select: {
            username: true
          }
        }
      }
    });

    return teamMembers.map(member => ({
      id: member.id,
      name: member.name || 'Miembro del Equipo',
      position: member.position || 'Colaborador',
      image: member.image || '/default-avatar.png',
      email: member.email,
      phone: member.phone,
      github: member.githubAccount?.username
    }));
  } catch (error) {
    console.error('Error fetching team members:', error);
    return [];
  } finally {
    await prisma.$disconnect();
  }
}

export default async function Nosotros() {
  const teamMembers = await getTeamMembers();

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