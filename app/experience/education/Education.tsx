import React from "react";
import { motion } from "framer-motion";
import { FaGraduationCap, FaAward, FaBook, FaLaptopCode } from "react-icons/fa";

const Education: React.FC = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-cyan-950/40 to-slate-950/60 p-8 rounded-lg border border-cyan-400/20 shadow-lg hover:shadow-cyan-400/10 transition-all duration-300"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div className="flex items-center space-x-4">
            <div className="bg-cyan-400/15 p-3 rounded-full">
              <FaGraduationCap className="text-cyan-300 text-2xl" />
            </div>
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-300 to-violet-300 bg-clip-text text-transparent">
                Software Development Diploma
              </h3>
              <p className="text-gray-300 mt-1">
                Southern Alberta Institute of Technology (SAIT)
              </p>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <span className="bg-cyan-400/15 text-cyan-300 px-4 py-2 rounded-full text-sm font-semibold">
              2023 - 2025
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-slate-900/60 p-4 rounded-lg border border-cyan-400/10"
                      >
            <div className="flex items-center space-x-3 mb-2">
              <FaAward className="text-cyan-300 text-xl" />
              <h4 className="text-cyan-300 font-semibold">
                Academic Excellence
              </h4>
            </div>
            <p className="text-gray-300">Graduated with Honours</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-slate-900/60 p-4 rounded-lg border border-cyan-400/10"
                      >
            <div className="flex items-center space-x-3 mb-2">
              <FaBook className="text-cyan-300 text-xl" />
              <h4 className="text-cyan-300 font-semibold">Program Duration</h4>
            </div>
            <p className="text-gray-300">
              2-year comprehensive program in software development
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-slate-900/60 p-4 rounded-lg border border-cyan-400/10"
                      >
            <div className="flex items-center space-x-3 mb-2">
              <FaLaptopCode className="text-cyan-300 text-xl" />
              <h4 className="text-cyan-300 font-semibold">Industry Focus</h4>
            </div>
            <p className="text-gray-300">
              Completed with a 1 year internship in platform engineering
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Education;
