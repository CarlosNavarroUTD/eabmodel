import Link from 'next/link';

export default function AccessDenied() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Acceso Denegado</h1>
        <p className="text-gray-700 mb-6">
          No tienes los permisos necesarios para acceder a esta página.
          Por favor, contacta con un administrador si crees que deberías tener acceso.
        </p>
        <div className="flex flex-col space-y-2">
          <Link href="/" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
            Volver al Inicio
          </Link>
          <Link href="/login" className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors">
            Iniciar Sesión con Otra Cuenta
          </Link>
        </div>
      </div>
    </div>
  );
}