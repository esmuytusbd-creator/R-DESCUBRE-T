import React, { useEffect, useRef } from 'react';

// To inform TypeScript about Chart.js from CDN
declare const Chart: any;

interface NutritionProps {
    onOpenProducts: () => void;
}

const Nutrition = ({ onOpenProducts }: NutritionProps): React.ReactNode => {
    const macroChartRef = useRef<HTMLCanvasElement>(null);
    const calcioChartRef = useRef<HTMLCanvasElement>(null);
    const chartInstances = useRef<{ macro?: any; calcio?: any }>({});

    useEffect(() => {
        const wrapLabel = (label: string): string | string[] => {
            const maxLength = 16;
            if (label.length <= maxLength) return label;
            const words = label.split(' ');
            let lines: string[] = [];
            let currentLine = '';
            words.forEach(word => {
                if ((currentLine + word).length > maxLength) {
                    lines.push(currentLine.trim());
                    currentLine = '';
                }
                currentLine += word + ' ';
            });
            lines.push(currentLine.trim());
            return lines;
        };
        
        const tooltipTitleCallback = (tooltipItems: any[]): string => {
            const item = tooltipItems[0];
            let label = item.chart.data.labels[item.dataIndex];
            if (Array.isArray(label)) {
                return label.join(' ');
            }
            return label;
        };

        const appThemePalette = {
            accent: '#8834C7',
            secondary: '#6E4990',
            tertiary: '#A569BD', 
            background: '#D9CEF1',
            text: '#49246E'
        };
        
        if (macroChartRef.current) {
            const ctxMacro = macroChartRef.current.getContext('2d');
            if (ctxMacro) {
                if (chartInstances.current.macro) chartInstances.current.macro.destroy();
                const macroChart = new Chart(ctxMacro, {
                    type: 'doughnut',
                    data: {
                        labels: ['Proteínas de Calidad', 'Grasas Saludables', 'Carbohidratos con Fibra'],
                        datasets: [{
                            label: 'Distribución de Macronutrientes',
                            data: [35, 30, 35],
                            backgroundColor: [
                                appThemePalette.accent,
                                appThemePalette.secondary,
                                appThemePalette.tertiary
                            ],
                            borderColor: appThemePalette.background,
                            borderWidth: 4
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: 'bottom',
                                labels: { color: appThemePalette.text }
                            },
                            tooltip: {
                                callbacks: { title: tooltipTitleCallback }
                            }
                        }
                    }
                });
                chartInstances.current.macro = macroChart;
            }
        }
        
        if (calcioChartRef.current) {
            const ctxCalcio = calcioChartRef.current.getContext('2d');
            if (ctxCalcio) {
                if (chartInstances.current.calcio) chartInstances.current.calcio.destroy();
                const rawCalcioLabels = ['1 vaso de leche', '1 yogur natural', '80g Sardinas en lata', '100g Tofu', '150g Brócoli cocido', '30g Almendras'];
                const wrappedCalcioLabels = rawCalcioLabels.map(wrapLabel);
    
                const calcioChart = new Chart(ctxCalcio, {
                    type: 'bar',
                    data: {
                        labels: wrappedCalcioLabels,
                        datasets: [{
                            label: 'mg de Calcio por porción',
                            data: [240, 180, 300, 150, 60, 80],
                            backgroundColor: [
                                appThemePalette.accent,
                                appThemePalette.secondary,
                                appThemePalette.tertiary,
                                appThemePalette.accent,
                                appThemePalette.secondary,
                                appThemePalette.tertiary
                            ],
                            borderRadius: 5
                        }]
                    },
                    options: {
                        indexAxis: 'y',
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { display: false },
                            tooltip: { callbacks: { title: tooltipTitleCallback } }
                        },
                        scales: {
                            x: {
                                beginAtZero: true,
                                title: {
                                    display: true,
                                    text: 'Miligramos (mg)',
                                    color: appThemePalette.text
                                },
                                ticks: { color: appThemePalette.text },
                                grid: { color: 'rgba(73, 36, 110, 0.1)' }
                            },
                             y: {
                                ticks: { color: appThemePalette.text },
                                grid: { color: 'rgba(73, 36, 110, 0.1)' }
                            }
                        }
                    }
                });
                chartInstances.current.calcio = calcioChart;
            }
        }

        return () => {
            if (chartInstances.current.macro) chartInstances.current.macro.destroy();
            if (chartInstances.current.calcio) chartInstances.current.calcio.destroy();
        };
    }, []);

    return (
        <div className="text-primary-text space-y-8">
            <header className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-accent mb-4">Tu Menopausia, Tu Poder</h1>
                <p className="text-lg md:text-xl text-secondary-text">Una guía visual de nutrición consciente para una etapa radiante y llena de energía.</p>
            </header>

            <main className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <section className="md:col-span-2 bg-card-bg rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold text-accent mb-4 text-center">Entendiendo los Cambios de tu Cuerpo</h2>
                    <p className="text-center mb-6 text-secondary-text">La menopausia es una transformación natural. La disminución de estrógenos influye en tu metabolismo, salud ósea y estado de ánimo. Una buena alimentación es tu mejor herramienta para navegar esta etapa con vitalidad.</p>
                    <div className="flex flex-wrap justify-center gap-4 text-center">
                        <div className="flex-1 min-w-[120px] bg-app-bg p-4 rounded-lg">
                            <div className="icon-text mb-2">🔥</div>
                            <h3 className="font-semibold text-primary-text">Sofocos</h3>
                            <p className="text-sm">Sensaciones de calor repentinas.</p>
                        </div>
                        <div className="flex-1 min-w-[120px] bg-app-bg p-4 rounded-lg">
                            <div className="icon-text mb-2">⚖️</div>
                            <h3 className="font-semibold text-primary-text">Metabolismo</h3>
                            <p className="text-sm">Puede ralentizarse y cambiar la distribución de grasa.</p>
                        </div>
                        <div className="flex-1 min-w-[120px] bg-app-bg p-4 rounded-lg">
                            <div className="icon-text mb-2">🦴</div>
                            <h3 className="font-semibold text-primary-text">Salud Ósea</h3>
                            <p className="text-sm">Mayor riesgo de pérdida de densidad.</p>
                        </div>
                        <div className="flex-1 min-w-[120px] bg-app-bg p-4 rounded-lg">
                            <div className="icon-text mb-2">😊</div>
                            <h3 className="font-semibold text-primary-text">Ánimo</h3>
                            <p className="text-sm">Las hormonas pueden afectar cómo te sientes.</p>
                        </div>
                    </div>
                </section>
                
                <section className="bg-card-bg rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold text-accent mb-4 text-center">Macronutrientes Clave</h2>
                    <p className="text-center mb-6 text-secondary-text">Prioriza proteínas de calidad, grasas saludables y carbohidratos ricos en fibra para energía sostenida y salud digestiva.</p>
                    <div className="chart-container">
                        <canvas ref={macroChartRef}></canvas>
                    </div>
                </section>
                
                <section className="bg-card-bg rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold text-accent mb-4 text-center">Calcio: Comparativa de Fuentes</h2>
                     <p className="text-center mb-6 text-secondary-text">El calcio es vital para mantener tus huesos fuertes. ¡Mira cuántas opciones vegetales y animales tienes a tu alcance!</p>
                    <div className="chart-container">
                        <canvas ref={calcioChartRef}></canvas>
                    </div>
                </section>

                <section className="md:col-span-2 bg-card-bg rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold text-accent mb-4 text-center">Alimentos Estrella vs. a Limitar</h2>
                    <p className="text-center mb-6 text-secondary-text">Concéntrate en llenar tu despensa con alimentos que te nutren y sé consciente de aquellos que es mejor consumir con moderación.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-accent/10 p-4 rounded-lg border-l-4 border-accent">
                            <h3 className="text-xl font-bold text-accent mb-3">🌟 Alimentos Estrella</h3>
                            <ul className="space-y-2 list-disc list-inside text-primary-text">
                                <li><strong>Pescados Azules:</strong> Salmón, sardinas (Omega-3).</li>
                                <li><strong>Verduras de Hoja Verde:</strong> Espinacas, brócoli (Calcio, Fibra).</li>
                                <li><strong>Legumbres y Soja:</strong> Lentejas, tofu (Proteína, Fitoestrógenos).</li>
                                <li><strong>Frutos Rojos:</strong> Arándanos, fresas (Antioxidantes).</li>
                                <li><strong>Frutos Secos y Semillas:</strong> Nueces, lino (Grasas saludables).</li>
                                 <li><strong>Yogur Natural y Kéfir:</strong> (Calcio, Probióticos).</li>
                            </ul>
                        </div>
                        <div className="bg-danger/10 p-4 rounded-lg border-l-4 border-danger">
                            <h3 className="text-xl font-bold text-danger mb-3">⛔ Alimentos a Limitar</h3>
                            <ul className="space-y-2 list-disc list-inside text-primary-text">
                                <li><strong>Azúcares Refinados:</strong> Bollería, refrescos.</li>
                                <li><strong>Ultraprocesados:</strong> Comidas preparadas, snacks.</li>
                                <li><strong>Alcohol y Cafeína:</strong> Pueden detonar sofocos.</li>
                                <li><strong>Grasas Trans:</strong> Fritos, margarinas de baja calidad.</li>
                                <li><strong>Exceso de Sal:</strong> Favorece la retención de líquidos.</li>
                                <li><strong>Picantes:</strong> Si notas que te causan sofocos.</li>
                            </ul>
                        </div>
                    </div>
                </section>
                
                <section className="md:col-span-2 bg-card-bg rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold text-accent mb-4 text-center">Más Allá del Plato: Hábitos que Transforman</h2>
                     <p className="text-center mb-6 text-secondary-text">Tu bienestar es integral. Complementa una buena nutrición con movimiento, hidratación y una mente en calma.</p>
                    <div className="flex flex-wrap justify-around gap-6 text-center">
                        <div className="w-40">
                            <div className="bg-accent text-input-text rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-3 text-4xl">🤸‍♀️</div>
                            <h3 className="font-bold text-lg">Ejercicio Regular</h3>
                            <p className="text-sm">Combina cardio y fuerza para proteger corazón, músculos y huesos.</p>
                        </div>
                        <div className="w-40">
                            <div className="bg-secondary-text text-input-text rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-3 text-4xl">💧</div>
                            <h3 className="font-bold text-lg">Hidratación</h3>
                            <p className="text-sm">Bebe suficiente agua durante el día para regular tu temperatura.</p>
                        </div>
                        <div className="w-40">
                            <div className="bg-accent/70 text-input-text rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-3 text-4xl">🧘‍♀️</div>
                            <h3 className="font-bold text-lg">Gestión del Estrés</h3>
                            <p className="text-sm">Practica mindfulness o yoga para calmar la mente y mejorar el sueño.</p>
                        </div>
                    </div>
                </section>

                <section className="md:col-span-2 bg-card-bg rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold text-accent mb-4 text-center">Suplementos: Tus Aliados Naturales</h2>
                    <p className="text-center mb-6 text-secondary-text">Algunos suplementos pueden ofrecer un apoyo extra. Recuerda que la suplementación debe ser personalizada y supervisada por un profesional.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div className="flex flex-col min-w-[120px] bg-app-bg p-4 rounded-lg">
                            <div className="icon-text mb-2">🐟</div>
                            <h3 className="font-semibold text-primary-text">Omega-3</h3>
                            <p className="text-sm flex-grow">Fundamental para la salud cardiovascular y cerebral. Ayuda a reducir la inflamación, aliviando dolores articulares y mejorando la salud de la piel.</p>
                        </div>
                        <div className="flex flex-col min-w-[120px] bg-app-bg p-4 rounded-lg">
                            <div className="icon-text mb-2">☀️</div>
                            <h3 className="font-semibold text-primary-text">Calcio y Vit. D</h3>
                            <p className="text-sm flex-grow">La pareja perfecta para tus huesos. La Vitamina D es la llave que permite la absorción del Calcio, crucial para prevenir la pérdida de densidad ósea (osteoporosis).</p>
                        </div>
                        <div className="flex flex-col min-w-[120px] bg-app-bg p-4 rounded-lg">
                            <div className="icon-text mb-2">🌿</div>
                            <h3 className="font-semibold text-primary-text">Magnesio</h3>
                            <p className="text-sm flex-grow">El mineral de la relajación. Contribuye a mejorar el sueño, calma el sistema nervioso reduciendo la ansiedad y alivia la tensión muscular y los calambres.</p>
                        </div>
                        <div className="flex flex-col min-w-[120px] bg-app-bg p-4 rounded-lg">
                            <div className="icon-text mb-2">🌱</div>
                            <h3 className="font-semibold text-primary-text">Fitoestrógenos</h3>
                            <p className="text-sm flex-grow">Compuestos de plantas como la soja o el lino que pueden ayudar a equilibrar suavemente los niveles hormonales, siendo un gran apoyo para reducir los sofocos.</p>
                        </div>
                    </div>
                     <div className="text-center mt-8 bg-accent/10 p-4 rounded-lg border-l-4 border-accent">
                        <h4 className="font-bold text-accent">Una Recomendación Personalizada es Clave</h4>
                        <p className="text-secondary-text mt-2 text-sm">
                            Cada mujer es única y sus necesidades también lo son. La suplementación debe ser adaptada a tu cuerpo, tus síntomas y tu estilo de vida.
                            <br />
                            <strong>Ponte en contacto conmigo para que podamos crear juntas un plan personalizado solo para ti.</strong>
                        </p>
                    </div>
                </section>
            </main>

            <footer className="text-center mt-6 text-secondary-text/80 text-sm">
                <p>Esta infografía es una guía informativa. Consulta siempre con un profesional de la salud para un asesoramiento personalizado.</p>
            </footer>
        </div>
    );
};

export default Nutrition;
