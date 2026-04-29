import { Outlet, useLocation } from 'react-router-dom';
import Header from '../freelancer/LandingPage/Header';

const FreelancerLayout = () => {
  const location = useLocation();

  // Landing page (/freelancer) should have transparent header on start
  const isLandingPage = location.pathname === '/freelancer' || location.pathname === '/freelancer/';

  return (
    <div className="min-h-screen bg-gray-50">
      <Header alwaysSolid={!isLandingPage} />
      <main className={`${isLandingPage ? '' : 'pt-20'}`}>
        <Outlet />
      </main>
    </div>
  );
};

export default FreelancerLayout;
