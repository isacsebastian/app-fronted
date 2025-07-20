import React, { useState } from "react";
import { useUserStore } from "../../stores/userStore";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import type { RegisterRequest } from "../../types/user";

const initialForm: RegisterRequest = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  phone: "",
};

const validateEmail = (email: string) =>
  /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);

const isStrongPassword = (password: string) => {
  // Al menos 8 caracteres, 1 mayúscula, 1 minúscula, 1 número, 1 símbolo
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/.test(password);
};

const isValidPhone = (phone: string) => {
  return /^\+593\d{9}$/.test(phone);
};

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const { register, isLoading, error, clearError } = useUserStore();
  const [formData, setFormData] = useState<RegisterRequest>(initialForm);
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let newValue = value;
    // Transformar teléfono a formato internacional si es necesario
    if (name === "phone") {
      // Si empieza con 0 y tiene 10 dígitos, transformar a +593...
      if (/^0\d{9}$/.test(value)) {
        newValue = "+593" + value.slice(1);
      }
    }
    setFormData((prev) => ({ ...prev, [name]: newValue }));
    setFormError(null);
  };

  const validateForm = () => {
    if (!validateEmail(formData.email)) return "Correo electrónico inválido.";
    if (!isStrongPassword(formData.password)) return "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo.";
    if (!formData.firstName.trim() || !formData.lastName.trim()) return "Nombre y apellido son obligatorios.";
    if (!formData.phone.trim()) return "El teléfono es obligatorio.";
    if (!isValidPhone(formData.phone)) return "El teléfono debe tener formato +593XXXXXXXXX.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    const validation = validateForm();
    if (validation) {
      setFormError(validation);
      return;
    }
    try {
      await register(formData);
      setSuccess(true);
      setTimeout(() => navigate("/dashboard"), 1000);
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
          <CardTitle className="text-2xl font-bold text-gray-900">Crear cuenta</CardTitle>
          <p className="text-gray-500 text-sm mt-1">Regístrate para comenzar</p>
        </CardHeader>
        <CardContent>
          {success && (
            <div className="mb-4 p-2 bg-green-50 border border-green-200 rounded text-green-700 text-sm text-center">
              ¡Registro exitoso! Redirigiendo...
            </div>
          )}
          {(formError || error) && (
            <div className="mb-4 p-2 bg-red-50 border border-red-200 rounded text-red-700 text-sm flex items-center justify-between">
              <span>{formError || error}</span>
              <button onClick={clearError} className="ml-2 text-red-500 hover:text-red-700">×</button>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              name="email"
              placeholder="Correo Electrónico"
              value={formData.email}
              onChange={handleChange}
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
                onChange={handleChange}
                required
                disabled={isLoading}
                autoComplete="new-password"
                minLength={8}
              />
              <button
                type="button"
                tabIndex={-1}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword((s) => !s)}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
            <div className="flex gap-2">
              <Input
                type="text"
                name="firstName"
                placeholder="Nombre"
                value={formData.firstName}
                onChange={handleChange}
                disabled={isLoading}
                autoComplete="given-name"
              />
              <Input
                type="text"
                name="lastName"
                placeholder="Apellido"
                value={formData.lastName}
                onChange={handleChange}
                disabled={isLoading}
                autoComplete="family-name"
              />
            </div>
            <Input
              type="tel"
              name="phone"
              placeholder="Teléfono (+593999999999)"
              value={formData.phone}
              onChange={handleChange}
              required
              disabled={isLoading}
              autoComplete="tel"
            />
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold"
              disabled={isLoading}
            >
              {isLoading ? "Registrando..." : "Registrarse"}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <span className="text-sm text-gray-600">¿Ya tienes cuenta?</span>{" "}
            <button
              type="button"
              className="text-blue-600 hover:text-blue-500 font-medium"
              onClick={() => navigate("/login")}
            >
              Inicia sesión
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterForm; 