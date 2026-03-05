'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type View = 'home' | 'bf' | 'options' | 'wishes' | 'apply';

const menuItems = [
  { 
    id: 'bf', 
    icon: '💼', 
    label: 'B&F', 
    title: 'Before & After',
    description: '당신의 디지털 자산이 어떻게 변하는지 증명합니다. 낡은 웹사이트, 오래된 브랜드, 고장난 콘텐츠를 최상의 상태로 재건하세요.' 
  },
  { 
    id: 'options', 
    icon: '⚙️', 
    label: '옵션', 
    title: 'Customization',
    description: '비즈니스의 핵심 요소와 강점을 설정합니다. 목표 고객, 브랜드 톤, 핵심 메시지를 맞춤 구성하세요.' 
  },
  { 
    id: 'wishes', 
    icon: '💭', 
    label: '바란 내용', 
    title: 'Wishlist',
    description: '원하는 결과물을 상세히 적어주세요. 우리가 그것을 현실로 만들어드립니다.' 
  },
  { 
    id: 'apply', 
    icon: '📝', 
    label: '신청', 
    title: 'Application',
    description: '서비스를 신청하고 디지털 재건 여정을 시작하세요. 합리적 비용으로 최고 퀄리티를 받으세요.' 
  },
];

const contentVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -20, scale: 0.98 },
};

function OCRUploadModal({ onClose, onExtract }: { onClose: () => void; onExtract: (data: ExtractedData) => void }) {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  interface ExtractedData {
    name: string;
    company: string;
    email: string;
    phone: string;
    url: string;
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setPreview(URL.createObjectURL(file));
      await processImage(file);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      await processImage(file);
    }
  };

  const processImage = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/ocr', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      
      if (data.mock) {
        setTimeout(() => {
          onExtract({
            name: '홍길동',
            company: '오아이스컴퍼니',
            email: 'contact@oais.co.kr',
            phone: '+82-10-1234-5678',
            url: 'https://oais.co.kr',
          });
          setUploading(false);
        }, 1500);
      } else if (data.success) {
        onExtract(data.extractedData);
        setUploading(false);
      }
    } catch (error) {
      console.error('OCR error:', error);
      setUploading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-3xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl"
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
          className={`relative flex h-48 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed transition-all ${
            dragActive 
              ? 'border-amber-500 bg-amber-500/10' 
              : 'border-zinc-700 hover:border-zinc-600'
          }`}
          onClick={() => inputRef.current?.click()}
        >
          {preview ? (
            <img src={preview} alt="Preview" className="h-full w-full object-contain rounded-xl" />
          ) : uploading ? (
            <div className="flex flex-col items-center gap-3">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-amber-500 border-t-transparent" />
              <p className="text-sm text-zinc-400">AI가 분석 중...</p>
            </div>
          ) : (
            <>
              <svg className="mb-3 h-10 w-10 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-sm text-zinc-400">이미지를 드롭하거나 클릭</p>
              <p className="text-xs text-zinc-600">JPG, PNG 지원</p>
            </>
          )}
          <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFileSelect} />
        </div>

        <p className="mt-4 text-center text-xs text-zinc-500">
          AI가 명함에서 URL, 연락처, 회사 정보를 자동 추출합니다
        </p>
      </motion.div>
    </motion.div>
  );
}

function HomeContent({ onOpenOCR }: { onOpenOCR: () => void }) {
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
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-600/20 via-amber-400/10 to-zinc-500/20 blur-xl transition-all group-hover:blur-2xl" />
        <div className="relative flex items-center gap-3 rounded-2xl border border-zinc-800/80 bg-zinc-900/90 px-5 py-4 backdrop-blur-xl shadow-2xl">
          <button 
            onClick={onOpenOCR}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-amber-400 transition-all hover:bg-zinc-700 hover:shadow-lg hover:shadow-amber-500/20"
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
          <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-amber-600 to-amber-400 text-zinc-950 transition-all hover:scale-105 hover:shadow-lg hover:shadow-amber-500/30">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-4 gap-3">
        {['AI 분석', 'URL 추출', '자동 입력', '저장'].map((label) => (
          <button
            key={label}
            className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 py-2 text-sm text-zinc-400 transition-all hover:border-amber-600/50 hover:bg-zinc-800/60 hover:text-amber-400 backdrop-blur-sm"
          >
            {label}
          </button>
        ))}
      </div>

      <section className="mt-16">
        <h2 className="mb-6 text-center text-lg font-semibold text-zinc-300">
          Viral Shorts
        </h2>
        <div className="relative aspect-video overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/30">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="mb-3 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-amber-600/20 to-zinc-800">
                  <svg className="h-8 w-8 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

function BFContent() {
  return (
    <motion.div
      variants={contentVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-4xl"
    >
      <h2 className="mb-8 text-center text-2xl font-bold text-zinc-100">
        Before & After
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="group relative overflow-hidden rounded-2xl border-2 border-zinc-800 bg-zinc-900/50">
          <div className="absolute inset-0 flex items-center justify-center bg-zinc-900">
            <div className="text-center">
              <p className="text-6xl font-bold text-zinc-700">BEFORE</p>
              <p className="mt-2 text-sm text-zinc-600">재건 전</p>
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
            <span className="rounded-full bg-zinc-800/80 px-4 py-2 text-sm text-zinc-300">업로드 필요</span>
          </div>
        </div>
        <div className="group relative overflow-hidden rounded-2xl border-2 border-amber-600/30 bg-zinc-900/50">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-6xl font-bold text-amber-500/30">AFTER</p>
              <p className="mt-2 text-sm text-amber-400/60">재건 후</p>
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
            <span className="rounded-full bg-amber-600/80 px-4 py-2 text-sm text-zinc-100">미리보기</span>
          </div>
        </div>
      </div>
      <div className="mt-8 flex justify-center">
        <div className="flex items-center gap-2">
          <div className="h-0.5 w-16 bg-gradient-to-r from-transparent to-zinc-700" />
          <span className="text-amber-400">✦</span>
          <div className="h-0.5 w-16 bg-gradient-to-l from-transparent to-zinc-700" />
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
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-2xl"
    >
      <h2 className="mb-8 text-center text-2xl font-bold text-zinc-100">
        핵심 요소
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {options.map((opt, i) => (
          <motion.div
            key={opt.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center justify-between rounded-2xl border border-zinc-800/60 bg-zinc-900/40 p-5 backdrop-blur-sm transition-all hover:border-amber-600/30 hover:bg-zinc-800/40"
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
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-lg"
    >
      <h2 className="mb-8 text-center text-2xl font-bold text-zinc-100">
        바라는 내용
      </h2>
      <div className="space-y-4">
        <textarea
          placeholder="어떤 것을 원하는지 상세히 적어주세요..."
          className="h-48 w-full resize-none rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4 text-zinc-100 placeholder-zinc-500 outline-none transition-all focus:border-amber-600/50 focus:ring-1 focus:ring-amber-600/20"
        />
        <div className="flex justify-between">
          <button className="rounded-xl border border-zinc-700 bg-zinc-800/50 px-6 py-2 text-zinc-300 transition-all hover:bg-zinc-800 hover:text-zinc-100">
            초기화
          </button>
          <button className="rounded-xl bg-gradient-to-r from-amber-600 to-amber-400 px-8 py-2 font-medium text-zinc-950 transition-all hover:scale-105 hover:shadow-lg hover:shadow-amber-500/30">
            저장
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function ApplyContent() {
  return (
    <motion.div
      variants={contentVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-lg"
    >
      <h2 className="mb-8 text-center text-2xl font-bold text-zinc-100">
        서비스 신청
      </h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="이름"
          className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 text-zinc-100 placeholder-zinc-500 outline-none transition-all focus:border-amber-600/50 focus:ring-1 focus:ring-amber-600/20"
        />
        <input
          type="email"
          placeholder="이메일"
          className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 text-zinc-100 placeholder-zinc-500 outline-none transition-all focus:border-amber-600/50 focus:ring-1 focus:ring-amber-600/20"
        />
        <input
          type="tel"
          placeholder="전화번호"
          className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 text-zinc-100 placeholder-zinc-500 outline-none transition-all focus:border-amber-600/50 focus:ring-1 focus:ring-amber-600/20"
        />
        <textarea
          placeholder="요청 사항"
          className="h-32 w-full resize-none rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 text-zinc-100 placeholder-zinc-500 outline-none transition-all focus:border-amber-600/50 focus:ring-1 focus:ring-amber-600/20"
        />
      </div>
      <div className="mt-8 flex justify-center gap-4">
        <button className="rounded-xl border border-zinc-700 bg-zinc-800/50 px-8 py-3 font-medium text-zinc-300 transition-all hover:bg-zinc-800 hover:text-zinc-100">
          상담 요청
        </button>
        <button className="rounded-xl bg-gradient-to-r from-amber-600 to-amber-400 px-8 py-3 font-medium text-zinc-950 transition-all hover:scale-105 hover:shadow-lg hover:shadow-amber-500/30">
          즉시 신청
        </button>
      </div>
    </motion.div>
  );
}

function MenuTooltip({ item }: { item: typeof menuItems[0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -20, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="pointer-events-none absolute left-full top-1/2 z-50 ml-4 -translate-y-1/2 whitespace-pre-line rounded-xl border border-amber-500/40 bg-zinc-950/95 px-5 py-4 shadow-2xl shadow-amber-900/20 backdrop-blur-xl"
    >
      <p className="mb-1 text-sm font-semibold text-amber-400">{item.title}</p>
      <p className="text-xs leading-relaxed text-zinc-400 max-w-48">{item.description}</p>
      <div className="absolute -left-1 top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 border-l border-b border-amber-500/40 bg-zinc-950" />
    </motion.div>
  );
}

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState<View>('home');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [ocrOpen, setOcrOpen] = useState(false);

  const handleMenuClick = (id: string) => {
    setActiveView(id as View);
    setSidebarOpen(false);
  };

  const handleOCRExtract = (data: { url: string; name: string; company: string }) => {
    console.log('Extracted:', data);
    setOcrOpen(false);
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
        return <ApplyContent />;
      default:
        return <HomeContent onOpenOCR={() => setOcrOpen(true)} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] font-sans text-zinc-100">
      <AnimatePresence>
        {ocrOpen && <OCRUploadModal onClose={() => setOcrOpen(false)} onExtract={handleOCRExtract} />}
      </AnimatePresence>

      <header className="fixed left-0 right-0 top-0 z-40 flex h-16 items-center bg-[#0a0a0a]/80 px-4 backdrop-blur-xl">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-full text-zinc-400 transition-all hover:bg-zinc-800 hover:text-zinc-100"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <span className="ml-4 text-lg font-semibold text-amber-400">Oais</span>
      </header>

      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
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
                          ? 'bg-gradient-to-r from-amber-600/20 to-transparent text-amber-400 border-l-2 border-amber-500'
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
