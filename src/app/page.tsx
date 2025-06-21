import AboutSection from "../components/AboutSection";
import HeroWithHeader from "../components/HeroWithHeader";
import InvestmentOpportunities from "../components/InvestmentOpportunities";
import HowItWorks from "../components/HowItWorks";
import InvestEarnSection from "../components/InvestEarnSection";
import RewardsSection from "../components/RewardsSection";
import DownloadAppSection from "../components/DownloadAppSection";
export default function Home() {
  return (
    <>
      <HeroWithHeader />
      <AboutSection />
      <InvestmentOpportunities />
      <HowItWorks />
      <InvestEarnSection />
      <RewardsSection />
      <DownloadAppSection />
    </>
  );
}
