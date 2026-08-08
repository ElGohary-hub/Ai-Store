"use client";

import { useMemo, useState } from "react";

type Product = {
  id: string;
  name: string;
  detail: string;
  price: number;
};

const PRODUCTS: Product[] = [
  { id: "canva", name: "Canva Pro", detail: "اشتراك مدى الحياة، الدفع بعد التفعيل", price: 100 },
  { id: "google", name: "خطة جوجل الكاملة", detail: "Gemini Pro، 5TB تخزين، والمزيد", price: 100 },
  { id: "capcut", name: "CapCut", detail: "تفعيل لمدة شهر، حساب خاص فيك", price: 100 },
  { id: "coursera", name: "Coursera", detail: "باقة بلس، كورسات مفتوحة، حساب خاص", price: 100 },
  { id: "office", name: "Microsoft Office 365", detail: "5 أجهزة، 100 جيجا ون درايف، 12 شهر", price: 100 },
  { id: "leonardo", name: "Leonardo Ai", detail: "8500 رصيد، شهر كامل وصول كامل", price: 100 },
  { id: "notion", name: "Notion", detail: "باقة بلس، باقي التفاصيل كلمني", price: 100 },
  { id: "adobe", name: "Adobe Express", detail: "عضوية مميزة لمدة 12 شهر، تفعيل مباشر", price: 100 },
  { id: "gamma", name: "Gamma Ai", detail: "الأسعار والتفاصيل حسب الباقة", price: 100 },
  { id: "youtube", name: "YouTube", detail: "الأسعار والتفاصيل حسب المدة", price: 100 },
  { id: "chatgpt", name: "ChatGPT", detail: "الأسعار والتفاصيل حسب المدة والباقة", price: 100 },
  { id: "claude", name: "Claude", detail: "الأسعار والتفاصيل حسب الباقة", price: 100 },
  { id: "manus", name: "Manus", detail: "الأسعار والتفاصيل حسب الباقة", price: 100 },
  { id: "higgsfield", name: "Higgsfield", detail: "الأسعار والتفاصيل حسب الباقة", price: 100 },
  { id: "grok", name: "Grok", detail: "الأسعار والتفاصيل حسب الباقة", price: 100 },
  { id: "figma", name: "Figma", detail: "الأسعار والتفاصيل حسب الباقة", price: 100 },
];

function egp(n: number) {
  return `${n} ج.م`;
}

export default function Home() {
  const [cart, setCart] = useState<Record<string, number>>({});

  const cartCount = useMemo(
    () => Object.values(cart).reduce((a, b) => a + b, 0),
    [cart]
  );
  const cartTotal = useMemo(
    () =>
      Object.entries(cart).reduce((sum, [id, qty]) => {
        const p = PRODUCTS.find((p) => p.id === id);
        return sum + (p ? p.price * qty : 0);
      }, 0),
    [cart]
  );

  function addToCart(id: string) {
    setCart((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 }));
  }

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <header className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 -z-10 opacity-[0.06]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "repeating-linear-gradient(-45deg, #E8A33D 0, #E8A33D 1px, transparent 1px, transparent 22px)",
            }}
          />
        </div>
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
          <p className="mb-3 font-display text-sm tracking-[0.3em] text-[#E8A33D]">
            AI STORE
          </p>
          <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl">
            اختر الباقة المناسبة لك
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/70">
            تفعيل فوري لأشهر أدوات الذكاء الاصطناعي والبرامج — كل باقة بسعر
            موحّد، والدفع بعد التفعيل.
          </p>
          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-[#E8A33D]/40 bg-[#E8A33D]/10 px-5 py-2 font-display text-sm text-[#E8A33D]">
            <span className="h-2 w-2 rounded-full bg-[#E8A33D]" />
            كل المنتجات الآن بسعر {egp(100)}
          </div>
        </div>
      </header>

      {/* Product grid */}
      <section className="mx-auto max-w-5xl px-6 py-14">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p, i) => (
            <article
              key={p.id}
              className="rise-in flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-[0_1px_0_rgba(255,255,255,0.05)_inset]"
              style={{ animationDelay: `${(i % 6) * 60}ms` }}
            >
              <div className="flex items-start justify-between gap-3 p-5">
                <div>
                  <h2 className="font-display text-lg font-bold">
                    {p.name}
                  </h2>
                  <p className="mt-1 text-sm text-white/60">{p.detail}</p>
                </div>
                <span className="shrink-0 font-display text-2xl font-extrabold text-[#E8A33D]">
                  {egp(p.price)}
                </span>
              </div>

              <div className="stub-divider mx-5" />

              <div className="flex items-center justify-between p-5 pt-4">
                <span className="font-display text-xs tracking-[0.2em] text-white/40">
                  رمز التفعيل يُرسل فور الدفع
                </span>
                <button
                  onClick={() => addToCart(p.id)}
                  className="rounded-full bg-[#E8A33D] px-5 py-2 font-display text-sm font-bold text-[#10131A] transition hover:brightness-110 active:scale-95"
                >
                  أضف للسلة
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Sticky cart bar */}
      {cartCount > 0 && (
        <div className="sticky bottom-0 z-20 border-t border-white/10 bg-[#10131A]/95 backdrop-blur">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <span className="text-sm text-white/70">
              {cartCount} {cartCount === 1 ? "منتج" : "منتجات"} في السلة
            </span>
            <div className="flex items-center gap-4">
              <span className="font-display text-lg font-bold text-[#E8A33D]">
                الإجمالي: {egp(cartTotal)}
              </span>
              <button className="rounded-full bg-[#2BB3A3] px-6 py-2 font-display text-sm font-bold text-[#10131A] transition hover:brightness-110">
                إتمام الشراء
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="border-t border-white/10 py-8">
        <p className="text-center text-xs text-white/40">
          AI Store — جميع الأسعار موحّدة بسعر {egp(100)} لكل باقة.
        </p>
      </footer>
    </main>
  );
}
