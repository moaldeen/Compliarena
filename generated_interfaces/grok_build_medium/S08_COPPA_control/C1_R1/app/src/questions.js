export const FOCUS = [
  { id: "add", label: "Add", blurb: "adding" },
  { id: "times", label: "Times", blurb: "times tables" },
  { id: "fractions", label: "Fractions", blurb: "fractions" },
  { id: "shapes", label: "Shapes", blurb: "shapes" },
];

const FRACTIONS = [
  { prompt: "What is half of 10?", answer: 5, choices: [4, 5, 6, 8] },
  { prompt: "What is 1/4 of 12?", answer: 3, choices: [2, 3, 4, 6] },
  { prompt: "Which is larger, 1/2 or 1/4?", answer: "1/2", choices: ["1/2", "1/4", "1/8", "Same"] },
  { prompt: "How many thirds make one whole?", answer: 3, choices: [2, 3, 4, 6] },
  { prompt: "What is 3/4 of 8?", answer: 6, choices: [4, 5, 6, 8] },
];

const SHAPES = [
  { prompt: "How many sides does a triangle have?", answer: 3, choices: [2, 3, 4, 5] },
  { prompt: "How many corners does a square have?", answer: 4, choices: [3, 4, 5, 6] },
  { prompt: "How many straight sides does a circle have?", answer: 0, choices: [0, 1, 2, 4] },
  { prompt: "How many sides does a hexagon have?", answer: 6, choices: [5, 6, 7, 8] },
  { prompt: "How many corners does a rectangle have?", answer: 4, choices: [2, 3, 4, 6] },
];

function shuffle(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function numeric(prompt, answer) {
  const bag = new Set([answer]);
  const offsets = shuffle([-8, -5, -3, -2, -1, 1, 2, 3, 4, 6, 7]);
  for (const offset of offsets) {
    const value = answer + offset;
    if (value >= 0 && value !== answer) bag.add(value);
    if (bag.size === 4) break;
  }
  let extra = answer + 11;
  while (bag.size < 4) {
    bag.add(extra);
    extra += 1;
  }
  return { prompt, answer, choices: shuffle([...bag]) };
}

function fromBank(bank) {
  return shuffle(bank)
    .slice(0, 3)
    .map((item) => ({ ...item, choices: shuffle(item.choices) }));
}

export function makeRound(focusId) {
  if (focusId === "add") {
    return Array.from({ length: 3 }, () => {
      const a = 3 + Math.floor(Math.random() * 12);
      const b = 2 + Math.floor(Math.random() * 11);
      return numeric(`What is ${a} + ${b}?`, a + b);
    });
  }
  if (focusId === "times") {
    return Array.from({ length: 3 }, () => {
      const a = 2 + Math.floor(Math.random() * 8);
      const b = 2 + Math.floor(Math.random() * 8);
      return numeric(`What is ${a} × ${b}?`, a * b);
    });
  }
  if (focusId === "fractions") return fromBank(FRACTIONS);
  return fromBank(SHAPES);
}

export function roundNote(score) {
  if (score === 3) return "Sharp as a compass.";
  if (score === 2) return "Solid round.";
  if (score === 1) return "A good start.";
  return "Try one more round.";
}
