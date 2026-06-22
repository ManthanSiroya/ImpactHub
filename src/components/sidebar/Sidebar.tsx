import React from 'react';
import { NavLink } from 'react-router-dom';
import type { User } from '../../types';

interface SidebarProps {
  userProfile: User;
}

export const Sidebar: React.FC<SidebarProps> = ({ userProfile }) => {
  return (
    <div className="sidebar">
      <div className="logo-section">
        <div className="logo-icon">
          <i className="fa-solid fa-heart"></i>
        </div>
        <div className="logo-text">
          <h1>ImpactHub</h1>
          <p>NGO Coordination</p>
        </div>
      </div>

      <div className="nav-section">
        <div className="nav-title">MAIN</div>
        <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <i className="fa-solid fa-border-all"></i>
          Impact Dashboard
        </NavLink>
        <NavLink to="/skill-matcher" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <i className="fa-solid fa-user-plus"></i>
          Skill Matcher
        </NavLink>
        <NavLink to="/needs-heat-map" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <i className="fa-solid fa-map-location-dot"></i>
          Needs Heat Map
        </NavLink>
        <NavLink to="/urgency-scoring" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <i className="fa-solid fa-triangle-exclamation"></i>
          Urgency Scoring
        </NavLink>
        <NavLink to="/data-pipeline" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <i className="fa-solid fa-database"></i>
          Data Pipeline
        </NavLink>
        <NavLink to="/offline-field-app" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <i className="fa-solid fa-wifi"></i>
          Offline Field App
        </NavLink>
      </div>

      <div className="nav-section">
        <div className="nav-title">ACCOUNT</div>
        <NavLink to="/my-profile" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <i className="fa-regular fa-user"></i>
          My Profile
        </NavLink>
      </div>

      <div className="sidebar-bottom">
        <div className="status-badge">
          Online - Synced
        </div>
        <div className="user-profile-mini">
          <div className="avatar">{userProfile.initials}</div>
          <div>
            <div className="sidebar-user-name">
              {userProfile.name}
            </div>
            <div className="sidebar-user-role">
              {userProfile.role}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
