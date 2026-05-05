/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';
import { ChevronDown, ChevronLeft, ChevronRight, Share2, Play, MousePointer2 } from 'lucide-react';

import imgAutomatic from './assets/images/AUTOMATIC.jpg';
import imgBad from './assets/images/BAD.jpg';
import imgDeepRiver from './assets/images/DEEPRIVER.jpg';
import imgDisdan from './assets/images/DISDAN.jpg';
import imgKiss from './assets/images/KISS.jpg';
import imgPic3 from './assets/images/PIC3.jpg';
import imgPic4 from './assets/images/PIC4.jpg';
import imgUltra from './assets/images/ULTRA.jpg';
import imgColor from './assets/images/color.jpg';
import imgFantome from './assets/images/fantome.jpg';
import imgFirstLove from './assets/images/firstlove.jpg';
import imgHeart from './assets/images/heart.jpg';

// --- Types & Data ---

interface EmotionCategory {
  name: string;
  keywords: string[];
  song: string;
  description: string;
  gradient: string;
  shadowColor: string;
  audioUrl: string;
}

interface Album {
  name: string;
  year: string;
  startColor: string;
  endColor: string;
  cover: string;
  keyword: string;
}

interface Song {
  name: string;
  year: string;
  emotion: string;
  color: string;
  lyrics: string;
  lyricsCN: string;
  cover: string;
  audioUrl?: string;
}

interface TimelineNode {
  year: string;
  event: string;
  description: string;
  color: string;
  image: string;
}

const EMOTIONS: EmotionCategory[] = [
  {
    name: "初恋的酸涩",
    keywords: ["纯真", "苦甜", "悸动"],
    song: "First Love",
    description: "稚嫩情感在冬日空气中弥散，是无法忘怀的烟味，也是永远的蓝。",
    gradient: "from-[#6CB4D9] to-coral/40",
    shadowColor: "rgba(108, 180, 217, 0.4)",
    audioUrl: "https://github.com/chenmanqi750-creator/mymusic/raw/refs/heads/main/first%20love.mp3"
  },
  {
    name: "爱的缤纷",
    keywords: ["甜蜜", "热烈", "色彩"],
    song: "Colors",
    description: "爱如光谱炸裂，每一滴颜色都是对彼此灵魂的涂鸦。",
    gradient: "from-coral to-gold/60",
    shadowColor: "rgba(255, 107, 107, 0.4)",
    audioUrl: "https://github.com/chenmanqi750-creator/mymusic/raw/refs/heads/main/colors.mp3"
  },
  {
    name: "丧母之痛",
    keywords: ["悼亡", "寂静", "不可言说"],
    song: "花束を君に",
    description: "用声音修剪一束永不枯萎的力量，送往那个没有阴影的世界。",
    gradient: "from-rain-grey to-deep-blue/30",
    shadowColor: "rgba(142, 154, 175, 0.4)",
    audioUrl: "https://github.com/chenmanqi750-creator/mymusic/raw/refs/heads/main/HUASHU.mp3"
  },
  {
    name: "母亲的无限爱",
    keywords: ["奉献", "循环", "暖意"],
    song: "真夏の通り雨",
    description: "生命在雨中洗礼，感受到代际传承的体温与那份无法切断的眷恋。",
    gradient: "from-gold to-sky-blue/40",
    shadowColor: "rgba(255, 215, 0, 0.4)",
    audioUrl: "https://github.com/chenmanqi750-creator/mymusic/raw/refs/heads/main/shengxia.mp3"
  },
  {
    name: "自我囚禁",
    keywords: ["谎言", "回响", "静止"],
    song: "Prisoner Of Love",
    description: "令人心痛的温柔谎言。",
    gradient: "from-deep-blue to-void",
    shadowColor: "rgba(27, 58, 92, 0.4)",
    audioUrl: "https://github.com/chenmanqi750-creator/mymusic/raw/refs/heads/main/PrisonerOfLove.mp3"
  },
  {
    name: "告别与新生",
    keywords: ["终点", "出发", "光泽"],
    song: "One Last Kiss",
    description: "纵使世界末日，最后那个吻依然带着足以毁灭又足以重塑的力量。",
    gradient: "from-electric-purple to-sky-blue/60",
    shadowColor: "rgba(139, 0, 255, 0.4)",
    audioUrl: "https://github.com/chenmanqi750-creator/mymusic/raw/refs/heads/main/onelastkiss.mp3"
  },
  {
    name: "纯真守护",
    keywords: ["守护", "纯真", "轻淡哀愁"],
    song: "Stay Gold",
    description: "温暖中带着看透无常的哀愁，祈求“金色”的纯真消逝得慢一点。",
    gradient: "from-[#D9A05B] to-gold/40",
    shadowColor: "rgba(217, 160, 91, 0.4)",
    audioUrl: "https://github.com/chenmanqi750-creator/mymusic/raw/refs/heads/main/StayGold.mp3"
  }
];

const ALBUMS: Album[] = [
  { name: "First Love", year: "1999", startColor: "#6CB4D9", endColor: "#1B3A5C", cover: imgFirstLove, keyword: "震撼" },
  { name: "Distance", year: "2001", startColor: "#FF6B6B", endColor: "#FFD700", cover: imgDisdan, keyword: "跨越" },
  { name: "Deep River", year: "2002", startColor: "#1B3A5C", endColor: "#0B1A2D", cover: imgDeepRiver, keyword: "沉思" },
  { name: "ULTRA BLUE", year: "2006", startColor: "#1E3B70", endColor: "#295390", cover: imgUltra, keyword: "电子" },
  { name: "Fantôme", year: "2016", startColor: "#8E9AAF", endColor: "#333", cover: imgFantome, keyword: "悼亡" },
  { name: "BAD MODE", year: "2022", startColor: "#8B00FF", endColor: "#FF6B6B", cover: imgBad, keyword: "当代" }
];

const SONGS: Song[] = [
  {
    name: "Automatic",
    year: "1998",
    emotion: "R&B Awakening",
    color: "#6CB4D9",
    lyrics: "It's automatic そばにいるだけで その目に見つめられるだけで",
    lyricsCN: "只要在你身边，只要被那双眼睛注视，一切便自然而然...",
    cover: imgAutomatic,
    audioUrl: "https://github.com/chenmanqi750-creator/mymusic/raw/refs/heads/main/automatic.mp3"
  },
  {
    name: "First Love",
    year: "1999",
    emotion: "Pure Eternal",
    color: "#FF6B6B",
    lyrics: "最後のキスは タバコの flavor がした 苦くてせつない香り",
    lyricsCN: "最后的吻，有着烟草的味道，那是既苦涩又哀切的香气。",
    cover: imgFirstLove,
    audioUrl: "https://github.com/chenmanqi750-creator/mymusic/raw/refs/heads/main/first%20love.mp3"
  },
  {
    name: "Colors",
    year: "2003",
    emotion: "Aesthetic Prism",
    color: "#FFD700",
    lyrics: "青い空が 見えるはずの窓が オレンジ色の 雲に覆われてる",
    lyricsCN: "本该看见青空的窗户，却被橙色的云层所覆盖。",
    cover: imgColor,
    audioUrl: "https://github.com/chenmanqi750-creator/mymusic/raw/refs/heads/main/colors.mp3"
  },
  {
    name: "花束を君に",
    year: "2016",
    emotion: "Grief & Grace",
    color: "#8E9AAF",
    lyrics: "普段からメイクしない君の 薄い化粧した顔を忘れないよ",
    lyricsCN: "平时从不化妆的你，那略施薄粉的脸庞，我永远不会忘记。",
    cover: imgFantome,
    audioUrl: "https://github.com/chenmanqi750-creator/mymusic/raw/refs/heads/main/fantone.mp3"
  },
  {
    name: "One Last Kiss",
    year: "2021",
    emotion: "Future Nostalgia",
    color: "#8B00FF",
    lyrics: "忘れたくないこと 忘れられないこと 誰だってあるはず",
    lyricsCN: "不想忘记的事，无法忘记的事，任谁都应该拥有的吧。",
    cover: imgKiss,
    audioUrl: "https://github.com/chenmanqi750-creator/mymusic/raw/refs/heads/main/onelastkiss.mp3"
  },
  {
    name: "BAD MODE",
    year: "2022",
    emotion: "Free Style",
    color: "#FFD700",
    lyrics: "エンドロールまで 終わらないで 終わらないで",
    lyricsCN: "在片尾演职员名单出来前，请不要结束，不要结束。",
    cover: imgBad,
    audioUrl: "https://github.com/chenmanqi750-creator/mymusic/raw/refs/heads/main/badmode.mp3"
  }
];

const TIMELINE: TimelineNode[] = [
  { year: "1998", event: "天才降临", description: "《Automatic》横空出世，开启日本R&B新时代。", color: "#6CB4D9", image: imgAutomatic },
  { year: "1999", event: "初恋震撼", description: "《First Love》创下近千万销量纪录，成为不朽传奇。", color: "#FF6B6B", image: imgFirstLove },
  { year: "2002", event: "婚姻与深流", description: "个人生活的变迁带动音乐向更深邃的《Deep River》探索。", color: "#1B3A5C", image: imgDeepRiver },
  { year: "2007", event: "沉寂与过渡", description: "《HEART STATION》后进入“人间活动”沉寂期。", color: "#8E9AAF", image: imgHeart },
  { year: "2016", event: "悼亡复出", description: "带着献给母亲的《Fantôme》重归，哀而不伤。", color: "#8E9AAF", image: imgFantome },
  { year: "2018", event: "新生", description: "《初恋》发行，重申出道二十年的成熟心境。", color: "#FF6B6B", image: imgPic3 },
  { year: "2022", event: "自由重塑", description: "《BAD MODE》展现极度自由的电子爵士风采。", color: "#8B00FF", image: imgBad },
  { year: "2024", event: "电气化纪元", description: "SCIENCE FICTION巡演，将情感彻底解码为电信号。", color: "#8B00FF", image: imgPic4 }
];

// --- Components ---

/**
 * 模拟雨滴落下的组件
 */
const RainOverlay = () => {
  const drops = Array.from({ length: 50 });
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {drops.map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: -20, opacity: 0 }}
          animate={{ 
            y: ['0vh', '120vh'], 
            opacity: [0, 0.4, 0] 
          }}
          transition={{
            duration: Math.random() * 1 + 0.5,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "linear"
          }}
          className="absolute w-[1px] bg-sky-blue/30"
          style={{ 
            height: Math.random() * 20 + 10 + 'px',
            left: Math.random() * 100 + '%' 
          }}
        />
      ))}
    </div>
  );
};

/**
 * 雾气开场动画：从浓雾中逐渐露出文字
 */
const FogReveal = ({ children }: { children: React.ReactNode }) => {
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsRevealed(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      {/* 雾气层 */}
      <motion.div
        initial={{ opacity: 1, backdropFilter: 'blur(20px)' }}
        animate={isRevealed ? { 
          opacity: 0, 
          backdropFilter: 'blur(0px)',
          clipPath: 'circle(120% at 50% 50%)' 
        } : { 
          opacity: 1,
          backdropFilter: 'blur(20px)',
          clipPath: 'circle(0% at 50% 50%)'
        }}
        transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 z-30 bg-void/40 flex items-center justify-center pointer-events-none"
        style={{
          maskImage: 'radial-gradient(circle at center, transparent 30%, black 70%)',
          WebkitMaskImage: 'radial-gradient(circle at center, transparent 30%, black 70%)',
        }}
      />
      
      {/* 内容层 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isRevealed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="z-10"
      >
        {children}
      </motion.div>
    </div>
  );
};

/**
 * 自定义白色小熊光标组件
 */
const BearCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const sx = useSpring(cursorX, springConfig);
  const sy = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 z-100 pointer-events-none mix-blend-difference hidden md:block"
      style={{ x: sx, y: sy }}
    >
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="relative -translate-x-1/2 -translate-y-1/2"
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="8" />
          <circle cx="7" cy="6" r="3" />
          <circle cx="17" cy="6" r="3" />
          <circle cx="9" cy="11" r="1" fill="#0B1A2D" />
          <circle cx="15" cy="11" r="1" fill="#0B1A2D" />
          <path d="M11 14C11 14 11.5 15 12 15C12.5 15 13 14 13 14" stroke="#0B1A2D" strokeWidth="1" strokeLinecap="round" />
        </svg>
      </motion.div>
    </motion.div>
  );
};

const SectionTitle = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="mb-16 text-center"
  >
    <h2 className="text-4xl md:text-5xl font-serif mb-4 tracking-tight">{title}</h2>
    {subtitle && <p className="text-deep-blue/60 text-lg">{subtitle}</p>}
    <div className="w-12 h-1 bg-deep-blue mx-auto mt-6" />
  </motion.div>
);

const AudioController = ({ activeTrack }: { activeTrack: string }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const audio = new Audio(activeTrack);
    audio.loop = true;
    audio.volume = 0;
    audioRef.current = audio;

    const startAudio = () => {
      if (!hasInteracted && audioRef.current) {
        audioRef.current.play().then(() => {
          setHasInteracted(true);
          // Fade in
          let vol = 0;
          const fadeIn = setInterval(() => {
            if (vol < 0.5) {
              vol += 0.05;
              if (audioRef.current) audioRef.current.volume = vol;
            } else {
              clearInterval(fadeIn);
            }
          }, 100);
        }).catch(err => console.log("Waiting for user interaction..."));
      }
    };

    window.addEventListener('click', startAudio);
    window.addEventListener('mousemove', startAudio, { once: true });
    window.addEventListener('touchstart', startAudio);
    window.addEventListener('scroll', startAudio, { once: true });

    return () => {
      audio.pause();
      window.removeEventListener('click', startAudio);
      window.removeEventListener('touchstart', startAudio);
    };
  }, []);

  // Handle track switching with fade
  useEffect(() => {
    if (audioRef.current && hasInteracted) {
      const audio = audioRef.current;
      
      // Fade out
      let vol = audio.volume;
      const fadeOut = setInterval(() => {
        if (vol > 0.05) {
          vol -= 0.05;
          audio.volume = vol;
        } else {
          clearInterval(fadeOut);
          audio.src = activeTrack;
          audio.play().then(() => {
            // Fade in
            const fadeIn = setInterval(() => {
              if (vol < 0.5) {
                vol += 0.05;
                audio.volume = vol;
              } else {
                clearInterval(fadeIn);
              }
            }, 50);
          });
        }
      }, 50);
    }
  }, [activeTrack, hasInteracted]);

  return null; // Invisible
};

export default function App() {
  const [currentSong, setCurrentSong] = useState(0);
  const [activeTrack, setActiveTrack] = useState("https://github.com/chenmanqi750-creator/mymusic/raw/refs/heads/main/Eternally.mp3");
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);
  const [hoveredAlbumColor, setHoveredAlbumColor] = useState<string | null>(null);
  const [playingEmotion, setPlayingEmotion] = useState<number | null>(null);
  const [playingAlbum, setPlayingAlbum] = useState<number | null>(null);
  const [activeTimelineIdx, setActiveTimelineIdx] = useState(0);
  const [timelineVisible, setTimelineVisible] = useState(false);
  const [activeAlbumColor, setActiveAlbumColor] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Background transition based on scroll
  const { scrollYProgress } = useScroll();
  const scrollBasedBg = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    ["#1B3A5C", "#0B1A2D", "#FFF8F0", "#8E9AAF", "#1B3A5C"]
  );

  const timelineBgSync = timelineVisible ? TIMELINE[activeTimelineIdx].color : null;
  const finalBg = hoveredAlbumColor || hoveredColor || timelineBgSync || activeAlbumColor || scrollBasedBg;

  // --- Functions ---
  
  const handleTimelineShift = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      setActiveTimelineIdx((prev) => (prev + 1) % TIMELINE.length);
    } else {
      setActiveTimelineIdx((prev) => (prev - 1 + TIMELINE.length) % TIMELINE.length);
    }
  };
  
  const handleScroll = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      setCurrentSong((prev) => (prev + 1) % SONGS.length);
    } else {
      setCurrentSong((prev) => (prev - 1 + SONGS.length) % SONGS.length);
    }
  };

  // Track URLs for demonstration
  // In a real app, these would be direct .mp3 links to the specific songs.
  const MAIN_BGM = "https://github.com/chenmanqi750-creator/mymusic/raw/refs/heads/main/Eternally.mp3";
  const INTERACTION_TRACK = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"; // Placeholder

  // Draggable timeline logic
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const startDragging = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const x = 'pageX' in e ? e.pageX : e.touches[0].pageX;
    setStartX(x - (timelineRef.current?.offsetLeft || 0));
    setScrollLeft(timelineRef.current?.scrollLeft || 0);
  };

  const stopDragging = () => {
    setIsDragging(false);
  };

  const onDrag = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = 'pageX' in e ? e.pageX : e.touches[0].pageX;
    const walk = (x - (timelineRef.current?.offsetLeft || 0) - startX) * 2;
    if (timelineRef.current) {
      timelineRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  return (
    <motion.div style={{ backgroundColor: finalBg }} className="transition-colors duration-700 min-h-screen cursor-none">
      <BearCursor />
      <AudioController activeTrack={activeTrack} />
      {/* 1. Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-void to-deep-blue text-warm-white p-6">
        <RainOverlay />
        
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 3 }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1514525253361-bee24383c87f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Utada Portrait" 
            className="w-full h-full object-cover filter grayscale"
          />
        </motion.div>

        <div className="relative z-10 w-full h-full">
          <FogReveal>
            <div className="text-center px-6">
              <motion.h1 
                className="text-6xl md:text-8xl font-serif mb-4 tracking-tighter"
              >
                宇多田光 <span className="text-3xl md:text-5xl block md:inline md:ml-4 font-sans font-thin">Hikaru Utada</span>
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl font-sans tracking-widest uppercase mb-8 opacity-80"
              >
                情感的原色輪
              </motion.p>
              <motion.div
                className="text-lg italic font-serif text-sky-blue"
              >
                “私は今、あなたの知らない色。”
                <span className="block text-sm mt-2 opacity-60">（现在的我是你所不认识的颜色）</span>
              </motion.div>
            </div>
          </FogReveal>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 z-40"
        >
          <span className="text-xs uppercase tracking-widest">探索谱系</span>
          <ChevronDown size={20} />
        </motion.div>
      </section>

      {/* 2. Emotional Taxonomy Grid */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <SectionTitle title="情感的光谱" subtitle="音乐是情绪的化学反应，每一页都是一种色彩。" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {EMOTIONS.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: `0 20px 40px ${item.shadowColor}` 
              }}
              onMouseEnter={() => {
                setHoveredColor(item.shadowColor);
                setPlayingEmotion(idx);
                setActiveTrack(item.audioUrl); // Switch to specific interaction track
              }}
              onMouseLeave={() => {
                setHoveredColor(null);
                setPlayingEmotion(null);
                setActiveTrack(MAIN_BGM); // Restore main background music
              }}
              viewport={{ once: true }}
              className={`p-8 rounded-2xl bg-gradient-to-br ${item.gradient} glass text-white flex flex-col h-full min-h-[340px] transition-all relative overflow-hidden group`}
            >
              <div className="relative z-10 flex flex-col h-full">
                <h3 className="text-2xl font-serif mb-2">{item.name}</h3>
                <div className="flex gap-2 mb-4 flex-wrap">
                  {item.keywords.map(k => (
                    <span key={k} className="text-[10px] uppercase font-bold border border-white/40 px-2 py-0.5 rounded-full">
                      {k}
                    </span>
                  ))}
                </div>
                <p className="text-sm opacity-90 leading-relaxed mb-6 flex-grow">{item.description}</p>
                <div className="pt-4 border-t border-white/20 flex justify-between items-end">
                  <div>
                    <span className="text-[10px] opacity-70 block mb-1">代表曲目</span>
                    <span className="font-serif italic">{item.song}</span>
                  </div>
                  
                  {playingEmotion === idx && (
                    <div className="flex items-center gap-1.5 h-4 mb-1">
                      <motion.div animate={{ height: [4, 16, 8, 12, 4] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-1 bg-white rounded-full" />
                      <motion.div animate={{ height: [12, 4, 16, 8, 12] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1 bg-white rounded-full" />
                      <motion.div animate={{ height: [8, 12, 4, 16, 8] }} transition={{ repeat: Infinity, duration: 0.7 }} className="w-1 bg-white rounded-full" />
                    </div>
                  )}
                </div>
              </div>

              {/* Background Playing Visualizer Overlay */}
              <AnimatePresence>
                {playingEmotion === idx && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.15 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-white pointer-events-none"
                  />
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Life Timeline - Paginated Version */}
      <motion.section 
        onViewportEnter={() => setTimelineVisible(true)}
        onViewportLeave={() => setTimelineVisible(false)}
        className="py-24 overflow-hidden relative"
      >
        <div className="px-6 md:px-12 max-w-7xl mx-auto mb-12 flex items-center justify-between relative z-20">
          <div>
            <h2 className="text-4xl font-serif">生命历程</h2>
            <p className="text-void/50 mt-1">点选色彩，回溯每一个关键瞬间。</p>
          </div>
        </div>

        <div className="relative flex items-center justify-center min-h-[600px] px-6">
          {/* Side Navigation Buttons */}
          <div className="absolute left-4 md:left-12 z-30">
            <button 
              onClick={() => handleTimelineShift('prev')}
              className="p-4 md:p-6 rounded-full border border-void/10 hover:bg-white/80 hover:scale-110 transition-all shadow-xl bg-white/10 backdrop-blur-md group"
            >
              <ChevronLeft size={28} className="group-hover:translate-x-[-2px] transition-transform" />
            </button>
          </div>

          <div className="absolute right-4 md:right-12 z-30">
            <button 
              onClick={() => handleTimelineShift('next')}
              className="p-4 md:p-6 rounded-full border border-void/10 hover:bg-white/80 hover:scale-110 transition-all shadow-xl bg-white/10 backdrop-blur-md group"
            >
              <ChevronRight size={28} className="group-hover:translate-x-[2px] transition-transform" />
            </button>
          </div>

          <AnimatePresence mode='wait'>
            <motion.div
              key={activeTimelineIdx}
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-white/40 backdrop-blur-xl p-8 md:p-12 rounded-[2rem] shadow-2xl border border-white/30"
            >
              <div className="relative group">
                <div 
                  className="absolute -inset-4 rounded-[2.5rem] blur-2xl opacity-20 transition-opacity group-hover:opacity-40"
                  style={{ backgroundColor: TIMELINE[activeTimelineIdx].color }}
                />
                <img 
                  src={TIMELINE[activeTimelineIdx].image} 
                  alt={TIMELINE[activeTimelineIdx].year} 
                  className="relative w-full aspect-square object-cover rounded-3xl shadow-lg grayscale hover:grayscale-0 transition-all duration-700" 
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur shadow-sm px-4 py-1 rounded-full text-sm font-bold tracking-widest">
                  {activeTimelineIdx + 1} / {TIMELINE.length}
                </div>
              </div>

              <div className="flex flex-col text-left">
                <motion.span 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-7xl md:text-9xl font-serif font-black opacity-10 absolute -top-12 -left-8 pointer-events-none"
                >
                  {TIMELINE[activeTimelineIdx].year}
                </motion.span>
                
                <div className="relative mt-8">
                  <span className="text-xs uppercase tracking-[0.3em] font-bold mb-2 block" style={{ color: TIMELINE[activeTimelineIdx].color }}>
                    MILESTONE {TIMELINE[activeTimelineIdx].year}
                  </span>
                  <h3 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">
                    {TIMELINE[activeTimelineIdx].event}
                  </h3>
                  <p className="text-lg text-void/70 leading-relaxed mb-8">
                    {TIMELINE[activeTimelineIdx].description}
                  </p>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-0.5 rounded-full" style={{ backgroundColor: TIMELINE[activeTimelineIdx].color }} />
                    <span className="text-xs font-bold opacity-40">CHRONICLE SCENE</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Background Indicator Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 z-20">
            {TIMELINE.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTimelineIdx(idx)}
                className={`h-1.5 transition-all duration-500 rounded-full ${activeTimelineIdx === idx ? 'w-8 bg-void' : 'w-2 bg-void/20'}`}
              />
            ))}
          </div>
        </div>
      </motion.section>

      {/* 4. Album Color Cards */}
      <section className="py-24 px-6 md:px-12 bg-transparent">
        <SectionTitle title="专辑色卡" subtitle="随着滑动，让空气染上旋律的颜色。" />
        
        <div className="flex overflow-x-auto gap-8 pb-12 no-scrollbar px-4 snap-x">
          {ALBUMS.map((album, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              onMouseEnter={() => {
                setHoveredAlbumColor(album.startColor);
                setPlayingAlbum(idx);
                setActiveTrack(INTERACTION_TRACK); // Switch to interaction track
              }}
              onMouseLeave={() => {
                setHoveredAlbumColor(null);
                setPlayingAlbum(null);
                setActiveTrack(MAIN_BGM); // Restore main background music
              }}
              // 当卡片进入中心视野（或占比较大时）更新背景色
              onViewportEnter={() => setActiveAlbumColor(album.startColor)}
              onViewportLeave={() => setActiveAlbumColor(null)}
              viewport={{ margin: "-20%" }} 
              transition={{ delay: idx * 0.1 }}
              className="flex-shrink-0 w-72 h-96 relative rounded-2xl overflow-hidden group shadow-lg snap-center"
              style={{ background: `linear-gradient(to bottom right, ${album.startColor}, ${album.endColor})` }}
            >
              {/* Playing Visualizer */}
              <AnimatePresence>
                {playingAlbum === idx && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-x-0 top-0 p-6 flex justify-center gap-1.5 z-20"
                  >
                    <motion.div animate={{ height: [4, 16, 8] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1 bg-white/40 rounded-full" />
                    <motion.div animate={{ height: [12, 6, 14] }} transition={{ repeat: Infinity, duration: 0.4 }} className="w-1 bg-white/40 rounded-full" />
                    <motion.div animate={{ height: [8, 14, 4] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-1 bg-white/40 rounded-full" />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="absolute inset-0 flex items-center justify-center">
                <img 
                  src={album.cover} 
                  alt={album.name} 
                  className="w-40 h-40 object-cover shadow-2xl group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-100"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white bg-gradient-to-t from-black/60 to-transparent">
                <span className="text-xs uppercase tracking-widest opacity-80">{album.year}</span>
                <h3 className="text-2xl font-serif mt-1">{album.name}</h3>
                <div className="mt-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                   <span className="text-sm italic">{album.keyword}</span>
                   {playingAlbum === idx ? <Play fill="currentColor" size={16} /> : <Share2 size={16} />}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. Represented Song Panel */}
      <section className="py-32 px-6 md:px-12 bg-void text-warm-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-center">
          
          <div className="w-full md:w-1/2 aspect-square relative overflow-hidden rounded-3xl group">
             <AnimatePresence mode='wait'>
                <motion.img
                  key={currentSong}
                  src={SONGS[currentSong].cover}
                  alt={SONGS[currentSong].name}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 0.6, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.8 }}
                  className="w-full h-full object-cover"
                />
             </AnimatePresence>
             <div className="absolute inset-0 flex items-center justify-center">
                <motion.button
                   whileHover={{ scale: 1.1 }}
                   whileTap={{ scale: 0.9 }}
                   onClick={() => {
                     if (SONGS[currentSong].audioUrl) {
                       setActiveTrack(SONGS[currentSong].audioUrl);
                     }
                   }}
                   className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white z-10"
                >
                  <Play fill="currentColor" size={32} className="ml-1" />
                </motion.button>
             </div>
          </div>

          <div className="w-full md:w-1/2 flex flex-col items-start text-left">
            <motion.div
               key={currentSong}
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.5 }}
            >
               <div className="flex items-center gap-4 mb-6">
                 <span className="px-3 py-1 bg-white/10 text-xs rounded-full border border-white/20">{SONGS[currentSong].year}</span>
                 <div className="w-4 h-4 rounded-full" style={{ backgroundColor: SONGS[currentSong].color }} />
                 <span className="text-sm opacity-60 uppercase tracking-widest">{SONGS[currentSong].emotion}</span>
               </div>
               
               <h3 className="text-5xl md:text-7xl font-serif mb-8 break-words">{SONGS[currentSong].name}</h3>
               
               <div className="mb-12 max-w-md">
                 <p className="text-xl md:text-2xl font-serif leading-relaxed italic mb-4">
                   “{SONGS[currentSong].lyrics}”
                 </p>
                 <p className="text-sm opacity-60 leading-relaxed">
                   {SONGS[currentSong].lyricsCN}
                 </p>
               </div>

               <div className="flex gap-4">
                 <button 
                  onClick={() => handleScroll('prev')}
                  className="p-4 rounded-full border border-white/20 hover:bg-white hover:text-void transition-colors"
                 >
                   <ChevronLeft size={24} />
                 </button>
                 <button 
                  onClick={() => handleScroll('next')}
                  className="p-4 rounded-full border border-white/20 hover:bg-white hover:text-void transition-colors"
                 >
                   <ChevronRight size={24} />
                 </button>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. Footer */}
      <footer className="py-24 px-6 md:px-12 bg-warm-white text-void/40 border-t border-void/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h4 className="text-2xl font-serif text-void/80 mb-2">宇多田光 Hikaru Utada</h4>
            <p className="max-w-md text-sm leading-relaxed">
              音乐是我的积木，拼凑被打乱的人生。每一个频率都是一次对未知的深潜，每一个音符都是一份迟来的告白。
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-2">
            <div className="flex gap-6 mb-4">
               {/* Decorative dots representing original colors */}
               <div className="w-2 h-2 rounded-full bg-deep-blue" />
               <div className="w-2 h-2 rounded-full bg-sky-blue" />
               <div className="w-2 h-2 rounded-full bg-coral" />
               <div className="w-2 h-2 rounded-full bg-gold" />
               <div className="w-2 h-2 rounded-full bg-electric-purple" />
            </div>
            <p className="text-xs uppercase tracking-widest">
              Design & Implementation © 2024 / 05 / 05
            </p>
            <p className="text-[10px] opacity-60">
              Generated by AI Designer · All Icons from Lucide
            </p>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}
