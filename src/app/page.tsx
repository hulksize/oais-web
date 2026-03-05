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
  initial: { opacity: 0, y: 24, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -24, scale: 0.97 },
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

function MultiModalInput({ onOpenOCR }: { onOpenOCR: () => void }) {
  const [url, setUrl] = useState('');
  const [dragActive, setDragActive] = useState(false);

  return (
    <motion.div
      variants={contentVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-2xl"
    >
      <div className="group relative">
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#D4AF37]/30 via-[#D4AF37]/10 to-zinc-700/30 blur-xl transition-all group-hover:blur-2xl group-hover:from-[#D4AF37]/40" />
        <div className="relative flex flex-col gap-3 rounded-2xl border border-[#D4AF37]/30 bg-[#0f0f0f]/95 px-5 py-4 backdrop-blur-xl shadow-2xl">
          <div className="flex items-center gap-3">
            <button 
              onClick={onOpenOCR}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-zinc-800/80 text-[#D4AF37] transition-all hover:bg-zinc-700 hover:shadow-lg hover:shadow-[#D4AF37]/20"
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
              className="flex-1 bg-transparent text-zinc-100 placeholder-zinc-500 outline-none"
            />
            <button className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B8962E] text-zinc-950 transition-all hover:scale-105 hover:shadow-lg hover:shadow-[#D4AF37]/40">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </button>
          </div>

          <div 
            className={`relative border-2 border-dashed rounded-xl p-3 text-center transition-all ${
              dragActive ? 'border-[#D4AF37] bg-[#D4AF37]/5' : 'border-zinc-800 hover:border-zinc-700'
            }`}
            onDragEnter={() => setDragActive(true)}
            onDragLeave={() => setDragActive(false)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              setDragActive(false);
              onOpenOCR();
            }}
          >
            <div className="flex items-center justify-center gap-2 text-xs text-zinc-500">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>명함 이미지를 드래그하거나 클릭하여 업로드</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-4 gap-3">
        {['AI 분석', 'URL 추출', '자동 입력', '저장'].map((label) => (
          <button
            key={label}
            className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 py-2.5 text-sm text-zinc-400 transition-all hover:border-[#D4AF37]/50 hover:bg-zinc-800/60 hover:text-[#D4AF37] backdrop-blur-sm"
          >
            {label}
          </button>
        ))}
      </div>

      <section className="mt-14">
        <h2 className="mb-5 text-center text-base font-semibold text-zinc-300">
          Viral Shorts
        </h2>
        <div className="relative aspect-video overflow-hidden rounded-2xl border border-zinc-800/60 bg-zinc-900/20">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="mb-3 flex justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#D4AF37]/15 to-zinc-800">
                  <svg className="h-7 w-7 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <p className="text-sm text-zinc-500">Coming Soon</p>
              <p className="mt-1 text-xs text-zinc-600">短 영상 마케팅 준비 중</p>
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-3xl border border-[#D4AF37]/30 bg-[#0f0f0f] p-6 shadow-2xl shadow-[#D4AF37]/10"
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-zinc-100">명함 스캔</h3>
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
          className={`relative flex h-40 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed transition-all ${
            dragActive 
              ? 'border-[#D4AF37] bg-[#D4AF37]/10' 
              : 'border-zinc-700 hover:border-zinc-600'
          }`}
          onClick={() => inputRef.current?.click()}
        >
          {preview ? (
            <img src={preview} alt="Preview" className="h-full w-full object-contain rounded-xl" />
          ) : uploading ? (
            <div className="flex flex-col items-center gap-3">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#D4AF37] border-t-transparent" />
              <p className="text-sm text-zinc-400">AI가 분석 중...</p>
            </div>
          ) : (
            <>
              <svg className="mb-2 h-9 w-9 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-sm text-zinc-400">이미지를 드롭하거나 클릭</p>
              <p className="text-xs text-zinc-600">JPG, PNG 지원</p>
            </>
          )}
          <input ref={inputRef} type="file" accept="image/*" className="hidden" />
        </div>

        <p className="mt-4 text-center text-xs text-zinc-500">
          AI가 명함에서 URL, 연락처, 회사 정보를 자동 추출합니다
        </p>
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
      transition={{ duration: 0.4 }}
      className="w-full max-w-4xl"
    >
      <h2 className="mb-8 text-center text-2xl font-bold text-zinc-100">Before & After</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="group relative overflow-hidden rounded-2xl border-2 border-zinc-800 bg-zinc-900/50">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-5xl font-bold text-zinc-700">BEFORE</p>
              <p className="mt-2 text-sm text-zinc-600">재건 전</p>
            </div>
          </div>
        </div>
        <div className="group relative overflow-hidden rounded-2xl border-2 border-[#D4AF37]/30 bg-zinc-900/50">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-5xl font-bold text-[#D4AF37]/30">AFTER</p>
              <p className="mt-2 text-sm text-[#D4AF37]/60">재건 후</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 flex justify-center">
        <div className="flex items-center gap-2">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-zinc-700" />
          <span className="text-[#D4AF37]">✦</span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-zinc-700" />
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
      transition={{ duration: 0.4 }}
      className="w-full max-w-2xl"
    >
      <h2 className="mb-8 text-center text-2xl font-bold text-zinc-100">핵심 요소</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {options.map((opt, i) => (
          <motion.div
            key={opt.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center justify-between rounded-2xl border border-zinc-800/60 bg-zinc-900/40 p-5 backdrop-blur-sm transition-all hover:border-[#D4AF37]/30 hover:bg-zinc-800/40"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{opt.icon}</span>
              <div>
                <p className="text-xs text-zinc-500">{opt.label}</p>
                <p className="font-medium text-zinc-200">{opt.value}</p>
              </div>
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
      transition={{ duration: 0.4 }}
      className="w-full max-w-lg"
    >
      <h2 className="mb-8 text-center text-2xl font-bold text-zinc-100">바라는 내용</h2>
      <div className="space-y-4">
        <textarea
          placeholder="어떤 것을 원하는지 상세히 적어주세요..."
          className="h-48 w-full resize-none rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4 text-zinc-100 placeholder-zinc-500 outline-none transition-all focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/20"
        />
        <div className="flex justify-between">
          <button className="rounded-xl border border-zinc-700 bg-zinc-800/50 px-6 py-2.5 text-zinc-300 transition-all hover:bg-zinc-800 hover:text-zinc-100">
            초기화
          </button>
          <button className="rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8962E] px-8 py-2.5 font-medium text-zinc-950 transition-all hover:scale-105 hover:shadow-lg hover:shadow-[#D4AF37]/30">
            저장
          </button>
        </div>
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
      transition={{ duration: 0.4 }}
      className="w-full max-w-lg"
    >
      <h2 className="mb-6 text-center text-2xl font-bold text-zinc-100">서비스 신청</h2>
      
      {cart.length > 0 && (
        <div className="mb-6 rounded-2xl border border-[#D4AF37]/30 bg-[#D4AF37]/5 p-4">
          <div className="mb-3 flex items-center gap-2 text-sm font-medium text-[#D4AF37]">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            결제 대기 ({cart.length})
          </div>
          <div className="space-y-2">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-xl bg-zinc-900/80 p-3">
                <span className="text-sm text-zinc-300">{item.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-[#D4AF37]">₩{item.price.toLocaleString()}</span>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-zinc-500 hover:text-red-400"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-zinc-700 pt-3">
            <span className="font-medium text-zinc-300">총액</span>
            <span className="text-lg font-bold text-[#D4AF37]">₩{total.toLocaleString()}</span>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <input type="text" placeholder="이름" className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 text-zinc-100 placeholder-zinc-500 outline-none transition-all focus:border-[#D4AF37]/50" />
        <input type="email" placeholder="이메일" className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 text-zinc-100 placeholder-zinc-500 outline-none transition-all focus:border-[#D4AF37]/50" />
        <input type="tel" placeholder="전화번호" className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 text-zinc-100 placeholder-zinc-500 outline-none transition-all focus:border-[#D4AF37]/50" />
        <textarea placeholder="요청 사항" className="h-32 w-full resize-none rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 text-zinc-100 placeholder-zinc-500 outline-none transition-all focus:border-[#D4AF37]/50" />
      </div>
      <div className="mt-8 flex justify-center gap-4">
        <button className="rounded-xl border border-zinc-700 bg-zinc-800/50 px-8 py-3 font-medium text-zinc-300 transition-all hover:bg-zinc-800 hover:text-zinc-100">
          상담 요청
        </button>
        <button className="rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8962E] px-8 py-3 font-medium text-zinc-950 transition-all hover:scale-105 hover:shadow-lg hover:shadow-[#D4AF37]/30">
          즉시 신청
        </button>
      </div>
    </motion.div>
  );
}

function MenuTooltip({ item }: { item: typeof menuItems[0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -24, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -24, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="pointer-events-none absolute left-full top-1/2 z-50 ml-4 -translate-y-1/2 whitespace-pre-line rounded-xl border border-[#D4AF37]/40 bg-[#0f0f0f]/98 px-5 py-4 shadow-2xl shadow-[#D4AF37]/10 backdrop-blur-xl"
    >
      <p className="mb-1 text-sm font-semibold text-[#D4AF37]">{item.title}</p>
      <p className="text-xs leading-relaxed text-zinc-400 max-w-52">{item.description}</p>
      <div className="absolute -left-1 top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 border-l border-b border-[#D4AF37]/40 bg-[#0f0f0f]" />
    </motion.div>
  );
}

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState<View>('home');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [ocrOpen, setOcrOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const isMobile = useIsMobile();

  const handleMenuClick = (id: string) => {
    setActiveView(id as View);
    setSidebarOpen(false);
  };

  const addToCart = (item: CartItem) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const renderContent = () => {
    switch (activeView) {
      case 'bf':
        return <BFContent />;
      case 'options':
        return <OptionsContent />;
      case 'wishes':
        return <WishesContent />;
      case 'apply':
        return <ApplyContent cart={cart} removeFromCart={removeFromCart} />;
      default:
        return <MultiModalInput onOpenOCR={() => setOcrOpen(true)} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] font-sans text-zinc-100">
      <AnimatePresence>
        {ocrOpen && <OCRModal onClose={() => setOcrOpen(false)} />}
      </AnimatePresence>

      <header className="fixed left-0 right-0 top-0 z-40 flex h-16 items-center bg-[#0a0a0a]/85 px-4 backdrop-blur-xl">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-full text-zinc-400 transition-all hover:bg-zinc-800 hover:text-zinc-100"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <span className="ml-4 text-lg font-semibold text-[#D4AF37]">Oais</span>
        {cart.length > 0 && (
          <button 
            onClick={() => handleMenuClick('apply')}
            className="ml-auto flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1.5 text-sm text-[#D4AF37] transition-all hover:bg-[#D4AF37]/20"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
              className="fixed inset-0 z-40 bg-black/75 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: isMobile ? -300 : -320 }}
              animate={{ x: 0 }}
              exit={{ x: isMobile ? -300 : -320 }}
              transition={{ type: 'spring', damping: 28, stiffness: 180 }}
              className="fixed left-0 top-0 z-50 h-full w-72 bg-gradient-to-b from-[#111] to-[#0a0a0a] pt-20"
            >
              <nav className="px-4">
                {menuItems.map((item) => (
                  <div key={item.id} className="relative">
                    <button
                      onClick={() => handleMenuClick(item.id)}
                      onMouseEnter={() => setHoveredItem(item.id)}
                      onMouseLeave={() => setHoveredItem(null)}
                      className={`flex w-full items-center gap-4 rounded-xl px-4 py-4 text-left transition-all ${
                        activeView === item.id
                          ? 'bg-gradient-to-r from-[#D4AF37]/20 to-transparent text-[#D4AF37] border-l-2 border-[#D4AF37]'
                          : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200'
                      }`}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span className="font-medium">{item.label}</span>
                    </button>
                    <AnimatePresence>
                      {hoveredItem === item.id && (
                        <MenuTooltip item={item} />
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </nav>

              {activeView === 'apply' && cart.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-8 left-4 right-4 rounded-2xl border border-[#D4AF37]/30 bg-[#D4AF37]/5 p-4"
                >
                  <div className="mb-2 flex items-center gap-2 text-xs font-medium text-[#D4AF37]">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    황금빛 장바구니
                  </div>
                  <p className="text-xs text-zinc-500">결제 대기 중인 항목이 있습니다</p>
                </motion.div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <main className="flex min-h-screen flex-col items-center justify-center px-4 pt-16">
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
      </main>
    </div>
  );
}
