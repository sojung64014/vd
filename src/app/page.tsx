"use client";

import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────────────────── */
const STATS = [
  { value: "97%", label: "포트폴리오 통과율" },
  { value: "340+", label: "합격 누적 인원" },
  { value: "4.9★", label: "평균 수강생 만족도" },
  { value: "8년+", label: "현업 디자인 경력" },
];

const SERVICES = [
  {
    icon: "✦",
    title: "포트폴리오 1:1 클리닉",
    desc: "현직 시니어 디자이너가 직접 검토하고, 기업 맞춤 피드백을 제공합니다. 단순 수정이 아닌 전략적 스토리텔링으로 재구성합니다.",
    tag: "Most Popular",
    color: "#7c5cfc",
  },
  {
    icon: "◈",
    title: "커리어 로드맵 설계",
    desc: "현재 역량 분석부터 목표 기업까지, 단계별 성장 전략을 함께 수립합니다. 빠르고 정확한 경로를 찾아드립니다.",
    tag: "Strategic",
    color: "#f5c842",
  },
  {
    icon: "◉",
    title: "면접 & 프레젠테이션 코칭",
    desc: "포트폴리오를 말로 풀어내는 훈련. 실전 모의 면접으로 자신감과 완성도를 동시에 높입니다.",
    tag: "Advanced",
    color: "#34d399",
  },
  {
    icon: "◐",
    title: "그룹 스터디 & 크리틱",
    desc: "소수 정예 그룹에서 서로의 작업을 비평하며 성장합니다. 다양한 시각과 네트워크를 얻어가세요.",
    tag: "Community",
    color: "#fb923c",
  },
];

const PROCESS = [
  {
    step: "01",
    title: "무료 상담 신청",
    desc: "간단한 현황 설문을 작성하고, 무료 30분 상담을 예약하세요.",
  },
  {
    step: "02",
    title: "맞춤 진단 & 플랜 제안",
    desc: "포트폴리오와 커리어 목표를 분석해 최적의 솔루션을 제안합니다.",
  },
  {
    step: "03",
    title: "집중 코칭 진행",
    desc: "1:1 또는 그룹 세션을 통해 실질적인 변화를 만들어갑니다.",
  },
  {
    step: "04",
    title: "목표 달성 & 사후 지원",
    desc: "합격 후에도 지속적인 커뮤니티와 레퍼런스를 지원합니다.",
  },
];

const TESTIMONIALS = [
  {
    name: "김서연",
    role: "네이버 UX 디자이너",
    avatar: "KS",
    quote:
      "포트폴리오를 완전히 다시 짜는 과정이 처음엔 무서웠는데, VD 덕분에 훨씬 강력한 이야기가 만들어졌어요. 면접에서 '이 포트폴리오 정말 인상적이다'는 말을 들었을 때 감동이었습니다.",
    company: "NAVER",
    color: "#03c75a",
  },
  {
    name: "이준혁",
    role: "카카오 프로덕트 디자이너",
    avatar: "LJ",
    quote:
      "3년 경력에 취업이 안 돼서 막막했는데, 1주일 집중 클리닉으로 방향이 완전히 바뀌었어요. 전략이 명확해지니까 자신감도 생기더라고요.",
    company: "Kakao",
    color: "#fee500",
  },
  {
    name: "박민지",
    role: "쿠팡 서비스 디자이너",
    avatar: "PM",
    quote:
      "면접 코칭이 정말 좋았어요. 내 작업을 어떻게 설명해야 할지 몰랐는데, 이제는 어떤 질문이 와도 자신있게 대답할 수 있어요.",
    company: "Coupang",
    color: "#ee2c2c",
  },
];

const FAQS = [
  {
    q: "디자인 경력이 없어도 신청할 수 있나요?",
    a: "네, 가능합니다. 신입부터 5년차 이상 경력직까지 단계에 맞는 맞춤 코칭을 제공합니다. 무료 상담을 통해 현재 상황을 파악한 후 적합한 플랜을 추천해 드립니다.",
  },
  {
    q: "포트폴리오 클리닉은 어떻게 진행되나요?",
    a: "온라인 화상 미팅(줌/구글밋)을 통해 1:1로 진행됩니다. 사전에 포트폴리오를 공유해 주시면 미팅 전에 꼼꼼히 분석하여 더욱 깊이 있는 피드백을 드립니다.",
  },
  {
    q: "환불 정책은 어떻게 되나요?",
    a: "첫 세션 시작 48시간 이전까지 전액 환불이 가능합니다. 세션이 시작된 이후에는 진행 세션 수를 제외한 나머지 금액을 환불해 드립니다.",
  },
  {
    q: "어떤 기업들을 타겟으로 준비할 수 있나요?",
    a: "네이버, 카카오, 쿠팡, 배민, 토스 등 국내 주요 IT 기업부터 삼성, LG, 현대 등 대기업 디자인팀, 그리고 해외 취업까지 다양한 목표에 맞춰 준비할 수 있습니다.",
  },
];

/* ─────────────────────────────────────────────────────────────────────────
   HOOKS
───────────────────────────────────────────────────────────────────────── */
function useIntersectionObserver(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

/* ─────────────────────────────────────────────────────────────────────────
   COMPONENTS
───────────────────────────────────────────────────────────────────────── */

/* Navbar */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "0 24px",
        transition: "all 0.3s ease",
        background: scrolled
          ? "rgba(10, 10, 15, 0.92)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.06)"
          : "none",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "72px",
        }}
      >
        {/* Logo */}
        <a href="#" style={{ textDecoration: "none" }}>
          <span
            style={{
              fontSize: "22px",
              fontWeight: 800,
              letterSpacing: "-0.5px",
            }}
            className="gradient-text"
          >
            VD
          </span>
          <span
            style={{
              fontSize: "13px",
              color: "var(--text-muted)",
              marginLeft: "8px",
              fontWeight: 500,
              letterSpacing: "0.05em",
            }}
          >
            Career Consulting
          </span>
        </a>

        {/* Desktop Nav Links */}
        <div
          style={{
            display: "flex",
            gap: "36px",
            alignItems: "center",
          }}
          className="hidden md:flex"
        >
          {["서비스", "프로세스", "후기", "FAQ"].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              style={{
                color: "var(--text-muted)",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: 500,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "var(--foreground)")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "var(--text-muted)")
              }
            >
              {item}
            </a>
          ))}
          <a
            href="#상담"
            className="btn-primary"
            style={{ padding: "10px 24px", fontSize: "14px" }}
          >
            무료 상담 신청
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "none",
            border: "none",
            color: "var(--foreground)",
            cursor: "pointer",
            fontSize: "24px",
            display: "none",
          }}
          className="block md:hidden"
          aria-label="메뉴 열기"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          style={{
            background: "rgba(13,13,20,0.98)",
            backdropFilter: "blur(20px)",
            padding: "20px 24px 32px",
            borderTop: "1px solid var(--border)",
          }}
        >
          {["서비스", "프로세스", "후기", "FAQ"].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                color: "var(--foreground)",
                textDecoration: "none",
                padding: "12px 0",
                fontSize: "16px",
                borderBottom: "1px solid var(--border)",
              }}
            >
              {item}
            </a>
          ))}
          <a
            href="#상담"
            onClick={() => setMenuOpen(false)}
            className="btn-primary"
            style={{ marginTop: "20px", justifyContent: "center" }}
          >
            무료 상담 신청
          </a>
        </div>
      )}
    </nav>
  );
}

/* Hero Section */
function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        padding: "120px 24px 80px",
        textAlign: "center",
      }}
    >
      {/* Animated background orbs */}
      <div
        style={{
          position: "absolute",
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(124,92,252,0.15) 0%, transparent 70%)",
          top: "-200px",
          left: "50%",
          transform: `translate(-50%, 0) translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)`,
          transition: "transform 0.1s ease",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(245,200,66,0.08) 0%, transparent 70%)",
          bottom: "-100px",
          right: "-100px",
          transform: `translate(${mousePos.x * -0.3}px, ${mousePos.y * -0.3}px)`,
          transition: "transform 0.15s ease",
          pointerEvents: "none",
        }}
      />

      {/* Grid lines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          pointerEvents: "none",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 50%, black 0%, transparent 100%)",
        }}
      />

      {/* Badge */}
      <div
        className="glass animate-fade-in-up"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          padding: "8px 18px",
          borderRadius: "50px",
          marginBottom: "28px",
          border: "1px solid rgba(124, 92, 252, 0.3)",
        }}
      >
        <span
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "#7c5cfc",
            display: "inline-block",
          }}
          className="animate-pulse-glow"
        />
        <span
          style={{ fontSize: "13px", color: "var(--accent-light)", fontWeight: 500 }}
        >
          340명+ 누적 합격자 · 현직 디자이너 운영
        </span>
      </div>

      {/* Headline */}
      <h1
        className="animate-fade-in-up delay-100"
        style={{
          fontSize: "clamp(42px, 7vw, 80px)",
          fontWeight: 800,
          lineHeight: 1.1,
          letterSpacing: "-2px",
          maxWidth: "900px",
          marginBottom: "24px",
        }}
      >
        당신의 포트폴리오를
        <br />
        <span className="gradient-text glow-text">최상위 기업</span>이
        <br />
        원하는 수준으로
      </h1>

      {/* Subheadline */}
      <p
        className="animate-fade-in-up delay-200"
        style={{
          fontSize: "clamp(16px, 2.5vw, 20px)",
          color: "var(--text-muted)",
          maxWidth: "600px",
          lineHeight: 1.7,
          marginBottom: "44px",
        }}
      >
        현직 시니어 디자이너가 직접 운영하는 1:1 커리어 컨설팅.
        <br />
        포트폴리오부터 면접까지, 합격을 위한 전략을 함께 설계합니다.
      </p>

      {/* CTAs */}
      <div
        className="animate-fade-in-up delay-300"
        style={{
          display: "flex",
          gap: "16px",
          flexWrap: "wrap",
          justifyContent: "center",
          marginBottom: "72px",
        }}
      >
        <a href="#상담" className="btn-primary">
          <span>무료 상담 신청하기</span>
          <span>→</span>
        </a>
        <a href="#서비스" className="btn-secondary">
          서비스 알아보기
        </a>
      </div>

      {/* Stats */}
      <div
        className="animate-fade-in-up delay-400"
        style={{
          display: "flex",
          gap: "8px",
          flexWrap: "wrap",
          justifyContent: "center",
          width: "100%",
          maxWidth: "700px",
        }}
      >
        {STATS.map((stat, i) => (
          <div
            key={i}
            className="glass"
            style={{
              padding: "20px 28px",
              borderRadius: "16px",
              textAlign: "center",
              flex: "1 1 140px",
              minWidth: "120px",
            }}
          >
            <div
              className="gradient-text"
              style={{ fontSize: "28px", fontWeight: 800, lineHeight: 1 }}
            >
              {stat.value}
            </div>
            <div
              style={{
                fontSize: "12px",
                color: "var(--text-muted)",
                marginTop: "6px",
                fontWeight: 500,
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "32px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          color: "var(--text-muted)",
          fontSize: "12px",
        }}
        className="animate-float"
      >
        <span style={{ letterSpacing: "0.1em" }}>SCROLL</span>
        <span style={{ fontSize: "20px" }}>↓</span>
      </div>
    </section>
  );
}

/* Services Section */
function ServicesSection() {
  const { ref, visible } = useIntersectionObserver();

  return (
    <section
      id="서비스"
      ref={ref}
      style={{
        padding: "120px 24px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "64px" }}>
        <div
          style={{
            display: "inline-block",
            padding: "6px 16px",
            borderRadius: "50px",
            border: "1px solid rgba(124,92,252,0.3)",
            color: "var(--accent-light)",
            fontSize: "13px",
            fontWeight: 500,
            marginBottom: "16px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s ease",
          }}
        >
          What We Offer
        </div>
        <h2
          style={{
            fontSize: "clamp(28px, 4vw, 48px)",
            fontWeight: 800,
            letterSpacing: "-1px",
            lineHeight: 1.2,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s ease 0.1s",
          }}
        >
          커리어를 바꾸는{" "}
          <span className="gradient-text">4가지 솔루션</span>
        </h2>
        <p
          style={{
            marginTop: "16px",
            color: "var(--text-muted)",
            fontSize: "16px",
            maxWidth: "500px",
            margin: "16px auto 0",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s ease 0.2s",
          }}
        >
          목표와 단계에 맞는 최적의 서비스를 선택하세요.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "20px",
        }}
      >
        {SERVICES.map((service, i) => (
          <ServiceCard
            key={i}
            service={service}
            index={i}
            visible={visible}
          />
        ))}
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  index,
  visible,
}: {
  service: (typeof SERVICES)[0];
  index: number;
  visible: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "32px",
        borderRadius: "20px",
        background: hovered
          ? `linear-gradient(135deg, rgba(${hexToRgb(service.color)}, 0.08) 0%, rgba(13,13,20,0.95) 100%)`
          : "var(--surface)",
        border: `1px solid ${hovered ? service.color + "40" : "var(--border)"}`,
        cursor: "pointer",
        transition: "all 0.4s ease",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered
          ? `0 20px 60px rgba(${hexToRgb(service.color)}, 0.15)`
          : "none",
        opacity: visible ? 1 : 0,
        transitionDelay: `${0.1 * index}s`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Tag */}
      <div
        style={{
          display: "inline-block",
          padding: "4px 10px",
          borderRadius: "6px",
          background: `rgba(${hexToRgb(service.color)}, 0.15)`,
          color: service.color,
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: "0.05em",
          marginBottom: "20px",
        }}
      >
        {service.tag}
      </div>

      {/* Icon */}
      <div
        style={{
          fontSize: "32px",
          marginBottom: "16px",
          color: service.color,
          lineHeight: 1,
        }}
      >
        {service.icon}
      </div>

      <h3
        style={{
          fontSize: "20px",
          fontWeight: 700,
          marginBottom: "12px",
          letterSpacing: "-0.3px",
        }}
      >
        {service.title}
      </h3>

      <p
        style={{
          color: "var(--text-muted)",
          fontSize: "14px",
          lineHeight: 1.7,
        }}
      >
        {service.desc}
      </p>

      {/* Arrow */}
      <div
        style={{
          marginTop: "24px",
          color: service.color,
          fontSize: "18px",
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateX(0)" : "translateX(-8px)",
          transition: "all 0.3s ease",
        }}
      >
        →
      </div>
    </div>
  );
}

/* Process Section */
function ProcessSection() {
  const { ref, visible } = useIntersectionObserver();

  return (
    <section
      id="프로세스"
      ref={ref}
      style={{
        padding: "120px 24px",
        background: "var(--surface)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decoration */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "800px",
          height: "800px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(124,92,252,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div
            style={{
              display: "inline-block",
              padding: "6px 16px",
              borderRadius: "50px",
              border: "1px solid rgba(245,200,66,0.3)",
              color: "var(--gold-light)",
              fontSize: "13px",
              fontWeight: 500,
              marginBottom: "16px",
              opacity: visible ? 1 : 0,
              transition: "opacity 0.6s ease",
            }}
          >
            How It Works
          </div>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 800,
              letterSpacing: "-1px",
              lineHeight: 1.2,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.6s ease 0.1s",
            }}
          >
            합격까지의{" "}
            <span className="gradient-text-gold">4단계</span>
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "24px",
            position: "relative",
          }}
        >
          {PROCESS.map((step, i) => (
            <div
              key={i}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(30px)",
                transition: `all 0.6s ease ${i * 0.15}s`,
              }}
            >
              <div
                className="glass-strong"
                style={{
                  padding: "32px 28px",
                  borderRadius: "20px",
                  height: "100%",
                  position: "relative",
                }}
              >
                {/* Step number */}
                <div
                  style={{
                    fontSize: "48px",
                    fontWeight: 900,
                    lineHeight: 1,
                    marginBottom: "20px",
                    background:
                      "linear-gradient(135deg, rgba(124,92,252,0.3) 0%, rgba(124,92,252,0.05) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {step.step}
                </div>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: 700,
                    marginBottom: "12px",
                  }}
                >
                  {step.title}
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: "14px", lineHeight: 1.7 }}>
                  {step.desc}
                </p>

                {/* Connector */}
                {i < PROCESS.length - 1 && (
                  <div
                    style={{
                      position: "absolute",
                      right: "-20px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      fontSize: "24px",
                      color: "rgba(124,92,252,0.4)",
                      zIndex: 1,
                    }}
                    className="hidden lg:block"
                  >
                    →
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Testimonials Section */
function TestimonialsSection() {
  const { ref, visible } = useIntersectionObserver();

  return (
    <section
      id="후기"
      ref={ref}
      style={{ padding: "120px 24px" }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div
            style={{
              display: "inline-block",
              padding: "6px 16px",
              borderRadius: "50px",
              border: "1px solid rgba(52,211,153,0.3)",
              color: "#34d399",
              fontSize: "13px",
              fontWeight: 500,
              marginBottom: "16px",
              opacity: visible ? 1 : 0,
              transition: "opacity 0.6s ease",
            }}
          >
            Success Stories
          </div>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 800,
              letterSpacing: "-1px",
              lineHeight: 1.2,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.6s ease 0.1s",
            }}
          >
            실제 합격자들의{" "}
            <span className="gradient-text">이야기</span>
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="glass"
              style={{
                padding: "36px",
                borderRadius: "20px",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(30px)",
                transition: `all 0.6s ease ${i * 0.15}s`,
              }}
            >
              {/* Quote mark */}
              <div
                style={{
                  fontSize: "48px",
                  lineHeight: 1,
                  marginBottom: "16px",
                  color: "var(--accent)",
                  opacity: 0.4,
                  fontFamily: "Georgia, serif",
                }}
              >
                "
              </div>

              <p
                style={{
                  color: "var(--foreground)",
                  fontSize: "15px",
                  lineHeight: 1.8,
                  marginBottom: "28px",
                  opacity: 0.9,
                }}
              >
                {t.quote}
              </p>

              {/* Author */}
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${t.color}40, ${t.color}20)`,
                    border: `2px solid ${t.color}60`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: t.color,
                  }}
                >
                  {t.avatar}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "14px" }}>{t.name}</div>
                  <div style={{ color: "var(--text-muted)", fontSize: "13px" }}>
                    {t.role}
                  </div>
                </div>
                <div
                  style={{
                    marginLeft: "auto",
                    padding: "4px 10px",
                    borderRadius: "6px",
                    background: `${t.color}15`,
                    color: t.color,
                    fontSize: "11px",
                    fontWeight: 700,
                  }}
                >
                  {t.company}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* FAQ Section */
function FAQSection() {
  const { ref, visible } = useIntersectionObserver();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="FAQ"
      ref={ref}
      style={{
        padding: "120px 24px",
        background: "var(--surface)",
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 800,
              letterSpacing: "-1px",
              lineHeight: 1.2,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.6s ease",
            }}
          >
            자주 묻는 <span className="gradient-text">질문</span>
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="glass-strong"
              style={{
                borderRadius: "16px",
                overflow: "hidden",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: `all 0.5s ease ${i * 0.1}s`,
              }}
            >
              <button
                id={`faq-${i}`}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                style={{
                  width: "100%",
                  padding: "24px 28px",
                  background: "none",
                  border: "none",
                  color: "var(--foreground)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "16px",
                  textAlign: "left",
                }}
              >
                <span style={{ fontSize: "16px", fontWeight: 600 }}>{faq.q}</span>
                <span
                  style={{
                    fontSize: "20px",
                    color: "var(--accent-light)",
                    transition: "transform 0.3s ease",
                    transform: openIndex === i ? "rotate(45deg)" : "rotate(0deg)",
                    flexShrink: 0,
                  }}
                >
                  +
                </span>
              </button>

              {openIndex === i && (
                <div
                  style={{
                    padding: "0 28px 24px",
                    color: "var(--text-muted)",
                    fontSize: "15px",
                    lineHeight: 1.7,
                    borderTop: "1px solid var(--border)",
                    paddingTop: "20px",
                  }}
                >
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* CTA Section */
function CTASection() {
  const { ref, visible } = useIntersectionObserver();

  return (
    <section
      id="상담"
      ref={ref}
      style={{
        padding: "120px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(124,92,252,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
        }}
      >
        <div
          className="glass"
          style={{
            padding: "clamp(48px, 8vw, 80px) clamp(32px, 6vw, 64px)",
            borderRadius: "32px",
            border: "1px solid rgba(124,92,252,0.2)",
            opacity: visible ? 1 : 0,
            transform: visible ? "scale(1)" : "scale(0.95)",
            transition: "all 0.7s ease",
          }}
        >
          <div
            style={{
              fontSize: "48px",
              marginBottom: "16px",
            }}
          >
            ✦
          </div>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 800,
              letterSpacing: "-1px",
              lineHeight: 1.2,
              marginBottom: "20px",
            }}
          >
            지금 바로{" "}
            <span className="gradient-text">무료 상담</span>을
            <br />
            신청하세요
          </h2>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "16px",
              lineHeight: 1.7,
              marginBottom: "40px",
            }}
          >
            30분 무료 상담을 통해 현재 포트폴리오를 진단하고,
            <br />
            최적의 커리어 전략을 제안받아 보세요.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "center" }}>
            <a
              href="mailto:hello@vd-career.com"
              className="btn-primary"
              style={{ fontSize: "16px", padding: "16px 40px" }}
              id="cta-email-button"
            >
              <span>📩</span>
              <span>이메일로 상담 신청</span>
            </a>
            <span
              style={{
                fontSize: "13px",
                color: "var(--text-muted)",
              }}
            >
              응답은 보통 24시간 이내에 드립니다
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Footer */
function Footer() {
  return (
    <footer
      style={{
        padding: "48px 24px",
        borderTop: "1px solid var(--border)",
        background: "var(--surface)",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "24px",
        }}
      >
        <div>
          <span className="gradient-text" style={{ fontSize: "20px", fontWeight: 800 }}>
            VD
          </span>
          <span
            style={{
              marginLeft: "8px",
              fontSize: "13px",
              color: "var(--text-muted)",
            }}
          >
            Career Consulting
          </span>
          <p
            style={{
              marginTop: "8px",
              fontSize: "13px",
              color: "var(--text-muted)",
            }}
          >
            © 2024 VD Career Consulting. All rights reserved.
          </p>
        </div>

        <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
          {["서비스", "프로세스", "후기", "FAQ", "개인정보처리방침"].map((link) => (
            <a
              key={link}
              href={`#${link}`}
              style={{
                color: "var(--text-muted)",
                textDecoration: "none",
                fontSize: "13px",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "var(--foreground)")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "var(--text-muted)")
              }
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   UTILITY
───────────────────────────────────────────────────────────────────────── */
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return "124, 92, 252";
  return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
}

/* ─────────────────────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────────────────────── */
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <ProcessSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
