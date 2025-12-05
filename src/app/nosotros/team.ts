// src/data/team.ts
export interface TeamMember {
    id: number;
    name: string;
    position: string;
    email: string;
    phone?: string;
    github?: string;
    image: string;
  }
  
  // Array de miembros del equipo
  export const teamMembers: TeamMember[] = [
    // Aquí puedes agregar tus miembros iniciales
    // Ejemplo:
    // {
    //   id: 1,
    //   name: 'Juan Pérez',
    //   position: 'Director General',
    //   email: 'juan@eabmodel.com',
    //   phone: '+521234567890',
    //   github: 'juanperez',
    //   image: '/team/juan.jpg'
    // }
  ];
  
  // Función para agregar nuevos miembros al equipo
  export function addTeamMember(member: Omit<TeamMember, 'id'>) {
    const newMember: TeamMember = {
      id: teamMembers.length + 1,
      phone: member.phone || '',
      github: member.github || '',
      ...member
    };
    
    teamMembers.push(newMember);
    return newMember;
  }
  
  // Función para obtener todos los miembros del equipo
  export function getTeamMembers(): TeamMember[] {
    return teamMembers;
  }
  
  // Función para eliminar un miembro del equipo por ID
  export function removeTeamMember(id: number): TeamMember | null {
    const index = teamMembers.findIndex(member => member.id === id);
    if (index !== -1) {
      return teamMembers.splice(index, 1)[0];
    }
    return null;
  }
  
  // Función para actualizar un miembro del equipo
  export function updateTeamMember(id: number, updates: Partial<Omit<TeamMember, 'id'>>): TeamMember | null {
    const index = teamMembers.findIndex(member => member.id === id);
    if (index !== -1) {
      teamMembers[index] = { ...teamMembers[index], ...updates };
      return teamMembers[index];
    }
    return null;
  }