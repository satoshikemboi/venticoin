import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  BarChart3, 
  ArrowLeftRight, 
  Cpu, 
  UserCircle 
} from 'lucide-react';

const BottomNav = () => {
  const navItems = [
    { name: 'Home', path: '/dashboard', icon: <Home size={22} /> },
    { name: 'Markets', path: '/markets', icon: <BarChart3 size={22} /> },
    { name: 'Spot', path: '/spot-trading', icon: <ArrowLeftRight size={22} /> },
    { name: 'Bots', path: '/bots', icon: <Cpu size={22} /> },
    { name: 'Profile', path: '/profile', icon: <UserCircle size={22} /> },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 z-50 w-full h-16 bg-white dark:bg-gray-900 border-t font-nunito rounded-t-2xl shadow-[0_-4px_10px_rgba(0,0,0,0.05)] pb-[env(safe-area-inset-bottom)]">
  <div className="grid h-full w-full grid-cols-5 mx-auto">
    {navItems.map((item) => (
      <NavLink
        key={item.name}
        to={item.path}
        end={item.path === '/home'} 
        className={({ isActive }) =>
          `flex flex-col items-center justify-center transition-all duration-300 relative ${
            isActive 
              ? 'text-green-600' 
              : 'text-gray-400 hover:text-gray-600'
          }`
        }
      >
        {({ isActive }) => (
          <>
            {/* Icon - Scale slightly when active */}
            <span className={`text-xl transition-transform ${isActive ? 'scale-110' : 'scale-100'}`}>
              {item.icon}
            </span>
            
            {/* Label */}
            <span className={`text-[10px] font-bold mt-1.5 transition-colors ${
              isActive ? 'text-green-600' : 'text-gray-400'
            }`}>
              {item.name}
            </span>

            {/* Optional: Active Indicator Line at the top */}
            {isActive && (
              <div className="absolute top-0 w-8 h-1 bg-green-500 rounded-b-full shadow-[0_1px_5px_rgba(34,197,94,0.4)]" />
            )}
          </>
        )}
      </NavLink>
    ))}
  </div>
</nav>
  );
};

export default BottomNav;