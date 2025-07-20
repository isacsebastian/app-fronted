import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';

const getRoleColor = (role: string) => {
  const colors: Record<string, string> = {
    SUPER_ADMIN: 'bg-red-100 text-red-800',
    ADMIN: 'bg-orange-100 text-orange-800',
    SELLER: 'bg-blue-100 text-blue-800',
    FREELANCER: 'bg-green-100 text-green-800',
    CUSTOMER: 'bg-purple-100 text-purple-800',
  };
  return colors[role] || 'bg-gray-100 text-gray-800';
};

const getRoleIcon = (role: string) => {
  const icons: Record<string, string> = {
    SUPER_ADMIN: '👑',
    ADMIN: '🔧',
    SELLER: '🛒',
    FREELANCER: '💼',
    CUSTOMER: '👤',
  };
  return icons[role] || '👤';
};

const formatDate = (dateString?: string) => {
  if (!dateString) return 'No especificado';
  return new Date(dateString).toLocaleDateString('es-EC', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const UserProfile: React.FC = () => {
  const { user, updateUserProfile, logout, isLoading, error, clearError } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    firstName: user?.profile?.firstName || '',
    lastName: user?.profile?.lastName || '',
    phone: user?.profile?.phone || '',
    secondaryPhone: user?.profile?.secondaryPhone || '',
  });
  const [formError, setFormError] = useState<string | null>(null);

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

  const isValidPhone = (phone: string) => {
    if (!phone) return true;
    return /^\+593\d{9}$/.test(phone);
  };

  const handleEditToggle = () => {
    clearError();
    if (isEditing) {
      setEditData({
        firstName: user.profile?.firstName || '',
        lastName: user.profile?.lastName || '',
        phone: user.profile?.phone || '',
        secondaryPhone: user.profile?.secondaryPhone || '',
      });
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (field: string, value: string) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = async () => {
    setFormError(null);
    // Validaciones
    if (!editData.firstName.trim() || !editData.lastName.trim()) {
      setFormError('Nombre y apellido son obligatorios.');
      return;
    }
    if (!isValidPhone(editData.phone)) {
      setFormError('El teléfono principal debe tener formato +593XXXXXXXXX.');
      return;
    }
    if (editData.secondaryPhone && !isValidPhone(editData.secondaryPhone)) {
      setFormError('El teléfono secundario debe tener formato +593XXXXXXXXX.');
      return;
    }
    try {
      const dataToSend = {
        ...editData,
        secondaryPhone: editData.secondaryPhone?.trim() ? editData.secondaryPhone : null,
      };
      await updateUserProfile(user.profile.id, dataToSend);
      setIsEditing(false);
    } catch (e) {
      // error ya manejado por el store
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-2">
      {/* Header */}
      <Card className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {user.profile?.firstName?.[0] || ''}{user.profile?.lastName?.[0] || ''}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-gray-900">
                  {user.profile?.firstName} {user.profile?.lastName}
                </h1>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                  {getRoleIcon(user.role)} {user.role.replace('_', ' ')}
                </span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {user.isActive ? 'Activo' : 'Inactivo'}
                </span>
              </div>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleEditToggle} variant="outline" className="border-blue-600 text-blue-700 hover:bg-blue-50">
              {isEditing ? 'Cancelar' : 'Editar Perfil'}
            </Button>
            <Button onClick={logout} variant="default" className="bg-red-600 hover:bg-red-700">
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </Card>

      {/* Error */}
      {(error || formError) && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-800">{formError || error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Información Personal */}
        <Card>
          <CardHeader>
            <CardTitle>Información Personal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                {isEditing ? (
                  <input type="text" value={editData.firstName} onChange={e => handleInputChange('firstName', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                ) : (
                  <p className="text-gray-900">{user.profile?.firstName || 'No especificado'}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
                {isEditing ? (
                  <input type="text" value={editData.lastName} onChange={e => handleInputChange('lastName', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                ) : (
                  <p className="text-gray-900">{user.profile?.lastName || 'No especificado'}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono Principal</label>
                {isEditing ? (
                  <input type="tel" value={editData.phone} onChange={e => handleInputChange('phone', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="+593999999999" />
                ) : (
                  <p className="text-gray-900">{user.profile?.phone || 'No especificado'}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono Secundario</label>
                {isEditing ? (
                  <input type="tel" value={editData.secondaryPhone} onChange={e => handleInputChange('secondaryPhone', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="+593999999999" />
                ) : (
                  <p className="text-gray-900">{user.profile?.secondaryPhone || 'No especificado'}</p>
                )}
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Usuario</label>
              <p className="text-gray-900">
                {user.profile?.userType === 'NATURAL_PERSON' ? 'Persona Natural' : 'Persona Jurídica'}
              </p>
            </div>
            {user.profile?.userType === 'LEGAL_ENTITY' && (
              <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Empresa</label>
                <p className="text-gray-900">{user.profile?.companyName || 'No especificado'}</p>
              </div>
            )}
            {isEditing && (
              <div className="pt-4 border-t mt-4">
                <Button onClick={handleSaveProfile} disabled={isLoading} className="w-full bg-green-600 hover:bg-green-700">
                  {isLoading ? 'Guardando...' : 'Guardar Cambios'}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Estado de la Cuenta */}
        <Card>
          <CardHeader>
            <CardTitle>Estado de la Cuenta</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Email Verificado</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.isEmailVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {user.isEmailVerified ? 'Verificado' : 'Pendiente'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Cuenta Activa</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {user.isActive ? 'Activa' : 'Inactiva'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Marketing</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.profile?.acceptsMarketing ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                  {user.profile?.acceptsMarketing ? 'Suscrito' : 'No suscrito'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">SMS</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.profile?.acceptsSms ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                  {user.profile?.acceptsSms ? 'Activado' : 'Desactivado'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Intentos de Login</span>
                <span className="text-gray-900">{user.loginAttempts}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Cuenta Creada</span>
                <span className="text-gray-900">{formatDate(user.createdAt)}</span>
              </div>
              {user.lastLoginAt && (
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Último Login</span>
                  <span className="text-gray-900">{formatDate(user.lastLoginAt)}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;
