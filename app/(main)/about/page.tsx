import Link from "next/link";
import { getUser } from "@/lib/user/user.action";
import {
  Sparkles,
  ShieldCheck,
  Rocket,
  Feather,
  ArrowRight,
  Github,
  Mail,
  BookOpen,
  Users,
  Zap,
  Heart,
} from "lucide-react";
import { use } from "react";

const FEATURES = [
  {
    icon: Feather,
    title: "极简写作",
    desc: "富文本编辑器，专注于表达本身，而非工具复杂度。",
  },
  {
    icon: ShieldCheck,
    title: "可信社区",
    desc: "轻量审核机制过滤噪音，保护每一次认真创作。",
  },
  {
    icon: Zap,
    title: "即时搜索",
    desc: "客户端全文检索，毫秒级响应，让好内容不再沉没。",
  },
  {
    icon: Heart,
    title: "收藏与关注",
    desc: "沉淀你喜欢的作者与文章，构建专属知识库。",
  },
];

const TIMELINE = [
  { year: "2024", label: "种子", text: "最小写作流程上线，验证阅读与创作体验。" },
  { year: "2025", label: "生长", text: "社区互动、审核体系、主题定制逐一落地。" },
  { year: "2026", label: "聚合", text: "知识图谱与智能搜索，让内容发现更自然。" },
];

const STATS = [
  { value: "1,200+", label: "活跃作者", icon: Users },
  { value: "18,000+", label: "沉淀文章", icon: BookOpen },
  { value: "3.7×", label: "阅读深度", icon: Rocket },
];

function About() {
  const user = use(getUser());

  return (
    <div className="min-h-[calc(100vh-64px)] pb-20">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-[radial-gradient(ellipse,color-mix(in_srgb,var(--primary)_15%,transparent),transparent_70%)]" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-theme bg-card/60 backdrop-blur-sm px-4 py-1.5 text-xs text-muted mb-8">
            <Sparkles size={14} className="text-primary" />
            关于 DMB
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-theme font-display leading-[1.15] tracking-tight">
            为深度阅读而生的
            <br />
            <span className="text-primary">博客创作空间</span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-muted max-w-xl mx-auto leading-relaxed">
            这里没有算法推荐的噪音，只有结构化的内容与克制的社区。我们相信好内容值得被认真对待。
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {user ? (
              <>
                <Link
                  href="/create-post"
                  className="btn btn-primary gap-2 rounded-full px-6"
                >
                  开始创作 <ArrowRight size={16} />
                </Link>
                <Link
                  href="/my-posts"
                  className="btn btn-outline rounded-full px-6"
                >
                  我的文章
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/home"
                  className="btn btn-primary gap-2 rounded-full px-6"
                >
                  浏览文章 <ArrowRight size={16} />
                </Link>
                <Link
                  href="/login"
                  className="btn btn-outline rounded-full px-6"
                >
                  加入我们
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-4xl mx-auto px-6 -mt-2">
        <div className="grid grid-cols-3 gap-4 sm:gap-6">
          {STATS.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className="group rounded-2xl border border-theme bg-card/80 backdrop-blur-sm p-5 sm:p-6 text-center transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_24px_-8px_var(--glow)]"
              >
                <Icon
                  size={20}
                  className="mx-auto text-muted group-hover:text-primary transition-colors duration-300"
                />
                <p className="mt-3 text-2xl sm:text-3xl font-bold text-theme font-display tracking-tight">
                  {s.value}
                </p>
                <p className="mt-1 text-xs text-muted">{s.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-4xl mx-auto px-6 mt-20">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-medium">
            核心能力
          </p>
          <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-theme font-display">
            为创作者设计的功能
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="group relative rounded-2xl border border-theme bg-card p-6 sm:p-7 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_30px_-10px_var(--glow)]"
              >
                <div className="flex items-start gap-4">
                  <span className="shrink-0 inline-flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary/15">
                    <Icon size={20} />
                  </span>
                  <div>
                    <h3 className="font-semibold text-theme text-base">
                      {f.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-4xl mx-auto px-6 mt-20">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-medium">
            发展轨迹
          </p>
          <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-theme font-display">
            每一步都在变好
          </h2>
        </div>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[27px] top-3 bottom-3 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent hidden sm:block" />
          <div className="space-y-6">
            {TIMELINE.map((t, i) => (
              <div key={t.year} className="flex gap-5 sm:gap-8 items-start">
                <div className="shrink-0 flex flex-col items-center">
                  <div className="size-14 rounded-2xl border border-theme bg-card flex items-center justify-center text-sm font-bold text-primary font-display">
                    {t.year}
                  </div>
                </div>
                <div className="rounded-2xl border border-theme bg-card p-5 sm:p-6 flex-1 transition-all duration-300 hover:border-primary/20">
                  <p className="text-base font-semibold text-theme">{t.label}</p>
                  <p className="mt-1.5 text-sm text-muted leading-relaxed">
                    {t.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="max-w-4xl mx-auto px-6 mt-20">
        <div className="relative overflow-hidden rounded-3xl border border-theme bg-card p-8 sm:p-12">
          <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--primary)_10%,transparent),transparent_70%)]" />
          <div className="relative">
            <p className="text-xs uppercase tracking-[0.2em] text-primary font-medium">
              设计哲学
            </p>
            <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-theme font-display leading-snug max-w-lg">
              让阅读回归内容，
              <br />
              让写作回归表达。
            </h2>
            <p className="mt-4 text-sm sm:text-base text-muted max-w-lg leading-relaxed">
              无需复杂的界面堆叠，让功能在需要的时候出现。我们优先保证排版可读性、搜索效率与审核透明度，让每一次创作都更有价值。
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/home"
                className="btn btn-primary gap-2 rounded-full px-5 text-sm"
              >
                开始阅读 <ArrowRight size={14} />
              </Link>
              <a
                href="https://github.com/eggCodedmb/blog-next"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline gap-2 rounded-full px-5 text-sm"
              >
                <Github size={14} /> 源码
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact footer */}
      <section className="max-w-4xl mx-auto px-6 mt-16 text-center">
        <p className="text-sm text-muted">
          有想法或建议？欢迎通过 GitHub Issues 与我们交流。
        </p>
      </section>
    </div>
  );
}

export default About;
