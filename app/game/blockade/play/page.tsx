'use client';

import React, { useEffect, useRef, useState, FormEvent, useCallback} from 'react';
import { useUIStore } from '@/store/useUIStore';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { GAME_SESSION_TOKEN } from '@/lib/constant';
import { safeFetch } from '@/app/utils/api';
import { Spinner } from '@/components/ui/spinner';
import { toast } from 'sonner';
import { ConfirmDialog } from '@/components/game/confirm-dialog';

interface BallObjs {
  [key: string]: { x: number; y: number; direction: number };
}

const CanvasRectangle: React.FC = () => {
  const setShowNavBar = useUIStore((state) => state.setShowNavBar);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cBgRef = useRef<HTMLCanvasElement | null>(null);
  const positionRef = useRef({ x: 0, y: 0 }); // Store mouse position
  const requestIdRef = useRef<number | null>(null); // Store requestAnimationFrame ID
  const multiplier = useRef(1);

  const ballRefs = useRef<BallObjs | null>({});
  const requestIdBallRefs = useRef<{ [key: string]: number }>({});
  const intervalRef = useRef<NodeJS.Timeout>();
  const pingIntervalRef = useRef<NodeJS.Timeout>();

  const [userSubmitted,setUserSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [life, setLife] = useState(10);
  const [playerName, setPlayerName] = useState('');
  const [winHeight, setWinHeight] = useState(1080);
  const [isClient, setIsClient] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const rightBallBuffer = 50;
  const leftBallBuffer = 20;
  const topBallBuffer = 10;
  const bottomBallBuffer = 170;

  let wH = 0;
  let wW = 0;

  const draw = (context: CanvasRenderingContext2D) => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clear canvas
    // context.fillStyle = 'blue'; // Set rectangle color
    // context.fillRect(positionRef.current.x, positionRef.current.y, 50, 200); // Draw rectangle

    const x = positionRef.current.x;
    const y = positionRef.current.y;
    const width = 30;
    const height = 150;
    const radius = { tl: 10, tr: 10, br: 10, bl: 10 };

    const gradient = context.createLinearGradient(0, 0, 200, 0);
    gradient.addColorStop(0, '#3B82F6'); // bright blue
    gradient.addColorStop(0.5, '#60A5FA'); // lighter blue
    gradient.addColorStop(1, '#2563EB'); // deep blue

    context.beginPath();
    context.moveTo(x + radius.tl, y);
    context.lineTo(x + width - radius.tr, y);
    context.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    context.lineTo(x + width, y + height - radius.br);
    context.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
    context.lineTo(x + radius.bl, y + height);
    context.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    context.lineTo(x, y + radius.tl);
    context.quadraticCurveTo(x, y, x + radius.tl, y);
    context.closePath();
    context.fillStyle = gradient;
    context.fill();
  };

  const drawBall = (context: CanvasRenderingContext2D, uuid: string) => {
    context.beginPath();
    if (ballRefs.current) {
      context.fillStyle = 'white';
      context.arc(ballRefs.current[uuid].x, ballRefs.current[uuid].y, 5, 0, 2 * Math.PI);
      context.fill();
    }
    context.stroke();
  };

  const animate = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (context) {
      draw(context); // Draw the rectangle at the current mouse position
    }

    requestIdRef.current = requestAnimationFrame(animate); // Schedule the next frame
  };

  const animateBall = (uuid: string) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (ballRefs.current) {
      if (ballRefs.current[uuid]) {
        const randY = Math.floor(Math.random() * 20) + 1;
        const randX = Math.floor(Math.random() * 10) + 1;

        ballRefs.current[uuid].x -= randX;

        if (ballRefs.current[uuid].direction == 1) {
          ballRefs.current[uuid].y += randY;
        } else if (ballRefs.current[uuid].direction == 2) {
          ballRefs.current[uuid].y -= randY;
        }

        if (ballRefs.current[uuid].y <= 0) {
          ballRefs.current[uuid].direction = 1;
        } else if (ballRefs.current[uuid].y >= window.innerHeight) {
          ballRefs.current[uuid].direction = 2;
        }

        if (ballRefs.current[uuid].x < 0) {
          setLife((life) => life - 1);
          cancelAnimationFrame(requestIdBallRefs.current[uuid]);
          delete ballRefs.current[uuid];
          return;
        }

        const ballX = ballRefs.current[uuid].x;
        const ballY = ballRefs.current[uuid].y;
        const posX = positionRef.current.x;
        const posY = positionRef.current.y;

        // if the ball touch rectangle, increment score
        if (
          ballX > posX - leftBallBuffer &&
          ballX < posX + rightBallBuffer &&
          ballY > posY - topBallBuffer &&
          ballY < posY + bottomBallBuffer
        ) {
          cancelAnimationFrame(requestIdBallRefs.current[uuid]);
          setScore((score) => score + 1);
          return;
        }
      } else {
        const randomValue = Math.floor(Math.random() * 2) + 1;
        ballRefs.current[uuid] = {
          direction: randomValue,
          x: window.innerWidth - 20,
          y: Math.floor(Math.random() * window.innerHeight),
        };
      }
    }

    if (context) {
      drawBall(context, uuid); // Draw the rectangle at the current mouse position
    }

    requestIdBallRefs.current[uuid] = requestAnimationFrame(() => animateBall(uuid));
  };

  const spawnBalls = () => {
    for (let i = 0; i < multiplier.current; i++) {
      const uuid = uuidv4();
      requestAnimationFrame(() => animateBall(uuid));
    }
    multiplier.current += 0.1;
  };

  const cleanUpGame = () => {
    canvasRef?.current?.getContext('2d')?.clearRect(0, 0, 0, 0); // Clear canvas

    if (requestIdRef.current) {
      cancelAnimationFrame(requestIdRef.current);
    }

    for (const key in requestIdBallRefs.current) {
      cancelAnimationFrame(requestIdBallRefs.current[key]);
    }
    ballRefs.current = {};
    clearInterval(intervalRef.current);
    clearInterval(pingIntervalRef.current);
  };

  // Resize the canvas when the window is resized
  const handleMouseMove = (event: MouseEvent) => {
    const rect = canvasRef?.current?.getBoundingClientRect();
    if (rect) {
      positionRef.current.x = event.clientX - 20; // Center the rectangle
      positionRef.current.y = event.clientY - 50; // Center the rectangle
    }
  };

  const initGameSession = async () => {
    let isOffline = false;
    await safeFetch('/api/game/start-game', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include"
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem(GAME_SESSION_TOKEN, data.token);
        isOffline = false;
      })
      .catch(() => {
        isOffline = true;
        toast.warning('Could not connect to server, playing in offline mode...');
        setIsOffline(true);
      });
    
      if(!isOffline) {
        pingIntervalRef.current = setInterval(() => {
          safeFetch('/api/game/ping-session', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              token: localStorage.getItem(GAME_SESSION_TOKEN),
            }),
            credentials: "include"
          });
        }, 5000);
      }
  };

  // init state
  useEffect(() => {
    setIsClient(true);
    setShowNavBar(false);

    initGameSession();

    window.addEventListener('resize', () => {
      const canvas = canvasRef.current;

      const cBg = cBgRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.addEventListener('mousemove', handleMouseMove);
      }

      if (cBg) {
        cBg.width = window.innerWidth;
        cBg.height = window.innerHeight;
        const c2d = cBg.getContext('2d');

        if (c2d) {
          console.log('refilling');

          c2d.fillStyle = 'black';
          c2d.fillRect(0, 0, window.innerWidth, window.innerHeight);
        }
      }
      setWinHeight(window.innerHeight);
    });

    return () => {
      setShowNavBar(true);
    };
  }, []);

  // Clean up the game when the life is 0
  useEffect(() => {
    if (life <= 0) {
      safeFetch('/api/game/scores', {
        method: 'POST', // HTTP method
        headers: {
          'Content-Type': 'application/json', // Specify the type of content
        },
        body: JSON.stringify({
          score: score,
          token: localStorage.getItem(GAME_SESSION_TOKEN),
        }),
        credentials: "include"
      });
      cleanUpGame();

      setShowNavBar(true);
    }
  }, [life]);

  // canvas draw
  useEffect(() => {
    wH = window.innerHeight;
    wW = window.innerWidth;

    const canvasBg = cBgRef.current;

    if (canvasBg) {
      canvasBg.width = wW;
      canvasBg.height = wH;

      const c2d = canvasBg.getContext('2d');

      if (c2d) {
        c2d.fillStyle = 'black';
        c2d.fillRect(0, 0, wW, wH);
      }
    }

    const canvas = canvasRef.current;

    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      canvas.addEventListener('mousemove', handleMouseMove);
      requestIdRef.current = requestAnimationFrame(animate); // Start the animation
      intervalRef.current = setInterval(spawnBalls, 500);
      return () => {
        cleanUpGame();
        canvas.removeEventListener('mousemove', handleMouseMove);
        if (requestIdRef.current) {
          cancelAnimationFrame(requestIdRef.current); // Stop the animation
        }
      };
    }
  }, [isClient]);

  const submitScore = async (e: FormEvent) => {
    e.preventDefault();

    if(isOffline) {
      toast.error('Cannot submit score in offline mode');
      return;
    }
    
    const response = await safeFetch('/api/game/update-user-submitted-at', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: localStorage.getItem(GAME_SESSION_TOKEN),
        player_name: playerName,
      }),
      credentials: "include"
    });

    if (response.ok) {
      toast.success('Score submitted successfully');
    } else {
      try {
        const data = await response.json();
        toast.error(data.message);
      } catch {
        toast.error('Failed to submit score');
      }
    }

    setUserSubmitted(true);
  };

  const reloadPage = () => {
    window.location.reload();
  };


  const GameOver = useCallback(({playerName, score, reloadPage, submitScore, userSubmitted}: {playerName: string, score: number, reloadPage: () => void, submitScore: (e: FormEvent) => void, userSubmitted: boolean}) => {
    return <div className="flex items-center justify-center h-screen">
    <div className="flex-col items-center justify-center pb-36">
      <h1 className="text-red-500 font-bold text-center">Game over, your score is : {score}</h1>
      {isOffline? <div className="flex gap-2 flex-col items-center justify-center">
        <h2 className="text-yellow-500">Playing in offline mode, cannot submit score...</h2>
        <h2 className="text-yellow-500">Press retry to try again</h2>
        <div className="flex flex-row gap-2">
          <Button onClick={reloadPage}>Retry?</Button>
          <Link href={'/game/blockade/scores'}>
            <Button>Leaderboard</Button>
          </Link>
        </div>
        </div>:
      <form onSubmit={submitScore}>
        <h2 className="text-initial">Want to record your score?</h2>
        <div className="flex flex-col gap-2">
          <Input
            id=""
            value={playerName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPlayerName(e.target.value)}
            required
          />
          <Button type="submit" disabled={userSubmitted}>Submit Score</Button>
        </div>
        <div className="pt-4">
          <div className="flex gap-2 justify-between">
            {userSubmitted? <>
              <Button className="w-full" onClick={reloadPage}>Retry?</Button>
              <Link href={'/game/blockade/scores'}>
                <Button className="w-full">Leaderboard</Button>
              </Link>
            </>:<>
              <ConfirmDialog 
                title="Score has not been saved" 
                description="are you sure want to retry without submitting your score?" 
                onConfirm={reloadPage} 
                onCancel={() => {}}
                trigger={<Button className="w-full">Retry?</Button>}
              />
              <ConfirmDialog 
                title="Score has not been saved" 
                description="are you sure want to go to the leaderboard without submitting your score?" 
                onConfirm={() => {window.location.href = '/game/blockade/scores';}} 
                onCancel={() => {}}
                trigger={<Button className="w-full">Leaderboard</Button>}
              />
            </>
            }
          </div>
        </div>
      </form>
  }
    </div>
  </div>
  }, [isOffline]);

  return (
    <>
      {!isClient ? (
        <div className="flex items-center justify-center h-screen">
          <Spinner size={40} />
        </div>
      ) : (
        <>
          {life <= 0 ? <GameOver playerName={playerName} score={score} reloadPage={reloadPage} submitScore={submitScore} userSubmitted={userSubmitted} />
            : winHeight < 500 ? (
            <div className="text-red-500">
              <h1>Please Enable Full Screen!</h1>
            </div>
          ) : (
            <div className="select-none text-white">
              <h1 className="absolute z-100">{score}</h1>
              <h1 className="absolute right-0 z-100">Life : {life}</h1>
              <canvas ref={canvasRef} style={{ position: 'absolute', zIndex: 110 }} />
              <canvas ref={cBgRef} />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default CanvasRectangle;
