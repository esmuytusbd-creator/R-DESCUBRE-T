import React from 'react';
import type { ViewType } from '../types';
import UserIcon from './icons/UserIcon';
import JournalIcon from './icons/JournalIcon';
import SymptomIcon from './icons/SymptomIcon';
import ResourcesIcon from './icons/ResourcesIcon';
import NutritionIcon from './icons/NutritionIcon';

interface HeaderProps {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
}

const Header = ({ currentView, setCurrentView }: HeaderProps): React.ReactNode => {
  const navItems = [
    { id: 'profile', label: 'Mi Perfil', icon: <UserIcon className="w-5 h-5" /> },
    { id: 'journal', label: 'Diario', icon: <JournalIcon className="w-5 h-5" /> },
    { id: 'symptoms', label: 'Registro Físico y Emocional', icon: <SymptomIcon className="w-5 h-5" /> },
    { id: 'nutrition', label: 'Cuídate por Dentro', icon: <NutritionIcon className="w-5 h-5" /> },
    { id: 'resources', label: 'Cuerpo Consciente', icon: <ResourcesIcon className="w-5 h-5" /> },
  ];

  return (
    <header className="bg-card-bg shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between h-24 sm:h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-accent">
              R-DESCUBRE-T
            </h1>
          </div>
          <nav className="mt-4 sm:mt-0">
            <ul className="flex space-x-2 sm:space-x-4">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setCurrentView(item.id as ViewType)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      currentView === item.id
                        ? 'bg-accent/20 text-accent font-semibold'
                        : 'text-secondary-text hover:bg-accent/10'
                    }`}
                    aria-current={currentView === item.id ? 'page' : undefined}
                  >
                    {item.icon}
                    <span className="hidden md:inline">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
