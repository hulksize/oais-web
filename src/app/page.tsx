'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type View = 'home' | 'bf' | 'options' | 'wishes' | 'apply';

interface CartItem {
  id: string;
  name: string;
  price: number;
}

const menuItems = [
  { 
    id: 'bf', 
    icon: '💼', 
    label: 'B&F', 
    title: 'Before & After',
    description: '디지털 자산의 변화를 증명합니다. 낡은 웹사이트, 브랜드, 콘텐츠를 최상으로 재건.'
  },
  { 
    id: 'options', 
    icon: '⚙️', 
    label: '옵션', 
    title: 'Customization',
    description: '비즈니스 핵심 요소 설정. 목표 고객, 브랜드 톤, 핵심 메시지를 맞춤 구성.'
  },
  { 
    id: 'wishes', 
    icon: '💭', 
    label: '바란 내용', 
    title: 'Wishlist',
    description: '원하는 결과물을 상세히 적어주세요. 현실로 만들어드립니다.'
  },
  { 
    id: 'apply', 
    icon: '📝', 
    label: '신청', 
    title: 'Application',
    description: '디지털 재건 여정을 시작하세요. 합리적 비용, 최고 퀄리티.'
  },
];

const contentVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

function MultiModalInput({ onOpenOCR, glow }: { onOpenOCR: () => void; glow: boolean }) {
  const [url, setUrl] = useState('');

  return (
    <motion.div
      variants={contentVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-2xl"
    >
      <div className="group relative">
        <div className={`absolute -inset-1 rounded-2xl blur-xl transition-all duration-700 ${
          glow 
            ? 'bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 opacity-80' 
            : 'bg-zinc-800/30 opacity-0'
        }`} />
        <div className={`relative flex flex-col gap-3 rounded-2xl border px-5 py-4 backdrop-blur-xl transition-all duration-500 ${
          glow
            ? 'border-amber-400/50 bg-zinc-900/95 shadow-[0_0_40px_rgba(251,191,36,0.15)]'
            : 'border-zinc-800 bg-zinc-900/80'
        }`}>
          <div className="flex items-center gap-3">
            <button 
              onClick={onOpenOCR}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-zinc-400 transition-all hover:bg-zinc-700 hover:text-zinc-200"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
              </svg>
            </button>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="URL을 입력하세요"
              className={`flex-1 bg-transparent outline-none transition-colors ${
                glow ? 'text-amber-100 placeholder-amber-200/50' : 'text-zinc-100 placeholder-zinc-500'
              }`}
            />
            <button className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-all hover:scale-105 ${
              glow
                ? 'bg-gradient-to-r from-amber-400 to-yellow-300 text-zinc-900 shadow-lg shadow-amber-400/30'
                : 'bg-zinc-100 text-zinc-900'
            }`}>
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {glow && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-6 text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm font-medium text-amber-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400"></span>
              </span>
              재건 준비 완료
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-6 grid grid-cols-4 gap-3">
        {['AI 분석', 'URL 추출', '자동 입력', '저장'].map((label) => (
          <button
            key={label}
            className="rounded-xl border border-zinc-800 bg-zinc-900/40 py-2.5 text-sm text-zinc-500 transition-all hover:border-zinc-600 hover:bg-zinc-800/60 hover:text-zinc-300"
          >
            {label}
          </button>
        ))}
      </div>

      <section className="mt-14">
        <h2 className="mb-5 text-center text-sm font-medium text-zinc-500">
          Viral Shorts
        </h2>
        <div className="relative aspect-video overflow-hidden rounded-2xl border border-zinc-800/40 bg-zinc-900/20">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="mb-3 flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-800/50">
                  <svg className="h-6 w-6 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <p className="text-sm text-zinc-600">Coming Soon</p>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

function OCRModal({ onClose }: { onClose: () => void }) {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setPreview(URL.createObjectURL(file));
      setUploading(true);
      setTimeout(() => setUploading(false), 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950 p-6"
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-medium text-zinc-200">명함 스캔</h3>
          <button onClick={onClose} className="text-zinc-500 hover:text-zinc-300">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div
          onDragEnter={() => setDragActive(true)}
          onDragLeave={() => setDragActive(false)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className={`relative flex h-36 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition-all ${
            dragActive 
              ? 'border-zinc-500 bg-zinc-900' 
              : 'border-zinc-800 hover:border-zinc-700'
          }`}
          onClick={() => inputRef.current?.click()}
        >
          {preview ? (
            <img src={preview} alt="Preview" className="h-full w-full object-contain rounded-lg" />
          ) : uploading ? (
            <div className="flex flex-col items-center gap-2">
              <div className="h-6 w-6 animate-spin rounded-full border border-zinc-600 border-t-zinc-300" />
              <p className="text-sm text-zinc-500">AI 분석 중...</p>
            </div>
          ) : (
            <>
              <svg className="mb-2 h-8 w-8 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-sm text-zinc-500">이미지를 드롭하거나 클릭</p>
            </>
          )}
          <input ref={inputRef} type="file" accept="image/*" className="hidden" />
        </div>
      </motion.div>
    </motion.div>
  );
}

function BFContent() {
  return (
    <motion.div
      variants={contentVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.35 }}
      className="w-full max-w-4xl"
    >
      <h2 className="mb-8 text-center text-xl font-semibold text-zinc-200">Before & After</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-12">
          <p className="text-center text-4xl font-bold text-zinc-700">BEFORE</p>
        </div>
        <div className="rounded-2xl border border-zinc-700 bg-zinc-900/50 p-12">
          <p className="text-center text-4xl font-bold text-zinc-300">AFTER</p>
        </div>
      </div>
    </motion.div>
  );
}

function OptionsContent() {
  const options = [
    { label: '서비스 유형', value: '디지털 재건', icon: '🔧' },
    { label: '목표', value: '브랜드 현대화', icon: '🎯' },
    { label: '타겟', value: 'B2B 전문기업', icon: '👥' },
    { label: '예산 범위', value: '합리적 비용', icon: '💎' },
    { label: '타임라인', value: '2-4주', icon: '⚡' },
    { label: '퀄리티', value: '최상급', icon: '👑' },
  ];
  
  return (
    <motion.div
      variants={contentVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.35 }}
      className="w-full max-w-2xl"
    >
      <h2 className="mb-8 text-center text-xl font-semibold text-zinc-200">핵심 요소</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((opt, i) => (
          <motion.div
            key={opt.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 transition-colors hover:bg-zinc-800/50"
          >
            <span className="text-lg">{opt.icon}</span>
            <div>
              <p className="text-xs text-zinc-500">{opt.label}</p>
              <p className="text-sm text-zinc-300">{opt.value}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function WishesContent() {
  return (
    <motion.div
      variants={contentVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.35 }}
      className="w-full max-w-lg"
    >
      <h2 className="mb-6 text-center text-xl font-semibold text-zinc-200">바라는 내용</h2>
      <textarea
        placeholder="어떤 것을 원하는지 상세히 적어주세요..."
        className="h-44 w-full resize-none rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 text-sm text-zinc-200 placeholder-zinc-600 outline-none transition-colors focus:border-zinc-600"
      />
      <div className="mt-4 flex justify-end gap-3">
        <button className="rounded-lg border border-zinc-700 bg-zinc-800/50 px-5 py-2 text-sm text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-200">
          초기화
        </button>
        <button className="rounded-lg bg-zinc-100 px-6 py-2 text-sm font-medium text-zinc-900 transition-transform hover:scale-[1.02]">
          저장
        </button>
      </div>
    </motion.div>
  );
}

function ApplyContent({ cart, removeFromCart }: { cart: CartItem[]; removeFromCart: (id: string) => void }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <motion.div
      variants={contentVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.35 }}
      className="w-full max-w-lg"
    >
      <h2 className="mb-6 text-center text-xl font-semibold text-zinc-200">서비스 신청</h2>
      
      {cart.length > 0 && (
        <div className="mb-5 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
          <p className="mb-3 text-sm font-medium text-zinc-400">결제 대기 ({cart.length})</p>
          <div className="space-y-2">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-lg bg-zinc-900/80 p-2.5">
                <span className="text-sm text-zinc-300">{item.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-zinc-400">₩{item.price.toLocaleString()}</span>
                  <button onClick={() => removeFromCart(item.id)} className="text-zinc-600 hover:text-red-400">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 flex justify-between border-t border-zinc-800 pt-3">
            <span className="text-sm text-zinc-400">총액</span>
            <span className="font-medium text-zinc-200">₩{total.toLocaleString()}</span>
          </div>
        </div>
      )}

      <div className="space-y-3">
        <input type="text" placeholder="이름" className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 p-3.5 text-sm text-zinc-200 placeholder-zinc-600 outline-none transition-colors focus:border-zinc-600" />
        <input type="email" placeholder="이메일" className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 p-3.5 text-sm text-zinc-200 placeholder-zinc-600 outline-none transition-colors focus:border-zinc-600" />
        <input type="tel" placeholder="전화번호" className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 p-3.5 text-sm text-zinc-200 placeholder-zinc-600 outline-none transition-colors focus:border-zinc-600" />
        <textarea placeholder="요청 사항" className="h-28 w-full resize-none rounded-xl border border-zinc-800 bg-zinc-900/50 p-3.5 text-sm text-zinc-200 placeholder-zinc-600 outline-none transition-colors focus:border-zinc-600" />
      </div>
      <div className="mt-6 flex justify-center gap-3">
        <button className="rounded-xl border border-zinc-700 bg-zinc-800/50 px-6 py-2.5 text-sm font-medium text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-200">
          상담 요청
        </button>
        <button className="rounded-xl bg-zinc-100 px-7 py-2.5 text-sm font-medium text-zinc-900 transition-transform hover:scale-[1.02]">
          즉시 신청
        </button>
      </div>
    </motion.div>
  );
}

function MenuTooltip({ item }: { item: typeof menuItems[0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16 }}
      transition={{ duration: 0.15 }}
      className="pointer-events-none absolute left-full top-1/2 z-50 ml-3 -translate-y-1/2 rounded-lg border border-zinc-700 bg-zinc-900/95 px-4 py-3"
    >
      <p className="text-sm font-medium text-zinc-200">{item.title}</p>
      <p className="mt-1 text-xs leading-relaxed text-zinc-500 max-w-44">{item.description}</p>
    </motion.div>
  );
}

function Toad({ onClick }: { onClick: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="fixed bottom-6 right-6 z-30 outline-none"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        animate={hovered ? { scale: [1, 1.05, 1] } : {}}
        transition={hovered ? { repeat: Infinity, duration: 1.5, ease: "easeInOut" } : {}}
      >
        <svg 
          viewBox="0 0 48 48" 
          className="h-10 w-10 drop-shadow-lg"
          fill="none"
        >
          <ellipse cx="24" cy="32" rx="14" ry="10" fill="#4a5d4a" />
          <ellipse cx="24" cy="28" rx="12" ry="10" fill="#5a7a5a" />
          <circle cx="18" cy="24" r="4" fill="#2a3a2a" />
          <circle cx="30" cy="24" r="4" fill="#2a3a2a" />
          <circle cx="19" cy="23" r="1.5" fill="#8fa" />
          <circle cx="31" cy="23" r="1.5" fill="#8fa" />
          <ellipse cx="24" cy="30" rx="3" ry="2" fill="#3a4a3a" />
          <ellipse cx="10" cy="28" rx="3" ry="5" fill="#4a5d4a" />
          <ellipse cx="38" cy="28" rx="3" ry="5" fill="#4a5d4a" />
        </svg>
      </motion.div>
      {hovered && (
        <motion.p 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] text-zinc-500"
        >
          두껍아 두껍아
        </motion.p>
      )}
    </motion.button>
  );
}

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState<View>('home');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [ocrOpen, setOcrOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [toadGlow, setToadGlow] = useState(false);
  const isMobile = useIsMobile();

  const handleMenuClick = (id: string) => {
    setActiveView(id as View);
    setSidebarOpen(false);
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const handleToadClick = () => {
    setToadGlow(true);
    const audio = new Audio('https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3');
    audio.volume = 0.3;
    audio.play().catch(() => {});
    setTimeout(() => setToadGlow(false), 3000);
  };

  const renderContent = () => {
    switch (activeView) {
      case 'bf': return <BFContent />;
      case 'options': return <OptionsContent />;
      case 'wishes': return <WishesContent />;
      case 'apply': return <ApplyContent cart={cart} removeFromCart={removeFromCart} />;
      default: return <MultiModalInput onOpenOCR={() => setOcrOpen(true)} glow={toadGlow} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] font-sans text-zinc-100">
      <AnimatePresence>
        {ocrOpen && <OCRModal onClose={() => setOcrOpen(false)} />}
      </AnimatePresence>

      <header className="fixed left-0 right-0 top-0 z-40 flex h-14 items-center bg-[#0a0a0a]/90 px-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-300"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <span className="ml-3 text-base font-medium text-zinc-200">Oais</span>
        {cart.length > 0 && (
          <button 
            onClick={() => handleMenuClick('apply')}
            className="ml-auto flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-1.5 text-xs text-zinc-400 transition-colors hover:bg-zinc-800"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cart.length}
          </button>
        )}
      </header>

      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 z-40 bg-black/60"
            />
            <motion.aside
              initial={{ x: isMobile ? -280 : -300 }}
              animate={{ x: 0 }}
              exit={{ x: isMobile ? -280 : -300 }}
              transition={{ type: 'spring', damping: 28, stiffness: 180 }}
              className="fixed left-0 top-0 z-50 h-full w-64 bg-[#0c0c0c] pt-14"
            >
              <nav className="px-3 py-4">
                {menuItems.map((item) => (
                  <div key={item.id} className="relative">
                    <button
                      onClick={() => handleMenuClick(item.id)}
                      onMouseEnter={() => setHoveredItem(item.id)}
                      onMouseLeave={() => setHoveredItem(null)}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition-colors ${
                        activeView === item.id
                          ? 'bg-zinc-800 text-zinc-100'
                          : 'text-zinc-500 hover:bg-zinc-800/50 hover:text-zinc-300'
                      }`}
                    >
                      <span className="text-base">{item.icon}</span>
                      <span className="text-sm font-medium">{item.label}</span>
                    </button>
                    <AnimatePresence>
                      {hoveredItem === item.id && !isMobile && (
                        <MenuTooltip item={item} />
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <main className="flex min-h-screen flex-col items-center justify-center px-4 pt-14">
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
      </main>

      <Toad onClick={handleToadClick} />
    </div>
  );
}
