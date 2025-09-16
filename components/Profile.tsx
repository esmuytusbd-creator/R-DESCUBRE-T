import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface WellnessPillars {
  energySource: string;
  overwhelmedCare: string;
  strength: string;
}

const Profile = (): React.ReactNode => {
  const [savedName, setSavedName] = useLocalStorage<string>('user_name', '');
  const [name, setName] = useState(savedName);
  const [isNameSaved, setIsNameSaved] = useState(false);

  const [pillars, setPillars] = useLocalStorage<WellnessPillars>('wellness_pillars', {
    energySource: '',
    overwhelmedCare: '',
    strength: '',
  });
  const [formPillars, setFormPillars] = useState(pillars);
  const [isPillarsSaved, setIsPillarsSaved] = useState(false);

  useEffect(() => {
    setName(savedName);
  }, [savedName]);
  
  useEffect(() => {
    setFormPillars(pillars);
  }, [pillars]);


  const handleNameSave = () => {
    setSavedName(name);
    setIsNameSaved(true);
    setTimeout(() => setIsNameSaved(false), 3000);
  };

  const handlePillarChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormPillars(prevState => ({
        ...prevState,
        [name]: value
    }));
  };

  const handlePillarsSave = () => {
    setPillars(formPillars);
    setIsPillarsSaved(true);
    setTimeout(() => setIsPillarsSaved(false), 3000);
  }
  
  return (
    <div className="space-y-8">
      <div className="bg-card-bg p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-bold text-primary-text mb-4">Bienvenida a tu Espacio de Transformación</h2>
        <p className="text-secondary-text mb-6 max-w-2xl mx-auto">
          He creado este video para darte la bienvenida y mostrarte cómo R-DESCUBRE-T puede ser tu compañero en este viaje de autodescubrimiento.
        </p>
        <div className="aspect-video-container max-w-2xl mx-auto bg-black/80 rounded-lg overflow-hidden shadow-inner">
          <iframe 
            src="https://www.youtube.com/embed/bfoDEBOWNRQ" 
            title="Bienvenida a R-DESCUBRE-T" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen 
            className="w-full h-full">
          </iframe>
        </div>
      </div>

      <div className="bg-card-bg p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-primary-text mb-4">
          {savedName ? `¡Hola de nuevo, ${savedName}!` : 'Tu Rincón Personal'}
        </h2>
        <p className="text-secondary-text mb-6">
          Este es tu espacio en R-DESCUBRE-T. Empieza por decirnos tu nombre para hacer esta experiencia más tuya.
        </p>
        <div className="space-y-4 max-w-md">
           <div>
            <label htmlFor="name" className="block text-sm font-medium text-primary-text mb-1">
              Tu nombre
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Escribe tu nombre aquí"
              className="mt-1 block w-full p-3 border border-border-color rounded-md bg-input-bg text-input-text placeholder:text-input-placeholder focus:ring-2 focus:ring-accent focus:border-accent transition"
            />
          </div>
          <div className="text-right">
             <button
              onClick={handleNameSave}
              className="inline-flex items-center justify-center px-6 py-2 bg-accent text-white font-semibold rounded-md hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-colors duration-200"
            >
              Guardar Nombre
            </button>
            {isNameSaved && (
                 <p className="text-sm text-accent mt-2 transition-opacity duration-300">
                    ¡Nombre guardado!
                </p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-card-bg p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-primary-text mb-2">Mi Espacio de Reflexión: Mis Pilares de Bienestar</h3>
        <p className="text-secondary-text mb-6">
          Tómate un momento para conectar contigo. Tus respuestas se guardarán para que puedas recordarlas siempre que lo necesites.
        </p>
        <div className="space-y-6">
            <div>
                <label htmlFor="energySource" className="block text-md font-medium text-primary-text mb-2">
                    ¿Qué me da energía y alegría?
                </label>
                <textarea
                    id="energySource"
                    name="energySource"
                    value={formPillars.energySource}
                    onChange={handlePillarChange}
                    rows={3}
                    placeholder="Piensa en pequeñas y grandes cosas..."
                    className="w-full p-3 border border-border-color rounded-md bg-input-bg text-input-text placeholder:text-input-placeholder focus:ring-2 focus:ring-accent focus:border-accent transition"
                />
            </div>
             <div>
                <label htmlFor="overwhelmedCare" className="block text-md font-medium text-primary-text mb-2">
                    ¿Cómo me cuido cuando me siento abrumada?
                </label>
                <textarea
                    id="overwhelmedCare"
                    name="overwhelmedCare"
                    value={formPillars.overwhelmedCare}
                    onChange={handlePillarChange}
                    rows={3}
                    placeholder="Tus rituales, tus espacios seguros..."
                    className="w-full p-3 border border-border-color rounded-md bg-input-bg text-input-text placeholder:text-input-placeholder focus:ring-2 focus:ring-accent focus:border-accent transition"
                />
            </div>
             <div>
                <label htmlFor="strength" className="block text-md font-medium text-primary-text mb-2">
                    Mi mayor fortaleza es...
                </label>
                <textarea
                    id="strength"
                    name="strength"
                    value={formPillars.strength}
                    onChange={handlePillarChange}
                    rows={3}
                    placeholder="Reconoce tu poder interior."
                    className="w-full p-3 border border-border-color rounded-md bg-input-bg text-input-text placeholder:text-input-placeholder focus:ring-2 focus:ring-accent focus:border-accent transition"
                />
            </div>
            <div className="text-right">
                <button
                    onClick={handlePillarsSave}
                    className="inline-flex items-center justify-center px-6 py-2 bg-accent text-white font-semibold rounded-md hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-colors duration-200"
                >
                    Guardar Mis Pilares
                </button>
                 {isPillarsSaved && (
                    <p className="text-sm text-accent mt-2 transition-opacity duration-300">
                        ¡Tus reflexiones han sido guardadas!
                    </p>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
