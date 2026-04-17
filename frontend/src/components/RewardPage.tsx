import { useEffect, useRef } from 'react';

interface Props {
  setCurrentPage: (page: number) => void;
  poemStanzas: string[][];
}

export default function RewardPage({ setCurrentPage, poemStanzas }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bouquetInitialized = useRef(false);

  useEffect(() => {
    // Initialize bouquet when this component mounts and poem data is available
    const initBouquet = () => {
      // Only initialize once
      if (bouquetInitialized.current) return;

      const canvas = canvasRef.current;
      if (!canvas) return;

      // Ensure the script has loaded and canvas has proper dimensions
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) {
        // Retry after a short delay if dimensions aren't ready
        setTimeout(initBouquet, 50);
        return;
      }

      // Check if drawBouquet function exists
      if (typeof (window as any).drawBouquet === 'function') {
        (window as any).drawBouquet('bouquet-canvas');
        bouquetInitialized.current = true;
      }
    };

    // Wait a bit for everything to settle, then initialize
    const timer = setTimeout(initBouquet, 150);

    return () => clearTimeout(timer);
  }, [poemStanzas, canvasRef]);

  return (
    <div className="panel-stack">
      <button
        className="back-button"
        onClick={() => setCurrentPage(2)}
      >
        ← Back
      </button>
      <h2 className="panel-title">I love you my kalon!</h2>
      <div className="bouquet-container">
        <canvas
          ref={canvasRef}
          id="bouquet-canvas"
          width="440"
          height="320"
          className="bouquet-canvas"
          aria-label="Illustrated bouquet of flowers"
        />
      </div>
      <div className="poem-wrap">
        {poemStanzas.map((stanza, idx) => (
          <div key={idx} className="poem-stanza">
            {stanza.map((line, lineIdx) => (
              <div key={lineIdx} className="poem-line">
                {line}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
