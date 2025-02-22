import { useState } from "react";

export default function Card({ image, title, description, moreInfo, className }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div
                className={`cursor-pointer bg-white shadow-lg rounded-lg overflow-hidden transition-transform hover:scale-105 ${className}`}
                onClick={() => setOpen(true)}
            >
                <img src={image} alt={title} className="w-full h-48 object-cover" />
                <div className="p-4">
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <p className="text-sm text-gray-600">{description}</p>
                </div>
            </div>

            {open && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
                        <h3 className="text-xl font-bold">{title}</h3>
                        <p className="mt-2">{description}</p>
                        <p className="mt-4 text-gray-700">{moreInfo}</p>
                        <button
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                            onClick={() => setOpen(false)}
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
