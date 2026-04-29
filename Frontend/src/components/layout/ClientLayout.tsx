import { Outlet, useLocation } from 'react-router-dom';
import Headder from '../client/landingPage/Headder';

const ClientLayout = () => {
  const location = useLocation();

  // Landing page (/client) should have transparent header on start if desired
  // But client header is currently always semi-transparent dark.
  const isLandingPage = location.pathname === '/client' || location.pathname === '/client/';

  return (
    <div className="min-h-screen bg-gray-50">
      <Headder />
      <main className={`${isLandingPage ? '' : 'pt-20'}`}>
        <Outlet />
      </main>
    </div>
  );
};

export default ClientLayout;
