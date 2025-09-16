import React, { useState, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { SymptomEntry } from '../types';
import PlusIcon from './icons/PlusIcon';
import TrashIcon from './icons/TrashIcon';
import CalendarIcon from './icons/CalendarIcon';
import ListIcon from './icons/ListIcon';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import ChevronRightIcon from './icons/ChevronRightIcon';
import LeafIcon from './icons/LeafIcon';

type View = 'list' | 'calendar';

// Tooltip Component
const Tooltip = ({ content, x, y }: { content: string[]; x: number; y: number }) => (
    <div 
        style={{ top: y + 15, left: x + 15, transform: 'translate(-50%, 0)' }} 
        className="fixed bg-accent text-white p-3 rounded-lg shadow-xl text-sm z-50 max-w-xs pointer-events-none transition-opacity duration-200"
    >
        {content.map((line, index) => <div key={index}>{line}</div>)}
    </div>
);

// Calendar View Component
const CalendarView = ({ symptoms }: { symptoms: SymptomEntry[] }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [tooltip, setTooltip] = useState<{ content: string[]; x: number; y: number } | null>(null);

    const intensityColors = ['bg-green-500', 'bg-lime-500', 'bg-yellow-500', 'bg-orange-500', 'bg-red-500'];
    const intensityHoverColors = ['hover:bg-green-400', 'hover:bg-lime-400', 'hover:bg-yellow-400', 'hover:bg-orange-400', 'hover:bg-red-400'];

    const symptomsByDate = useMemo(() => {
        return symptoms.reduce((acc, symptom) => {
            const dateKey = new Date(symptom.id).toLocaleDateString('en-CA'); // YYYY-MM-DD format
            if (!acc[dateKey]) acc[dateKey] = [];
            acc[dateKey].push(symptom);
            return acc;
        }, {} as Record<string, SymptomEntry[]>);
    }, [symptoms]);

    const changeMonth = (amount: number) => {
        setCurrentDate(prev => {
            const newDate = new Date(prev);
            newDate.setMonth(newDate.getMonth() + amount);
            return newDate;
        });
    };

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const monthName = currentDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const weekDays = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do'];

    const handleMouseEnter = (e: React.MouseEvent, daySymptoms: SymptomEntry[]) => {
        const content = daySymptoms.map(s => `• ${s.description} (Int: ${s.intensity})`);
        setTooltip({ content, x: e.clientX, y: e.clientY });
    };

    return (
        <div className="bg-card-bg/50 p-4 sm:p-6 rounded-lg">
            {tooltip && <Tooltip {...tooltip} />}
            <div className="flex justify-between items-center mb-4">
                <button onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-accent/20 transition-colors" aria-label="Mes anterior"><ChevronLeftIcon /></button>
                <h4 className="text-lg font-bold text-primary-text capitalize">{monthName}</h4>
                <button onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-accent/20 transition-colors" aria-label="Mes siguiente"><ChevronRightIcon /></button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-sm">
                {weekDays.map(day => <div key={day} className="font-bold text-secondary-text pb-2">{day}</div>)}
                {Array.from({ length: adjustedFirstDay }).map((_, i) => <div key={`empty-${i}`}></div>)}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                    const daySymptoms = symptomsByDate[dateKey];
                    if (daySymptoms) {
                        const maxIntensity = Math.max(...daySymptoms.map(s => s.intensity));
                        const colorClass = intensityColors[maxIntensity - 1];
                        const hoverClass = intensityHoverColors[maxIntensity - 1];
                        return (
                            <div 
                                key={day} 
                                className={`w-full aspect-square flex items-center justify-center rounded-lg cursor-pointer transition-all duration-200 transform hover:scale-110 ${colorClass} ${hoverClass}`}
                                onMouseEnter={(e) => handleMouseEnter(e, daySymptoms)}
                                onMouseLeave={() => setTooltip(null)}
                            >
                                <span className="text-white text-xs sm:text-sm font-bold mix-blend-difference">{day}</span>
                            </div>
                        );
                    }
                    return <div key={day} className="w-full aspect-square flex items-center justify-center rounded-lg bg-border-color/20 text-secondary-text/80">{day}</div>;
                })}
            </div>
        </div>
    );
};


// Main Component
const SymptomTracker = (): React.ReactNode => {
  const [symptoms, setSymptoms] = useLocalStorage<SymptomEntry[]>('symptom_entries', []);
  const [description, setDescription] = useState('');
  const [intensity, setIntensity] = useState(3);
  const [view, setView] = useState<View>('list');

  const handleAddSymptom = () => {
    if (description.trim() === '') return;
    const entry: SymptomEntry = {
      id: new Date().toISOString(),
      date: new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }),
      description,
      intensity,
    };
    setSymptoms([entry, ...symptoms]);
    setDescription('');
    setIntensity(3);
  };
  
  const handleDeleteSymptom = (id: string) => {
    setSymptoms(symptoms.filter(symptom => symptom.id !== id));
  };
  
  const intensityColors = [
      'bg-green-500', 'bg-lime-500', 'bg-yellow-500', 'bg-orange-500', 'bg-red-500'
  ];

  return (
    <div className="space-y-8">
      <div className="bg-card-bg p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-primary-text mb-4">Registro Físico y Emocional</h2>
        <p className="text-secondary-text mb-4">
          Lleva un registro de cómo te sientes, tanto física como emocionalmente, para entenderte mejor.
        </p>
        <div className="space-y-4">
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-primary-text">
              Sensación Física o Emocional
            </label>
            <input
              id="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ej: Dolor de cabeza, ansiedad, alegría, energía alta..."
              className="mt-1 block w-full p-3 border border-border-color rounded-md bg-input-bg text-input-text placeholder:text-input-placeholder focus:ring-2 focus:ring-accent focus:border-accent transition"
            />
          </div>
          <div>
            <label htmlFor="intensity" className="block text-sm font-medium text-primary-text">
              Intensidad (1 - 5)
            </label>
            <div className="flex items-center space-x-4 mt-1">
              <input
                id="intensity"
                type="range"
                min="1"
                max="5"
                value={intensity}
                onChange={(e) => setIntensity(Number(e.target.value))}
                className="w-full h-2 bg-border-color rounded-lg appearance-none cursor-pointer"
              />
              <span className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-bold ${intensityColors[intensity-1]}`}>
                  {intensity}
              </span>
            </div>
          </div>
          <button
            onClick={handleAddSymptom}
            className="self-end flex items-center justify-center px-6 py-2 bg-accent text-white font-semibold rounded-md hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-colors duration-200"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Añadir Registro
          </button>
        </div>
      </div>

      <div>
        <div className="flex border-b border-border-color mb-4">
            <button
                onClick={() => setView('list')}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${view === 'list' ? 'border-b-2 border-accent text-accent' : 'text-secondary-text hover:text-primary-text'}`}
            >
                <ListIcon className="w-5 h-5" /> Historial
            </button>
            <button
                onClick={() => setView('calendar')}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${view === 'calendar' ? 'border-b-2 border-accent text-accent' : 'text-secondary-text hover:text-primary-text'}`}
            >
                <CalendarIcon className="w-5 h-5" /> Calendario
            </button>
        </div>

        {view === 'list' ? (
          <div className="space-y-4">
             <h3 className="text-xl font-bold text-primary-text">Mi Historial</h3>
            {symptoms.length > 0 ? (
              symptoms.map((symptom) => (
                <div key={symptom.id} className="bg-card-bg p-4 rounded-lg shadow-md flex justify-between items-center">
                    <div>
                        <p className="text-sm text-secondary-text">{symptom.date}</p>
                        <p className="text-primary-text mt-1">{symptom.description}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1" title={`Intensidad: ${symptom.intensity}`}>
                            {Array.from({length: 5}).map((_, i) => (
                                <div key={i} className={`w-3 h-6 rounded ${i < symptom.intensity ? intensityColors[i] : 'bg-border-color'}`}></div>
                            ))}
                        </div>
                        <button onClick={() => handleDeleteSymptom(symptom.id)} className="text-danger hover:text-danger-hover p-1 rounded-full hover:bg-danger/10 transition-colors">
                            <TrashIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10 px-6 bg-card-bg/50 rounded-lg">
                <LeafIcon className="w-12 h-12 text-accent mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-primary-text">Empieza a escucharte</h4>
                <p className="text-secondary-text mt-2">Registrar cómo te sientes es el primer paso para entender tu cuerpo y tu mente.<br/>Añade tu primer registro para comenzar.</p>
              </div>
            )}
          </div>
        ) : (
          <CalendarView symptoms={symptoms} />
        )}
      </div>
    </div>
  );
};

export default SymptomTracker;
