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
    <nav className="md:hidden fixed bottom-0 left-0 z-50 w-full h-16 bg-emerald-500 border-t font-nunito rounded-t-xl border-gray-200 pb-[env(safe-area-inset-bottom)]">
      <div className="grid h-full w-full grid-cols-5 mx-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            // end ensures /home doesn't stay active when you're at /home/something-else
            end={item.path === '/home'} 
            className={({ isActive }) =>
              `flex flex-col items-center items-bold justify-center transition-all duration-200 ${
                isActive 
                  ? 'text-gray-800 ' 
                  : 'text-gray-100 hover:text-gray-700 dark:hover:text-gray-200'
              }`
            }
          >
            {item.icon}
            <span className="text-medium text-gray-100 font-bold mt-1 leading-none">
              {item.name}
            </span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;