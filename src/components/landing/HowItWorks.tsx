import { motion } from "framer-motion";
import { MessageSquare, Brain, Sparkles } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    title: "Задай вопрос",
    desc: "Текстом или голосом — бот понимает любые формулировки",
    num: "01",
  },
  {
    icon: Brain,
    title: "AI анализирует",
    desc: "База знаний 20 000+ трактовок и мистических систем",
    num: "02",
  },
  {
    icon: Sparkles,
    title: "Получи ответ",
    desc: "Персональное мистическое толкование в деталях",
    num: "03",
  },
];

export const HowItWorks = () => {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Как это работает</h2>
          <p className="text-muted-foreground text-lg">Три простых шага к мистическому знанию</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-center space-y-5"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20">
                <step.icon className="w-7 h-7 text-primary" />
              </div>
              <span className="block text-xs font-mono text-primary tracking-widest uppercase">
                Шаг {step.num}
              </span>
              <h3 className="text-xl font-semibold font-serif">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
