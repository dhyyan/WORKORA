import Cards from "../../components/client/landingPage/Cards"
import Headder from "../../components/client/landingPage/Headder"
import HeroSection from "../../components/client/landingPage/HeroSection"


const ClientLandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-900 font-sans selection:bg-emerald-500/30">
      <Headder />

      <main>
        <HeroSection />
        <Cards />

        {/* Additional Content Spacer to show page flow */}
        <div className="h-32 w-full bg-slate-900" />
      </main>
    </div>
  )
}


export default ClientLandingPage
