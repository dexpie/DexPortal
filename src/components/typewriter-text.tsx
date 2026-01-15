"use client";

import { useState, useEffect, useRef } from "react";

interface TypewriterTextProps {
    text?: string;
    texts?: string[];
    delay?: number;
    speed?: number;
    loop?: boolean;
    className?: string;
}

export function TypewriterText({
    text,
    texts,
    delay = 0,
    speed = 50,
    loop = false,
    className = ""
}: TypewriterTextProps) {
    const [displayText, setDisplayText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isWaiting, setIsWaiting] = useState(false);

    const phrases = texts || (text ? [text] : [""]);
    const currentPhrase = phrases[currentIndex];

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        if (delay && displayText === "" && !isDeleting) {
            timeout = setTimeout(() => {
                setDisplayText("");
            }, delay);
        } else if (isWaiting) {
            timeout = setTimeout(() => {
                setIsWaiting(false);
                setIsDeleting(true);
            }, 2000);
        } else if (isDeleting) {
            if (displayText === "") {
                setIsDeleting(false);
                setCurrentIndex((prev) => (prev + 1) % phrases.length);
            } else {
                timeout = setTimeout(() => {
                    setDisplayText(displayText.slice(0, -1));
                }, speed / 2);
            }
        } else {
            if (displayText === currentPhrase) {
                if (loop && phrases.length > 1) {
                    setIsWaiting(true);
                }
            } else {
                timeout = setTimeout(() => {
                    setDisplayText(currentPhrase.slice(0, displayText.length + 1));
                }, speed);
            }
        }

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, isWaiting, currentPhrase, phrases.length, delay, speed, loop]);

    return (
        <span className={className}>
            {displayText}
            <span className="animate-pulse ml-0.5 text-cyan-400">|</span>
        </span>
    );
}
