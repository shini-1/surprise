import { useEffect, useRef } from 'react';

interface Props {
  setCurrentPage: (page: number) => void;
  poemStanzas: string[][];
}

export default function RewardPage({ setCurrentPage, poemStanzas }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bouquetInitialized = useRef(false);

  useEffect(() => {
    console.log('RewardPage mounted, poemStanzas:', poemStanzas.length);

    // Ensure bouquet.js is loaded
    const ensureBouquetLoaded = (): Promise<void> => {
      return new Promise((resolve) => {
        if (typeof (window as any).drawBouquet === 'function') {
          console.log('drawBouquet already loaded');
          resolve();
          return;
        }

        console.log('Loading bouquet.js script');
        const script = document.createElement('script');
        script.src = '/bouquet.js';
        script.onload = () => {
          console.log('bouquet.js loaded');
          resolve();
        };
        script.onerror = () => {
          console.error('Failed to load bouquet.js');
          resolve();
        };
        document.head.appendChild(script);
      });
    };

    // Initialize bouquet with better error handling and debugging
    const initBouquet = async () => {
      try {
        await ensureBouquetLoaded();

        // Only initialize once
        if (bouquetInitialized.current) {
          console.log('Bouquet already initialized');
          return;
        }

        const canvas = canvasRef.current;
        if (!canvas) {
          console.log('Canvas not found');
          return;
        }

        // Ensure the script has loaded and canvas has proper dimensions
        const rect = canvas.getBoundingClientRect();
        console.log(
          `Canvas dimensions - width: ${rect.width}, height: ${rect.height}`
        );

        if (rect.width === 0 || rect.height === 0) {
          console.warn('Canvas dimensions are 0, waiting for layout...');
          setTimeout(initBouquet, 200);
          return;
        }

        // Check if drawBouquet function exists
        console.log(
          'window.drawBouquet available?',
          typeof (window as any).drawBouquet
        );

        if (typeof (window as any).drawBouquet === 'function') {
          try {
            console.log('Calling drawBouquet...');
            (window as any).drawBouquet('bouquet-canvas');
            bouquetInitialized.current = true;
            console.log('Bouquet initialized successfully');
          } catch (error) {
            console.error('Error drawing bouquet:', error);
          }
        } else {
          console.warn('drawBouquet function not available');
        }
      } catch (error) {
        console.error('Error in initBouquet:', error);
      }
    };

    // Wait a bit for everything to settle, then initialize
    const timer = setTimeout(initBouquet, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [poemStanzas]);

  return (
    <div className="panel-stack">
      <button className="back-button" onClick={() => setCurrentPage(2)}>
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
