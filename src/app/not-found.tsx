"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { Home, RefreshCw, Trophy } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Constants
const GRID_SIZE = 20;
const INITIAL_SNAKE = [[10, 10]];
const INITIAL_DIRECTION = [0, -1];
const SPEED = 100;

export default function NotFound() {
    const [snake, setSnake] = useState(INITIAL_SNAKE);
    const [direction, setDirection] = useState(INITIAL_DIRECTION);
    const [food, setFood] = useState([15, 10]);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);

    const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

    // Load high score
    useEffect(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("snake_highscore");
            if (saved) setHighScore(parseInt(saved));
        }
    }, []);

    // Save high score
    useEffect(() => {
        if (score > highScore) {
            setHighScore(score);
            localStorage.setItem("snake_highscore", score.toString());
        }
    }, [score, highScore]);

    const generateFood = useCallback(() => {
        const x = Math.floor(Math.random() * GRID_SIZE);
        const y = Math.floor(Math.random() * GRID_SIZE);
        return [x, y];
    }, []);

    const resetGame = () => {
        setSnake(INITIAL_SNAKE);
        setDirection(INITIAL_DIRECTION);
        setFood(generateFood());
        setGameOver(false);
        setScore(0);
        setGameStarted(true);
    };

    const moveSnake = useCallback(() => {
        if (gameOver) return;

        setSnake((prevSnake) => {
            const newHead = [
                prevSnake[0][0] + direction[0],
                prevSnake[0][1] + direction[1],
            ];

            // Check collisions with walls
            if (
                newHead[0] < 0 ||
                newHead[0] >= GRID_SIZE ||
                newHead[1] < 0 ||
                newHead[1] >= GRID_SIZE
            ) {
                setGameOver(true);
                return prevSnake;
            }

            // Check collision with self
            for (const segment of prevSnake) {
                if (newHead[0] === segment[0] && newHead[1] === segment[1]) {
                    setGameOver(true);
                    return prevSnake;
                }
            }

            const newSnake = [newHead, ...prevSnake];

            // Check food
            if (newHead[0] === food[0] && newHead[1] === food[1]) {
                setScore((s) => s + 1);
                setFood(generateFood());
            } else {
                newSnake.pop();
            }

            return newSnake;
        });
    }, [direction, food, gameOver, generateFood]);

    // Game Loop
    useEffect(() => {
        if (gameStarted && !gameOver) {
            gameLoopRef.current = setInterval(moveSnake, SPEED);
        }
        return () => {
            if (gameLoopRef.current) clearInterval(gameLoopRef.current);
        };
    }, [gameStarted, gameOver, moveSnake]);

    // Controls
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Prevent scrolling when using arrows
            if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)) {
                e.preventDefault();
            }

            if (!gameStarted && (e.key.startsWith("Arrow") || e.key === "Enter" || e.key === " ")) {
                setGameStarted(true);
            }

            switch (e.key) {
                case "ArrowUp":
                    if (direction[1] !== 1) setDirection([0, -1]);
                    break;
                case "ArrowDown":
                    if (direction[1] !== -1) setDirection([0, 1]);
                    break;
                case "ArrowLeft":
                    if (direction[0] !== 1) setDirection([-1, 0]);
                    break;
                case "ArrowRight":
                    if (direction[0] !== -1) setDirection([1, 0]);
                    break;
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [direction, gameStarted]);

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full text-center space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 mb-2">
                        404
                    </h1>
                    <p className="text-xl text-neutral-400">Page not found.</p>
                    <p className="text-sm text-neutral-600">But you found a snake! 🐍</p>
                </motion.div>

                {/* Game Board */}
                <div
                    className="aspect-square bg-neutral-900 rounded-xl border border-white/10 relative overflow-hidden shadow-2xl shadow-red-900/10"
                    onClick={() => !gameStarted && setGameStarted(true)}
                >
                    {!gameStarted && !gameOver && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10 backdrop-blur-sm">
                            <p className="text-sm animate-pulse">Press any Arrow Key to Start</p>
                        </div>
                    )}

                    {gameOver && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-20 backdrop-blur-md">
                            <h2 className="text-3xl font-bold text-red-500 mb-2">GAME OVER</h2>
                            <p className="mb-4 text-neutral-300">Score: {score}</p>
                            <Button onClick={resetGame} variant="outline" className="gap-2">
                                <RefreshCw size={16} /> Play Again
                            </Button>
                        </div>
                    )}

                    <div
                        className="grid h-full"
                        style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`, gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)` }}
                    >
                        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
                            const x = i % GRID_SIZE;
                            const y = Math.floor(i / GRID_SIZE);
                            const isSnake = snake.some(s => s[0] === x && s[1] === y);
                            const isFood = food[0] === x && food[1] === y;
                            const isHead = snake[0][0] === x && snake[0][1] === y;

                            return (
                                <div
                                    key={i}
                                    className={`
                                w-full h-full transition-all duration-150
                                ${isHead ? 'bg-cyan-500 rounded-sm z-10' : ''}
                                ${isSnake && !isHead ? 'bg-cyan-500/50' : ''}
                                ${isFood ? 'bg-red-500 rounded-full animate-bounce' : ''}
                            `}
                                />
                            );
                        })}
                    </div>
                </div>

                {/* Stats */}
                <div className="flex justify-between items-center px-4 py-3 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex items-center gap-2">
                        <Trophy size={16} className="text-yellow-500" />
                        <span className="text-sm">High Score: {highScore}</span>
                    </div>
                    <div className="text-2xl font-mono font-bold">{score}</div>
                </div>

                <Link href="/">
                    <Button variant="ghost" className="mt-8 text-neutral-500 hover:text-white gap-2">
                        <Home size={16} /> Return Home
                    </Button>
                </Link>
            </div>
        </div>
    );
}
