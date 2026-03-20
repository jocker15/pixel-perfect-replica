import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonialsData = [
  { name: "Алёна М.", nameEn: "Alena M.", text: "Таро расклад оказался невероятно точным! Описал мою ситуацию так, будто знает меня лично.", textEn: "The tarot reading was incredibly accurate! It described my situation as if it knew me personally.", stars: 5 },
  { name: "Дмитрий К.", nameEn: "Dmitry K.", text: "Нумерологический анализ открыл для меня новые грани характера. Рекомендую всем!", textEn: "The numerological analysis revealed new facets of my character. Highly recommend!", stars: 5 },
  { name: "Мария С.", nameEn: "Maria S.", text: "Пользуюсь сонником каждое утро. AI толкования намного глубже, чем в обычных книгах.", textEn: "I use the dream book every morning. AI interpretations are much deeper than regular books.", stars: 5 },
  { name: "Игорь Л.", nameEn: "Igor L.", text: "Проверил совместимость с женой — всё совпало! Теперь друзьям показываю.", textEn: "Checked compatibility with my wife — everything matched! Now showing it to friends.", stars: 4 },
  { name: "Ольга В.", nameEn: "Olga V.", text: "Руны и И-Цзин — мои любимые модули. Мудрые ответы на сложные вопросы.", textEn: "Runes and I Ching are my favorite modules. Wise answers to difficult questions.", stars: 5 },
];

export const Testimonials = () => {
  const { t, i18n } = useTranslation();
  const isRu = i18n.language?.startsWith("ru");
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? testimonialsData.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonialsData.length - 1 ? 0 : c + 1));

  const visible = [
    testimonialsData[(current - 1 + testimonialsData.length) % testimonialsData.length],
    testimonialsData[current],
    testimonialsData[(current + 1) % testimonialsData.length],
  ];

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t("testimonials.title")}</h2>
          <p className="text-muted-foreground text-lg">{t("testimonials.subtitle")}</p>
        </motion.div>

        <div className="relative flex items-center justify-center gap-4 lg:gap-6">
          <button onClick={prev} className="shrink-0 w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all active:scale-95">
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex gap-4 lg:gap-6 overflow-hidden max-w-4xl">
            {visible.map((item, i) => (
              <motion.div
                key={`${current}-${i}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: i === 1 ? 1 : 0.5, scale: i === 1 ? 1 : 0.95 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className={`flex-1 min-w-0 bg-card border border-border rounded-2xl p-6 ${i !== 1 ? "hidden sm:block" : ""}`}
              >
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: item.stars }).map((_, s) => (
                    <Star key={s} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                  {Array.from({ length: 5 - item.stars }).map((_, s) => (
                    <Star key={s} className="w-4 h-4 text-border" />
                  ))}
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed mb-4">
                  "{isRu ? item.text : item.textEn}"
                </p>
                <p className="text-sm font-semibold">{isRu ? item.name : item.nameEn}</p>
              </motion.div>
            ))}
          </div>

          <button onClick={next} className="shrink-0 w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all active:scale-95">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {testimonialsData.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-primary w-6" : "bg-border"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
