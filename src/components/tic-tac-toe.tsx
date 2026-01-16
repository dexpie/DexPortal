"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trophy, RefreshCw, Cpu, User } from "lucide-react";

type Player = "X" | "O";
type Cell = Player | null;

export function TicTacToe() {
    const [isVisible, setIsVisible] = useState(false);
    const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const [winner, setWinner] = useState<Cell | "Draw">(null);
    const [score, setScore] = useState({ player: 0, cpu: 0 });

    useEffect(() => {
        const handleOpen = () => setIsVisible(true);
        window.addEventListener("open-tictactoe", handleOpen);
        return () => window.removeEventListener("open-tictactoe", handleOpen);
    }, []);

    const checkWinner = (squares: Cell[]) => {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        if (!squares.includes(null)) return "Draw";
        return null;
    };

    const handleClick = (i: number) => {
        if (board[i] || winner || !isXNext) return; // Prevent collecting while CPU thinks

        const newBoard = [...board];
        newBoard[i] = "X";
        setBoard(newBoard);
        setIsXNext(false);

        const w = checkWinner(newBoard);
        if (w) setWinner(w);
    };

    // CPU Logic (Medium Difficulty)
    useEffect(() => {
        if (!isXNext && !winner) {
            const timer = setTimeout(() => {
                const emptyIndices = board.map((c, i) => c === null ? i : null).filter(c => c !== null) as number[];
                if (emptyIndices.length > 0) {
                    // Try to win or block? For now random + slight logic
                    // Random move
                    const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
                    const newBoard = [...board];
                    newBoard[randomIndex] = "O";
                    setBoard(newBoard);
                    setIsXNext(true);

                    const w = checkWinner(newBoard);
                    if (w) setWinner(w);
                }
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [isXNext, board, winner]);

    useEffect(() => {
        if (winner === "X") setScore(s => ({ ...s, player: s.player + 1 }));
        if (winner === "O") setScore(s => ({ ...s, cpu: s.cpu + 1 }));
    }, [winner]);

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setWinner(null);
        setIsXNext(true);
    };

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                onClick={() => setIsVisible(false)}
            >
                <motion.div
                    className="bg-neutral-900 border border-white/10 p-6 rounded-2xl w-full max-w-sm shadow-2xl relative"
                    onClick={e => e.stopPropagation()}
                >
                    <button
                        onClick={() => setIsVisible(false)}
                        className="absolute top-4 right-4 text-neutral-500 hover:text-white"
                    >
                        <X size={20} />
                    </button>

                    <h2 className="text-center text-xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                        Tic-Tac-Toe vs DexBot
                    </h2>

                    {/* Stats */}
                    <div className="flex justify-between px-4 mb-6">
                        <div className="text-center">
                            <div className="flex items-center gap-1 text-cyan-400 text-sm">
                                <User size={14} /> You
                            </div>
                            <div className="text-2xl font-bold">{score.player}</div>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center gap-1 text-purple-400 text-sm">
                                <Cpu size={14} /> DexBot
                            </div>
                            <div className="text-2xl font-bold">{score.cpu}</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mb-6">
                        {board.map((cell, i) => (
                            <button
                                key={i}
                                onClick={() => handleClick(i)}
                                disabled={!!cell || !!winner || !isXNext}
                                className={`
                                    h-20 rounded-lg text-4xl font-black transition-all
                                    ${cell === "X" ? "bg-cyan-500/20 text-cyan-400" : ""}
                                    ${cell === "O" ? "bg-purple-500/20 text-purple-400" : ""}
                                    ${!cell && !winner ? "bg-white/5 hover:bg-white/10" : "bg-white/5"}
                                `}
                            >
                                {cell}
                            </button>
                        ))}
                    </div>

                    <AnimatePresence>
                        {winner && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center"
                            >
                                <div className="text-xl font-bold mb-4">
                                    {winner === "Draw" ? "It's a Draw!" : `${winner === "X" ? "You Won!" : "DexBot Won!"}`}
                                </div>
                                <button
                                    onClick={resetGame}
                                    className="flex items-center gap-2 px-6 py-2 bg-white rounded-full text-black font-medium mx-auto hover:bg-neutral-200 transition-colors"
                                >
                                    <RefreshCw size={16} /> Play Again
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
