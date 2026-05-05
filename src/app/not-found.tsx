"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Home, RefreshCw, Trophy } from "lucide-react";
import Link from "next/link";
import { useSounds } from "@/components/sound-system";
import { cn } from "@/lib/utils";

type Point = [number, number];
type Direction = [number, number];

const GRID_SIZE = 20;
const INITIAL_SNAKE: Point[] = [[10, 11], [10, 12], [10, 13]];
const INITIAL_DIRECTION: Direction = [0, -1];
const INITIAL_FOOD: Point = [14, 9];
const SPEED = 110;

const directionControls: Array<{ label: string; icon: typeof ArrowUp; value: Direction; className: string }> = [
  { label: "Move up", icon: ArrowUp, value: [0, -1], className: "col-start-2" },
  { label: "Move left", icon: ArrowLeft, value: [-1, 0], className: "col-start-1 row-start-2" },
  { label: "Move down", icon: ArrowDown, value: [0, 1], className: "col-start-2 row-start-2" },
  { label: "Move right", icon: ArrowRight, value: [1, 0], className: "col-start-3 row-start-2" },
];

function pointsMatch(a: Point, b: Point) {
  return a[0] === b[0] && a[1] === b[1];
}

function createFood(occupied: Point[]): Point {
  let nextFood: Point = INITIAL_FOOD;

  for (let attempt = 0; attempt < 120; attempt += 1) {
    nextFood = [
      Math.floor(Math.random() * GRID_SIZE),
      Math.floor(Math.random() * GRID_SIZE),
    ];

    if (!occupied.some((point) => pointsMatch(point, nextFood))) {
      return nextFood;
    }
  }

  return nextFood;
}

export default function NotFound() {
  const [snake, setSnake] = useState<Point[]>(INITIAL_SNAKE);
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [food, setFood] = useState<Point>(INITIAL_FOOD);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    if (typeof window === "undefined") return 0;

    const saved = window.localStorage.getItem("snake_highscore");
    return saved ? parseInt(saved, 10) : 0;
  });
  const [gameStarted, setGameStarted] = useState(false);

  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);
  const { playSuccess, playError } = useSounds();

  const changeDirection = useCallback((nextDirection: Direction) => {
    setGameStarted(true);
    setDirection((currentDirection) => {
      const isReverse =
        currentDirection[0] + nextDirection[0] === 0 &&
        currentDirection[1] + nextDirection[1] === 0;

      return isReverse ? currentDirection : nextDirection;
    });
  }, []);

  const resetGame = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(createFood(INITIAL_SNAKE));
    setGameOver(false);
    setScore(0);
    setGameStarted(true);
  }, []);

  const moveSnake = useCallback(() => {
    if (gameOver) return;

    setSnake((previousSnake) => {
      const head = previousSnake[0];
      const newHead: Point = [head[0] + direction[0], head[1] + direction[1]];
      const hitWall =
        newHead[0] < 0 ||
        newHead[0] >= GRID_SIZE ||
        newHead[1] < 0 ||
        newHead[1] >= GRID_SIZE;

      if (hitWall) {
        playError();
        setGameOver(true);
        return previousSnake;
      }

      const willEat = pointsMatch(newHead, food);
      const bodyToCheck = willEat ? previousSnake : previousSnake.slice(0, -1);
      const hitBody = bodyToCheck.some((segment) => pointsMatch(segment, newHead));

      if (hitBody) {
        playError();
        setGameOver(true);
        return previousSnake;
      }

      const nextSnake = [newHead, ...previousSnake];

      if (willEat) {
        playSuccess();
        const nextScore = score + 1;

        setScore(nextScore);
        if (nextScore > highScore) {
          setHighScore(nextScore);
          localStorage.setItem("snake_highscore", nextScore.toString());
        }

        setFood(createFood(nextSnake));
        return nextSnake;
      }

      nextSnake.pop();
      return nextSnake;
    });
  }, [direction, food, gameOver, highScore, playError, playSuccess, score]);

  useEffect(() => {
    if (gameStarted && !gameOver) {
      gameLoopRef.current = setInterval(moveSnake, SPEED);
    }

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [gameStarted, gameOver, moveSnake]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(event.key)) {
        event.preventDefault();
      }

      if (event.key === "Enter" || event.key === " ") {
        setGameStarted(true);
      }

      if (event.key === "ArrowUp") changeDirection([0, -1]);
      if (event.key === "ArrowDown") changeDirection([0, 1]);
      if (event.key === "ArrowLeft") changeDirection([-1, 0]);
      if (event.key === "ArrowRight") changeDirection([1, 0]);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [changeDirection]);

  return (
    <main className="soft-grid relative min-h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
      <div className="grain-overlay pointer-events-none absolute inset-0" />
      <div className="relative mx-auto grid min-h-screen w-full max-w-6xl items-center gap-8 px-6 py-20 lg:grid-cols-[minmax(0,0.78fr)_minmax(360px,0.62fr)]">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="space-y-7"
        >
          <div className="inline-flex rounded-full border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-sm font-bold text-[var(--muted-foreground)] shadow-sm">
            Route missing. Game unlocked.
          </div>

          <div>
            <h1 className="display-tight font-heading text-[clamp(6rem,18vw,13rem)] font-black text-[var(--foreground)]">
              404
            </h1>
            <p className="max-w-xl text-2xl font-bold leading-tight text-[var(--foreground)] md:text-4xl">
              The page slipped out of bounds.
            </p>
            <p className="mt-4 max-w-lg text-base leading-7 text-[var(--muted-foreground)] md:text-lg">
              Guide the neon trail, collect the signal, and avoid folding the route back into itself.
            </p>
          </div>

          <div className="grid max-w-lg grid-cols-2 gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">Score</p>
              <p className="mt-2 font-heading text-3xl font-black">{score}</p>
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">Best</p>
              <p className="mt-2 flex items-center gap-2 font-heading text-3xl font-black">
                <Trophy size={22} className="text-[var(--accent)]" />
                {highScore}
              </p>
            </div>
            <Link
              href="/"
              className="col-span-2 inline-flex items-center justify-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--foreground)] px-5 py-4 text-sm font-bold text-[var(--background)] transition-transform hover:-translate-y-0.5 sm:col-span-1"
            >
              <Home size={17} />
              Home
            </Link>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.05 }}
          className="rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-4 shadow-2xl shadow-black/10 md:p-5"
        >
          <div
            className="relative aspect-square overflow-hidden rounded-[1.4rem] border border-[var(--border)] bg-[var(--background)] shadow-inner"
            onClick={() => !gameStarted && setGameStarted(true)}
          >
            <div className="absolute inset-0 opacity-70 [background-image:linear-gradient(to_right,color-mix(in_srgb,var(--border)_55%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_srgb,var(--border)_55%,transparent)_1px,transparent_1px)] [background-size:5%_5%]" />

            {!gameStarted && !gameOver && (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-[var(--background)]/72 p-6 text-center backdrop-blur-md">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.28em] text-[var(--primary)]">Snake arena</p>
                  <p className="mt-3 text-2xl font-black">Press an arrow key</p>
                  <p className="mt-2 text-sm text-[var(--muted-foreground)]">or tap the controls below.</p>
                </div>
              </div>
            )}

            {gameOver && (
              <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[var(--background)]/82 p-6 text-center backdrop-blur-md">
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-[var(--secondary)]">Game over</p>
                <h2 className="mt-3 font-heading text-4xl font-black">Score {score}</h2>
                <button
                  onClick={resetGame}
                  className="mt-6 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--foreground)] px-5 py-3 text-sm font-bold text-[var(--background)] transition-transform hover:-translate-y-0.5"
                >
                  <RefreshCw size={16} />
                  Play again
                </button>
              </div>
            )}

            <div
              className="relative z-10 grid h-full p-2"
              style={{
                gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
                gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
              }}
            >
              {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
                const x = index % GRID_SIZE;
                const y = Math.floor(index / GRID_SIZE);
                const currentPoint: Point = [x, y];
                const snakeIndex = snake.findIndex((segment) => pointsMatch(segment, currentPoint));
                const isSnake = snakeIndex >= 0;
                const isHead = snakeIndex === 0;
                const isFood = pointsMatch(food, currentPoint);

                return (
                  <div key={index} className="relative flex items-center justify-center">
                    {isSnake && (
                      <span
                        className={cn(
                          "absolute inset-[10%] rounded-[0.35rem] shadow-[0_0_18px_rgba(64,185,173,0.32)]",
                          isHead
                            ? "bg-[var(--foreground)]"
                            : "bg-[var(--primary)]"
                        )}
                        style={{ opacity: isHead ? 1 : Math.max(0.34, 1 - snakeIndex * 0.045) }}
                      />
                    )}
                    {isFood && (
                      <span className="absolute inset-[18%] rounded-full bg-[var(--secondary)] shadow-[0_0_24px_rgba(255,122,89,0.65)]" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-5 grid grid-cols-[1fr_auto] items-center gap-4">
            <div>
              <p className="text-sm font-bold text-[var(--foreground)]">Arrow keys to move</p>
              <p className="text-xs text-[var(--muted-foreground)]">Eat the coral dot. Walls still bite.</p>
            </div>

            <div className="grid grid-cols-3 gap-1.5">
              {directionControls.map(({ label, icon: Icon, value, className }) => (
                <button
                  key={label}
                  aria-label={label}
                  onClick={() => changeDirection(value)}
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] transition-colors hover:border-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)]",
                    className
                  )}
                >
                  <Icon size={17} />
                </button>
              ))}
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
