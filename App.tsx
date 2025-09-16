import React, { useState } from 'react';
import type { ViewType } from './types';
import Header from './components/Header';
import Profile from './components/Profile';
import GratitudeJournal from './components/GratitudeJournal';
import SymptomTracker from './components/SymptomTracker';
import Resources from './components/Resources';
import Nutrition from './components/Nutrition';
import Exercises from './components/Exercises';
import EmailIcon from './components/icons/EmailIcon';
import InstagramIcon from './components/icons/InstagramIcon';
import ShoppingBagIcon from './components/icons/ShoppingBagIcon';
import ProductsModal from './components/ProductsModal';
import YolandaAssistant from './components/YolandaAssistant';
import ChatBotIcon from './components/icons/ChatBotIcon';

function App(): React.ReactNode {
  const [currentView, setCurrentView] = useState<ViewType>('profile');
  const [isProductsModalOpen, setIsProductsModalOpen] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  const renderContent = () => {
    switch (currentView) {
      case 'profile':
        return <Profile />;
      case 'journal':
        return <GratitudeJournal />;
      case 'symptoms':
        return <SymptomTracker />;
      case 'nutrition':
        return <Nutrition onOpenProducts={() => setIsProductsModalOpen(true)} />;
      case 'resources':
        return <Resources setCurrentView={setCurrentView} />;
      case 'exercises':
        return <Exercises setCurrentView={setCurrentView} />;
      default:
        return <Profile />;
    }
  };

  return (
    <div className="min-h-screen text-primary-text font-sans flex flex-col">
      <Header currentView={currentView} setCurrentView={setCurrentView} />
      <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full flex-grow fade-in" key={currentView}>
        {renderContent()}
      </main>
      <footer className="text-center p-4 text-secondary-text text-sm border-t border-border-color mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="my-4">
              <button 
                onClick={() => setIsProductsModalOpen(true)} 
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 bg-accent text-white font-bold rounded-full hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-transform transform hover:scale-105 duration-200 shadow-lg"
              >
                <ShoppingBagIcon className="w-6 h-6 mr-3" />
                <span>DESCUBRE MIS PRODUCTOS</span>
              </button>
            </div>
            <p className="mb-2">&copy; {new Date().getFullYear()} R-DESCUBRE-T | Método 'Es muy tú' por Yolanda Fernández.</p>
            <div className="flex justify-center items-center gap-x-6">
                <a href="mailto:info@esmuytu.cat" className="flex items-center space-x-1.5 hover:text-accent transition-colors">
                    <EmailIcon className="w-5 h-5" />
                    <span>Email</span>
                </a>
                <a href="https://www.instagram.com/esmuytuu/" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1.5 hover:text-accent transition-colors">
                    <InstagramIcon className="w-5 h-5" />
                    <span>Instagram</span>
                </a>
            </div>
        </div>
      </footer>
      <ProductsModal isOpen={isProductsModalOpen} onClose={() => setIsProductsModalOpen(false)} />
      
      <button
        onClick={() => setIsAssistantOpen(true)}
        className="fixed bottom-6 right-6 bg-accent text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center hover:bg-accent-hover transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
        aria-label="Abrir asistente de IA 'Yolanda'"
      >
        <ChatBotIcon className="w-8 h-8" />
      </button>

      <YolandaAssistant isOpen={isAssistantOpen} onClose={() => setIsAssistantOpen(false)} />
    </div>
  );
}

export default App;
