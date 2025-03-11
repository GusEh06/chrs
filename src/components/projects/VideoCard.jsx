import { useState, useRef, useEffect } from "react";

export default function VideoCard({
    image,
    title,
    description,
    video,
    className = ""
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);
    const videoRef = useRef(null);
    const modalRef = useRef(null);

    // Extraer solo los primeros 3 párrafos cortos para la vista previa
    const previewDescription = description
        .split('\n')
        .filter(paragraph => paragraph.trim())
        .slice(0, 3)
        .join('\n');

    // Manejar el cierre del modal con tecla Escape
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) {
                closeModal();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // Cerrar el modal si se hace click fuera del contenido
    const handleOutsideClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            closeModal();
        }
    };

    // Funciones para controlar el video
    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const seekBackward = () => {
        if (videoRef.current) {
            videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 10);
        }
    };

    const seekForward = () => {
        if (videoRef.current) {
            videoRef.current.currentTime = Math.min(videoRef.current.duration, videoRef.current.currentTime + 10);
        }
    };

    const closeModal = () => {
        setIsOpen(false);
        if (videoRef.current) {
            videoRef.current.pause();
        }
    };

    return (
        <>
            {/* Tarjeta que muestra vista previa */}
            <div
                className={`cursor-pointer bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-102 ${className}`}
                onClick={() => setIsOpen(true)}
            >
                <div className="aspect-video overflow-hidden">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                </div>
                <div className="p-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-3">
                        {previewDescription}
                    </p>
                    <div className="mt-3 flex justify-end">
                        <span className="text-sm text-blue-600 font-medium">
                            Ver más
                        </span>
                    </div>
                </div>
            </div>

            {/* Modal que se abre al hacer click - CORREGIDO PARA VIDEO MÁS GRANDE */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4 backdrop-blur-sm transition-opacity"
                    onClick={handleOutsideClick}
                >
                    <div
                        ref={modalRef}
                        className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-6xl w-full max-h-[90vh] flex flex-row"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Sección de video - Ahora más grande */}
                        <div className="w-3/4 relative bg-black">
                            <video
                                ref={videoRef}
                                src={video}
                                className="w-full h-full object-contain"
                                autoPlay
                                onClick={togglePlay}
                            />

                            {/* Controles de video */}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                                <div className="flex items-center justify-between text-white">
                                    <div className="flex gap-3">
                                        <button
                                            onClick={seekBackward}
                                            className="p-2 rounded-full hover:bg-white/20"
                                            aria-label="Retroceder 10 segundos"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z" />
                                            </svg>
                                        </button>

                                        <button
                                            onClick={togglePlay}
                                            className="p-2 rounded-full hover:bg-white/20"
                                            aria-label={isPlaying ? "Pausar" : "Reproducir"}
                                        >
                                            {isPlaying ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                        </button>

                                        <button
                                            onClick={seekForward}
                                            className="p-2 rounded-full hover:bg-white/20"
                                            aria-label="Avanzar 10 segundos"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798L4.555 5.168z" />
                                            </svg>
                                        </button>
                                    </div>

                                    <button
                                        onClick={toggleMute}
                                        className="p-2 rounded-full hover:bg-white/20"
                                        aria-label={isMuted ? "Activar sonido" : "Silenciar"}
                                    >
                                        {isMuted ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Sección de contenido - Ahora más estrecha */}
                        <div className="w-1/4 p-5 overflow-y-auto">
                            <div className="flex justify-between items-start mb-4">
                                <h2 className="text-xl font-bold text-gray-800">{title}</h2>
                                <button
                                    onClick={closeModal}
                                    className="text-gray-500 hover:text-gray-700 p-1"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="prose prose-sm max-w-none">
                                {description.split('\n').map((paragraph, index) => (
                                    paragraph.trim() ? <p key={index} className="mb-4 text-sm">{paragraph}</p> : null
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}