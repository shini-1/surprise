interface Props {
  setCurrentPage: (page: number) => void;
  poemStanzas: string[][];
}

export default function GreetingPage({ setCurrentPage }: Props) {
  return (
    <div className="panel-stack">
      <button className="back-button" disabled style={{ visibility: 'hidden' }}>
        ← Back
      </button>
      <h1 className="hero-title">Helloo Kal!</h1>
      <div className="button-row">
        <button
          className="love-button"
          onClick={() => setCurrentPage(2)}
        >
          Hello
        </button>
        <button
          className="love-button"
          onClick={() => setCurrentPage(2)}
        >
          Hi
        </button>
      </div>
    </div>
  );
}
