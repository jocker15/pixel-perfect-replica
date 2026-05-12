import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Palette,
  MessageCircle,
  CalendarDays,
  Gift,
  Search,
  CalendarCheck,
  Database,
  Send,
  ImagePlus,
  Sparkles,
  LayoutGrid,
  Video,
  Target,
  Megaphone,
  Headphones,
  BarChart3,
  Users,
} from "lucide-react";
import { GlowCard } from "./GlowCard";

interface ModuleItem {
  icon: React.ElementType;
  key: string;
}

const tabConfig: {
  labelKey: string;
  prefix: string;
  modules: ModuleItem[];
}[] = [
  {
    labelKey: "modules.tab1",
    prefix: "packaging",
    modules: [
      { icon: Palette, key: "packaging1" },
      { icon: MessageCircle, key: "packaging2" },
      { icon: CalendarDays, key: "packaging3" },
      { icon: Gift, key: "packaging4" },
    ],
  },
  {
    labelKey: "modules.tab2",
    prefix: "attraction",
    modules: [
      { icon: Search, key: "attraction1" },
      { icon: CalendarCheck, key: "attraction2" },
      { icon: Database, key: "attraction3" },
      { icon: Send, key: "attraction4" },
    ],
  },
  {
    labelKey: "modules.tab3",
    prefix: "content",
    modules: [
      { icon: ImagePlus, key: "content1" },
      { icon: Sparkles, key: "content2" },
      { icon: LayoutGrid, key: "content3" },
      { icon: Send, key: "content4" },
    ],
  },
  {
    labelKey: "modules.tab4",
    prefix: "marketer",
    modules: [
      { icon: Video, key: "marketer1" },
      { icon: Target, key: "marketer2" },
      { icon: Megaphone, key: "marketer3" },
      { icon: Headphones, key: "marketer4" },
    ],
  },
];

const crossCutting: ModuleItem[] = [
  { icon: BarChart3, key: "analytics" },
  { icon: Users, key: "crm" },
];

const statKeys = ["stat1", "stat2", "stat3", "stat4", "stat5"] as const;

export const Modules = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(0);

  const currentTab = tabConfig[activeTab];

  return (
    <section className="relative py-24 lg:py-32">
      <div className="container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {t("modules.title")}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t("modules.subtitle")}
          </p>
        </motion.div>

        {/* Tab buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {tabConfig.map((tab, i) => (
            <button
              key={tab.prefix}
              onClick={() => setActiveTab(i)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                activeTab === i
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {t(tab.labelKey)}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab.prefix}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Module cards grid */}
            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              {currentTab.modules.map((mod, i) => (
                <motion.div
                  key={mod.key}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <GlowCard className="rounded-2xl bg-card border border-border p-6 h-full">
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <mod.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold mb-1">
                          {t(`modules.${mod.key}`)}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {t(`modules.${mod.key}Desc`)}
                        </p>
                      </div>
                    </div>
                  </GlowCard>
                </motion.div>
              ))}
            </div>

            {/* Stats block — only for Tab 2 (Привлечение) */}
            {activeTab === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="mb-10"
              >
                <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4 text-center">
                  {t("modules.attractionStats")}
                </h4>
                <div className="flex flex-wrap justify-center gap-3">
                  {statKeys.map((sk) => (
                    <span
                      key={sk}
                      className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary"
                    >
                      {t(`modules.${sk}`)}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Cross-cutting modules */}
            <div>
              <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4 text-center">
                {t("modules.crossCutting")}
              </h4>
              <div className="grid sm:grid-cols-2 gap-6">
                {crossCutting.map((mod, i) => (
                  <motion.div
                    key={mod.key}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.35 + i * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <GlowCard className="rounded-2xl bg-card border border-border p-6 h-full">
                      <div className="flex items-start gap-4">
                        <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                          <mod.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-base font-semibold mb-1">
                            {t(`modules.${mod.key}`)}
                          </h3>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {t(`modules.${mod.key}Desc`)}
                          </p>
                        </div>
                      </div>
                    </GlowCard>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
