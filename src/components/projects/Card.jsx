// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// interface CardProps {
//     videoSrc: string;
//     thumbnail: string;
//     title: string;
//     description: string;
// };

// const Card: React.FC<CardProps> = ({ videoSrc, thumbnail, title, description }) => {
//     const [modalOpen, setModalOpen] = useState(false);
//     const [descExpanded, setDescExpanded] = useState(false);

//     const openModal = () => {
//         setModalOpen(true);
//         setDescExpanded(false);
//     };

//     const closeModal = () => {
//         setModalOpen(false);
//         setDescExpanded(false);
//     };

//     const toggleDesc = () => {
//         setDescExpanded((prev) => !prev);
//     };

//     return (
//         <div className="relative">
//             {/* Tarjeta: imagen clickeable */}
//             <button onClick={openModal} className="focus:outline-none">
//                 <img
//                     src={thumbnail}
//                     alt={title}
//                     className="w-full h-auto object-cover rounded-md"
//                 />
//             </button>

//             {/* Modal */}
//             <AnimatePresence>
//                 {modalOpen && (
//                     <motion.div
//                         className="fixed inset-0 flex items-center justify-center bg-black/70 z-50"
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                     >
//                         <motion.div
//                             className="relative bg-white rounded-lg overflow-hidden w-[90%] max-w-4xl"
//                             initial={{ scale: 0.9 }}
//                             animate={{ scale: 1 }}
//                             exit={{ scale: 0.9 }}
//                         >
//                             <div className="flex flex-col md:flex-row">
//                                 {/* Sección de video */}
//                                 <div className="flex-1">
//                                     <video
//                                         src={videoSrc}
//                                         controls
//                                         autoPlay
//                                         className="w-full h-full object-cover"
//                                     />
//                                 </div>
//                                 {/* Sección de descripción */}
//                                 <motion.div
//                                     className="bg-gray-100 p-4 transition-all duration-300 overflow-hidden"
//                                     style={{ width: descExpanded ? "300px" : "80px" }}
//                                 >
//                                     {!descExpanded ? (
//                                         <button
//                                             onClick={toggleDesc}
//                                             className="w-full h-full text-sm text-gray-800 focus:outline-none"
//                                         >
//                                             Ver descripción
//                                         </button>
//                                     ) : (
//                                         <div>
//                                             <h2 className="text-xl font-bold">{title}</h2>
//                                             <p className="mt-2 text-sm text-gray-700">{description}</p>
//                                             <button
//                                                 onClick={toggleDesc}
//                                                 className="mt-4 px-3 py-1 bg-gray-300 rounded focus:outline-none"
//                                             >
//                                                 Cerrar descripción
//                                             </button>
//                                         </div>
//                                     )}
//                                 </motion.div>
//                             </div>
//                             {/* Botón de cierre */}
//                             <button
//                                 onClick={closeModal}
//                                 className="absolute top-2 right-2 text-black text-2xl font-bold focus:outline-none"
//                             >
//                                 &times;
//                             </button>
//                         </motion.div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         </div>
//     );
// };

// export default Card;
