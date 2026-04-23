import { useEffect, useRef } from 'react';

interface Props {
  setCurrentPage: (page: number) => void;
  poemStanzas: string[][];
}

export default function RewardPage({ setCurrentPage, poemStanzas }: Props) {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Inject Blossoming Flowers CSS on mount
    if (!document.getElementById('blossoming-styles')) {
      const style = document.createElement('style');
      style.id = 'blossoming-styles';
      style.textContent = `
        .reward-page-root {
          position: relative;
          width: 100%;
          min-height: 600px;
          height: auto;
          background-color: #000;
          overflow: hidden;
          perspective: 1000px;
          display: flex;
          flex-direction: column;
          border-radius: 1rem;
        }

        .night {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(ellipse at bottom, #020106 0%, #000 80%);
          overflow: hidden;
          z-index: 1;
        }

        .night::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(2px 2px at 20px 30px, #eee, transparent),
            radial-gradient(2px 2px at 40px 70px, white, transparent),
            radial-gradient(1px 1px at 90px 40px, #fff, transparent),
            radial-gradient(1px 1px at 130px 80px, #ddd, transparent),
            repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(111, 111, 111, .04) 4px, rgba(111, 111, 111, .04) 7px),
            repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(111, 111, 111, .03) 2px, rgba(111, 111, 111, .03) 4px);
          animation: stars 20s linear infinite;
        }

        @keyframes stars {
          0%, 100% { transform: rotate(0deg) translateX(0px); }
          50% { transform: rotate(180deg) translateX(-10px); }
        }

        .flowers {
          position: relative;
          width: 100%;
          height: 400px;
          transform-style: preserve-3d;
          z-index: 2;
          margin-top: 20px;
        }

        .flower {
          position: absolute;
          height: 300px;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
        }

        .flower--1 {
          left: 20%;
          animation: flower1 12s ease-in-out infinite;
          transform: translateX(-50%) scale(0.8);
        }

        .flower--2 {
          left: 50%;
          animation: flower2 10s ease-in-out infinite reverse;
          transform: translateX(-50%) scale(1);
        }

        .flower--3 {
          left: 80%;
          animation: flower3 14s ease-in-out infinite;
          transform: translateX(-50%) scale(0.8);
        }

        @keyframes flower1 {
          0%, 100% { transform: translateX(-50%) scale(0.8) rotateZ(-5deg) rotateY(5deg); }
          25% { transform: translateX(-50%) scale(0.8) rotateZ(2deg) rotateY(-3deg); }
          50% { transform: translateX(-50%) scale(0.8) rotateZ(0deg) rotateY(0deg); }
          75% { transform: translateX(-50%) scale(0.8) rotateZ(3deg) rotateY(2deg); }
        }

        @keyframes flower2 {
          0%, 100% { transform: translateX(-50%) scale(1) rotateZ(3deg) rotateY(-2deg); }
          25% { transform: translateX(-50%) scale(1) rotateZ(-2deg) rotateY(4deg); }
          50% { transform: translateX(-50%) scale(1) rotateZ(0deg) rotateY(0deg); }
          75% { transform: translateX(-50%) scale(1) rotateZ(-3deg) rotateY(-1deg); }
        }

        @keyframes flower3 {
          0%, 100% { transform: translateX(-50%) scale(0.8) rotateZ(4deg) rotateY(-4deg); }
          25% { transform: translateX(-50%) scale(0.8) rotateZ(-3deg) rotateY(2deg); }
          50% { transform: translateX(-50%) scale(0.8) rotateZ(0deg) rotateY(0deg); }
          75% { transform: translateX(-50%) scale(0.8) rotateZ(2deg) rotateY(3deg); }
        }

        .flower__leafs {
          position: relative;
          animation: blooming 3s ease-in-out forwards;
        }

        .flower__leafs--1 { animation-delay: 1s; }
        .flower__leafs--2 { animation-delay: 1.5s; }
        .flower__leafs--3 { animation-delay: 2s; }

        @keyframes blooming {
          0% { transform: scale(0) rotate(0deg); opacity: 0; }
          50% { transform: scale(1.1) rotate(5deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); }
        }

        .flower__leaf {
          position: absolute;
          border-radius: 70% 30% 70% 30% / 50% 50% 50% 50%;
          background: linear-gradient(135deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3);
          animation: petalFloat 4s ease-in-out infinite;
          box-shadow: 0 4px 20px rgba(255,255,255,0.3);
        }

        .flower__leaf--1 {
          width: 50px;
          height: 70px;
          top: -10px;
          left: 50%;
          transform: translateX(-50%) rotate(0deg);
          animation-delay: 0s;
        }

        .flower__leaf--2 {
          width: 60px;
          height: 80px;
          top: -20px;
          left: 20%;
          transform: translateX(-20%) rotate(45deg);
          animation-delay: 0.2s;
        }

        .flower__leaf--3 {
          width: 60px;
          height: 80px;
          top: -20px;
          right: 20%;
          transform: translateX(20%) rotate(-45deg);
          animation-delay: 0.4s;
        }

        .flower__leaf--4 {
          width: 40px;
          height: 60px;
          top: 20px;
          left: 50%;
          transform: translateX(-50%) rotate(90deg);
          animation-delay: 0.6s;
          background: linear-gradient(135deg, #ff9ff3, #feca57);
        }

        @keyframes petalFloat {
          0%, 100% { transform: translateY(0px) rotate(var(--rotate, 0deg)); }
          50% { transform: translateY(-10px) rotate(var(--rotate, 0deg)) scale(1.05); }
        }

        .flower__white-circle {
          position: absolute;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          width: 35px;
          height: 35px;
          background: white;
          border-radius: 50%;
          box-shadow: inset -15px 0 20px rgba(255,182,102,0.8), inset 15px 0 20px rgba(255,138,90,0.6);
          animation: centerGlow 2s ease-in-out infinite alternate;
        }

        @keyframes centerGlow {
          0% { box-shadow: inset -15px 0 20px rgba(255,182,102,0.8), inset 15px 0 20px rgba(255,138,90,0.6); }
          100% { box-shadow: inset -15px 0 30px rgba(255,182,102,1), inset 15px 0 30px rgba(255,138,90,1); }
        }

        .flower__line {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 6px;
          height: 200px;
          background: linear-gradient(to top, #2d5a27, #4a7c59);
          border-radius: 4px 4px 0 0;
          animation: growStem 3s ease-out forwards;
        }

        @keyframes growStem {
          0% { height: 0; }
          100% { height: 200px; }
        }

        .flower__line__leaf {
          position: absolute;
          background: linear-gradient(to top, #4a7c59, #6b9b75);
          border-radius: 50% 0 50% 0 / 60% 40% 60% 40%;
          animation: leafBloom 2s ease-out forwards 1s;
        }

        .flower__line__leaf--1 { left: 110%; top: 20%; width: 30px; height: 15px; transform: rotate(30deg); }
        .flower__line__leaf--2 { left: 110%; top: 50%; width: 25px; height: 14px; transform: rotate(25deg); }
        .flower__line__leaf--3 { left: -30%; top: 30%; width: 22px; height: 12px; transform: rotate(-25deg); }
        .flower__line__leaf--4 { left: -25%; top: 60%; width: 25px; height: 14px; transform: rotate(-30deg); }
        .flower__line__leaf--5 { left: 120%; top: 80%; width: 18px; height: 10px; transform: rotate(35deg); }
        .flower__line__leaf--6 { left: -20%; top: 85%; width: 20px; height: 11px; transform: rotate(-35deg); }

        @keyframes leafBloom {
          0% { opacity: 0; transform: scale(0) rotate(var(--r, 0deg)); }
          100% { opacity: 1; transform: scale(1) rotate(var(--r, 0deg)); }
        }

        .flower__light {
          position: absolute;
          background: radial-gradient(circle, rgba(255,255,255,0.8), transparent);
          border-radius: 50%;
          animation: lightTwinkle 3s ease-in-out infinite;
        }

        .flower__light--1 { top: -10px; left: 15px; width: 10px; height: 10px; animation-delay: 0s; }
        .flower__light--2 { top: 10px; right: 10px; width: 8px; height: 8px; animation-delay: 0.5s; }
        .flower__light--3 { bottom: 40px; left: 8px; width: 6px; height: 6px; animation-delay: 1s; }
        .flower__light--4 { bottom: 20px; right: 8px; width: 5px; height: 5px; animation-delay: 1.5s; }
        .flower__light--5 { top: 25px; left: 25px; width: 8px; height: 8px; animation-delay: 0.8s; }
        .flower__light--6 { top: 35px; right: 15px; width: 6px; height: 6px; animation-delay: 1.2s; }
        .flower__light--7 { bottom: 70px; left: 20px; width: 5px; height: 5px; animation-delay: 2s; }
        .flower__light--8 { bottom: 90px; right: 20px; width: 7px; height: 7px; animation-delay: 2.5s; }

        @keyframes lightTwinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }

        .flower__grass {
          position: absolute;
          bottom: 0;
          width: 80px;
          height: 100px;
        }

        .flower__grass--1 { left: calc(20% - 40px); }
        .flower__grass--2 { left: calc(80% - 40px); }

        .flower__grass--top,
        .flower__grass--bottom {
          position: absolute;
          left: 50%;
          width: 3px;
          background: linear-gradient(to top, #2d5a27, #4a7c59);
          transform-origin: bottom;
        }

        .flower__grass--top {
          height: 50px;
          transform: translateX(-50%) rotate(5deg);
        }

        .flower__grass--bottom {
          bottom: 0;
          height: 60px;
          transform: translateX(-50%);
        }

        .flower__grass__leaf {
          position: absolute;
          background: linear-gradient(45deg, #4a7c59, #6b9b75);
          border-radius: 0 100% 0 100%;
          animation: grassSway 6s ease-in-out infinite;
        }

        .flower__grass__leaf--1 { left: -8px; top: 8px; width: 20px; height: 10px; animation-delay: 0s; }
        .flower__grass__leaf--2 { left: 8px; top: 20px; width: 16px; height: 8px; animation-delay: 1s; }
        .flower__grass__leaf--3 { left: -12px; top: 32px; width: 18px; height: 9px; animation-delay: 2s; }
        .flower__grass__leaf--4 { left: 12px; top: 45px; width: 14px; height: 7px; animation-delay: 3s; }
        .flower__grass__leaf--5 { left: -4px; top: 58px; width: 20px; height: 10px; animation-delay: 4s; }
        .flower__grass__leaf--6 { left: 4px; top: 70px; width: 17px; height: 8px; animation-delay: 5s; }
        .flower__grass__leaf--7 { left: -10px; bottom: 16px; width: 18px; height: 9px; animation-delay: 0.5s; }
        .flower__grass__leaf--8 { left: 10px; bottom: 28px; width: 15px; height: 7px; animation-delay: 1.5s; }

        @keyframes grassSway {
          0%, 100% { transform: rotate(0deg); }
          33% { transform: rotate(3deg); }
          66% { transform: rotate(-2deg); }
        }

        .flower__grass__overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 25px;
          background: linear-gradient(to top, #1a2f1a, transparent);
          border-radius: 50% 50% 50% 50% / 100% 100% 0 0;
        }

        .flower__g-long {
          position: absolute;
          bottom: 0;
          left: 30%;
          width: 5px;
          height: 80px;
          background: linear-gradient(to top, #2d5a27, #4a7c59);
        }

        .flower__g-long__top { height: 30px; transform: rotate(8deg); }
        .flower__g-long__bottom { height: 50px; }

        .flower__g-right {
          position: absolute;
          bottom: 15px;
        }

        .flower__g-right--1 { left: 45%; }
        .flower__g-right--2 { left: 55%; }

        .leaf {
          width: 12px;
          height: 20px;
          background: #4a7c59;
          border-radius: 0 70% 0 70%;
          transform: rotate(20deg);
          animation: leafSway 4s ease-in-out infinite;
        }

        .flower__g-front {
          position: absolute;
          bottom: 0;
          left: 60%;
          width: 6px;
          height: 110px;
          background: linear-gradient(to top, #2d5a27, #4a7c59);
          z-index: 2;
        }

        .flower__g-front__line { height: 35px; background: #1a2f1a; }

        .flower__g-front__leaf-wrapper {
          position: absolute;
          left: -15px;
        }

        .flower__g-front__leaf-wrapper--1 { top: 15px; }
        .flower__g-front__leaf-wrapper--2 { top: 35px; }
        .flower__g-front__leaf-wrapper--3 { top: 55px; }
        .flower__g-front__leaf-wrapper--4 { top: 75px; }
        .flower__g-front__leaf-wrapper--5 { top: 20px; transform: rotate(15deg); }
        .flower__g-front__leaf-wrapper--6 { top: 40px; transform: rotate(-10deg); }
        .flower__g-front__leaf-wrapper--7 { top: 60px; transform: rotate(20deg); }
        .flower__g-front__leaf-wrapper--8 { top: 80px; transform: rotate(-15deg); }

        .flower__g-front__leaf {
          width: 20px;
          height: 10px;
          background: #4a7c59;
          border-radius: 0 60% 0 60%;
          animation: frontLeafSway 5s ease-in-out infinite;
        }

        @keyframes frontLeafSway {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(5deg); }
        }

        .flower__g-fr {
          position: absolute;
          bottom: 25px;
          left: 85%;
          z-index: 3;
        }

        .flower__g-fr .leaf { transform: rotate(-25deg); animation-delay: 1s; }

        .flower__g-fr__leaf {
          position: absolute;
          background: #4a7c59;
          border-radius: 50% 0;
          animation: frLeafMove 3s ease-in-out infinite;
        }

        .flower__g-fr__leaf--1 { left: 15px; top: -8px; width: 16px; height: 7px; }
        .flower__g-fr__leaf--2 { left: 30px; top: 4px; width: 15px; height: 6px; }
        .flower__g-fr__leaf--3 { left: 20px; top: 16px; width: 18px; height: 8px; }
        .flower__g-fr__leaf--4 { left: 35px; top: 28px; width: 14px; height: 5px; animation-delay: 0.5s; }

        @keyframes frLeafMove {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }

        .not-loaded * {
          animation-play-state: paused !important;
        }

        @media (max-width: 600px) {
          .flowers { height: 350px; }
          .flower { height: 250px; }
          .flower__line { height: 150px; }
          @keyframes growStem { 0% { height: 0; } 100% { height: 150px; } }
          .flower--1 { left: 15%; transform: translateX(-50%) scale(0.6); }
          .flower--3 { left: 85%; transform: translateX(-50%) scale(0.6); }
          .flower--2 { transform: translateX(-50%) scale(0.8); }
        }
      `;
      document.head.appendChild(style);
    }

    // Start animations after delay
    const timer = setTimeout(() => {
      if (pageRef.current) {
        pageRef.current.classList.remove('not-loaded');
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      ref={pageRef}
      className="not-loaded reward-page-root"
    >
      <div className="night" />
      
      <div className="flowers">
        {/* Flower 1 */}
        <div className="flower flower--1">
          <div className="flower__leafs flower__leafs--1">
            <div className="flower__leaf flower__leaf--1"></div>
            <div className="flower__leaf flower__leaf--2"></div>
            <div className="flower__leaf flower__leaf--3"></div>
            <div className="flower__leaf flower__leaf--4"></div>
            <div className="flower__white-circle"></div>
          </div>
          <div className="flower__line">
            <div className="flower__line__leaf flower__line__leaf--1"></div>
            <div className="flower__line__leaf flower__line__leaf--2"></div>
            <div className="flower__line__leaf flower__line__leaf--3"></div>
            <div className="flower__line__leaf flower__line__leaf--4"></div>
            <div className="flower__line__leaf flower__line__leaf--5"></div>
            <div className="flower__line__leaf flower__line__leaf--6"></div>
          </div>
          {[...Array(8)].map((_, i) => (
            <div key={i} className={`flower__light flower__light--${i + 1}`}></div>
          ))}
        </div>

        {/* Flower 2 */}
        <div className="flower flower--2">
          <div className="flower__leafs flower__leafs--2">
            <div className="flower__leaf flower__leaf--1"></div>
            <div className="flower__leaf flower__leaf--2"></div>
            <div className="flower__leaf flower__leaf--3"></div>
            <div className="flower__leaf flower__leaf--4"></div>
            <div className="flower__white-circle"></div>
          </div>
          <div className="flower__line">
            <div className="flower__line__leaf flower__line__leaf--1"></div>
            <div className="flower__line__leaf flower__line__leaf--2"></div>
            <div className="flower__line__leaf flower__line__leaf--3"></div>
            <div className="flower__line__leaf flower__line__leaf--4"></div>
          </div>
          {[...Array(8)].map((_, i) => (
            <div key={i} className={`flower__light flower__light--${i + 1}`}></div>
          ))}
        </div>

        {/* Flower 3 */}
        <div className="flower flower--3">
          <div className="flower__leafs flower__leafs--3">
            <div className="flower__leaf flower__leaf--1"></div>
            <div className="flower__leaf flower__leaf--2"></div>
            <div className="flower__leaf flower__leaf--3"></div>
            <div className="flower__leaf flower__leaf--4"></div>
            <div className="flower__white-circle"></div>
          </div>
          <div className="flower__line">
            <div className="flower__line__leaf flower__line__leaf--1"></div>
            <div className="flower__line__leaf flower__line__leaf--2"></div>
            <div className="flower__line__leaf flower__line__leaf--3"></div>
            <div className="flower__line__leaf flower__line__leaf--4"></div>
          </div>
          {[...Array(8)].map((_, i) => (
            <div key={i} className={`flower__light flower__light--${i + 1}`}></div>
          ))}
        </div>

        <div className="flower__grass flower__grass--1">
          <div className="flower__grass--top"></div>
          <div className="flower__grass--bottom"></div>
          {[...Array(8)].map((_, i) => (
            <div key={i} className={`flower__grass__leaf flower__grass__leaf--${i + 1}`}></div>
          ))}
          <div className="flower__grass__overlay"></div>
        </div>
        <div className="flower__grass flower__grass--2">
          <div className="flower__grass--top"></div>
          <div className="flower__grass--bottom"></div>
          {[...Array(8)].map((_, i) => (
            <div key={i} className={`flower__grass__leaf flower__grass__leaf--${i + 1}`}></div>
          ))}
          <div className="flower__grass__overlay"></div>
        </div>
        <div className="flower__g-long">
          <div className="flower__g-long__top"></div>
          <div className="flower__g-long__bottom"></div>
        </div>
        <div className="flower__g-right flower__g-right--1">
          <div className="leaf"></div>
        </div>
        <div className="flower__g-right flower__g-right--2">
          <div className="leaf"></div>
        </div>
        <div className="flower__g-front">
          <div className="flower__g-front__line"></div>
          {[...Array(8)].map((_, i) => (
            <div key={i} className={`flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--${i + 1}`}>
              <div className="flower__g-front__leaf"></div>
            </div>
          ))}
        </div>
        <div className="flower__g-fr">
          <div className="leaf"></div>
          {[...Array(4)].map((_, i) => (
            <div key={i} className={`flower__g-fr__leaf flower__g-fr__leaf--${i + 1}`}></div>
          ))}
        </div>
      </div>

      {/* Poem Container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          flex: 1,
          overflowY: 'auto',
          backgroundColor: 'rgba(0, 0, 0, 0.95)',
          backdropFilter: 'blur(5px)',
          padding: '1.5rem',
          zIndex: 3,
          boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.8)',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <button
          className="back-button"
          onClick={() => setCurrentPage(2)}
          style={{
            alignSelf: 'flex-start',
            padding: '0.4rem 0.8rem',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            color: '#fff',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            marginBottom: '1rem'
          }}
        >
          ← Back
        </button>
        
        <h2
          style={{
            color: '#a7ffee',
            textAlign: 'center',
            marginBottom: '1rem',
            fontSize: '1.4rem',
            fontFamily: 'Great Vibes, cursive'
          }}
        >
          I love you my kalon! 💚
        </h2>

        <div className="poem-wrap" style={{ textAlign: 'center' }}>
          {poemStanzas.map((stanza, idx) => (
            <div key={idx} className="poem-stanza" style={{ 
              marginBottom: '1.25rem',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              padding: '0.75rem',
              borderRadius: '8px',
              borderLeft: 'none'
            }}>
              {stanza.map((line, lineIdx) => (
                <div
                  key={lineIdx}
                  className="poem-line"
                  style={{
                    color: '#fff',
                    fontSize: '0.9rem',
                    lineHeight: '1.5',
                    fontStyle: 'italic'
                  }}
                >
                  {line}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
