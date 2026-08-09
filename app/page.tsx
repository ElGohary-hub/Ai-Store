"use client";

import { useMemo, useState } from "react";

type Product = {
  id: string;
  name: string;
  detail: string;
  price: number | string;
  image: string;
};

const PRODUCTS: Product[] = [
  { id: "canva", name: "Canva Pro", detail: "اشتراك Canva Pro مدي الحياه والدفع بعد التفعيل. يتم التفعيل علي حسابك الشخصي وبشكل رسمي من كانفا!", price: 100, image: "/p3.png" },
  { id: "google", name: "Google Plan", detail: "تشمل: Gemini Pro, Antigravity, Nano Banana, NotebookLM, 5TB تخزين سحابي, Google Flow 1000 Credit/M", price: 100, image: "/p4.png" },
  { id: "capcut", name: "CapCut", detail: "التفعيل لمدة شهر فقط، تستلم حساب خاص فيك متفعل جاهز", price: 100, image: "/p10.png" },
  { id: "coursera", name: "Coursera", detail: "باقة البلص، كل الكورسات مفتوحة، يتم ارسال حساب خاص فيك متفعل جاهز", price: 100, image: "/p6.png" },
  { id: "office", name: "Microsoft Office 365", detail: "باقة البلص، 5 أجهزة، 100 جيجابايت ون درايف، تفعيل 12 شهر (ويندوز فقط)", price: 100, image: "/p5.png" },
  { id: "leonardo", name: "Leonardo Ai", detail: "شهر واحد وصول كامل، 8500 رصيد، حساب خاص بك، تفعيل مباشر", price: 100, image: "/p16.png" },
  { id: "notion", name: "Notion", detail: "باقة البلص، باقي التفاصيل كلمني", price: 100, image: "/p13.png" },
  { id: "adobe", name: "Adobe Express", detail: "عضوية مميزة لمدة 12 شهر، لا حاجة لـ VPN أو VISA، تفعيل مباشر", price: 100, image: "/p14.png" },
  { id: "gamma", name: "Gamma Ai", detail: "حسب الباقة، تواصل معي للتفاصيل", price: 100, image: "/p11.png" },
  { id: "youtube", name: "YouTube", detail: "حسب المدة والباقة، تواصل معي للتفاصيل", price: 100, image: "/p12.png" },
  { id: "chatgpt", name: "ChatGPT", detail: "حسب المدة والباقة، تواصل معي للتفاصيل", price: 100, image: "/p15.png" },
  { id: "claude", name: "Claude", detail: "حسب الباقة، تواصل معي للتفاصيل", price: 100, image: "/p7.png" },
  { id: "manus", name: "Manus", detail: "حسب الباقة، تواصل معي للتفاصيل", price: 100, image: "/p1.png" },
  { id: "higgsfield", name: "Higgsfield", detail: "حسب الباقة، تواصل معي للتفاصيل", price: 100, image: "/p2.png" },
  { id: "grok", name: "Grok", detail: "حسب الباقة، تواصل معي للتفاصيل", price: 100, image: "/p8.png" },
  { id: "figma", name: "Figma", detail: "حسب الباقة، تواصل معي للتفاصيل", price: 100, image: "/p9.png" },
];

function formatPrice(p: number | string) {
  if (typeof p === 'number') return `${p} ج.م`;
  return p;
}

export default function Home() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartCount = useMemo(() => Object.values(cart).reduce((a, b) => a + b, 0), [cart]);
  
  const cartTotal = useMemo(() =>
    Object.entries(cart).reduce((sum, [id, qty]) => {
      const p = PRODUCTS.find((p) => p.id === id);
      return sum + (p && typeof p.price === 'number' ? p.price * qty : 0);
    }, 0),
  [cart]);

  const hasCustomPriceInCart = useMemo(() => {
    return Object.keys(cart).some(id => {
      const p = PRODUCTS.find(x => x.id === id);
      return p && typeof p.price === 'string';
    });
  }, [cart]);

  function addToCart(id: string) {
    setCart((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 }));
  }

  function decreaseQuantity(id: string) {
    setCart((c) => {
      const qty = c[id];
      if (!qty) return c;
      if (qty === 1) {
        const newCart = { ...c };
        delete newCart[id];
        return newCart;
      }
      return { ...c, [id]: qty - 1 };
    });
  }

  function removeFromCart(id: string) {
    setCart((c) => {
      const newCart = { ...c };
      delete newCart[id];
      return newCart;
    });
  }

  // الدالة المعدلة للرسالة بالشكل الجديد
  function handleCheckout() {
    if (cartCount === 0) return;
    
    let orderText = "السلام عليكم ورحمة الله وبركاته\n أرغب في تأكيد طلب الشراء للمنتجات التالية :\n";
    let i = 1;
    Object.entries(cart).forEach(([id, qty]) => {
      const p = PRODUCTS.find((p) => p.id === id);
      if (p) {
        orderText += `${i}. ${p.name} x ${qty}\n`;
        i++;
      }
    });
    
    const customText = hasCustomPriceInCart ? " + الباقات المخصصة" : "";
    orderText += `\nالإجمالي التقديري: ${cartTotal} ج.م${customText}`;
    
    window.open(`https://wa.me/201050961507?text=${encodeURIComponent(orderText)}`, "_blank");
  }

  const floatingButtonStyle = {
    position: "fixed" as const,
    right: "20px",
    backgroundColor: "#E8A33D",
    color: "#10131A",
    borderRadius: "50%",
    width: "60px",
    height: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    cursor: "pointer",
    zIndex: 50,
    transition: "transform 0.2s"
  };

  return (
    <main className="min-h-screen relative pb-20 bg-[#0a0c10]">
      <header className="relative overflow-hidden border-b border-white/10 flex flex-col items-center justify-center py-14">
        <div className="absolute inset-0 -z-10 opacity-[0.06]">
          <div className="h-full w-full" style={{ backgroundImage: "repeating-linear-gradient(-45deg, #E8A33D 0, #E8A33D 1px, transparent 1px, transparent 22px)" }} />
        </div>
        <div className="mx-auto max-w-5xl px-6 text-center flex flex-col items-center">
          <h2 className="mb-4 font-display text-2xl sm:text-3xl tracking-[0.1em] text-[#E8A33D] font-light">AI STORE</h2>
          <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl drop-shadow-md">اختر الباقة المناسبة لك</h1>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-6 py-14">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p) => (
            <article key={p.id} className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#121212] shadow-[0_4px_12px_rgba(0,0,0,0.5)] transition-transform hover:scale-[1.02]">
              <div className="h-56 w-full flex items-center justify-center relative bg-black">
                 <img src={p.image} alt={p.name} className="h-full w-full object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
              </div>
              <div className="flex flex-col items-center text-center gap-2 p-5 pb-2">
                <h2 className="font-display text-xl font-bold text-white/95">{p.name}</h2>
                <span className="font-display text-xl font-bold text-[#E8A33D]">{formatPrice(p.price)}</span>
                <p className="mt-1 text-sm text-white/60 line-clamp-3 leading-relaxed">{p.detail}</p>
              </div>
              <div className="mt-auto grid grid-cols-2 gap-3 p-5">
                <button onClick={() => { const text = `أهلاً، أريد شراء:\n- ${p.name}\n\nالسعر: ${formatPrice(p.price)}`; window.open(`https://wa.me/201050961507?text=${encodeURIComponent(text)}`, "_blank"); }} className="rounded-xl bg-[#E8A33D] py-2.5 font-display text-sm font-bold text-[#10131A] transition hover:brightness-110 active:scale-95 flex items-center justify-center">شراء</button>
                <button onClick={() => addToCart(p.id)} className="rounded-xl border border-[#E8A33D] bg-transparent py-2.5 font-display text-sm font-bold text-[#E8A33D] transition hover:bg-[#E8A33D]/10 active:scale-95 flex items-center justify-center">إضافة للسلة</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {isCartOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#121212] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
            <div className="flex items-center justify-between p-5 border-b border-white/10">
              <h3 className="text-xl font-bold text-white">سلة المشتريات</h3>
              <button onClick={() => setIsCartOpen(false)} className="text-white/60 hover:text-white transition"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
            </div>
            <div className="p-5 overflow-y-auto flex-1">
              {cartCount === 0 ? <div className="text-center text-white/50 py-10">السلة فارغة حالياً</div> : 
                <div className="flex flex-col gap-4">
                  {Object.entries(cart).map(([id, qty]) => {
                    const p = PRODUCTS.find(x => x.id === id);
                    if (!p) return null;
                    return (
                      <div key={id} className="flex flex-col bg-white/5 p-4 rounded-xl border border-white/5">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <img src={p.image} alt={p.name} className="w-12 h-12 object-contain bg-black rounded-md" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                            <div><h4 className="text-white font-bold text-sm">{p.name}</h4><div className="text-white/60 text-xs mt-1">{formatPrice(p.price)}</div></div>
                          </div>
                          <button onClick={() => removeFromCart(id)} className="text-red-400 p-2"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></button>
                        </div>
                        <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
                          <div className="flex items-center bg-black/40 rounded-lg p-1">
                            <button onClick={() => decreaseQuantity(id)} className="w-8 h-8 text-white hover:text-[#E8A33D]">-</button>
                            <span className="w-8 text-center text-white font-bold text-sm">{qty}</span>
                            <button onClick={() => addToCart(id)} className="w-8 h-8 text-white hover:text-[#E8A33D]">+</button>
                          </div>
                          <div className="text-[#E8A33D] font-bold text-sm">{typeof p.price === 'number' ? `${p.price * qty} ج.م` : 'يحدد لاحقاً'}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              }
            </div>
            {cartCount > 0 && (
              <div className="p-5 border-t border-white/10 bg-black/20">
                <div className="flex justify-between items-center mb-4"><span className="font-bold text-lg text-white">الإجمالي الكلي:</span><div className="text-right"><span className="font-bold text-xl text-[#E8A33D]">{cartTotal} ج.م</span>{hasCustomPriceInCart && <div className="text-xs text-white/50 mt-1">+ أسعار الباقات المخصصة</div>}</div></div>
                <button onClick={handleCheckout} className="w-full rounded-xl bg-[#E8A33D] py-3.5 font-display text-sm font-bold text-[#10131A] transition hover:brightness-110">إتمام الشراء عبر الواتساب</button>
              </div>
            )}
          </div>
        </div>
      )}

      <button onClick={() => setIsCartOpen(true)} style={{ ...floatingButtonStyle, bottom: "95px", boxShadow: "0px 10px 20px rgba(0,0,0,0.5), inset 0px -5px 10px rgba(0,0,0,0.2), inset 0px 5px 10px rgba(255, 255, 255, 0.4)" }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
        {cartCount > 0 && <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-xs text-white font-bold border-2 border-[#E8A33D]">{cartCount}</span>}
      </button>

      <a href={`https://wa.me/201050961507?text=${encodeURIComponent("مرحباً، أحتاج مساعدة بخصوص متجر AI STORE")}`} target="_blank" rel="noopener noreferrer" style={{ ...floatingButtonStyle, bottom: "20px", backgroundColor: "#25D366", color: "white", boxShadow: "0px 10px 20px rgba(0,0,0,0.4), inset 0px -5px 10px rgba(0,0,0,0.2), inset 0px 5px 10px rgba(255,255,255,0.4)" }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.665-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
      </a>
    </main>
  );
}
