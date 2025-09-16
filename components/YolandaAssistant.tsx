import React, { useState, useEffect, useRef } from 'react';
import { startChat } from '../services/geminiService';
import type { Chat } from '@google/genai';
import CloseIcon from './icons/CloseIcon';
import SendIcon from './icons/SendIcon';

interface Message {
  role: 'user' | 'model';
  text: string;
}

interface YolandaAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

const YolandaAssistant = ({ isOpen, onClose }: YolandaAssistantProps): React.ReactNode => {
  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chatInstance = startChat();
    if (chatInstance) {
      setChat(chatInstance);
      setMessages([
        { role: 'model', text: '¡Hola! Soy tu asistente en la app. Mi función es ayudarte a navegar y a encontrar lo que buscas. Pregúntame cómo usar el Diario, el Registro, o dónde encontrar los productos, por ejemplo.' }
      ]);
    } else {
      setMessages([
          { role: 'model', text: 'No se pudo inicializar el asistente. Por favor, asegúrate de que la clave de API esté configurada.' }
      ]);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
       if (event.key === 'Escape') {
          onClose();
       }
    };
    if (isOpen) {
        window.addEventListener('keydown', handleEsc);
    }
    return () => {
        window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userInput.trim() === '' || isLoading || !chat) return;

    const userMessage: Message = { role: 'user', text: userInput };
    setMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      const responseStream = await chat.sendMessageStream({ message: userInput });
      
      let modelResponse = '';
      setMessages(prev => [...prev, { role: 'model', text: modelResponse }]);

      for await (const chunk of responseStream) {
        modelResponse += chunk.text;
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { role: 'model', text: modelResponse };
          return newMessages;
        });
      }
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
      setMessages(prev => [...prev, { role: 'model', text: 'Lo siento, ha ocurrido un error. Inténtalo de nuevo.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-end sm:items-center p-0 sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="assistant-title"
    >
      <div
        className="bg-app-bg rounded-t-2xl sm:rounded-2xl shadow-2xl w-full max-w-2xl h-[90%] sm:h-[80%] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b border-border-color">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center font-bold text-lg">Y</div>
            <div>
              <h2 id="assistant-title" className="text-lg font-bold text-primary-text">Tu Guía, Yolanda</h2>
              <p className="text-sm text-secondary-text">Estoy aquí para ayudarte</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-secondary-text hover:text-accent p-2 rounded-full hover:bg-accent/10 transition-colors"
            aria-label="Cerrar asistente"
          >
            <CloseIcon className="w-6 h-6" />
          </button>
        </header>
        
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'model' && (
                <div className="w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center font-bold self-start flex-shrink-0">Y</div>
              )}
              <div className={`max-w-[80%] p-3 rounded-2xl ${msg.role === 'user' ? 'bg-accent text-white rounded-br-none' : 'bg-card-bg text-primary-text rounded-bl-none'}`}>
                <p className="text-sm" style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-end gap-2 justify-start">
               <div className="w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center font-bold self-start flex-shrink-0">Y</div>
                <div className="max-w-[80%] p-3 rounded-2xl bg-card-bg text-primary-text rounded-bl-none">
                    <div className="flex items-center justify-center space-x-1">
                        <span className="w-2 h-2 bg-secondary-text rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                        <span className="w-2 h-2 bg-secondary-text rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                        <span className="w-2 h-2 bg-secondary-text rounded-full animate-pulse"></span>
                    </div>
                </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSendMessage} className="p-4 border-t border-border-color bg-card-bg/50">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Pregúntale algo a Yolanda..."
              className="w-full p-3 border border-border-color rounded-full bg-input-bg text-input-text placeholder:text-input-placeholder focus:ring-2 focus:ring-accent focus:border-accent transition"
              aria-label="Escribe tu mensaje"
              disabled={isLoading || !chat}
            />
            <button
              type="submit"
              className="bg-accent text-white p-3 rounded-full hover:bg-accent-hover disabled:bg-secondary-text transition-colors"
              aria-label="Enviar mensaje"
              disabled={isLoading || !chat || userInput.trim() === ''}
            >
              <SendIcon className="w-6 h-6" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default YolandaAssistant;
