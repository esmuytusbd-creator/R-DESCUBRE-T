import React, { useEffect } from 'react';

interface ProductsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ProductCard = ({ title, description, options }: { title: string, description: string, options: { label: string, url: string }[] }) => (
    <div className="bg-card-bg/50 p-6 rounded-lg border border-border-color">
        <h3 className="text-2xl font-bold text-primary-text">{title}</h3>
        <p className="text-secondary-text mt-2 mb-4">{description}</p>
        <div className="flex flex-col sm:flex-row gap-4">
            {options.map(option => (
                <a 
                    key={option.label}
                    href={option.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center text-white bg-accent hover:bg-accent-hover font-semibold py-2 px-4 rounded-md transition-colors"
                >
                    {option.label}
                </a>
            ))}
        </div>
    </div>
);

const ProductsModal = ({ isOpen, onClose }: ProductsModalProps): React.ReactNode => {
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
           if (event.key === 'Escape') {
              onClose();
           }
        };
        window.addEventListener('keydown', handleEsc);
        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4 transition-opacity duration-300"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="products-modal-title"
        >
            <div 
                className="bg-app-bg text-primary-text rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative"
                onClick={e => e.stopPropagation()}
            >
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-secondary-text hover:text-accent transition-colors z-10"
                    aria-label="Cerrar ventana de productos"
                >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
                
                <h2 id="products-modal-title" className="text-3xl font-bold text-primary-text mb-6 text-center">
                    Mis Productos
                </h2>

                <div className="space-y-6">
                    {/* Custom Card for VOLVER A MI */}
                    <div className="bg-card-bg/50 p-6 rounded-lg border border-border-color">
                        <h3 className="text-2xl font-bold text-primary-text">VOLVER A MI</h3>
                        <p className="text-secondary-text mt-2 mb-4">Un viaje de autodescubrimiento y transformación para reconectar contigo misma en esta nueva etapa de tu vida.</p>
                        <div className="flex flex-col gap-3 items-center">
                            <a 
                                href="https://yolanda-fdz.hotmart.host/nueva-pagina-e18c7279-f12e-415c-bc22-83c263b9be27"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full text-center text-white bg-accent hover:bg-accent-hover font-semibold py-3 px-5 rounded-md transition-colors"
                            >
                                Ver Detalles y Comprar
                            </a>
                            <a 
                                href="https://pay.hotmart.com/U101055516J?off=ih078j77"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-accent hover:underline font-semibold"
                            >
                                O pagar en 3 cuotas
                            </a>
                        </div>
                    </div>

                    {/* Standard ProductCard for Ebook */}
                    <ProductCard 
                        title="Ebook Menus preparados para 1 mes, faciles y nutritivos para la Pre- Menopausia"
                        description="Recibe un plan de alimentación completo con recetas deliciosas y sencillas para sentirte mejor que nunca."
                        options={[
                            { label: 'Precio Regular', url: 'https://pay.hotmart.com/P101163772U?off=0qtvvou6' },
                            { label: 'Oferta Lanzamiento', url: 'https://pay.hotmart.com/P101163772U?off=4tzzgcgy' }
                        ]}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductsModal;
