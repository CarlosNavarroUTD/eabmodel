'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contacto() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      // Aquí iría la lógica para enviar el formulario a tu backend
      // Por ejemplo:
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      
      // Simulamos una espera
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // if (!response.ok) throw new Error('Error al enviar el formulario');
      
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
    } catch (err) {
      setError('Hubo un problema al enviar tu mensaje. Por favor, intenta nuevamente.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#efb810]">Contacta con Nosotros</h1>
            <p className="text-xl text-gray-300 mt-4">
              Estamos aquí para responder a tus preguntas y ayudarte a transformar tu negocio
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Formulario de contacto */}
            <div className="bg-black/30 rounded-lg p-8 backdrop-blur-sm border border-gray-800">
              <h2 className="text-2xl font-bold mb-6">Envíanos un mensaje</h2>
              
              {submitted ? (
                <div className="bg-green-900/50 border border-green-700 rounded-lg p-6 text-center">
                  <h3 className="text-xl font-bold text-green-400 mb-2">¡Mensaje enviado!</h3>
                  <p className="text-gray-300">
                    Gracias por contactarnos. Uno de nuestros expertos se pondrá en contacto contigo a la brevedad.
                  </p>
                  <button 
                    className="mt-4 px-6 py-2 bg-[#efb810]/10 border border-[#efb810] rounded-lg hover:bg-[#efb810]/20 transition-colors"
                    onClick={() => setSubmitted(false)}
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-300 mb-2">Nombre completo</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#efb810]/50 focus:border-transparent numbers-font"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-gray-300 mb-2">Correo electrónico</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#efb810]/50 focus:border-transparent numbers-font"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-gray-300 mb-2">Teléfono (opcional)</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#efb810]/50 focus:border-transparent numbers-font"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-gray-300 mb-2">Mensaje</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#efb810]/50 focus:border-transparent"
                    />
                  </div>
                  
                  {error && (
                    <div className="bg-red-900/50 border border-red-700 rounded-lg p-4 text-red-200">
                      {error}
                    </div>
                  )}
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center justify-center w-full px-6 py-3 bg-[#efb810]/10 border border-[#efb810] rounded-lg hover:bg-[#efb810]/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>Enviando...</>
                    ) : (
                      <>
                        <Send className="mr-2" size={20} />
                        Enviar mensaje
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
            
            {/* Información de contacto */}
            <div className="space-y-8">
              <div className="bg-black/30 rounded-lg p-8 backdrop-blur-sm border border-gray-800">
                <h2 className="text-2xl font-bold mb-6">Información de contacto</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Mail className="text-[#efb810] mr-4 mt-1" />
                    <div>
                      <h3 className="font-bold">Correo electrónico</h3>
                      <a href="mailto:carlos@eabmodel.com" className="text-gray-300 hover:text-white transition-colors">
                        carlos<span className='numbers-font'>@</span>eabmodel.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="text-[#efb810] mr-4 mt-1" />
                    <div>
                      <h3 className="font-bold">Teléfono</h3>
                      <a href="tel:+526183347956" className="text-gray-300 hover:text-white transition-colors">
                      <span className='numbers-font'>+52 618 334 7956</span>
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="text-[#efb810] mr-4 mt-1" />
                    <div>
                      <h3 className="font-bold">Dirección</h3>
                      <p className="text-gray-300">
                        Durango, Victoria de Durango<br />
                        Col. Ignacio Zaragoza<br />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
            
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}