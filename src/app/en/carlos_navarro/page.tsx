'use client'

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

const Portfolio = () => {
  const statsRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const statItems = entry.target.querySelectorAll('.stat-item span');
            statItems.forEach((item) => {
              const finalValue = parseInt(item.getAttribute('data-value') || '0');
              animateValue(item as HTMLElement, 0, finalValue, 2000);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  const animateValue = (obj: HTMLElement, start: number, end: number, duration: number) => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      obj.innerHTML = Math.floor(progress * (end - start) + start).toString();
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

  // For the copy functionality
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('¡Copiado!');
  };

  // For the send functionality
  const handleSend = (type: 'phone' | 'email' | 'linkedin', value?: string) => {
    switch (type) {
      case 'phone':
        window.open(`https://wa.me/${value}`, '_blank');
        break;
      case 'email':
        window.open(`mailto:${value}`, '_blank');
        break;
      case 'linkedin':
        window.open('https://www.linkedin.com/in/carlos-navarro-huerta-350b13243', '_blank');
        break;
      default:
        break;
    }
  };

  return (
    <div className="bg-black-900 text-white p-5 relative">
      <div className="absolute inset-0 bg-cover opacity-20 z-0" style={{ backgroundImage: "url('/imgs/black-clouds.jpg')" }}></div>
      
      <main className="max-w-6xl mx-auto relative z-10">
        <section id="about" className="flex flex-col md:flex-row gap-5 md:gap-10 items-center">
            <div className="column">
            <Image
              src="/imgs/sho.jpg" 
              alt="Carlos Navarro" 
              width={400} 
              height={400} 
              className="rounded-full"
            />
            </div>
          <div className="column">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">Hello! My name is <span className="text-[#efb810]">Carlos Navarro</span></h1>
            <p className="text-xl md:text-2xl">Web Developer & Information Technology Student</p>
          </div>
        </section>

        <section id="sobre-mi" className="flex flex-col items-center gap-5 mt-10">
          <div className="title_section text-center">
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold border-b-4 border-gray-400 pb-2">About Me</h2>
          </div>

          <div className="sub-section flex flex-col md:flex-row gap-5 md:gap-10">
            <div className="column w-full md:w-1/2">
              <p className="text-lg md:text-xl lg:text-2xl text-justify">
              I have extensive experience working in teams, both in-person and remotely. I am seeking a job opportunity where I can showcase my skills and gain more professional experience.
              </p>
            </div>
            <div className="column w-full md:w-1/2">
              <div ref={statsRef} className="stats grid grid-cols-2 gap-3">
          <div className="stat-item text-center bg-gray-900 bg-opacity-40 p-4 rounded">
            <div className="stat-number text-4xl">+<span className="numbers-font" data-value="3">0</span></div>
            <div className="stat-text text-xl">Years of Experience</div>
          </div>
          <div className="stat-item text-center bg-gray-900 bg-opacity-40 p-4 rounded">
            <div className="stat-number text-4xl">+<span className="numbers-font" data-value="20">0</span></div>
            <div className="stat-text text-xl">Satisfied Clients</div>
          </div>
          <div className="stat-item text-center bg-gray-900 bg-opacity-40 p-4 rounded">
            <div className="stat-number text-4xl">+<span className="numbers-font" data-value="15">0</span></div>
            <div className="stat-text text-xl">Websites Delivered</div>
          </div>
          <div className="stat-item text-center bg-gray-900 bg-opacity-40 p-4 rounded">
            <div className="stat-number text-4xl">+<span className="numbers-font" data-value="10">0</span></div>
            <div className="stat-text text-xl">Certifications</div>
          </div>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="py-8">
          <div className="title_section text-center">
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold border-b-4 border-gray-400 pb-2">Skills</h2>
          </div>
          
          <div className="skills-grid grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
            <div className="skill-category p-5 rounded">
              <div className="row flex items-center justify-center mb-5">
                <Image width={400} height={400}  src="/imgs/escritorio.png" alt="Frontend" className="w-16 h-16 mr-3" />
                <h3 className="text-2xl font-bold">FrontEnd</h3>
              </div>
              <div className="row grid grid-cols-2 gap-3">
                <div className="skill flex items-center justify-center p-3 bg-gray-900 bg-opacity-40 rounded">
                  <Image width={400} height={400}  src="/imgs/html-5.png" alt="HTML5" className="w-10 h-10 mx-2" />
                  <p className="text-lg numbers-font">HTML5</p>
                </div>
                <div className="skill flex items-center justify-center p-3 bg-gray-900 bg-opacity-40 rounded">
                  <Image width={400} height={400}  src="/imgs/css-3.png" alt="CSS3" className="w-10 h-10 mx-2" />
                  <p className="text-lg numbers-font">CSS3</p>
                </div>
                <div className="skill flex items-center justify-center p-3 bg-gray-900 bg-opacity-40 rounded">
                  <Image width={400} height={400}  src="/imgs/javascrip-logo.png" alt="JavaScript" className="w-10 h-10 mx-2" />
                  <p className="text-lg">JavaScript</p>
                </div>
                <div className="skill flex items-center justify-center p-3 bg-gray-900 bg-opacity-40 rounded">
                  <Image width={400} height={400}  src="/imgs/tailwind.png" alt="Tailwind" className="w-10 h-10 mx-2" />
                  <p className="text-lg">Tailwind</p>
                </div>
              </div>
            </div>

            <div className="skill-category p-5 rounded">
              <div className="row flex items-center justify-center mb-5">
                <Image width={400} height={400}  src="/imgs/dev.png" alt="Backend" className="w-16 h-16 mr-3" />
                <h3 className="text-2xl font-bold">BackEnd</h3>
              </div>
              <div className="row grid grid-cols-2 gap-3">
                <div className="skill flex items-center justify-center p-3 bg-gray-900 bg-opacity-40 rounded">
                  <Image width={400} height={400}  src="/imgs/djangoproject.svg" alt="Django" className="w-10 h-10 mx-2" />
                  <p className="text-lg">Django</p>
                </div>
                <div className="skill flex items-center justify-center p-3 bg-gray-900 bg-opacity-40 rounded">
                  <Image width={400} height={400}  src="/imgs/python.png" alt="Python" className="w-10 h-10 mx-2" />
                  <p className="text-lg">Python</p>
                </div>
                <div className="skill flex items-center justify-center p-3 bg-gray-900 bg-opacity-40 rounded">
                  <Image width={400} height={400}  src="/imgs/n8n_box.png" alt="N8N" className="w-10 h-10 mx-2" />
                  <p className="text-lg numbers-font">N8N</p>
                </div>
                <div className="skill flex items-center justify-center p-3 bg-gray-900 bg-opacity-40 rounded">
                  <Image width={400} height={400}  src="/imgs/mysql.png" alt="MySQL" className="w-10 h-10 mx-2" />
                  <p className="text-lg">MySQL</p>
                </div>
              </div>
            </div>

            <div className="skill-category p-5 rounded">
              <div className="row flex items-center justify-center mb-5">
                <Image width={400} height={400}  src="/imgs/collaboration-icon.png" alt="Colaboración" className="w-16 h-16 mr-3" />
                <h3 className="text-2xl font-bold">Collaboration</h3>
              </div>
              <div className="row grid grid-cols-2 gap-3">
                <div className="skill flex items-center justify-center p-3 bg-gray-900 bg-opacity-40 rounded">
                  <Image width={400} height={400}  src="/imgs/Notion-logo.svg" alt="Notion" className="w-10 h-10 mx-2" />
                  <p className="text-lg">Notion</p>
                </div>
                <div className="skill flex items-center justify-center p-3 bg-gray-900 bg-opacity-40 rounded">
                  <Image width={400} height={400}  src="/imgs/slack-logo.svg" alt="Slack" className="w-10 h-10 mx-2" />
                  <p className="text-lg">Slack</p>
                </div>
                <div className="skill flex items-center justify-center p-3 bg-gray-900 bg-opacity-40 rounded">
                  <Image width={400} height={400}  src="/imgs/github-log.png" alt="GitHub" className="w-10 h-10 mx-2" />
                  <p className="text-lg">GitHub</p>
                </div>
                <div className="skill flex items-center justify-center p-3 bg-gray-900 bg-opacity-40 rounded">
                  <Image width={400} height={400}  src="/imgs/discord.svg" alt="Discord" className="w-10 h-10 mx-2" />
                  <p className="text-lg">Discord</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="experience" className="py-8">
          <div className="title_section text-center">
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold border-b-4 border-gray-400 pb-2">Experience</h2>
          </div>
          <div className="job-info text-center">
            <h3 className="text-3xl md:text-4xl font-bold">Axol Marketing</h3>
            <p className="text-xl numbers-font opacity-80">(2022-Present)</p>
          </div>
          <br />
          <div className="job-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            <div className="job-item bg-gray-900 bg-opacity-40 rounded p-5 flex flex-col items-center text-center">
              <Image width={400} height={400}  src="/imgs/cms.png" alt="CMS" className="w-12 h-12 mb-3" />
              <h4 className="text-2xl font-bold mb-2">Content Management</h4>
              <p className="text-lg">WordPress, Wix, Shopify</p>
            </div>
            <div className="job-item bg-gray-900 bg-opacity-40 rounded p-5 flex flex-col items-center text-center">
              <Image width={400} height={400}  src="/imgs/crm.png" alt="CRM" className="w-12 h-12 mb-3" />
              <h4 className="text-2xl font-bold mb-2">Customer Relationship Management</h4>
              <p className="text-lg">HubSpot, Clientify, Odoo</p>
            </div>
            <div className="job-item bg-gray-900 bg-opacity-40 rounded p-5 flex flex-col items-center text-center">
              <Image width={400} height={400}  src="/imgs/diseno-web.png" alt="Optimización web" className="w-12 h-12 mb-3" />
              <h4 className="text-2xl font-bold mb-2">Web Optimization</h4>
              <p className="text-lg">SEO, responsive design, and load speed optimization</p>
            </div>
            <div className="job-item bg-gray-900 bg-opacity-40 rounded p-5 flex flex-col items-center text-center">
              <Image width={400} height={400}  src="/imgs/desarrollador-de-software.png" alt="Desarrollo web" className="w-12 h-12 mb-3" />
              <h4 className="text-2xl font-bold mb-2">Web Development</h4>
              <p className="text-lg">HTML, CSS, JavaScript, and related frameworks</p>
            </div>
            <div className="job-item bg-gray-900 bg-opacity-40 rounded p-5 flex flex-col items-center text-center">
              <Image width={400} height={400}  src="/imgs/analitica.png" alt="Análisis de datos" className="w-12 h-12 mb-3" />
              <h4 className="text-2xl font-bold mb-2">Data Analysis</h4>
              <p className="text-lg">Looker Studio, Google Analytics, and Facebook Analytics</p>
            </div>
            <div className="job-item bg-gray-900 bg-opacity-40 rounded p-5 flex flex-col items-center text-center">
              <Image width={400} height={400}  src="/imgs/agente-de-servicio-al-cliente.png" alt="Capacitaciones" className="w-12 h-12 mb-3" />
              <h4 className="text-2xl font-bold mb-2">Training</h4>
              <p className="text-lg">Instruction sessions on all these tools</p>
            </div>
          </div>
        </section>

        <section id="contacto" className="py-8">
          <div className="title_section text-center">
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold border-b-4 border-gray-400 pb-2">Contact Me</h2>
          </div>
          <div className="contact-list max-w-md mx-auto">
            <div className="contact-item flex items-center bg-gray-600 bg-opacity-50 rounded-lg p-3 my-4 relative">
              <Image width={400} height={400}  src="/imgs/whatsapp.png" alt="Teléfono" className="w-9 h-9 mr-3" />
              <p className="flex-grow m-1 p-1 rounded bg-gray-400 bg-opacity-80 text-xl numbers-font">+52 1 663-205-8150</p>
              <button 
                className="bg-gray-600 bg-opacity-70 border-none rounded p-1 ml-1 cursor-pointer hover:bg-gray-600"
                onClick={() => handleCopy("5216632058150")}
                title="Copiar"
              >
                <Image width={400} height={400}  src="/imgs/copiar.png" alt="Copiar" className="w-6 h-6" />
              </button>
              <button 
                className="bg-gray-600 bg-opacity-70 border-none rounded p-1 ml-1 cursor-pointer hover:bg-gray-600"
                onClick={() => handleSend("phone", "5216632058150")}
                title="Enviar"
              >
                <Image width={400} height={400}  src="/imgs/enviar.png" alt="Enviar" className="w-6 h-6" />
              </button>
            </div>

            <div className="contact-item flex items-center bg-gray-600 bg-opacity-50 rounded-lg p-3 my-4 relative">
              <Image width={400} height={400}  src="/imgs/correo-electronico.png" alt="Email" className="w-9 h-9 mr-3" />
              <p className="flex-grow m-1 p-1 rounded bg-gray-400 bg-opacity-80 text-xl">sharlye<span className='numbers-font'>0541@</span>gmail.com</p>
              <button 
                className="bg-gray-600 bg-opacity-70 border-none rounded p-1 ml-1 cursor-pointer hover:bg-gray-600"
                onClick={() => handleCopy("sharlye0541@gmail.com")}
                title="Copiar"
              >
                <Image width={400} height={400}  src="/imgs/copiar.png" alt="Copiar" className="w-6 h-6" />
              </button>
              <button 
                className="bg-gray-600 bg-opacity-70 border-none rounded p-1 ml-1 cursor-pointer hover:bg-gray-600"
                onClick={() => handleSend("email", "sharlye0541@gmail.com")}
                title="Enviar"
              >
                <Image width={400} height={400}  src="/imgs/enviar.png" alt="Enviar" className="w-6 h-6" />
              </button>
            </div>

            <div className="contact-item flex items-center bg-gray-600 bg-opacity-50 rounded-lg p-3 my-4 relative">
              <Image width={400} height={400}  src="/imgs/logotipo-de-linkedin.png" alt="LinkedIn" className="w-9 h-9 mr-3" />
              <p className="flex-grow m-1 p-1 rounded bg-gray-400 bg-opacity-80 text-xl">Carlos Jair Navarro Huerta</p>
              <button 
                className="bg-gray-600 bg-opacity-70 border-none rounded p-1 ml-1 cursor-pointer hover:bg-gray-600"
                onClick={() => handleCopy("Carlos Jair Navarro Huerta")}
                title="Copiar"
              >
                <Image width={400} height={400}  src="/imgs/copiar.png" alt="Copiar" className="w-6 h-6" />
              </button>
              <button 
                className="bg-gray-600 bg-opacity-70 border-none rounded p-1 ml-1 cursor-pointer hover:bg-gray-600"
                onClick={() => handleSend("linkedin")}
                title="Enviar"
              >
                <Image width={400} height={400}  src="/imgs/enviar.png" alt="Enviar" className="w-6 h-6" />
              </button>
            </div>
          </div>
        </section>

        <section id="hobbies" className="py-8">
          <div className="title_section text-center">
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold border-b-4 border-purple-400 pb-2">Hobbies</h2>
          </div>
          <div className="hobbies-icons flex flex-wrap justify-around mt-5">
            <Image width={400} height={400}  src="/imgs/guitarra-electrica.png" alt="Guitarra" className="w-16 h-16 md:w-20 md:h-20 m-3 md:m-5" />
            <Image width={400} height={400}  src="/imgs/origami-de-papel.png" alt="Origami" className="w-16 h-16 md:w-20 md:h-20 m-3 md:m-5" />
            <Image width={400} height={400}  src="/imgs/consola.png" alt="Videojuegos" className="w-16 h-16 md:w-20 md:h-20 m-3 md:m-5" />
            <Image width={400} height={400}  src="/imgs/ciclismo.png" alt="Ciclismo" className="w-16 h-16 md:w-20 md:h-20 m-3 md:m-5" />
            <Image width={400} height={400}  src="/imgs/jardineria.png" alt="jardineria" className="w-16 h-16 md:w-20 md:h-20 m-3 md:m-5" />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Portfolio;