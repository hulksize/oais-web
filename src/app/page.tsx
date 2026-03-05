'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type View = 'home' | 'bf' | 'options' | 'wishes' | 'apply';

const menuItems = [
  { 
    id: 'bf', 
    icon: '💼', 
    label: 'B&F', 
    description: 'Before & After\n변화를 증명합니다' 
  },
  { 
    id: 'options', 
    icon: '⚙️', 
    label: '옵션', 
    description: 'Customize\n설정을 조정합니다' 
  },
  { 
    id: 'wishes', 
    icon: '💭', 
    label: '바라는 내용', 
    description: 'Wishlist\n소망을 적어주세요' 
  },
  { 
    id: 'apply', 
    icon: '📝', 
    label: '신청', 
    description: 'Apply\n서비스를 신청합니다' 
  },
];

const contentVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

function HomeContent() {
  return (
    <motion.div
      variants={contentVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
      className="w-full max-w-2xl"
    >
      <div className="group relative">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-600/20 via-amber-400/10 to-zinc-500/20 blur-xl transition-all group-hover:blur-2xl" />
        <div className="relative flex items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/80 px-5 py-4 backdrop-blur-xl">
          <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-amber-400 transition-colors hover:bg-zinc-700">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
          </button>
          <input
            type="text"
            placeholder="URL을 입력하거나 명함을 스캔하세요"
            className="flex-1 bg-transparent text-zinc-100 placeholder-zinc-500 outline-none"
          />
          <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-amber-600 to-amber-400 text-zinc-950 transition-transform hover:scale-105">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-4 gap-3">
        {['AI 분석', 'URL 추출', '자동 입력', '저장'].map((label) => (
          <button
            key={label}
            className="rounded-xl border border-zinc-800 bg-zinc-900/50 py-2 text-sm text-zinc-400 transition-all hover:border-amber-600/50 hover:bg-zinc-800 hover:text-amber-400"
          >
            {label}
          </button>
        ))}
      </div>
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
      transition={{ duration: 0.3 }}
      className="w-full max-w-3xl"
    >
      <h2 className="mb-8 text-center text-2xl font-bold text-zinc-100">
        Before & After
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="relative aspect-video overflow-hidden rounded-2xl border-2 border-dashed border-zinc-700 bg-zinc-900/50">
          <div className="absolute inset-0 flex items-center justify-center text-zinc-500">
            Before
          </div>
        </div>
        <div className="relative aspect-video overflow-hidden rounded-2xl border-2 border-dashed border-amber-600/50 bg-zinc-900/50">
          <div className="absolute inset-0 flex items-center justify-center text-amber-400">
            After
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-center">
        <div className="h-1 w-32 rounded-full bg-gradient-to-r from-zinc-700 via-amber-500 to-zinc-700" />
      </div>
    </motion.div>
  );
}

function OptionsContent() {
  const options = [
    { label: '테마', value: '다크 모드', icon: '🎨' },
    { label: '애니메이션', value: '활성화', icon: '✨' },
    { label: '언어', value: '한국어', icon: '🌐' },
  ];
  
  return (
    <motion.div
      variants={contentVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
      className="w-full max-w-md"
    >
      <h2 className="mb-8 text-center text-2xl font-bold text-zinc-100">
        설정
      </h2>
      <div className="space-y-4">
        {options.map((opt) => (
          <div
            key={opt.label}
            className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/50 p-4"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{opt.icon}</span>
              <span className="text-zinc-300">{opt.label}</span>
            </div>
            <span className="text-amber-400">{opt.value}</span>
          </div>
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
      transition={{ duration: 0.3 }}
      className="w-full max-w-md"
    >
      <h2 className="mb-8 text-center text-2xl font-bold text-zinc-100">
        바라는 내용
      </h2>
      <textarea
        placeholder="어떤 것을 원하는지 적어주세요..."
        className="h-64 w-full resize-none rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4 text-zinc-100 placeholder-zinc-500 outline-none focus:border-amber-600"
      />
      <div className="mt-4 flex justify-end">
        <button className="rounded-xl bg-gradient-to-r from-amber-600 to-amber-400 px-6 py-2 font-medium text-zinc-950 transition-transform hover:scale-105">
          저장
        </button>
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
      transition={{ duration: 0.3 }}
      className="w-full max-w-md"
    >
      <h2 className="mb-8 text-center text-2xl font-bold text-zinc-100">
        서비스 신청
      </h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="이름"
          className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 text-zinc-100 placeholder-zinc-500 outline-none focus:border-amber-600"
        />
        <input
          type="email"
          placeholder="이메일"
          className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 text-zinc-100 placeholder-zinc-500 outline-none focus:border-amber-600"
        />
        <textarea
          placeholder="요청 사항"
          className="h-32 w-full resize-none rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 text-zinc-100 placeholder-zinc-500 outline-none focus:border-amber-600"
        />
      </div>
      <div className="mt-6 flex justify-center">
        <button className="rounded-xl bg-gradient-to-r from-amber-600 to-amber-400 px-8 py-3 font-medium text-zinc-950 transition-transform hover:scale-105">
          신청하기
        </button>
      </div>
    </motion.div>
  );
}

function MenuTooltip({ item }: { item: typeof menuItems[0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      className="pointer-events-none absolute left-full top-1/2 z-50 ml-3 -translate-y-1/2 whitespace-nowrap rounded-lg border border-amber-500/50 bg-zinc-900/95 px-4 py-2 shadow-lg backdrop-blur-xl"
    >
      <p className="text-sm font-medium text-zinc-100">{item.label}</p>
      <p className="text-xs text-amber-400">{item.description}</p>
    </motion.div>
  );
}

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState<View>('home');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleMenuClick = (id: string) => {
    if (id === 'home') {
      setActiveView('home');
    } else {
      setActiveView(id as View);
    }
    setSidebarOpen(false);
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
        return <HomeContent />;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 font-sans">
      <header className="fixed left-0 right-0 top-0 z-50 flex h-16 items-center bg-zinc-950/80 px-4 backdrop-blur-md">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
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
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 z-50 h-full w-64 bg-gradient-to-b from-zinc-900 to-zinc-950 pt-20"
            >
              <nav className="px-4">
                {menuItems.map((item) => (
                  <div key={item.id} className="relative">
                    <button
                      onClick={() => handleMenuClick(item.id)}
                      onMouseEnter={() => setHoveredItem(item.id)}
                      onMouseLeave={() => setHoveredItem(null)}
                      className={`flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left transition-all ${
                        activeView === item.id
                          ? 'bg-zinc-800 text-amber-400'
                          : 'text-zinc-300 hover:bg-zinc-800 hover:text-amber-400'
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
