import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from '../components/sidebar/Sidebar';
import { Navbar } from '../components/navbar/Navbar';
import { mockUsers, mockLocations } from '../data/mockData';

export const MainLayout: React.FC = () => {
  const currentUser = mockUsers[0];
  const locationName = mockLocations.find(l => l.id === currentUser.locationId)?.name || 'Unknown';
  
  const currentUserProfile = {
    ...currentUser,
    role: currentUser.role,
    location: `${locationName} - Dharavi region`
  };
  
  const location = useLocation();
  
  const getPageTitle = (path: string) => {
    switch(path) {
      case '/': return 'Impact Dashboard';
      case '/skill-matcher': return 'Skill Matcher';
      case '/needs-heat-map': return 'Needs Heat Map';
      case '/urgency-scoring': return 'Urgency Scoring';
      case '/data-pipeline': return 'Data Pipeline';
      case '/offline-field-app': return 'Offline Field App';
      case '/my-profile': return 'My Profile';
      default: return 'ImpactHub';
    }
  };

  return (
    <>
      <Sidebar userProfile={currentUserProfile} />
      <main className="main-content">
        <Navbar title={getPageTitle(location.pathname)} userProfile={currentUserProfile} />
        <Outlet />
      </main>
    </>
  );
};
