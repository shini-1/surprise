import { useEffect } from 'react';

interface Props {
  setCurrentPage: (page: number) => void;
  poemStanzas: string[][];
}

export default function RewardPage({ setCurrentPage, poemStanzas }: Props) {
  useEffect(() => {
    const canvas = document.getElementById('bouquet-canvas') as HTMLCanvasElement;
    if (canvas && (window as any).drawBouquet) {
      (window as any).drawBouquet('bouquet-canvas');
    }
  }, []);

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
