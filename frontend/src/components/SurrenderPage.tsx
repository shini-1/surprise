interface Props {
  setCurrentPage: (page: number) => void;
  poemStanzas: string[][];
}

export default function SurrenderPage({ setCurrentPage }: Props) {
  return (
    <div className="panel-stack">
      <button
        className="back-button"
        onClick={() => setCurrentPage(4)}
      >
        ← Back
      </button>
      <img
        src="/tampo_nailong.jpeg"
        alt="Pouty Nailong"
        className="hero-image"
      />
      <h2 className="panel-title">Wala ka na talagang choice</h2>
      <div className="button-row">
        <button
          className="love-button"
          onClick={() => setCurrentPage(3)}
        >
          Sige na nga
        </button>
        <button
          className="love-button"
          onClick={() => setCurrentPage(3)}
        >
          Sige na nga
        </button>
      </div>
    </div>
  );
}
