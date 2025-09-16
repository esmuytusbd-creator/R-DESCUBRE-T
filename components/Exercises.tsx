import React from 'react';
import type { ViewType } from '../types';
import ChevronLeftIcon from './icons/ChevronLeftIcon';

interface ExercisesProps {
    setCurrentView: (view: ViewType) => void;
}

const ExerciseRow = ({ exercise, description, reps, benefits }: { exercise: string; description: string; reps: string; benefits: string; }) => (
    <tr className="border-b border-border-color last:border-b-0">
        <td className="py-4 px-2 md:px-4">
            <p className="font-bold text-primary-text">{exercise}</p>
        </td>
        <td className="py-4 px-2 md:px-4 text-secondary-text">{description}</td>
        <td className="py-4 px-2 md:px-4 text-center font-semibold text-accent whitespace-nowrap">{reps}</td>
        <td className="py-4 px-2 md:px-4 text-secondary-text hidden md:table-cell">{benefits}</td>
    </tr>
)

const Exercises = ({ setCurrentView }: ExercisesProps): React.ReactNode => {
    return (
        <div className="space-y-8">
            <button
              onClick={() => setCurrentView('resources')}
              className="inline-flex items-center text-accent font-semibold hover:underline"
            >
                <ChevronLeftIcon className="w-5 h-5 mr-1" />
                Volver a Cuerpo Consciente
            </button>
            <header className="text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-accent mb-4">¡A Mover el Cuerpo con Alegría!</h1>
                <p className="text-lg text-secondary-text max-w-3xl mx-auto">He diseñado esta tabla pensando en ejercicios de bajo impacto, ideales para cuidar tus articulaciones y huesos, mejorar tu energía y elevar tu ánimo. ¡Vamos a darle ritmo a tu bienestar!</p>
            </header>

            <section className="bg-card-bg p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-primary-text mb-4">Guía Rápida para Tu Rutina</h2>
                <ul className="space-y-3 text-secondary-text list-disc list-inside">
                    <li><strong>Frecuencia:</strong> Intenta realizar esta rutina 3-4 veces por semana, dejando un día de descanso entre cada sesión.</li>
                    <li><strong>Duración:</strong> Busca bloques de 30-45 minutos, incluyendo calentamiento y estiramientos.</li>
                    <li><strong>Intensidad:</strong> Escucha a tu cuerpo. Deberías sentir un esfuerzo, pero poder mantener una conversación.</li>
                    <li><strong>Calentamiento (5-10 min):</strong> Empieza con movimientos suaves como caminar en el sitio, círculos con los brazos, rotaciones de tronco y rodillas al pecho.</li>
                    <li><strong>Enfriamiento y Estiramientos (5-10 min):</strong> Al final, estira suavemente los músculos que has trabajado. Mantén cada estiramiento durante 20-30 segundos.</li>
                </ul>
            </section>
            
            <section>
                <h2 className="text-2xl font-bold text-primary-text mb-4 text-center">Tu Tabla de Ejercicios de Bajo Impacto</h2>
                <div className="bg-card-bg rounded-lg shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-accent/10 text-primary-text uppercase">
                                <tr>
                                    <th className="py-3 px-2 md:px-4">Ejercicio (Tipo)</th>
                                    <th className="py-3 px-2 md:px-4">Descripción</th>
                                    <th className="py-3 px-2 md:px-4 text-center">Repeticiones/Duración</th>
                                    <th className="py-3 px-2 md:px-4 hidden md:table-cell">Beneficios Clave</th>
                                </tr>
                            </thead>
                            <tbody>
                                <ExerciseRow exercise="Caminata Activa / Nordic Walking (Aeróbico)" description="Caminar a paso ligero, elevando el ritmo cardíaco. Si usas bastones, involucras más la parte superior del cuerpo." reps="30-45 min" benefits="Salud cardiovascular, densidad ósea, mejora el humor." />
                                <ExerciseRow exercise="Sentadillas Adaptadas (Fuerza)" description="Baja como si fueras a sentarte en una silla, manteniendo la espalda recta. Puedes usar una silla como referencia." reps="3 series de 10-12" benefits="Fortalece glúteos y piernas, mejora el equilibrio." />
                                <ExerciseRow exercise="Elevación de Talones (Fuerza)" description="De pie, sujétate a una pared o silla. Levántate sobre las puntas de los pies y baja lentamente." reps="3 series de 15-20" benefits="Fortalece gemelos y tobillos, esencial para la salud ósea." />
                                <ExerciseRow exercise="Flexiones de Pared (Fuerza)" description="De pie frente a una pared, apoya las manos. Flexiona los codos acercando el pecho a la pared y empuja." reps="3 series de 10-12" benefits="Fortalece pecho, hombros y tríceps de forma suave." />
                                <ExerciseRow exercise="Remo con Banda Elástica (Fuerza)" description="Sentada o de pie, sujeta una banda elástica y tira de ella hacia tu abdomen, juntando tus escápulas." reps="3 series de 10-12" benefits="Fortalece la espalda y mejora la postura." />
                                <ExerciseRow exercise="Plancha de Antebrazos (Modificada) (Fuerza)" description="Apoya los antebrazos y las rodillas en el suelo, manteniendo el cuerpo recto como una tabla." reps="3 series de 20-30 seg" benefits="Fortalece el core, mejora la estabilidad." />
                                <ExerciseRow exercise="Bailar (Aeróbico y Flexibilidad)" description="¡Pon tu música favorita y muévete! No hay reglas, solo diversión." reps="20-30 min" benefits="Mejora la coordinación, el ánimo y la salud cardiovascular." />
                                <ExerciseRow exercise="Respiración y Mindfulness (Bienestar Mental)" description="Dedica tiempo a la calma. Sigue una meditación guiada o practica ejercicios de respiración profunda." reps="10-20 min" benefits="Reduce el estrés, mejora el sueño, equilibra el ánimo." />
                                <ExerciseRow exercise="Nadar / Aquagym (Aeróbico y Fuerza)" description="El agua reduce el impacto en las articulaciones, ideal para fortalecer todo el cuerpo." reps="30-45 min" benefits="Ejercicio completo, bajo impacto, relajante y efectivo." />
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

             <section className="bg-card-bg p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-primary-text mb-3">¡Un Consejo Extra!</h3>
                <p className="text-secondary-text">
                    No te olvides de la <strong>hidratación constante</strong> antes, durante y después del ejercicio. Y recuerda, la clave es la constancia y encontrar actividades que realmente disfrutes. ¡Cada movimiento cuenta!
                </p>
                <p className="text-sm italic text-secondary-text/80 mt-4">
                    Esta tabla es una excelente base para empezar. Escucha siempre a tu cuerpo, si sientes algún dolor, detente y consulta a un profesional. ¡Disfruta de este camino hacia una versión más fuerte y feliz de ti misma!
                </p>
            </section>
        </div>
    );
};

export default Exercises;
