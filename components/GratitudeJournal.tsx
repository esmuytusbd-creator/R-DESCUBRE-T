import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { GratitudeEntry } from '../types';
import PlusIcon from './icons/PlusIcon';
import TrashIcon from './icons/TrashIcon';
import PencilIcon from './icons/PencilIcon';
import CheckIcon from './icons/CheckIcon';
import HeartIcon from './icons/HeartIcon';

interface DailyIntention {
  text: string;
  date: string;
}

const GratitudeJournal = (): React.ReactNode => {
  const [entries, setEntries] = useLocalStorage<GratitudeEntry[]>('gratitude_entries', []);
  const [newEntry, setNewEntry] = useState('');
  const [dailyIntention, setDailyIntention] = useLocalStorage<DailyIntention | null>('daily_intention', null);
  const [intentionInput, setIntentionInput] = useState('');
  const [isEditingIntention, setIsEditingIntention] = useState(false);

  useEffect(() => {
    const today = new Date().toLocaleDateString('es-ES');
    if (dailyIntention?.date !== today) {
      // Intention is from a past day, so reset it
      setDailyIntention(null);
      setIsEditingIntention(true);
    } else {
      // Intention is from today
      setIntentionInput(dailyIntention.text);
      setIsEditingIntention(false);
    }
  }, []);

  const handleAddEntry = () => {
    if (newEntry.trim() === '') return;
    const entry: GratitudeEntry = {
      id: new Date().toISOString(),
      date: new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }),
      text: newEntry,
    };
    setEntries([entry, ...entries]);
    setNewEntry('');
  };
  
  const handleDeleteEntry = (id: string) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  const handleSaveIntention = () => {
    if (intentionInput.trim() === '') return;
    const today = new Date().toLocaleDateString('es-ES');
    setDailyIntention({ text: intentionInput, date: today });
    setIsEditingIntention(false);
  };

  const handleEditIntention = () => {
    setIsEditingIntention(true);
  };

  const renderIntentionContent = () => {
    const today = new Date().toLocaleDateString('es-ES');
    const hasIntentionForToday = dailyIntention?.date === today;

    if (isEditingIntention || !hasIntentionForToday) {
      return (
        <div className="flex flex-col space-y-3">
          <input
            type="text"
            value={intentionInput}
            onChange={(e) => setIntentionInput(e.target.value)}
            placeholder="¿Cuál es tu propósito para hoy?"
            className="w-full p-2 border border-border-color rounded-md bg-input-bg text-input-text placeholder:text-input-placeholder focus:ring-2 focus:ring-accent focus:border-accent transition"
            aria-label="Escribe tu intención del día"
          />
          <button
            onClick={handleSaveIntention}
            className="self-start inline-flex items-center justify-center px-4 py-2 bg-accent text-white font-semibold rounded-md hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-colors duration-200"
          >
            <CheckIcon className="w-5 h-5 mr-2" />
            Guardar Intención
          </button>
        </div>
      );
    }

    return (
      <div className="flex justify-between items-center p-4 border-2 border-dashed border-accent/50 rounded-lg">
        <p className="text-lg italic text-primary-text">
          {dailyIntention.text}
        </p>
        <button 
            onClick={handleEditIntention} 
            aria-label="Editar intención" 
            className="text-secondary-text hover:text-accent p-1 rounded-full hover:bg-accent/10 transition-colors"
        >
          <PencilIcon className="w-5 h-5" />
        </button>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="bg-card-bg p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-primary-text mb-2">Mi Intención del Día</h3>
        <p className="text-secondary-text mb-4">
          Establece un propósito que guíe tu energía y enfoque a lo largo del día.
        </p>
        {renderIntentionContent()}
      </div>

      <div className="bg-card-bg p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-primary-text mb-4">Mi Diario de Gratitud</h2>
        <p className="text-secondary-text mb-4">
          Anota algo por lo que estés agradecida hoy. Puede ser grande o pequeño.
        </p>
        <div className="flex flex-col space-y-4">
          <textarea
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
            placeholder="Hoy agradezco por..."
            className="w-full p-3 border border-border-color rounded-md bg-input-bg text-input-text placeholder:text-input-placeholder focus:ring-2 focus:ring-accent focus:border-accent transition"
            rows={4}
            aria-label="Nueva entrada de gratitud"
          />
          <div className="self-end text-right">
            <button
              onClick={handleAddEntry}
              className="inline-flex items-center justify-center px-6 py-2 bg-accent text-white font-semibold rounded-md hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-colors duration-200"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              Añadir Entrada
            </button>
            <p className="text-xs text-secondary-text mt-2 italic">
              Tu entrada se guardará de forma segura.
            </p>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-primary-text">Mis Entradas Anteriores</h3>
        {entries.length > 0 ? (
          entries.map((entry) => (
            <div key={entry.id} className="bg-card-bg p-4 rounded-lg shadow-md flex justify-between items-start">
              <div>
                <p className="text-sm text-secondary-text">{entry.date}</p>
                <p className="text-primary-text mt-1">{entry.text}</p>
              </div>
              <button onClick={() => handleDeleteEntry(entry.id)} aria-label={`Eliminar entrada del ${entry.date}`} className="text-danger hover:text-danger-hover p-1 rounded-full hover:bg-danger/10 transition-colors">
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
          ))
        ) : (
          <div className="text-center py-10 px-6 bg-card-bg/50 rounded-lg">
            <HeartIcon className="w-12 h-12 text-accent mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-primary-text">Tu lienzo en blanco</h4>
            <p className="text-secondary-text mt-2">Cada día es una nueva oportunidad para agradecer.<br/>¿Qué momento especial quieres atesorar hoy?</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GratitudeJournal;
