"use client";

import { motion } from "framer-motion";
import { Brain, CalendarRange, Gauge, HeartHandshake, Repeat2, Users } from "lucide-react";

const demands = [
  {
    icon: Brain,
    title: "Ansiedade e Estresse",
    description: "Compreensão de padrões ligados à preocupação, tensão e sobrecarga no cotidiano."
  },
  {
    icon: Gauge,
    title: "Autocobrança e Perfeccionismo",
    description: "Análise das regras, expectativas e respostas que mantêm ciclos de cobrança e adiamento."
  },
  {
    icon: Repeat2,
    title: "Desânimo e Rotina",
    description: "Observação da rotina, das fontes de sofrimento e das possibilidades de ação no dia a dia."
  },
  {
    icon: HeartHandshake,
    title: "Relacionamentos e Limites",
    description: "Trabalho sobre padrões de interação, comunicação, limites e decisões relacionais."
  },
  {
    icon: CalendarRange,
    title: "Transições de Vida",
    description: "Espaço para compreender mudanças pessoais, familiares ou profissionais e suas implicações."
  },
  {
    icon: Users,
    title: "Padrões de Comportamento",
    description: "Identificação das situações e consequências associadas a padrões que geram sofrimento."
  }
];

export function LPDemands() {
  return (
    <section className="py-24 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Questões que podem ser trabalhadas na psicoterapia
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Na psicoterapia de adultos, o foco é compreender o contexto de cada
            pessoa e organizar objetivos para o processo terapêutico.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {demands.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-8 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-900 transition-all hover:shadow-xl hover:-translate-y-1"
            >
              <div className="w-14 h-14 bg-white dark:bg-slate-800 rounded-xl shadow-sm flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                <item.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                {item.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
