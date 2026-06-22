import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { Dashboard } from '../pages/Dashboard';

import { SkillMatcher } from '../pages/SkillMatcher';

import { NeedsHeatMap } from '../pages/NeedsHeatMap';

import { UrgencyScoring } from '../pages/UrgencyScoring';

import { DataPipeline } from '../pages/DataPipeline';

import { OfflineFieldApp } from '../pages/OfflineFieldApp';

import { MyProfile } from '../pages/MyProfile';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="skill-matcher" element={<SkillMatcher />} />
        <Route path="needs-heat-map" element={<NeedsHeatMap />} />
        <Route path="urgency-scoring" element={<UrgencyScoring />} />
        <Route path="data-pipeline" element={<DataPipeline />} />
        <Route path="offline-field-app" element={<OfflineFieldApp />} />
        <Route path="my-profile" element={<MyProfile />} />
      </Route>
    </Routes>
  );
};
