"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import Section3 from "./zz_components/Section3";
import Header from "./zz_components/Header";
import Section1 from "./zz_components/Section1";
import Section4 from "./zz_components/Section4";

export default function Home() {
  const containerRef = useRef(null); // <-- 스크롤 가능한 최상위 컨테이너
  const sectionRefs = useRef([]);
  const videoRef = useRef(null);
  const [activeSection, setActiveSection] = useState("header"); // header, video, text

  // 저장 키 (원하면 경로 기반으로 바꿀 수 있음)
  const STORAGE_KEY = "home-scroll";

  // 스크롤 위치 복원 (렌더 직후 컨테이너가 있으면 복원)
  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      // 숫자가 아닌 경우 대비
      const y = parseFloat(saved);
      if (!Number.isNaN(y)) {
        // 즉시 복원
        el.scrollTop = y;
      }
    }
  }, []); // 처음 마운트 시 한 번

  // 스크롤 위치 저장 (디바운스)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let timer = null;
    const onScroll = () => {
      // 디바운스: 150ms
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        localStorage.setItem(STORAGE_KEY, el.scrollTop.toString());
      }, 150);
    };

    el.addEventListener("scroll", onScroll);
    return () => {
      el.removeEventListener("scroll", onScroll);
      if (timer) clearTimeout(timer);
    };
  }, []);

  // IntersectionObserver: root를 container로 지정
  useEffect(() => {
    sectionRefs.current = sectionRefs.current.slice(0, 4); // header, video, text, textd

    const rootEl = containerRef.current;
    if (!rootEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let maxRatio = 0;
        let visibleId = activeSection;
        entries.forEach((entry) => {
          if (entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            visibleId = entry.target.id;
          }
        });
        setActiveSection(visibleId);
      },
      {
        root: rootEl,
        threshold: Array.from({ length: 101 }, (_, i) => i / 100),
      }
    );

    sectionRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 한 번 설정

  // 비디오 재생/정지 (activeSection 변경에 반응)
  useEffect(() => {
    if (!videoRef.current) return;
    if (activeSection === "video") {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [activeSection]);

  const isVideoVisible = activeSection === "video";
  const bgColor = isVideoVisible ? "#000" : "#fff";
  const textColor = isVideoVisible ? "#fff" : "#000";

  return (
    <div
      ref={containerRef} // <-- 반드시 여기
      className="h-screen w-screen overflow-y-scroll snap-y snap-mandatory scrollbar-hide scroll-smooth relative transition-colors duration-1000"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <AnimatePresence>
        {isVideoVisible && (
          <motion.div
            key="overlay"
            className="fixed inset-0 bg-black z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
          />
        )}
      </AnimatePresence>

      {/* 섹션 1: 헤더 */}
      <motion.div
        id="header"
        ref={(el) => (sectionRefs.current[0] = el)}
        className="flex justify-between w-full items-center h-screen snap-start relative z-10 transition-colors duration-1000"
      >
        <div className="flex flex-col h-full w-full">
          <Header />
          <Section1 />

          {/* 스크롤 유도 애니메이션 */}
          <motion.div
            className="hidden mt-auto lg:flex justify-center pb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
          >
            <a
              href="#video"
              className="group flex flex-col items-center cursor-pointer transition-all duration-300 hover:text-red-600"
              onClick={(e) => {
                // 기본 앵커 동작 막고, 컨테이너 내에서 스크롤 이동
                e.preventDefault();
                const target = sectionRefs.current[1];
                if (target && containerRef.current) {
                  containerRef.current.scrollTo({
                    top: target.offsetTop,
                    behavior: "smooth",
                  });
                }
              }}
            >
              <span className="text-xl font-semibold mb-2">Video 보기</span>
              <div className="w-8 h-12 border-2 border-black rounded-full flex justify-center pt-2 group-hover:border-red-600 transition-colors duration-300">
                <div className="w-1.5 h-1.5 bg-black rounded-full animate-bounce group-hover:bg-red-600"></div>
              </div>
            </a>
          </motion.div>

          <motion.div
            className="lg:hidden mt-auto flex justify-center flex-1 items-center mb-[10vh]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
          >
            <a
              href="#video"
              className="group flex flex-col items-center cursor-pointer transition-all duration-300 hover:text-red-600"
              onClick={(e) => {
                e.preventDefault();
                const target = sectionRefs.current[1];
                if (target && containerRef.current) {
                  containerRef.current.scrollTo({
                    top: target.offsetTop,
                    behavior: "smooth",
                  });
                }
              }}
            >
              <span className="text-sm font-semibold mb-1">Video 보기</span>
              <div className="w-6 h-10 border-2 border-black rounded-full flex justify-center pt-1.5 group-hover:border-red-600 transition-colors duration-300">
                <div className="w-1 h-1 bg-black rounded-full animate-bounce group-hover:bg-red-600"></div>
              </div>
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* 섹션 2: 비디오 */}
      <motion.div
        id="video"
        ref={(el) => (sectionRefs.current[1] = el)}
        className="flex justify-center items-center h-screen snap-start relative z-10"
      >
        <motion.div className="rounded-2xl overflow-hidden w-[80%] shadow-2xl transition-all duration-700 hover:scale-[1.01]">
          <video
            ref={videoRef}
            src="/intro.mp4"
            className="w-full h-auto"
            controls
            loop
            muted
          />
        </motion.div>
      </motion.div>

      {/* 섹션 3: 텍스트 */}
      <motion.div
        id="text"
        ref={(el) => (sectionRefs.current[2] = el)}
        className=" h-screen snap-start relative z-10"
      >
        <Header />
        <Section3 />
      </motion.div>

      {/* 섹션 4 */}
      <motion.div
        id="textd"
        ref={(el) => (sectionRefs.current[3] = el)}
        className=" h-fit lg:h-screen snap-start relative z-10 "
      >
        <Header />
        <Section4 />
      </motion.div>
    </div>
  );
}
