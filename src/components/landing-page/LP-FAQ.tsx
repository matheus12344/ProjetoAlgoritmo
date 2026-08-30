"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Onde as consultas são realizadas?",
    answer: "As consultas presenciais ocorrem no Centro de Guarulhos. Também há atendimento online para adultos."
  },
  {
    question: "Quanto tempo dura cada sessão?",
    answer: "As sessões individuais têm duração de 50 minutos. A frequência é combinada de acordo com o processo terapêutico."
  },
  {
    question: "Atende convênios médicos?",
    answer: "Atendemos exclusivamente de forma particular, mas fornecemos recibo para que você possa solicitar o reembolso junto ao seu convênio, caso ele ofereça essa opção (Livre Escolha)."
  },
  {
    question: "Como funciona a dinâmica das sessões?",
    answer: "A Terapia Comportamental e a TCC ajudam a compreender relações entre contexto, pensamentos, emoções e ações. Os objetivos são definidos e revistos de forma colaborativa."
  },
  {
    question: "Qual o valor da consulta?",
    answer: "O valor atual da sessão particular é R$250. As formas de pagamento podem ser confirmadas no contato de agendamento."
  }
];

export function LPFAQ() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Dúvidas Frequentes
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Respostas rápidas para as perguntas mais comuns sobre o processo terapêutico.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible defaultValue="item-4" className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-6"
              >
                <AccordionTrigger className="text-left text-slate-900 dark:text-white font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
