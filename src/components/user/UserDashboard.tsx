// src/components/user/UserDashboard.tsx
import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import type { User, UserProfile, UserRole, UserType } from '../../types/user';

interface UserDashboardProps {
  onLogout?: () => void;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ onLogout }) => {
  const { user, logout, updateProfile, isLoading, error } = useAuth();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editData, setEditData] = useState<Partial<UserProfile>>({});

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700">No hay usuario autenticado</h2>
          <p className="text-gray-500 mt-2">Por favor inicia sesión</p>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    onLogout?.();
  };

  const handleEditToggle = () => {
    if (isEditing) {
      setEditData({});
    } else {
      setEditData({
        firstName: user.profile?.firstName || '',
        lastName: user.profile?.lastName || '',
        phone: user.profile?.phone || '',
        secondaryPhone: user.profile?.secondaryPhone || '',
      });
    }
    setIsEditing(!isEditing);
  };

  const handleSaveProfile = async () => {
    try {
      await updateProfile(user.id, { profile: editData } as Partial<User>);
      setIsEditing(false);
      setEditData({});
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
    }
  };

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getRoleColor = (role: UserRole): string => {
    const colors = {
      SUPER_ADMIN: 'bg-red-100 text-red-800',
      ADMIN: 'bg-orange-100 text-orange-800',
      SELLER: 'bg-blue-100 text-blue-800',
      FREELANCER: 'bg-green-100 text-green-800',
      CUSTOMER: 'bg-purple-100 text-purple-800',
    };
    return colors[role] || 'bg-gray-100 text-gray-800';
  };

  const getRoleIcon = (role: UserRole): string => {
    const icons = {
      SUPER_ADMIN: '👑',
      ADMIN: '🔧',
      SELLER: '🛒',
      FREELANCER: '💼',
      CUSTOMER: '👤',
    };
    return icons[role] || '👤';
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('es-EC', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {user.profile?.firstName?.[0]}{user.profile?.lastName?.[0]}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {user.profile?.firstName} {user.profile?.lastName}
                  </h1>
                  <p className="text-gray-600">{user.email}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                      {getRoleIcon(user.role)} {user.role}
                    </span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {user.isActive ? '✅ Activo' : '❌ Inactivo'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={handleEditToggle}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  {isEditing ? 'Cancelar' : 'Editar Perfil'}
                </button>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                >
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Información Personal */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Información Personal</h2>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.firstName || ''}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900">{user.profile?.firstName || 'No especificado'}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.lastName || ''}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900">{user.profile?.lastName || 'No especificado'}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono Principal</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editData.phone || ''}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900">{user.profile?.phone || 'No especificado'}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono Secundario</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editData.secondaryPhone || ''}
                      onChange={(e) => handleInputChange('secondaryPhone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900">{user.profile?.secondaryPhone || 'No especificado'}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Usuario</label>
                <p className="text-gray-900">
                  {user.profile?.userType === 'NATURAL_PERSON' ? 'Persona Natural' : 'Persona Jurídica'}
                </p>
              </div>

              {user.profile?.userType === 'LEGAL_ENTITY' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Empresa</label>
                  <p className="text-gray-900">{user.profile?.companyName || 'No especificado'}</p>
                </div>
              )}

              {isEditing && (
                <div className="pt-4 border-t">
                  <button
                    onClick={handleSaveProfile}
                    disabled={isLoading}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors"
                  >
                    {isLoading ? 'Guardando...' : 'Guardar Cambios'}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Estado de la Cuenta */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Estado de la Cuenta</h2>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Email Verificado</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.isEmailVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {user.isEmailVerified ? '✅ Verificado' : '⏳ Pendiente'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Cuenta Activa</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {user.isActive ? '✅ Activa' : '❌ Inactiva'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Marketing</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.profile?.acceptsMarketing ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                  {user.profile?.acceptsMarketing ? '📧 Suscrito' : '🚫 No suscrito'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">SMS</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.profile?.acceptsSms ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                  {user.profile?.acceptsSms ? '📱 Activado' : '🚫 Desactivado'}
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Intentos de Login</label>
                <p className="text-gray-900">{user.loginAttempts}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cuenta Creada</label>
                <p className="text-gray-900">{formatDate(user.createdAt)}</p>
              </div>
              {user.lastLoginAt && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Último Login</label>
                  <p className="text-gray-900">{formatDate(user.lastLoginAt)}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;