import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const REVIEW_COUNT = 5;
const reviewIndices = Array.from({ length: REVIEW_COUNT }, (_, i) => i + 1);

export const Testimonials = () => {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? REVIEW_COUNT - 1 : c - 1));
  const next = () => setCurrent((c) => (c === REVIEW_COUNT - 1 ? 0 : c + 1));

  const visibleIndices = [
    reviewIndices[(current - 1 + REVIEW_COUNT) % REVIEW_COUNT],
    reviewIndices[current],
    reviewIndices[(current + 1) % REVIEW_COUNT],
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
          <button
            onClick={prev}
            className="shrink-0 w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex gap-4 lg:gap-6 overflow-hidden max-w-4xl">
            {visibleIndices.map((n, i) => (
              <motion.div
                key={`${current}-${i}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: i === 1 ? 1 : 0.5, scale: i === 1 ? 1 : 0.95 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className={`flex-1 min-w-0 bg-card border border-border rounded-2xl p-6 ${
                  i !== 1 ? "hidden sm:block" : ""
                }`}
              >
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed mb-4">
                  "{t(`testimonials.r${n}text`)}"
                </p>
                <p className="text-sm font-semibold">{t(`testimonials.r${n}name`)}</p>
                <p className="text-xs text-muted-foreground">{t(`testimonials.r${n}niche`)}</p>
              </motion.div>
            ))}
          </div>

          <button
            onClick={next}
            className="shrink-0 w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all active:scale-95"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {reviewIndices.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === current ? "bg-primary w-6" : "bg-border"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
