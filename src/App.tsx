// src/App.tsx
import React from 'react';
import { useAuth } from './hooks/useAuth';
import LoginForm from './components/user/LoginForm';

const App: React.FC = () => {
  const { isAuthenticated, user, logout, isLoading } = useAuth();

  // Pantalla de carga inicial
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  // Si está autenticado, mostrar datos del usuario
  if (isAuthenticated && user) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-green-600 mb-2">¡Login Exitoso! ✅</h1>
              <p className="text-gray-600">Conexión con el backend funcionando correctamente</p>
            </div>

            {/* Información del usuario */}
            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email:</label>
                  <p className="text-gray-900">{user.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Rol:</label>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {user.role}
                  </span>
                </div>
              </div>

              {user.profile && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Nombre:</label>
                      <p className="text-gray-900">{user.profile.firstName} {user.profile.lastName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Teléfono:</label>
                      <p className="text-gray-900">{user.profile.phone}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Tipo de Usuario:</label>
                      <p className="text-gray-900">{user.profile.userType}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Documento:</label>
                      <p className="text-gray-900">{user.profile.documentType} - {user.profile.documentNumber}</p>
                    </div>
                  </div>
                </>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Estado:</label>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {user.isActive ? 'Activo' : 'Inactivo'}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email verificado:</label>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.isEmailVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {user.isEmailVerified ? 'Verificado' : 'Pendiente'}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Cuenta creada:</label>
                <p className="text-gray-900">{new Date(user.createdAt).toLocaleDateString('es-EC', {
                  year: 'numeric',
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</p>
              </div>
            </div>

            {/* Botón de logout */}
            <div className="text-center">
              <button
                onClick={logout}
                className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors"
              >
                Cerrar Sesión
              </button>
            </div>

            {/* Información técnica */}
            <div className="mt-6 p-4 bg-gray-50 rounded-md">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">ℹ️ Información técnica:</h3>
              <div className="text-xs text-gray-600 space-y-1">
                <div>✅ Conexión exitosa con backend NestJS</div>
                <div>✅ API URL: http://localhost:8000/api/v1</div>
                <div>✅ Tokens JWT guardados en localStorage</div>
                <div>✅ Store Zustand funcionando</div>
                <div>✅ Interfaces TypeScript sincronizadas con Prisma</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Si no está autenticado, mostrar el formulario de login
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <LoginForm />
    </div>
  );
};

export default App;