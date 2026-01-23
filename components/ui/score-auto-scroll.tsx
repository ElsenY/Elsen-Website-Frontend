"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";

type Score = {
    id: string;
    player_name: string;
    score: number;
    duration_ms: number;
    user_submitted_at: number;
  };

interface ScoreAutoScrollListProps {
  items: Score[];
  speed?: number; // pixels per frame
  className?: string;
}

export function ScoreAutoScrollList({
  items,
  speed = 1,
  className = "",
}: ScoreAutoScrollListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loopedItems, setLoopedItems] = useState<Score[]>([]);

  // Duplicate items to allow seamless continuous scrolling
  useEffect(() => {
    setLoopedItems([...items, ...items]); // original + copy
  }, [items]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrame: number;


    const step = () => {
      container.scrollTop += speed;

      // Continuous scroll logic
      // If we've scrolled past the first copy, reset scrollTop by first copy height
      if (container.scrollTop >= container.scrollHeight / 2) {
        container.scrollTop -= container.scrollHeight / 2;
      }

      animationFrame = requestAnimationFrame(step);
    };

      animationFrame = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrame);
  }, [speed, loopedItems]);

  return (
    <Card
      className={`h-[65vh] w-[85vw] overflow-hidden border border-purple-500 shadow-[0_0_20px_purple] bg-black ${className}`}
    >
      <CardContent className="h-full overflow-hidden p-2">
        <h2
        className="
            text-white font-mono font-bold text-xl text-center mb-2 
        "
        >
        <div className="grid grid-cols-12">
          <div className="flex flex-item uppercase col-span-1" >
            No.
          </div>
          <div className="flex flex-item uppercase col-span-4" >
            Name
          </div>
          <div className="flex flex-item uppercase col-span-2" >
            Score
          </div>
          <div className="flex flex-item uppercase col-span-2" >
            Duration (s)
          </div>
          <div className="flex flex-item uppercase col-span-3" >
            Achieved at
          </div>
        </div>
        </h2>
        <div ref={containerRef} className="pt-64 h-full overflow-hidden space-y-1">
          {loopedItems.map((item, idx) => (
            <div
              key={idx}
              className="grid grid-cols-12 text-purple-400 font-mono text-xl py-1 px-2 border-b border-purple-700 shadow-[0_0_5px_purple]"
            >
              <div className="flex flex-item uppercase col-span-1" >
                {idx % items.length + 1}.
              </div>
              <div className="flex flex-item uppercase col-span-4" >
                {item.player_name}
              </div>
              <div className="flex flex-item uppercase col-span-2" >
                {item.score}
              </div>
              <div className="flex flex-item uppercase col-span-2" >
                {(item.duration_ms/1000).toFixed(2)}
              </div>
              <div className="flex flex-item uppercase col-span-3" >
                {format(new Date(item.user_submitted_at), "dd-MMM-yyyy")}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}