"use client";

import { motion } from "framer-motion";
import { Brain, Smile, Users, TrendingUp, HeartHandshake, ShieldCheck, Heart } from "lucide-react";

const demands = [
  {
    icon: Brain,
    title: "Ansiedade e Estresse",
    description: "Ferramentas práticas para lidar com a preocupação excessiva e o esgotamento."
  },
  {
    icon: Heart,
    title: "Ansiedade e Autoestima Feminina",
    description: "Terapia especializada para mulheres que lidam com sobrecarga emocional, autoestima, pressões nos relacionamentos e ansiedade. Espaço seguro para se reconectar com o que importa."
  },
  {
    icon: Smile,
    title: "Depressão e Desânimo",
    description: "Apoio profissional para reencontrar o sentido e a motivação no dia a dia."
  },
  {
    icon: HeartHandshake,
    title: "Autoestima e Autoconfiança",
    description: "Fortalecimento da relação consigo mesmo e segurança pessoal."
  },
  {
    icon: Users,
    title: "TDAH e TEA em Adultos",
    description: "Acompanhamento especializado para manejo de sintomas e adaptação funcional."
  },
  {
    icon: TrendingUp,
    title: "Alta Performance",
    description: "Desenvolvimento de competências emocionais para carreira e vida pessoal."
  },
  {
    icon: ShieldCheck,
    title: "Transtornos de Personalidade",
    description: "Abordagem baseada em evidências para quadros complexos e crônicos."
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
            Tratamento Psicológico em Guarulhos: Como Podemos Ajudar?
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            A terapia é um espaço seguro para trabalhar demandas que impedem sua evolução pessoal e bem-estar emocional.
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
