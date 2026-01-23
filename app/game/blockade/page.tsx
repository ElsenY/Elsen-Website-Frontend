import Link from 'next/link';

const Page = () => {
  return (
    <div className="px-40 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 max-w-[960px] flex-1">
        <p className="text-red-500 tracking-light text-[48px] font-bold leading-tight min-w-72">Blockade</p>
        <div className="flex flex-wrap justify-between gap-3 pl-4 pt-2 pb-2">
          <p className="text-white tracking-light text-[24px] font-bold leading-tight min-w-72">How to Play</p>
        </div>
        <div className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
          <p>
            Welcome to Blockade! In this game, your objective is to block incoming balls using a rectangle controlled by
            your mouse cursor.
          </p>
          <br />
          <p>
            The balls will approach from the right side of the screen, and you must position the rectangle to intercept
            them. Each successful block increases your score by 1.
          </p>
          <br />
          <p>
            You start with 10 lives, and each ball that passes the left of your screen will reduce your lives by 1. The game ends
            when your lives reach zero. Good luck, and have fun!
          </p>
          <br/>
          <p className="text-yellow-500 leading-normal">
            (your score will be shown at the top left, and your lives are shown at the top right)
          </p>
        </div>
        <div className="flex px-4 py-3 justify-center ">
          <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#d3e2f3] text-[#14191f] text-sm font-bold leading-normal tracking-[0.015em] hover:bg-accent hover:text-accent-foreground">
            <Link href="/game/blockade/play">Understood, Let&apos;s Play</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
