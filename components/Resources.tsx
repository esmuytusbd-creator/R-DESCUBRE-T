import React from 'react';
import type { Resource, ViewType } from '../types';
import AudioWaveIcon from './icons/AudioWaveIcon';

const resourcesData: Resource[] = [
  {
    type: 'video',
    title: 'VIDEO RAIZ',
    description: 'Un espacio para conectar, respirar y sentir. Dedícate este momento.',
    url: 'https://www.youtube.com/embed/O-6f5wQXp8o',
    author: 'Yolanda Fernández'
  },
  {
    type: 'audio',
    title: 'AUDIO GUIA: Sexy',
    description: 'Descubre que tu libido sigue ahí. Un viaje sonoro para reconectar con tu deseo.',
    url: 'https://soundcloud.com/yolanda-fernandez-834444747/sexy/s-umI7MPEx8Hl?si=7b750c615cac4289889a7155249d9158&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing',
    author: 'Yolanda Fernández'
  },
  {
    type: 'audio',
    title: 'AUDIO GUIA: Respiro',
    description: 'Un ejercicio consciente de respiración para calmar los sofocos y encontrar tu centro.',
    url: 'https://soundcloud.com/yolanda-fernandez-834444747/respiro/s-fFzxuFc5G3i?si=ab741e1692ec4609803c009bb7a7ece0&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing',
    author: 'Yolanda Fernández'
  },
  {
    type: 'audio',
    title: 'AUDIO GUIA: Aliento',
    description: 'Otra meditación para los días que estés baja de ánimos.',
    url: 'https://soundcloud.com/yolanda-fernandez-834444747/aliento-transforma-la-melancolia/s-bg61AtAoqBU?si=444eafc6b5c04b15bfdbc47f9cb95d4d&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing',
    author: 'Yolanda Fernández'
  },
  {
    type: 'article',
    title: 'EJERCICIOS CONSCIENTES',
    description: 'Una tabla de ejercicios de bajo impacto para fortalecerte y llenarte de energía.',
    url: '#exercises',
    author: 'Yolanda Fernández'
  },
   {
    type: 'link',
    title: 'TU MOMENTO CONMIGO',
    description: 'Únete al próximo directo.',
    url: 'https://www.instagram.com/esmuytuu/',
    author: 'Yolanda Fernández'
  }
];

const ResourceCard = ({ resource, onInternalClick }: { resource: Resource; onInternalClick: (url: string) => void; }): React.ReactNode => {
    const renderContent = () => {
        switch (resource.type) {
            case 'video':
                return (
                    <div className="aspect-video-container bg-black/80">
                        <iframe src={resource.url} title={resource.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="rounded-t-lg w-full h-full"></iframe>
                    </div>
                );
            case 'audio':
                return (
                    <div className="p-6 bg-accent/10 flex justify-center items-center h-32">
                        <AudioWaveIcon className="w-16 h-16 text-accent" />
                    </div>
                );
            default:
                return null;
        }
    };
    
    const isActionable = resource.type === 'link' || resource.type === 'article' || resource.type === 'audio';
    const isInternal = resource.url.startsWith('#');
    const isPlaceholder = resource.url === '#';

    const getButtonText = () => {
        if (isPlaceholder) return 'Próximamente';
        if (resource.type === 'audio') return 'Escuchar Audio';
        if (resource.url === '#exercises') return 'Ver Ejercicios';
        return resource.type === 'link' ? 'Visitar Enlace' : 'Leer Artículo';
    }

    return (
        <div className="bg-card-bg rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 flex flex-col">
            {renderContent()}
            <div className="p-6 flex flex-col flex-grow">
                <p className="text-sm font-semibold text-accent">{resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}</p>
                <h3 className="text-xl font-bold text-primary-text mt-2">{resource.title}</h3>
                <p className="text-secondary-text mt-2 flex-grow">{resource.description}</p>
                <p className="text-xs text-secondary-text mt-4">Por: {resource.author}</p>
                {isActionable && (
                    isInternal ? (
                        <button 
                            onClick={() => onInternalClick(resource.url)} 
                            className={`self-start inline-block mt-4 text-white bg-accent font-semibold py-2 px-4 rounded-md transition-colors ${isPlaceholder ? 'opacity-50 cursor-not-allowed' : 'hover:bg-accent-hover'}`}
                            disabled={isPlaceholder}
                        >
                            {getButtonText()}
                        </button>
                    ) : (
                        <a href={resource.url} target="_blank" rel="noopener noreferrer" className={`self-start inline-block mt-4 text-white bg-accent font-semibold py-2 px-4 rounded-md transition-colors ${isPlaceholder ? 'opacity-50 cursor-not-allowed' : 'hover:bg-accent-hover'}`}
                           aria-disabled={isPlaceholder}
                           onClick={(e) => isPlaceholder && e.preventDefault()}
                        >
                            {getButtonText()}
                        </a>
                    )
                )}
            </div>
        </div>
    )
};

interface ResourcesProps {
    setCurrentView: (view: ViewType) => void;
}

const Resources = ({ setCurrentView }: ResourcesProps): React.ReactNode => {
    const handleInternalClick = (url: string) => {
        if (url === '#nutrition') {
            setCurrentView('nutrition');
        } else if (url === '#exercises') {
            setCurrentView('exercises');
        }
    };

    return (
        <div>
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-primary-text">Cuerpo Consciente</h2>
                <p className="mt-2 text-lg text-secondary-text max-w-2xl mx-auto">
                    Un espacio con herramientas y conocimientos para ayudarte a conectar contigo y a cuidarte de forma integral.
                </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {resourcesData.map((resource) => (
                    <ResourceCard key={resource.title} resource={resource} onInternalClick={handleInternalClick} />
                ))}
            </div>
        </div>
    );
};

export default Resources;
