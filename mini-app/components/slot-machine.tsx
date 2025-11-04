'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Share } from '@/components/share';

const fruits = ['apple', 'banana', 'cherry'];
const fruitImages: Record<string, string> = {
  apple: '/apple.png',
  banana: '/banana.png',
  cherry: '/cherry.png',
};

export default function SlotMachine() {
  const [result, setResult] = useState<string[]>([]);
  const [rolling, setRolling] = useState(false);

  const roll = () => {
    setRolling(true);
    let count = 0;
    const interval = setInterval(() => {
      setResult(
        fruits.map(() => fruits[Math.floor(Math.random() * fruits.length)])
      );
      count++;
      if (count >= 20) {
        clearInterval(interval);
        setRolling(false);
      }
    }, 100);
  };

  useEffect(() => {
    roll();
  }, []);

  const shareText = result.length
    ? `I just rolled ${result.join(', ')} in the mini app!`
    : 'Rolling...';

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2">
        {result.map((fruit, idx) => (
          <img
            key={idx}
            src={fruitImages[fruit]}
            alt={fruit}
            className="size-20 rounded-full"
          />
        ))}
      </div>
      <div className="flex gap-2">
        <Button onClick={roll} disabled={rolling}>
          {rolling ? 'Rolling...' : 'Reroll'}
        </Button>
        <Share text={shareText} />
      </div>
    </div>
  );
}
