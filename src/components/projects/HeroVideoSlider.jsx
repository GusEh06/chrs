import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const videos = [
    {
        id: 1,
        title: "Azadi Tower",
        videoSrc: "/videos/video.mp4",
        thumbnail: "/images/image (1).jpg",
    },
    {
        id: 2,
        title: "Nasir Mosque",
        videoSrc: "/videos/video.mp4",
        thumbnail: "/images/image (1).jpg",
    },
    {
        id: 3,
        title: "Mausoleum of Hafez",
        videoSrc: "/videos/video.mp4",
        thumbnail: "/images/image (1).jpg",
    },
    {
        id: 4,
        title: "Mausoleum of Hafez",
        videoSrc: "/videos/video.mp4",
        thumbnail: "/images/image (1).jpg",
    },
];

export default function HeroVideoSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleVideoEnd = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
    };

    const handleSelectVideo = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div
            className="relative w-full bg-black text-white flex flex-col"
            style={{ height: "93.5vh" }}
        >
            {/* Video en grande con transición */}
            <div className="absolute top-0 left-0 w-full h-full z-0">
                <AnimatePresence mode="wait">
                    <motion.video
                        key={videos[currentIndex].id}
                        src={videos[currentIndex].videoSrc}
                        autoPlay
                        muted
                        onEnded={handleVideoEnd}
                        className="absolute top-0 left-0 w-full h-full object-cover"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                    />
                </AnimatePresence>
            </div>

            {/* Máscara de transparencia sobre el video */}
            <div className="absolute top-0 left-0 w-full h-full z-[5] bg-gradient-to-t from-black/50 to-black/50"></div>

            {/* Título en la parte superior izquierda */}
            {/* <div className="absolute top-5 left-5 z-10 p-4">
                <h1 className="text-5xl font-bold text-white sm:text-3xl md:text-4xl lg:text-6xl">
                    {videos[currentIndex].title}
                </h1>
            </div> */}

            {/* Miniaturas posicionadas en la parte inferior derecha */}
            <div
                className="absolute z-10 flex gap-4 bg-transparent backdrop-blur-lg rounded-lg shadow-xl w-max"
                style={{ bottom: "1.25rem", right: "1.25rem" }}
            >


                {videos.map((video, index) => (
                    <button
                        key={video.id}
                        type="button"
                        onClick={() => handleSelectVideo(index)}
                        style={{
                            padding: 12,
                            margin: 0,
                            border: "none",
                            background: "transparent",
                        }}
                        className={`w-24 h-14 sm:w-28 sm:h-16 md:w-32 md:h-20 lg:w-36 lg:h-20 overflow-hidden rounded-md transition-all duration-300 appearance-none ${currentIndex === index ? "scale-110 border-2 border-white" : "scale-100"
                            }`}
                    >
                        <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-full object-cover rounded-md hover:opacity-80"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}
