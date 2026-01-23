'use client';

import { safeFetch } from '@/app/utils/api';
import { ScoreAutoScrollList } from '@/components/ui/score-auto-scroll';
import { Spinner } from '@/components/ui/spinner';
import { useEffect, useState } from 'react';

type Score = {
  id: string;
  player_name: string;
  score: number;
  duration_ms: number;
  user_submitted_at: number;
};

const Scores: React.FC = () => {
  const [scores, setScores] = useState<Score[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchScores = async (): Promise<void> => {
      try {
        const resp = await safeFetch('/api/game/scores', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await resp.json();

        if (isMounted) {
          setScores(data.data);
        }
      } catch {
        if (isMounted) {
          setError('Failed to load scores');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchScores();

    return () => {
      isMounted = false;
    };
  }, []);

  const spinner = () =>{
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Spinner size={40} />
      </div>
    )
  }
  
  if (error) return <div>{error}</div>;

  return (
    loading ? spinner() : 
    <div className="flex flex-col items-center h-screen">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-[72px] font-bold font-bold mb-2 text-center
                       [text-shadow:0_0_5px_rgb(59,130,246),0_0_10px_rgb(59,130,246),0_0_20px_rgb(59,130,246)]">Top 100 Leaderboard</h1>
      </div>
      <ScoreAutoScrollList items={scores || []} speed={1}/>
    </div>
  );
};

export default Scores;
