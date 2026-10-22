import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Mail, Menu, MessageCircle, Phone, X } from "lucide-react";
import hero from "@/assets/hero-insumos.jpg";
import heroBg from "@/assets/hero-insumos-fundo.jpg";
import { cn } from "@/lib/utils";
import { products } from "@/lib/products";
import { enviarOrcamento } from "@/lib/orcamento.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Simple Etiquetas | Etiquetas Térmicas, Envelopes e Plástico Bolha" },
      {
        name: "description",
        content:
          "Etiquetas térmicas em rolo e resma, envelopes de segurança, fitas adesivas e plástico bolha para indústria, logística, e-commerce e varejo. Atendimento direto e orçamento em 24 horas.",
      },
      { property: "og:title", content: "Simple Etiquetas | Etiquetas Térmicas e Insumos de Embalagem" },
      {
        property: "og:description",
        content:
          "Etiquetas térmicas, envelopes de segurança, fitas adesivas e plástico bolha para a sua operação. Peça o orçamento e receba resposta dentro de 24 horas.",
      },
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Simple Etiquetas | Etiquetas Térmicas e Insumos de Embalagem" },
      {
        name: "twitter:description",
        content: "Etiquetas térmicas, envelopes, fitas adesivas e plástico bolha para indústria, logística, e-commerce e varejo.",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const setores = ["Indústria", "Logística", "Varejo", "Alimentos", "Farmacêutico", "E-commerce"];

const heroCategorias = [
  "Etiquetas térmicas",
  "Envelopes de segurança",
  "Fitas adesivas",
  "Plástico bolha",
];

const navLinks = [
  { href: "#inicio", label: "Home" },
  { href: "#produtos", label: "Produtos" },
  { href: "#setores", label: "Setores" },
  { href: "#diferenciais", label: "Por que nós" },
];

const diferenciais = [
  { n: "01", t: "Atendimento consultivo", d: "Entendemos sua operação antes de indicar o material." },
  { n: "02", t: "Prazo que cumpre", d: "Produção ágil e entregas programadas para sua linha não parar." },
  { n: "03", t: "Preço de fábrica", d: "Condições especiais para pedidos recorrentes e grandes volumes." },
];

function goToSection(href: string, close?: () => void) {
  close?.();
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      const el = document.getElementById(href.replace("#", ""));
      if (!el) return;
      const y = el.getBoundingClientRect().top + window.scrollY - 88;
      window.scrollTo({ top: y, behavior: "smooth" });
    }),
  );
}

function Index() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuOpenRef = useRef(false);
  menuOpenRef.current = menuOpen;
  const [activeSec, setActiveSec] = useState("inicio");

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => {
      if (mq.matches) setMenuOpen(false);
    };
    mq.addEventListener("change", onChange);
    window.addEventListener("keydown", onKey);
    return () => {
      mq.removeEventListener("change", onChange);
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  useEffect(() => {
    const ids = navLinks.map((n) => n.href.slice(1));
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    const first = els[0];
    const last = els[els.length - 1];
    if (!first || !last) return;
    const onScroll = () => {
      if (menuOpenRef.current) return;
      let current = first.id;
      for (const el of els) {
        if (el.getBoundingClientRect().top <= 160) current = el.id;
      }
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
        current = last.id;
      }
      setActiveSec(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border bg-background">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-6 md:flex md:justify-between">
          <a
            href="#inicio"
            className="flex min-w-0 flex-col items-center justify-self-start gap-1"
          >
            <img
              src="/simple-logo-lockup.png"
              alt="Simple Etiquetas"
              className="h-10 w-auto shrink-0 sm:h-11"
            />
            <span className="pl-[0.22em] font-display text-[10px] font-semibold uppercase leading-none tracking-[0.22em] text-kraft-deep">
              Insumos Logísticos
            </span>
          </a>

          <nav
            aria-label="Navegação principal"
            className="hidden items-center gap-1 rounded-full border border-border/70 bg-secondary/70 p-1 md:flex"
          >
            {navLinks.map((n) => {
              const isCurrent = activeSec === n.href.slice(1);
              return (
                <a
                  key={n.href}
                  href={n.href}
                  aria-current={isCurrent ? "true" : undefined}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-bold tracking-tight transition-all duration-200",
                    isCurrent
                      ? "bg-card text-kraft-deep shadow-sm"
                      : "text-muted-foreground hover:bg-card/60 hover:text-foreground",
                  )}
                >
                  {n.label}
                </a>
              );
            })}
          </nav>
          <div className="flex shrink-0 items-center gap-2">
            <a href="#orcamento" className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-sm transition hover:-translate-y-0.5 hover:opacity-90 sm:inline-block">
              Solicitar orçamento
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="menu-mobile"
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card text-foreground transition hover:border-kraft hover:text-kraft active:scale-95 md:hidden"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div id="menu-mobile" className="border-t border-border bg-background md:hidden">
            <nav aria-label="Navegação principal" className="mx-auto flex max-w-6xl flex-col px-4 pb-5 pt-3 sm:px-6">
              <span className="px-4 pb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-kraft-deep">
                Menu
              </span>
              {navLinks.map((n, i) => {
                const isCurrent = activeSec === n.href.slice(1);
                return (
                  <a
                    key={n.href}
                    href={n.href}
                    data-menu-item
                    aria-current={isCurrent ? "true" : undefined}
                    onClick={(e) => {
                      e.preventDefault();
                      goToSection(n.href, () => setMenuOpen(false));
                    }}
                    style={{
                      animation: "menu-in .32s cubic-bezier(.22,1,.36,1) both",
                      animationDelay: `${i * 45}ms`,
                    }}
                    className={cn(
                      "flex items-center justify-between gap-3 rounded-2xl px-4 py-3.5 text-base font-bold transition-colors",
                      isCurrent ? "bg-ink text-ink-foreground shadow-sm" : "hover:bg-secondary",
                    )}
                  >
                    {n.label}
                    <ArrowRight
                      className={cn(
                        "h-4 w-4 shrink-0 transition-opacity",
                        isCurrent ? "text-secondary opacity-100" : "text-muted-foreground opacity-40",
                      )}
                    />
                  </a>
                );
              })}
              <a
                href="#orcamento"
                data-menu-item
                onClick={(e) => {
                  e.preventDefault();
                  goToSection("#orcamento", () => setMenuOpen(false));
                }}
                style={{
                  animation: "menu-in .32s cubic-bezier(.22,1,.36,1) both",
                  animationDelay: `${navLinks.length * 45}ms`,
                }}
                className="mt-3 rounded-full bg-primary px-5 py-3.5 text-center font-bold text-primary-foreground shadow-sm transition hover:opacity-90"
              >
                Solicitar orçamento
              </a>
            </nav>
          </div>
        )}
      </header>

      <section id="inicio" className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <img
            src={heroBg}
            alt=""
            width={1920}
            height={1088}
            className="h-full w-full object-cover object-center opacity-[0.42] md:object-[72%_center]"
          />
          <div className="absolute inset-0 bg-linear-to-r from-background from-15% via-background/70 to-background/20" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-background to-transparent" />
        </div>
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:py-24">
        <div>
          <span className="inline-block rounded-full bg-secondary px-4 py-1 text-xs font-bold uppercase tracking-widest text-kraft">
            Insumos Logísticos
          </span>
          <h1 className="mt-6 text-4xl font-extrabold leading-tight md:text-6xl">
            Etiquetas e embalagens que fazem sua operação <span className="text-primary">decolar.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg text-muted-foreground">
            Do código de barras que identifica o item ao volume que sai lacrado: etiquetas térmicas, envelopes de segurança, fitas adesivas e plástico bolha para a sua operação. Material, cola e medida escolhidos para o seu produto, com atendimento direto e orçamento respondido em 24 horas.
          </p>
          <ul className="mt-7 flex flex-wrap gap-2.5">
            {heroCategorias.map((categoria) => (
              <li
                key={categoria}
                className="flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-sm font-semibold"
              >
                <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {categoria}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#orcamento" className="rounded-full bg-ink px-7 py-3.5 font-bold text-ink-foreground transition hover:opacity-90">Peça seu orçamento</a>
            <a href="#produtos" className="rounded-full border-2 border-ink px-7 py-3.5 font-bold transition hover:bg-secondary">Ver produtos</a>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-3 -rotate-2 rounded-3xl bg-kraft/30" />
          <img src={hero} alt="Rolos de etiquetas térmicas, envelope de papel kraft, fita adesiva e plástico bolha sobre fundo creme" width={1536} height={1024} className="relative rounded-3xl shadow-2xl" />
        </div>
        </div>
      </section>

      <section id="produtos" className="bg-card py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-extrabold md:text-4xl">Nossos produtos</h2>
          <p className="mt-3 text-muted-foreground">Etiquetas térmicas e materiais de embalagem para identificar, proteger e expedir seus produtos.</p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <article key={`${p.name}-${p.specification}`} className="group flex min-w-0 flex-col overflow-hidden rounded-lg border border-border bg-background transition-colors hover:border-primary">
                <img src={p.image} alt={p.alt} loading="lazy" width={1024} height={768} className="aspect-[4/3] w-full object-cover" />
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-bold leading-snug tracking-normal">{p.name}</h3>
                  <p className="mt-2 text-sm font-bold text-kraft-deep">{p.specification}</p>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">{p.description}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted-foreground">Imagens ilustrativas dos produtos.</p>
        </div>
      </section>

      <section id="setores" className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-3xl font-extrabold md:text-4xl">Atendemos diversos setores</h2>
        <div className="mt-10 flex flex-wrap gap-3">
          {setores.map((s) => (
            <span key={s} className="rounded-full border-2 border-primary px-6 py-2.5 font-semibold">{s}</span>
          ))}
        </div>
      </section>

      <section id="diferenciais" className="bg-ink py-20 text-ink-foreground">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-extrabold md:text-4xl">Por que a Simple Etiquetas?</h2>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {diferenciais.map((d) => (
              <div key={d.n}>
                <span className="font-display text-5xl font-extrabold text-kraft">{d.n}</span>
                <h3 className="mt-3 text-xl font-bold">{d.t}</h3>
                <p className="mt-2 opacity-75">{d.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="orcamento" className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-3xl font-extrabold md:text-4xl">Solicite seu orçamento</h2>
        <p className="mt-4 text-muted-foreground">Conte o que sua empresa precisa e nossa equipe retorna dentro de 24hrs.</p>
        <div className="mt-8 grid gap-6 md:grid-cols-2 md:items-stretch">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (submitting) return;

              const form = e.currentTarget;
              const values = new FormData(form);
              setSubmitting(true);
              setSubmitError("");

              try {
                const result = await enviarOrcamento({
                  data: {
                    empresa: String(values.get("empresa") ?? ""),
                    nome: String(values.get("nome") ?? ""),
                    email: String(values.get("email") ?? ""),
                    telefone: String(values.get("telefone") ?? ""),
                    mensagem: String(values.get("mensagem") ?? ""),
                  },
                });

                if (!result?.ok) {
                  setSubmitError("Não foi possível enviar seu pedido. Tente novamente ou fale conosco pelo WhatsApp.");
                  return;
                }

                setSent(true);
                form.reset();
              } catch (error) {
                console.error("Erro ao enviar orçamento:", error);
                setSubmitError("Não foi possível enviar seu pedido. Tente novamente ou fale conosco pelo WhatsApp.");
              } finally {
                setSubmitting(false);
              }
            }}
            className="space-y-4 rounded-2xl border border-border bg-card p-8"
          >
            {sent ? (
              <p className="py-10 text-center text-lg font-bold text-primary">
                Pedido enviado! Entraremos em contato em breve.
              </p>
            ) : (
              <>
                <input name="empresa" required maxLength={200} type="text" placeholder="Empresa" className="w-full rounded-lg border border-input bg-background px-4 py-3 outline-none focus:border-primary" />
                <input name="nome" required maxLength={200} type="text" placeholder="Seu nome" className="w-full rounded-lg border border-input bg-background px-4 py-3 outline-none focus:border-primary" />
                <input name="email" required maxLength={255} type="email" placeholder="E-mail" className="w-full rounded-lg border border-input bg-background px-4 py-3 outline-none focus:border-primary" />
                <input name="telefone" required maxLength={40} type="tel" placeholder="Telefone" className="w-full rounded-lg border border-input bg-background px-4 py-3 outline-none focus:border-primary" />
                <textarea name="mensagem" maxLength={3000} placeholder="O que você precisa? (tipo, tamanho, quantidade)" rows={4} className="w-full rounded-lg border border-input bg-background px-4 py-3 outline-none focus:border-primary" />
                {submitError && (
                  <p role="alert" className="text-sm font-medium text-red-600">{submitError}</p>
                )}
                <button disabled={submitting} className="w-full rounded-full bg-primary py-3.5 font-bold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60">
                  {submitting ? "Enviando..." : "Enviar pedido de orçamento"}
                </button>
              </>
            )}
          </form>
          <div className="flex flex-col justify-center rounded-2xl border border-border bg-card p-8 text-center">
            <p className="font-display text-lg font-extrabold tracking-widest">FALE CONOSCO!</p>
            <div className="mt-5 flex justify-center gap-3">
              <a
                href="tel:+5531984060199"
                aria-label="Ligar para (31) 98406-0199"
                className="grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground transition hover:opacity-90"
              >
                <Phone className="h-5 w-5" />
              </a>
              <a
                href="https://wa.me/5531984060199"
                target="_blank"
                rel="noreferrer"
                aria-label="Conversar no WhatsApp"
                className="grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground transition hover:opacity-90"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <a
                href="mailto:atendimento@simpleempreendimentos.com.br"
                aria-label="Enviar e-mail para atendimento@simpleempreendimentos.com.br"
                className="grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground transition hover:opacity-90"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
            <p className="mt-5 text-lg font-bold">(31) 98406-0199</p>
            <p className="mt-1 break-words text-muted-foreground">atendimento@simpleempreendimentos.com.br</p>
            <p className="mt-4 text-sm text-muted-foreground">Rua São José, 51 — Extrema-MG — CEP 37640-408</p>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-ink py-12 text-ink-foreground">
        <div className="mx-auto grid max-w-6xl gap-x-10 gap-y-8 px-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_auto] md:items-start">
          <div>
            <div className="inline-block rounded-2xl bg-background p-4">
              <img src="/simple-logo-full.png" alt="Simple Etiquetas — Insumos Logísticos" className="h-28 w-auto sm:h-32" />
            </div>
            <p className="mt-6 text-base leading-relaxed opacity-80">
              Oferecemos soluções inovadoras e confiáveis com excelência no atendimento e qualidade dos produtos.
            </p>
            <p className="mt-2 text-base font-semibold opacity-90">Para cada cliente, uma solução!</p>
          </div>
          <div className="text-base">
            <p className="font-semibold tracking-wide">Simple Etiquetas e Insumos Logísticos</p>
            <p className="mt-2 opacity-80">CNPJ: 66.133.603/0001-70</p>
            <p className="mt-6 opacity-80">Rua São José, 51 — Extrema-MG</p>
            <p className="opacity-80">CEP 37640-408</p>
          </div>
          <nav className="flex flex-col gap-3 text-base font-semibold md:items-end">
            <p className="font-display text-lg font-extrabold tracking-widest">NAVEGAÇÃO</p>
            {navLinks.map((n, i) => (
              <a
                key={n.href}
                href={n.href}
                className={`w-fit transition hover:text-kraft ${i === 0 ? "text-kraft" : "opacity-90 hover:opacity-100"}`}
              >
                {n.label}
              </a>
            ))}
          </nav>
        </div>
      </footer>

      <div className="wa-fab pointer-events-none fixed bottom-0 right-0 z-40 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:p-6">
        <a
          href="https://wa.me/5531984060199?text=Ol%C3%A1!%20Gostaria%20de%20um%20or%C3%A7amento%20de%20etiquetas."
          target="_blank"
          rel="noreferrer"
          data-wa-fab
          aria-label="Conversar no WhatsApp com a Simple Etiquetas"
          className="group pointer-events-auto flex flex-row-reverse items-center gap-3 transition-transform duration-200 hover:scale-105 active:scale-95"
        >
          <span className="wa-fab-bob relative grid h-14 w-14 shrink-0 place-items-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-lg shadow-whatsapp/30 ring-1 ring-whatsapp-deep/40">
            <span aria-hidden className="wa-fab-ring pointer-events-none absolute inset-0 rounded-full bg-whatsapp opacity-0" />
            <span
              aria-hidden
              className="wa-fab-ring pointer-events-none absolute inset-0 rounded-full bg-whatsapp opacity-0"
              style={{ animationDelay: "2.5s" }}
            />
            <svg viewBox="0 0 24 24" aria-hidden className="relative h-7 w-7" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-1.958-.173-.199-.018-.307.13-.455.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </span>
          <span className="hidden rounded-full bg-ink px-4 py-2.5 text-sm font-bold text-ink-foreground opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100 sm:block">
            Fale no WhatsApp
          </span>
        </a>
      </div>
    </div>
  );
}
