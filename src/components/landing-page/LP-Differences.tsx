"use client";

import { motion } from "framer-motion";
import { Award, BadgeCheck, CheckCircle2, GraduationCap, Waypoints } from "lucide-react";

const differences = [
  {
    icon: Award,
    title: "12 Anos de Prática Clínica",
    description: "Prática clínica em psicoterapia individual com adultos."
  },
  {
    icon: Waypoints,
    title: "Terapia Comportamental + TCC",
    description: "Referenciais apresentados de forma clara e relacionados aos objetivos de cada processo."
  },
  {
    icon: GraduationCap,
    title: "Formação",
    description: "Graduação em Psicologia pela PUC-SP e formação em Terapia Comportamental pelo ITCR."
  },
  {
    icon: BadgeCheck,
    title: "Registro Profissional",
    description: "André Fiker, psicólogo, CRP 06/115147."
  }
];

export function LPDifferences() {
  return (
    <section id="sobre" className="py-24 bg-blue-50/50 dark:bg-slate-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
              Sobre o atendimento com <span className="text-blue-600">André Fiker em Guarulhos</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
              Psicoterapia particular para adultos, presencial no Centro de
              Guarulhos ou online, com sessões individuais de 50 minutos.
            </p>
            
            <ul className="space-y-4">
              {["Psicoterapia de adultos", "Sessões individuais de 50 minutos", "Atendimento presencial e online"].map((text) => (
                <li key={text} className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  {text}
                </li>
              ))}
            </ul>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {differences.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800"
              >
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 mb-4">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
