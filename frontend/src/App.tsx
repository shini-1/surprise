import { useState, useEffect } from 'react';
import GreetingPage from './components/GreetingPage';
import ChoicePage from './components/ChoicePage';
import RewardPage from './components/RewardPage';
import ReluctancePage from './components/ReluctancePage';
import SurrenderPage from './components/SurrenderPage';
import './App.css';

// Embed poem directly in frontend to avoid API issues
const POEM_TEXT = `Loving you feels like learning more of myself,
doing things i've never thought i'd do so naturally.
Even the quietest corners of my day
learned how to be loud when your voice is heard even if just one line.

I keep your laughter tucked inside my chest,
a little song that brightens every room.
When the world feels too loud and much too fast,
your love makes everything gentle again.

You are the blush of sunrise on my window,
the calm after every restless night.
In every dream I did not know to ask for,
somehow your face was waiting there for me.

So here is my heart in playful little pieces,
wrapped in petals, color, and a grin.
Every small choice I make keeps saying this:
I would still choose you, again and again.

If ever you wonder what you mean to me,
read the hush between each tender line.
It says I love you in five different ways,
and all of them still feels much too small for you.`;

function getPoemStanzas(): string[][] {
  const stanzas = POEM_TEXT.split('\n\n').map(stanza =>
    stanza.split('\n').map(line => line.trim()).filter(line => line)
  );
  return stanzas;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [poemStanzas, setPoemStanzas] = useState<string[][]>([]);

  useEffect(() => {
    // Load poem stanzas from embedded text
    const stanzas = getPoemStanzas();
    setPoemStanzas(stanzas);
  }, []);

  const renderPage = () => {
    const commonProps = { setCurrentPage, poemStanzas };

    switch (currentPage) {
      case 1:
        return <GreetingPage {...commonProps} />;
      case 2:
        return <ChoicePage {...commonProps} />;
      case 3:
        return <RewardPage {...commonProps} />;
      case 4:
        return <ReluctancePage {...commonProps} />;
      case 5:
        return <SurrenderPage {...commonProps} />;
      default:
        return <GreetingPage {...commonProps} />;
    }
  };

  return (
    <div className="app-shell">
      <div className="main-card">
        {renderPage()}
      </div>
    </div>
  );
}
