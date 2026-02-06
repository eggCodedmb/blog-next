import Link from "next/link";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import {
  Sparkles,
  Telescope,
  ShieldCheck,
  Users,
  Feather,
  Rocket,
} from "lucide-react";

const VALUES = [
  {
    title: "内容优先",
    description: "用结构化与精炼表达，让好内容被更快发现。",
    icon: Feather,
  },
  {
    title: "可信社区",
    description: "轻量审核与规则并存，减少噪音，保护创作。",
    icon: ShieldCheck,
  },
  {
    title: "持续进化",
    description: "从阅读体验到创作工具，保持每次迭代的边际提升。",
    icon: Rocket,
  },
];

const MILESTONES = [
  {
    year: "2024",
    title: "起步",
    detail: "建立最小写作与发布流程，验证阅读体验。",
  },
  {
    year: "2025",
    title: "扩展",
    detail: "推出社区互动、审核体系与主题定制。",
  },
  {
    year: "2026",
    title: "聚合",
    detail: "让内容沉淀为知识图谱，强化搜索与发现。",
  },
];

function About() {
  return (
    <div className="w-full h-[calc(100vh-64px)] px-4 py-6">
      <ScrollArea.Root className="h-full w-full overflow-hidden">
        <ScrollArea.Viewport className="h-full w-full pr-1">
          <div className="w-full max-w-5xl mx-auto pb-10">
            <section className="relative overflow-hidden rounded-3xl border border-theme bg-card p-6 sm:p-10 card-glow">
              <div className="absolute inset-0">
                <div className="absolute -top-24 right-0 h-64 w-64 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--primary)_28%,transparent),transparent_60%)]" />
                <div className="absolute -bottom-24 left-0 h-64 w-64 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--bg-2)_80%,transparent),transparent_60%)]" />
              </div>
              <div className="relative space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-theme bg-[color-mix(in_srgb,var(--card)_92%,transparent)] px-3 py-1 text-xs text-muted">
                  <Sparkles size={14} />
                  关于我们
                </div>
                <h1 className="text-3xl sm:text-4xl font-semibold text-theme font-display leading-tight">
                  为深度阅读与高质量创作，
                  <br />
                  打造稳定、清晰、有温度的博客空间。
                </h1>
                <p className="text-sm sm:text-base text-muted max-w-2xl">
                  我们相信内容的价值来自长期积累。这里既有简洁的写作工具，也有克制的社区机制，帮你沉淀观点、连接同好、持续输出。
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <Link href="/create-post" className="btn btn-primary">
                    开始创作
                  </Link>
                  <Link href="/my-posts" className="btn btn-outline text-muted">
                    查看我的帖子
                  </Link>
                </div>
              </div>
            </section>

            <section className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-theme bg-card p-5 card-glow">
                <p className="text-xs text-muted">活跃作者</p>
                <p className="mt-2 text-2xl font-semibold text-theme">1,200+</p>
                <p className="mt-1 text-xs text-muted">持续写作的创作者</p>
              </div>
              <div className="rounded-2xl border border-theme bg-card p-5 card-glow">
                <p className="text-xs text-muted">内容沉淀</p>
                <p className="mt-2 text-2xl font-semibold text-theme">18,000+</p>
                <p className="mt-1 text-xs text-muted">被收藏与引用的文章</p>
              </div>
              <div className="rounded-2xl border border-theme bg-card p-5 card-glow">
                <p className="text-xs text-muted">阅读时长</p>
                <p className="mt-2 text-2xl font-semibold text-theme">3.7x</p>
                <p className="mt-1 text-xs text-muted">对比常规内容平台</p>
              </div>
            </section>

            <section className="mt-10">
              <div className="flex items-center gap-2 text-sm text-muted">
                <Telescope size={16} />
                我们在做什么
              </div>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                {VALUES.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-theme bg-card p-6 card-glow"
                    >
                      <div className="flex items-center gap-2 text-sm text-muted">
                        <span className="inline-flex size-9 items-center justify-center rounded-full border border-theme bg-[color-mix(in_srgb,var(--card)_85%,transparent)]">
                          <Icon size={18} />
                        </span>
                        {item.title}
                      </div>
                      <p className="mt-3 text-sm text-theme/85">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="mt-10 rounded-2xl border border-theme bg-card p-6 sm:p-8 card-glow">
              <div className="flex items-center gap-2 text-sm text-muted">
                <Users size={16} />
                我们的轨迹
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {MILESTONES.map((item) => (
                  <div
                    key={item.year}
                    className="rounded-xl border border-theme bg-[color-mix(in_srgb,var(--card)_92%,transparent)] p-4"
                  >
                    <p className="text-xs text-muted">{item.year}</p>
                    <p className="mt-2 text-lg font-semibold text-theme">
                      {item.title}
                    </p>
                    <p className="mt-2 text-sm text-muted">{item.detail}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-10 grid gap-4 md:grid-cols-[1.2fr_1fr]">
              <div className="rounded-2xl border border-theme bg-card p-6 sm:p-8 card-glow">
                <p className="text-xs text-muted">我们坚持的体验标准</p>
                <h2 className="mt-2 text-2xl font-semibold text-theme font-display">
                  让阅读回归内容，让写作更轻松。
                </h2>
                <p className="mt-3 text-sm text-muted">
                  无需复杂的界面堆叠，让功能在需要的时候出现。我们优先保证排版可读性、搜索效率与审核透明度，让每一次创作都更有回应。
                </p>
              </div>
              <div className="rounded-2xl border border-theme bg-card p-6 sm:p-8 card-glow">
                <p className="text-xs text-muted">下一步</p>
                <h3 className="mt-2 text-xl font-semibold text-theme font-display">
                  更聚焦的内容发现
                </h3>
                <p className="mt-3 text-sm text-muted">
                  计划引入专题、收藏夹协作与写作摘要，让好内容被更快索引、复用与传播。
                </p>
                <div className="mt-4 flex items-center gap-2 text-sm text-muted">
                  <ShieldCheck size={16} />
                  每一次更新都以稳定为前提
                </div>
              </div>
            </section>
          </div>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar orientation="vertical" className="hidden sm:block w-2">
          <ScrollArea.Thumb className="bg-slate-400/60 dark:bg-slate-500/60 rounded-full" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </div>
  );
}

export default About;
