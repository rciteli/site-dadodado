// components/ux/WhatsAppButton.tsx
"use client";

import Link from "next/link";

type Props = {
    /** número em formato internacional, ex.: 5511999999999 */
    phone: string;
    /** texto inicial da mensagem (pré-preenchido) */
    message?: string;
    /** posição: "br" (bottom-right), "bl", "tr", "tl" */
    position?: "br" | "bl" | "tr" | "tl";
    className?: string;
};

export default function WhatsAppButton({
    phone,
    message = "Olá! Vim pelo site da DADODADO e gostaria de falar com o time. 🙂",
    position = "br",
    className = "",
}: Props) {
    const href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    return (
        <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Falar no WhatsApp"
            className={`${className}`}
        >
            <span
                className="
          flex flex-row items-center gap-2 rounded-full px-4 py-3
          text-black font-semibold 
          bg-[#38d4b0]
          hover:brightness-110 transition
          focus-visible:ring-2 focus-visible:ring-[#38d4b0]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black
        "
            >
                {/* Ícone WhatsApp (SVG inline para não depender de lib) */}
                <svg width="24" height="24" viewBox="0 0 124 124" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M64 15.8C38.5 15.8 17.8 36.5 17.8 62C17.8 71 20.3001 79.6 25.2001 87.1L18.2001 102.6C17.6001 104 17.8 105.7 18.8 106.9C19.6 107.8 20.7 108.3 21.9 108.3C22.3 108.3 22.6 108.3 23 108.2L42.4001 102.9C49.1001 106.5 56.6 108.4 64.2 108.4C89.7 108.4 110.4 87.7001 110.4 62.2001C110.2 36.5 89.5 15.8 64 15.8ZM64 100.2C57.2 100.2 50.6 98.4 44.8 95C44.2 94.6 43.5 94.4 42.8 94.4C42.4 94.4 42.1001 94.4 41.7001 94.5L29 98L33.4001 88.3C34.0001 87 33.8 85.4 33 84.3C28.3 77.8 25.8 70.1 25.8 62C25.8 41 43 23.8 64 23.8C85 23.8 102.2 40.9 102.2 62C102.2 83 85.1 100.2 64 100.2Z" fill="black" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M81.8001 68.8999C79.9001 67.6999 77.3001 66.3999 75.1001 67.3999C73.4001 68.0999 72.2001 70.8999 71.1001 72.2999C70.5001 72.9999 69.8001 73.0999 68.9001 72.7999C62.3001 70.1999 57.3001 65.7999 53.7001 59.7999C53.1001 58.8999 53.2001 58.0999 53.9001 57.1999C55.0001 55.8999 56.4001 54.3999 56.7001 52.6999C57.0001 50.9999 56.2001 48.8999 55.5001 47.3999C54.6001 45.3999 53.6001 42.5999 51.6001 41.4999C49.8001 40.4999 47.4001 40.9999 45.8001 42.3999C43.0001 44.6999 41.6001 48.2999 41.7001 51.7999C41.7001 52.7999 41.8001 53.7999 42.1001 54.7999C42.7001 57.0999 43.7001 59.2999 45.0001 61.3999C45.9001 62.9999 46.9001 64.4999 48.0001 65.8999C51.5001 70.6999 55.9001 74.7999 60.9001 77.8999C63.4001 79.3999 66.2001 80.7999 69.0001 81.6999C72.2001 82.6999 75.0001 83.7999 78.4001 83.1999C82.0001 82.4999 85.5001 80.2999 86.9001 76.8999C87.3001 75.8999 87.5001 74.6999 87.3001 73.6999C86.6001 71.2999 83.6001 69.9999 81.8001 68.8999Z" fill="black" />
                </svg>


                <span className="hidden sm:inline ">Falar no WhatsApp</span>
                <span className="sm:hidden">WhatsApp</span>
            </span>
        </Link>
    );
}
