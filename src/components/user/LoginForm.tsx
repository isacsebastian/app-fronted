// src/components/user/LoginForm.tsx
import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import type { LoginRequest } from "../../types/user";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const demoUsers = [
  { label: "Administrador", email: "admin@lupa.com", color: "blue" },
  { label: "Cliente", email: "cliente1@gmail.com", color: "purple" },
];

const LoginForm: React.FC = () => {
  const { login, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginRequest>({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    try {
      await login(formData);
      navigate("/dashboard");
    } catch (err) {
      // error ya manejado por el store
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100">
      <Card className="w-full max-w-md shadow-xl border-0">
        <CardHeader className="flex flex-col items-center">
          <div className="h-16 w-16 rounded-full overflow-hidden bg-white border border-gray-200 flex items-center justify-center shadow mb-2">
            <img
              src="/LOGO-LUPA-1.webp"
              alt="Lupa Logo"
              className="object-contain h-12 w-12"
              style={{ maxHeight: 48, maxWidth: 48 }}
            />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">Iniciar Sesión</CardTitle>
          <p className="text-gray-500 text-sm mt-1">Accede a tu cuenta para continuar</p>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-2 bg-red-50 border border-red-200 rounded text-red-700 text-sm flex items-center justify-between">
              <span>{error}</span>
              <button onClick={clearError} className="ml-2 text-red-500 hover:text-red-700">×</button>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              name="email"
              placeholder="Correo Electrónico"
              value={formData.email}
              onChange={e => setFormData(f => ({ ...f, email: e.target.value }))}
              required
              disabled={isLoading}
              autoComplete="username"
            />
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={e => setFormData(f => ({ ...f, password: e.target.value }))}
                required
                disabled={isLoading}
                autoComplete="current-password"
              />
              <button
                type="button"
                tabIndex={-1}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(s => !s)}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold"
              disabled={isLoading}
            >
              {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </Button>
          </form>
          <div className="mt-4 text-center space-y-2">
            <span className="text-sm text-gray-600">¿No tienes cuenta?</span>{" "}
            <button
              type="button"
              className="text-blue-600 hover:text-blue-500 font-medium"
              onClick={() => navigate("/register")}
            >
              Regístrate aquí
            </button>
            <div>
              <button
                type="button"
                className="text-xs text-blue-500 hover:underline mt-2"
                onClick={() => alert('Funcionalidad de recuperación de contraseña próximamente.')}
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;