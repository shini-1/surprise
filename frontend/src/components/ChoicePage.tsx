interface Props {
  setCurrentPage: (page: number) => void;
  poemStanzas: string[][];
}

export default function ChoicePage({ setCurrentPage }: Props) {
  return (
    <div className="panel-stack">
      <button
        className="back-button"
        onClick={() => setCurrentPage(1)}
      >
        ← Back
      </button>
      <img
        src="/custom_image.png"
        alt="A romantic placeholder image"
        className="hero-image"
      />
      <h2 className="panel-title">I have something for you</h2>
      <div className="button-row">
        <button
          className="love-button"
          onClick={() => setCurrentPage(3)}
        >
          What is it?
        </button>
        <button
          className="love-button"
          onClick={() => setCurrentPage(4)}
        >
          Ayoko
        </button>
      </div>
    </div>
  );
}
