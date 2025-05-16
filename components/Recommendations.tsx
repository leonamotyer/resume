import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLinkedin } from 'react-icons/fa';

const recommendations = [
  {
    name: 'Dalin Laqua',
    title: 'Senior Platform Engineer, Collective i',
    avatar: 'collectivei.png',
    linkedin: 'https://www.linkedin.com/in/dalinlaqua/',
    text: 'Leona is a highly skilled engineer who always brings innovative solutions to the table. Her technical expertise and collaborative spirit make her an invaluable team member.'
  },
  {
    name: 'Hani Mohammed',
    title: 'Professor, Southern Alberta Institute of Technology',
    avatar: '/sait.png',
    linkedin: 'https://www.linkedin.com/in/hani-mohammed-ph-d-4ba34a6a/',
    text: 'Leona demonstrated exceptional problem-solving abilities in my class. She is dedicated, resourceful, and always eager to help her peers succeed.'
  },
  {
    name: 'Camilo Romero',
    title: 'Professor, Southern Alberta Institute of Technology',
    avatar: '/sait.png',
    linkedin: 'https://www.linkedin.com/in/rickdeoliveira/',
    text: 'Leona consistently impressed me with her creativity and leadership. She has a knack for turning complex challenges into opportunities for growth.'
  },
  {
    name: 'Mamta Verma',
    title: 'Professor, Southern Alberta Institute of Technology',
    avatar: '/sait.png',
    linkedin: 'https://www.linkedin.com/in/mamta-verma-28a368115/',
    text: 'Leona is a true asset to any team. Her attention to detail, positive attitude, and strong work ethic set her apart from her peers.'
  },
 // {
 //   name: 'Mehdi Shokrani',
 //   title: 'Professor, Southern Alberta Institute of Technology',
 //    avatar: '/sait.png',
 //   linkedin: 'https://www.linkedin.com/in/mamta-verma-28a368115/',
 //   text: 'Leona consistently delivers high-quality work and is a great collaborator. She is a true asset to any team.'
 // },
];

export default function Recommendations() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % recommendations.length);
  const prev = () => setIndex((prev) => (prev - 1 + recommendations.length) % recommendations.length);

  return (
    <section className="py-20 px-4 max-w-2xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-bold mb-12 text-center text-amber-500"
      >
        Recommendations
      </motion.h2>
      <div className="relative flex flex-col items-center">
        <button
          onClick={prev}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-800/80 hover:bg-amber-500 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg z-10 transition-colors"
          aria-label="Previous"
        >
          &#8592;
        </button>
        <div className="w-full flex justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl p-8 flex flex-col items-center max-w-md w-full min-h-[340px]"
            >
              <img
                src={recommendations[index].avatar}
                alt={recommendations[index].name}
                className={
                  (recommendations[index].avatar === '/collectivei.png' || recommendations[index].avatar === 'collectivei.png'
                    ? 'w-16 h-16 p-4'
                    : 'w-20 h-20') +
                  ' rounded-full mb-4 border-4 border-amber-500 shadow-lg bg-white ' +
                  (recommendations[index].avatar === '/collectivei.png' || recommendations[index].avatar === 'collectivei.png'
                    ? 'object-contain'
                    : 'object-cover object-center')
                }
                onError={(e) => (e.currentTarget.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(recommendations[index].name))}
              />
              <h3 className="text-xl font-semibold text-white mb-1">{recommendations[index].name}</h3>
              <p className="text-amber-400 text-sm mb-1">{recommendations[index].title}</p>
              {recommendations[index].linkedin && (
                <a
                  href={recommendations[index].linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-3 text-amber-500 hover:text-amber-400 transition-colors flex items-center gap-2"
                  aria-label={`View ${recommendations[index].name}'s LinkedIn`}
                >
                  <FaLinkedin className="text-2xl" />
                  <span className="sr-only">LinkedIn</span>
                </a>
              )}
              <p className="text-gray-300 text-center italic">“{recommendations[index].text}”</p>
            </motion.div>
          </AnimatePresence>
        </div>
        <button
          onClick={next}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-800/80 hover:bg-amber-500 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg z-10 transition-colors"
          aria-label="Next"
        >
          &#8594;
        </button>
      </div>
      <div className="flex justify-center mt-6 gap-2">
        {recommendations.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full ${i === index ? 'bg-amber-500' : 'bg-gray-600'} transition-colors`}
            aria-label={`Go to recommendation ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
} 