
import MainCard from '@/components/home/main-card';
import Experiences from '@/components/home/experiences';
import Skills from '@/components/home/skills';
import Footer from '@/components/home/footer';

export default function About() {
  return (
    <div className="layout-container flex h-full grow flex-col">
      <div className="px-24 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col flex-1">
            <MainCard />
            <Experiences />
            <Skills />
        </div>
      </div>
      <Footer />
    </div>
  );
}
