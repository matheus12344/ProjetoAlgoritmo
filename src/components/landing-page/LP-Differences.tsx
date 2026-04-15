"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Award, Zap, Heart, UserCheck } from "lucide-react";

const differences = [
  {
    icon: Award,
    title: "11 Anos de Prática Clínica",
    description: "Sólida experiência no tratamento de diversos quadros psicológicos, com foco em adultos."
  },
  {
    icon: Zap,
    title: "Abordagem Comportamental",
    description: "Terapia baseada em evidências científicas, com estratégias práticas para mudanças reais."
  },
  {
    icon: UserCheck,
    title: "Ética e Autoridade",
    description: "Profissionalismo rigoroso e registro ativo no CRP, garantindo segurança e confiança."
  },
  {
    icon: Heart,
    title: "Humanização no Atendimento",
    description: "Acolhimento genuíno e escuta ativa, respeitando o tempo e a singularidade de cada pessoa."
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
              Por que escolher o atendimento com o <span className="text-blue-600">Psicólogo André Fiker em Guarulhos</span>?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
              A escolha de um psicólogo é um passo fundamental. Meu compromisso é oferecer um ambiente onde a ciência e a humanidade se encontram para promover sua saúde mental.
            </p>
            
            <ul className="space-y-4">
              {["Foco em resultados sustentáveis", "Flexibilidade presencial e online", "Ambiente seguro e confidencial"].map((text) => (
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
