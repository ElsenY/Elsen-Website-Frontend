import { NavBar } from '@/components/ui/navigation-menu';

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar title="About Me" />
      <main>{children}</main>
    </>
  );
}
