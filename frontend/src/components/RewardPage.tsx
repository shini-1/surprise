import { useEffect, useRef } from 'react';

interface Props {
  setCurrentPage: (page: number) => void;
  poemStanzas: string[][];
}

export default function RewardPage({ setCurrentPage, poemStanzas }: Props) {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Inject complete CodeWithRandom CSS on mount
    if (!document.getElementById('cwr-complete-styles')) {
      const style = document.createElement('style');
      style.id = 'cwr-complete-styles';
      style.textContent = `
        *,
        *::after,
        *::before {
          padding: 0;
          margin: 0;
          box-sizing: border-box;
        }

        :root {
          --dark-color: #000;
        }

        .cwr-night {
          position: fixed;
          left: 50%;
          top: 0;
          transform: translateX(-50%);
          width: 100%;
          height: 100%;
          filter: blur(0.1vmin);
          background-image: radial-gradient(ellipse at top, transparent 0%, var(--dark-color)), radial-gradient(ellipse at bottom, var(--dark-color), rgba(145, 233, 255, 0.2)), repeating-linear-gradient(220deg, black 0px, black 19px, transparent 19px, transparent 22px), repeating-linear-gradient(189deg, black 0px, black 19px, transparent 19px, transparent 22px), repeating-linear-gradient(148deg, black 0px, black 19px, transparent 19px, transparent 22px), linear-gradient(90deg, #00fffa, #f0f0f0);
          z-index: 1;
        }

        .cwr-flowers {
          position: relative;
          transform: scale(0.9);
          z-index: 2;
        }

        .cwr-flower {
          position: absolute;
          bottom: 10vmin;
          transform-origin: bottom center;
          --fl-speed: 0.8s;
        }

        .cwr-flower--1 {
          animation: cwr-moving-flower-1 4s linear infinite;
        }

        .cwr-flower--1 .cwr-flower__line {
          height: 70vmin;
          animation-delay: 0.3s;
        }

        .cwr-flower--1 .cwr-flower__line__leaf--1 {
          animation: cwr-blooming-leaf-right var(--fl-speed) 1.6s backwards;
        }

        .cwr-flower--1 .cwr-flower__line__leaf--2 {
          animation: cwr-blooming-leaf-right var(--fl-speed) 1.4s backwards;
        }

        .cwr-flower--1 .cwr-flower__line__leaf--3 {
          animation: cwr-blooming-leaf-left var(--fl-speed) 1.2s backwards;
        }

        .cwr-flower--1 .cwr-flower__line__leaf--4 {
          animation: cwr-blooming-leaf-left var(--fl-speed) 1s backwards;
        }

        .cwr-flower--1 .cwr-flower__line__leaf--5 {
          animation: cwr-blooming-leaf-right var(--fl-speed) 1.8s backwards;
        }

        .cwr-flower--1 .cwr-flower__line__leaf--6 {
          animation: cwr-blooming-leaf-left var(--fl-speed) 2s backwards;
        }

        .cwr-flower--2 {
          left: 50%;
          transform: rotate(20deg);
          animation: cwr-moving-flower-2 4s linear infinite;
        }

        .cwr-flower--2 .cwr-flower__line {
          height: 60vmin;
          animation-delay: 0.6s;
        }

        .cwr-flower--2 .cwr-flower__line__leaf--1 {
          animation: cwr-blooming-leaf-right var(--fl-speed) 1.9s backwards;
        }

        .cwr-flower--2 .cwr-flower__line__leaf--2 {
          animation: cwr-blooming-leaf-right var(--fl-speed) 1.7s backwards;
        }

        .cwr-flower--2 .cwr-flower__line__leaf--3 {
          animation: cwr-blooming-leaf-left var(--fl-speed) 1.5s backwards;
        }

        .cwr-flower--2 .cwr-flower__line__leaf--4 {
          animation: cwr-blooming-leaf-left var(--fl-speed) 1.3s backwards;
        }

        .cwr-flower--3 {
          left: 50%;
          transform: rotate(-15deg);
          animation: cwr-moving-flower-3 4s linear infinite;
        }

        .cwr-flower--3 .cwr-flower__line {
          animation-delay: 0.9s;
        }

        .cwr-flower--3 .cwr-flower__line__leaf--1 {
          animation: cwr-blooming-leaf-right var(--fl-speed) 2.5s backwards;
        }

        .cwr-flower--3 .cwr-flower__line__leaf--2 {
          animation: cwr-blooming-leaf-right var(--fl-speed) 2.3s backwards;
        }

        .cwr-flower--3 .cwr-flower__line__leaf--3 {
          animation: cwr-blooming-leaf-left var(--fl-speed) 2.1s backwards;
        }

        .cwr-flower--3 .cwr-flower__line__leaf--4 {
          animation: cwr-blooming-leaf-left var(--fl-speed) 1.9s backwards;
        }

        .cwr-flower__leafs {
          position: relative;
          animation: cwr-blooming-flower 2s backwards;
        }

        .cwr-flower__leafs--1 {
          animation-delay: 1.1s;
        }

        .cwr-flower__leafs--2 {
          animation-delay: 1.4s;
        }

        .cwr-flower__leafs--3 {
          animation-delay: 1.7s;
        }

        .cwr-flower__leafs::after {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          transform: translate(-50%, -100%);
          width: 8vmin;
          height: 8vmin;
          background-color: #6bf0ff;
          filter: blur(10vmin);
        }

        .cwr-flower__leaf {
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 8vmin;
          height: 11vmin;
          border-radius: 51% 49% 47% 53% / 44% 45% 55% 69%;
          background-color: #a7ffee;
          background-image: linear-gradient(to top, #54b8aa, #a7ffee);
          transform-origin: bottom center;
          opacity: 0.9;
          box-shadow: inset 0 0 2vmin rgba(255, 255, 255, 0.5);
        }

        .cwr-flower__leaf--1 {
          transform: translate(-10%, 1%) rotateY(40deg) rotateX(-50deg);
        }

        .cwr-flower__leaf--2 {
          transform: translate(-50%, -4%) rotateX(40deg);
        }

        .cwr-flower__leaf--3 {
          transform: translate(-90%, 0%) rotateY(45deg) rotateX(50deg);
        }

        .cwr-flower__leaf--4 {
          width: 8vmin;
          height: 8vmin;
          transform-origin: bottom left;
          border-radius: 4vmin 10vmin 4vmin 4vmin;
          transform: translate(0%, 18%) rotateX(70deg) rotate(-43deg);
          background-image: linear-gradient(to top, #39c6d6, #a7ffee);
          z-index: 1;
          opacity: 0.8;
        }

        .cwr-flower__white-circle {
          position: absolute;
          left: -3.5vmin;
          top: -3vmin;
          width: 9vmin;
          height: 4vmin;
          border-radius: 50%;
          background-color: #fff;
        }

        .cwr-flower__white-circle::after {
          content: "";
          position: absolute;
          left: 50%;
          top: 45%;
          transform: translate(-50%, -50%);
          width: 60%;
          height: 60%;
          border-radius: inherit;
          background-image: linear-gradient(90deg, #ffeb12, #ffce00);
        }

        .cwr-flower__line {
          height: 55vmin;
          width: 1.5vmin;
          background-image: linear-gradient(to left, rgba(0, 0, 0, 0.2), transparent, rgba(255, 255, 255, 0.2)), linear-gradient(to top, transparent 10%, #14757a, #39c6d6);
          box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.5);
          animation: cwr-grow-flower-tree 4s backwards;
        }

        .cwr-flower__line__leaf {
          --w: 7vmin;
          --h: calc(var(--w) + 2vmin);
          position: absolute;
          top: 20%;
          left: 90%;
          width: var(--w);
          height: var(--h);
          border-top-right-radius: var(--h);
          border-bottom-left-radius: var(--h);
          background-image: linear-gradient(to top, rgba(20, 117, 122, 0.4), #39c6d6);
        }

        .cwr-flower__line__leaf--1 {
          transform: rotate(70deg) rotateY(30deg);
        }

        .cwr-flower__line__leaf--2 {
          top: 45%;
          transform: rotate(70deg) rotateY(30deg);
        }

        .cwr-flower__line__leaf--3,
        .cwr-flower__line__leaf--4,
        .cwr-flower__line__leaf--6 {
          border-top-right-radius: 0;
          border-bottom-left-radius: 0;
          border-top-left-radius: var(--h);
          border-bottom-right-radius: var(--h);
          left: -460%;
          top: 12%;
          transform: rotate(-70deg) rotateY(30deg);
        }

        .cwr-flower__line__leaf--4 {
          top: 40%;
        }

        .cwr-flower__line__leaf--5 {
          top: 0;
          transform-origin: left;
          transform: rotate(70deg) rotateY(30deg) scale(0.6);
        }

        .cwr-flower__line__leaf--6 {
          top: -2%;
          left: -450%;
          transform-origin: right;
          transform: rotate(-70deg) rotateY(30deg) scale(0.6);
        }

        .cwr-flower__light {
          position: absolute;
          bottom: 0vmin;
          width: 1vmin;
          height: 1vmin;
          background-color: #fffb00;
          border-radius: 50%;
          filter: blur(0.2vmin);
          animation: cwr-light-ans 4s linear infinite backwards;
        }

        .cwr-flower__light:nth-child(odd) {
          background-color: #23f0ff;
        }

        .cwr-flower__light--1 { left: -2vmin; animation-delay: 1s; }
        .cwr-flower__light--2 { left: 3vmin; animation-delay: 0.5s; }
        .cwr-flower__light--3 { left: -6vmin; animation-delay: 0.3s; }
        .cwr-flower__light--4 { left: 6vmin; animation-delay: 0.9s; }
        .cwr-flower__light--5 { left: -1vmin; animation-delay: 1.5s; }
        .cwr-flower__light--6 { left: -4vmin; animation-delay: 3s; }
        .cwr-flower__light--7 { left: 3vmin; animation-delay: 2s; }
        .cwr-flower__light--8 { left: -6vmin; animation-delay: 3.5s; }

        .cwr-grow-ans {
          animation: cwr-grow-ans 2s var(--d) backwards;
        }

        @keyframes cwr-grow-ans {
          0% { transform: scale(0); opacity: 0; }
        }

        @keyframes cwr-light-ans {
          0% { opacity: 0; transform: translateY(0vmin); }
          25% { opacity: 1; transform: translateY(-5vmin) translateX(-2vmin); }
          50% { opacity: 1; transform: translateY(-15vmin) translateX(2vmin); filter: blur(0.2vmin); }
          75% { transform: translateY(-20vmin) translateX(-2vmin); filter: blur(0.2vmin); }
          100% { transform: translateY(-30vmin); opacity: 0; filter: blur(1vmin); }
        }

        @keyframes cwr-moving-flower-1 { 0%, 100% { transform: rotate(2deg); } 50% { transform: rotate(-2deg); } }
        @keyframes cwr-moving-flower-2 { 0%, 100% { transform: rotate(18deg); } 50% { transform: rotate(14deg); } }
        @keyframes cwr-moving-flower-3 { 0%, 100% { transform: rotate(-18deg); } 50% { transform: rotate(-20deg) rotateY(-10deg); } }

        @keyframes cwr-blooming-leaf-right { 0% { transform-origin: left; transform: rotate(70deg) rotateY(30deg) scale(0); } }
        @keyframes cwr-blooming-leaf-left { 0% { transform-origin: right; transform: rotate(-70deg) rotateY(30deg) scale(0); } }
        @keyframes cwr-grow-flower-tree { 0% { height: 0; border-radius: 1vmin; } }
        @keyframes cwr-blooming-flower { 0% { transform: scale(0); } }

        .cwr-not-loaded * {
          animation-play-state: paused !important;
        }
      `;
      document.head.appendChild(style);
    }

    // Start animations after a short delay
    const timer = setTimeout(() => {
      if (pageRef.current) {
        pageRef.current.classList.remove('cwr-not-loaded');
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      ref={pageRef}
      className="cwr-not-loaded"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#000',
        overflow: 'hidden',
        perspective: '1000px'
      }}
    >
      <div className="cwr-night"></div>
      
      <div className="cwr-flowers" style={{ minHeight: '100vh', width: '100%', position: 'relative' }}>
        {/* Flower 1 */}
        <div className="cwr-flower cwr-flower--1">
          <div className="cwr-flower__leafs cwr-flower__leafs--1">
            <div className="cwr-flower__leaf cwr-flower__leaf--1"></div>
            <div className="cwr-flower__leaf cwr-flower__leaf--2"></div>
            <div className="cwr-flower__leaf cwr-flower__leaf--3"></div>
            <div className="cwr-flower__leaf cwr-flower__leaf--4"></div>
            <div className="cwr-flower__white-circle"></div>
            <div className="cwr-flower__light cwr-flower__light--1"></div>
            <div className="cwr-flower__light cwr-flower__light--2"></div>
            <div className="cwr-flower__light cwr-flower__light--3"></div>
            <div className="cwr-flower__light cwr-flower__light--4"></div>
            <div className="cwr-flower__light cwr-flower__light--5"></div>
            <div className="cwr-flower__light cwr-flower__light--6"></div>
            <div className="cwr-flower__light cwr-flower__light--7"></div>
            <div className="cwr-flower__light cwr-flower__light--8"></div>
          </div>
          <div className="cwr-flower__line">
            <div className="cwr-flower__line__leaf cwr-flower__line__leaf--1"></div>
            <div className="cwr-flower__line__leaf cwr-flower__line__leaf--2"></div>
            <div className="cwr-flower__line__leaf cwr-flower__line__leaf--3"></div>
            <div className="cwr-flower__line__leaf cwr-flower__line__leaf--4"></div>
            <div className="cwr-flower__line__leaf cwr-flower__line__leaf--5"></div>
            <div className="cwr-flower__line__leaf cwr-flower__line__leaf--6"></div>
          </div>
        </div>

        {/* Flower 2 */}
        <div className="cwr-flower cwr-flower--2">
          <div className="cwr-flower__leafs cwr-flower__leafs--2">
            <div className="cwr-flower__leaf cwr-flower__leaf--1"></div>
            <div className="cwr-flower__leaf cwr-flower__leaf--2"></div>
            <div className="cwr-flower__leaf cwr-flower__leaf--3"></div>
            <div className="cwr-flower__leaf cwr-flower__leaf--4"></div>
            <div className="cwr-flower__white-circle"></div>
            <div className="cwr-flower__light cwr-flower__light--1"></div>
            <div className="cwr-flower__light cwr-flower__light--2"></div>
            <div className="cwr-flower__light cwr-flower__light--3"></div>
            <div className="cwr-flower__light cwr-flower__light--4"></div>
            <div className="cwr-flower__light cwr-flower__light--5"></div>
            <div className="cwr-flower__light cwr-flower__light--6"></div>
            <div className="cwr-flower__light cwr-flower__light--7"></div>
            <div className="cwr-flower__light cwr-flower__light--8"></div>
          </div>
          <div className="cwr-flower__line">
            <div className="cwr-flower__line__leaf cwr-flower__line__leaf--1"></div>
            <div className="cwr-flower__line__leaf cwr-flower__line__leaf--2"></div>
            <div className="cwr-flower__line__leaf cwr-flower__line__leaf--3"></div>
            <div className="cwr-flower__line__leaf cwr-flower__line__leaf--4"></div>
          </div>
        </div>

        {/* Flower 3 */}
        <div className="cwr-flower cwr-flower--3">
          <div className="cwr-flower__leafs cwr-flower__leafs--3">
            <div className="cwr-flower__leaf cwr-flower__leaf--1"></div>
            <div className="cwr-flower__leaf cwr-flower__leaf--2"></div>
            <div className="cwr-flower__leaf cwr-flower__leaf--3"></div>
            <div className="cwr-flower__leaf cwr-flower__leaf--4"></div>
            <div className="cwr-flower__white-circle"></div>
            <div className="cwr-flower__light cwr-flower__light--1"></div>
            <div className="cwr-flower__light cwr-flower__light--2"></div>
            <div className="cwr-flower__light cwr-flower__light--3"></div>
            <div className="cwr-flower__light cwr-flower__light--4"></div>
            <div className="cwr-flower__light cwr-flower__light--5"></div>
            <div className="cwr-flower__light cwr-flower__light--6"></div>
            <div className="cwr-flower__light cwr-flower__light--7"></div>
            <div className="cwr-flower__light cwr-flower__light--8"></div>
          </div>
          <div className="cwr-flower__line">
            <div className="cwr-flower__line__leaf cwr-flower__line__leaf--1"></div>
            <div className="cwr-flower__line__leaf cwr-flower__line__leaf--2"></div>
            <div className="cwr-flower__line__leaf cwr-flower__line__leaf--3"></div>
            <div className="cwr-flower__line__leaf cwr-flower__line__leaf--4"></div>
          </div>
        </div>
      </div>

      {/* Overlay for poem */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          maxHeight: '40vh',
          overflowY: 'auto',
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          padding: '2rem',
          zIndex: 100
        }}
      >
        <button
          className="back-button"
          onClick={() => setCurrentPage(2)}
          style={{
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            padding: '0.5rem 1rem',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            color: '#fff',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          ← Back
        </button>
        
        <h2
          style={{
            color: '#a7ffee',
            textAlign: 'center',
            marginBottom: '1rem',
            marginTop: '2rem',
            fontSize: '1.5rem',
            fontFamily: 'Great Vibes, cursive'
          }}
        >
          I love you my kalon! 💚
        </h2>

        <div className="poem-wrap" style={{ textAlign: 'center' }}>
          {poemStanzas.map((stanza, idx) => (
            <div key={idx} className="poem-stanza" style={{ marginBottom: '1.5rem' }}>
              {stanza.map((line, lineIdx) => (
                <div
                  key={lineIdx}
                  className="poem-line"
                  style={{
                    color: '#fff',
                    fontSize: '0.95rem',
                    lineHeight: '1.6',
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
