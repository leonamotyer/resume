import React from 'react';
import { motion } from 'framer-motion';

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  description: string[];
}

const experiences: ExperienceItem[] = [
  {
    title: "Platform Engineer",
    company: "Collective i",
    period: "2024 - Present",
    description: [
    "Achieved significant cost savings by reducing Datadog log expenses by an amount exceeding my monthly salary within my first month.",
    "Designed and deployed tailored dashboards and monitoring solutions to meet specific company needs.",
    "Streamlined AWS billing configuration across all accounts using Terraform, enhancing cost control and scalability.",
    "Enhanced device security for new hires by configuring and encrypting MacBook hard drives with Jamf, and managing their distribution.",
    "Contributed technical expertise to support a successful data center migration initiative.",
    "Assisted with Siem configuration",
    "Assisted team in data migration into AWS",
    "Configured Snyk report metrics to be sent to google excel on weekly basis with graphs to show trends"
    ]
  },
  // Add more experiences here
];

const Experience: React.FC = () => {
  return (
    <div className="space-y-12">
      {experiences.map((exp, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="relative pl-8 border-l-2 border-amber-500"
        >
          <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-amber-500" />
          <div className="mb-2">
            <h3 className="text-xl font-bold text-amber-500">{exp.title}</h3>
            <p className="text-gray-400">{exp.company}</p>
            <p className="text-sm text-gray-500">{exp.period}</p>
          </div>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            {exp.description.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
};

export default Experience; 