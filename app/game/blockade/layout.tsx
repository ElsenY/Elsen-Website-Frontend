import { NavBar } from '@/components/ui/navigation-menu';

export default function GameLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar title="Game" />
      <main>{children}</main>
    </>
  );
}
