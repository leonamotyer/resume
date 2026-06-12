"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface ImageCarouselProps {
  images: string[];
  alt: string;
  className?: string;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  alt,
  className = "w-full h-40 sm:h-48 bg-black object-cover object-center",
}) => {
  const [index, setIndex] = useState(0);

  const goTo = (next: number) => {
    setIndex((next + images.length) % images.length);
  };

  return (
    <div className="relative group">
      <AnimatePresence mode="wait">
        <motion.img
          key={images[index]}
          src={images[index]}
          alt={`${alt} – screenshot ${index + 1} of ${images.length}`}
          className={className}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-slate-900/70 p-1.5 text-cyan-300 opacity-0 ring-1 ring-cyan-400/30 transition-opacity hover:bg-slate-900/90 group-hover:opacity-100 focus:opacity-100"
            aria-label="Previous image"
          >
            <FaChevronLeft className="text-sm" />
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-slate-900/70 p-1.5 text-cyan-300 opacity-0 ring-1 ring-cyan-400/30 transition-opacity hover:bg-slate-900/90 group-hover:opacity-100 focus:opacity-100"
            aria-label="Next image"
          >
            <FaChevronRight className="text-sm" />
          </button>

          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === index
                    ? "w-4 bg-cyan-300"
                    : "w-1.5 bg-cyan-300/40 hover:bg-cyan-300/70"
                }`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ImageCarousel;
