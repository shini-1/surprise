interface Props {
  setCurrentPage: (page: number) => void;
  poemStanzas: string[][];
}

export default function ReluctancePage({ setCurrentPage }: Props) {
  return (
    <div className="panel-stack">
      <button
        className="back-button"
        onClick={() => setCurrentPage(2)}
      >
        ← Back
      </button>
      <img
        src="/sad_nailong.jpeg"
        alt="Sad Nailong"
        className="hero-image"
      />
      <h2 className="panel-title">Ayaw mo talaga? :(((</h2>
      <div className="button-row">
        <button
          className="love-button"
          onClick={() => setCurrentPage(5)}
        >
          Ayoko
        </button>
        <button
          className="love-button"
          onClick={() => setCurrentPage(5)}
        >
          Whtvr
        </button>
      </div>
    </div>
  );
}
