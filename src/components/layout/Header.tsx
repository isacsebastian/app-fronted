import { useUserStore } from '../../stores/userStore';

export function Header() {
  const user = useUserStore((state) => state.user);
  const name = user?.profile ? `${user.profile.firstName} ${user.profile.lastName}` : 'Invitado';
  const role = user?.role ? user.role.replace('_', ' ').toLowerCase() : '';

  return (
    <header className="w-full h-16 flex items-center justify-between px-6 bg-white border-b shadow-sm">
      <div className="flex items-center gap-3">
        <img src="/LOGO-LUPA-1.webp" alt="Logo" className="h-10 w-10 object-contain" />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-gray-600 font-semibold">{name}</span>
        {role && <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full capitalize">{role}</span>}
      </div>
    </header>
  );
}
