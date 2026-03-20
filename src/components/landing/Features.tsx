import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const features = [
  { icon: "🔮", title: "Таро", desc: "Расклады на день, ситуацию, кельтский крест" },
  { icon: "🌙", title: "Сонник", desc: "AI толкование снов с разбором символов" },
  { icon: "🔢", title: "Нумерология", desc: "Число судьбы, матрица Пифагора" },
  { icon: "⭐", title: "Астрология", desc: "Персональный гороскоп, транзиты планет" },
  { icon: "💑", title: "Совместимость", desc: "Анализ пары по всем системам" },
  { icon: "ᚱ", title: "Руны", desc: "Расклады Elder Futhark с толкованием" },
  { icon: "☯", title: "И-Цзин", desc: "Мудрость Книги Перемен" },
];

export const Features = () => {
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
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            7 мистических практик
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Всё, что нужно для познания себя — в одном AI-помощнике
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 cursor-pointer"
            >
              <div className="absolute inset-0 rounded-2xl bg-primary/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-start justify-between">
                <div className="space-y-3">
                  <span className="text-3xl">{f.icon}</span>
                  <h3 className="text-xl font-semibold font-serif">{f.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200 mt-1 shrink-0" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
