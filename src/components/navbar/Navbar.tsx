import React from 'react';
import type { User } from '../../types';

interface NavbarProps {
  title: string;
  userProfile: User;
}

export const Navbar: React.FC<NavbarProps> = ({ title, userProfile }) => {
  return (
    <header className="top-header">
      <h2>{title}</h2>
      <div className="header-actions">
        <button className="icon-btn"><i className="fa-solid fa-wifi"></i></button>
        <button className="icon-btn"><i className="fa-regular fa-bell"></i></button>
        <div className="avatar navbar-avatar">
          {userProfile.initials}
        </div>
      </div>
    </header>
  );
};
