import React, { useState } from 'react';

const questions = [
  { a: 2, b: 3, choices: [4, 5, 6] },
  { a: 4, b: 2, choices: [5, 6, 7] },
  { a: 3, b: 4, choices: [6, 7, 8] },
];

function Sparkle({ className = '' }) {
  return <span className={`sparkle ${className}`} aria-hidden="true">✦</span>;
}

function Mascot({ small = false }) {
  return (
    <div className={`mascot ${small ? 'mascot-small' : ''}`} role="img" aria-label="A smiling yellow star holding a pencil">
      <div className="mascot-shadow" />
      <div className="pencil"><span className="pencil-tip" /><span className="pencil-line" /></div>
      <div className="star-body">
        <span className="eye eye-left" /><span className="eye eye-right" />
        <span className="cheek cheek-left" /><span className="cheek cheek-right" />
        <span className="smile" />
      </div>
      <span className="mascot-arm arm-left" /><span className="mascot-arm arm-right" />
      <span className="mascot-foot foot-left" /><span className="mascot-foot foot-right" />
    </div>
  );
}

export default function App() {
  const [started, setStarted] = useState(false);
  const [round, setRound] = useState(0);
  const [answer, setAnswer] = useState(null);
  const question = questions[round % questions.length];
  const correct = answer === question.a + question.b;

  function nextQuestion() {
    setRound((value) => value + 1);
    setAnswer(null);
  }

  function goHome() {
    setStarted(false);
    setRound(0);
    setAnswer(null);
  }

  return (
    <main className="stage">
      <div className="device" aria-label="Mobile app preview">
        <div className="screen">
          <div className="status-bar" aria-hidden="true"><span>9:41</span><span className="status-icons">● ● ▰</span></div>
          {!started ? (
            <div className="landing">
              <header className="brand-row"><span className="brand-mark">✳</span><span>SUMSHINE</span></header>
              <div className="hero-art" aria-hidden="true">
                <span className="orbit orbit-one" /><span className="orbit orbit-two" />
                <span className="math-tile tile-plus">+</span><span className="math-tile tile-seven">7</span>
                <Sparkle className="sparkle-one" /><Sparkle className="sparkle-two" />
                <Mascot />
                <span className="ground-swoosh" />
              </div>
              <div className="landing-copy">
                <span className="eyebrow"><span className="eyebrow-dot" /> LITTLE NUMBERS, BIG ADVENTURES</span>
                <h1>Math is more<br /><em>fun together!</em></h1>
                <p>Count, play, and grow your brain one happy puzzle at a time.</p>
              </div>
              <div className="landing-action">
                <button className="primary-button" type="button" onClick={() => setStarted(true)}>Get Started <span aria-hidden="true">→</span></button>
                <span className="action-note">A world of wonder is waiting ✦</span>
              </div>
            </div>
          ) : (
            <div className="game">
              <div className="game-top"><button className="back-button" type="button" onClick={goHome} aria-label="Back to welcome screen">←</button><span>SUMSHINE</span><span className="round-pill">{round + 1} / ∞</span></div>
              <div className="game-intro"><span className="game-kicker">LET'S PLAY!</span><h1>Number quest</h1><p>Tap the answer to solve the puzzle.</p></div>
              <div className="game-card"><div className="game-mascot"><Mascot small /></div><div className="question-label">WHAT IS...</div><div className="equation">{question.a} <span>+</span> {question.b} <span>=</span> ?</div></div>
              <div className="answer-area"><span className="answer-label">CHOOSE AN ANSWER</span><div className="answers">{question.choices.map((choice) => <button className={`answer-button ${answer === choice ? (correct ? 'is-correct' : 'is-wrong') : ''}`} key={choice} type="button" onClick={() => setAnswer(choice)} disabled={answer !== null}>{choice}</button>)}</div></div>
              <div className="game-feedback" aria-live="polite">{answer === null ? 'You can do it! ✨' : correct ? 'Amazing work! ⭐' : `Good try! The answer is ${question.a + question.b}.`}</div>
              <button className="primary-button game-next" type="button" onClick={nextQuestion} disabled={answer === null}>Next Puzzle <span aria-hidden="true">→</span></button>
            </div>
          )}
          <div className="home-indicator" aria-hidden="true" />
        </div>
      </div>
    </main>
  );
}
