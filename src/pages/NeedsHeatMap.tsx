import React from 'react';
import { motion } from 'framer-motion';
import { LocationNeedCard } from '../components/cards/LocationNeedCard';
import { mockLocations, mockTasks } from '../data/mockData';

export const NeedsHeatMap: React.FC = () => {
  const getVisualPosition = (index: number, total: number) => {
    // Distribute points in a grid to ensure no overlap
    const cols = Math.ceil(Math.sqrt(total));
    const row = Math.floor(index / cols);
    const col = index % cols;
    
    // Apply deterministic jitter based on index so it looks natural
    const jitterTop = (index % 3) * 6 - 8; 
    const jitterLeft = (index % 5) * 5 - 10;

    const top = 15 + (row * (70 / Math.max(1, cols - 1))) + jitterTop;
    const left = 15 + (col * (70 / Math.max(1, cols - 1))) + jitterLeft;
    
    // Clamp between 10% and 90%
    return { 
      top: `${Math.max(10, Math.min(90, top))}%`, 
      left: `${Math.max(10, Math.min(90, left))}%` 
    };
  };

  const getCategoryColorByIndex = (index: number) => {
    const categories = ['MEDICAL', 'FOOD', 'EDUCATION', 'INFRASTRUCTURE'];
    const category = categories[index % 4];
    
    switch(category) {
      case 'MEDICAL': return { baseHex: '#ef4444', baseRgba: '239,68,68' };
      case 'FOOD': return { baseHex: '#f59e0b', baseRgba: '245,158,11' };
      case 'EDUCATION': return { baseHex: '#10b981', baseRgba: '16,185,129' };
      case 'INFRASTRUCTURE':
      default: return { baseHex: '#6b7280', baseRgba: '107,114,128' };
    }
  };

  const mapNodes = mockLocations.map((loc, idx) => {
    const pos = getVisualPosition(idx, mockLocations.length);
    const colors = getCategoryColorByIndex(idx);
    return {
      id: loc.id,
      name: loc.name,
      top: pos.top,
      left: pos.left,
      coreColor: colors.baseHex,
      coreRgbaStr: colors.baseRgba,
      glows: [
        { width: '70px', height: '70px', rgbaStr: colors.baseRgba, top: '50%', left: '50%' }
      ]
    };
  });

  const mapLegendItems = [
    { id: 'ml1', name: 'Medical', colorHex: '#ef4444', rgbaStr: '239,68,68' },
    { id: 'ml2', name: 'Food', colorHex: '#f59e0b', rgbaStr: '245,158,11' },
    { id: 'ml3', name: 'Education', colorHex: '#10b981', rgbaStr: '16,185,129' },
    { id: 'ml4', name: 'Infrastructure', colorHex: '#6b7280', rgbaStr: '107,114,128' }
  ];

  const locationCards = mockLocations.map((loc, idx) => {
    const locTasks = mockTasks.filter(t => t.locationId === loc.id);
    const hasCritical = locTasks.some(t => t.urgency === 'CRITICAL');
    const hasHigh = locTasks.some(t => t.urgency === 'HIGH');

    let urgency = 'NORMAL';

    if (hasCritical) {
      urgency = 'CRITICAL';
    } else if (hasHigh || idx % 4 === 0) {
      urgency = 'HIGH';
    } else if (idx % 2 === 0) {
      urgency = 'MEDIUM';
    }

    const categories = ['Medical', 'Food', 'Education', 'Infrastructure'];
    const categoryName = categories[idx % 4];

    return {
      id: loc.id,
      name: loc.name,
      urgency,
      needs: [{ name: categoryName }]
    };
  });

  return (
    <motion.div
      className="dashboard-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="heatmap-layout heatmap-shell">

        {/* Left: Map Area */}
        <div className="heatmap-map-container">
          {/* Dot Grid Background */}
          <div className="heatmap-dot-grid"></div>

          {/* Nodes (Glowing Orbs & Labels) */}
          <div className="heatmap-nodes-layer">
            {mapNodes.map((node, i) => (
              <motion.div
                key={node.id}
                className="heatmap-node"
                style={{ top: node.top, left: node.left }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.5 + i * 0.06 }}
              >
                <div className="heatmap-node-orb">
                  {/* Glows */}
                  {node.glows.map((glow, index) => (
                    <div
                      key={index}
                      className="heatmap-glow"
                      style={{
                        width: glow.width,
                        height: glow.height,
                        top: glow.top,
                        left: glow.left,
                        background: `radial-gradient(circle, rgba(${glow.rgbaStr},0.5) 0%, rgba(${glow.rgbaStr},0) 70%)`
                      }}
                    ></div>
                  ))}
                  {/* Core Dot */}
                  <div
                    className="heatmap-core-dot"
                    style={{
                      backgroundColor: node.coreColor,
                      boxShadow: `0 0 15px rgba(${node.coreRgbaStr},0.8)`
                    }}
                  ></div>
                </div>
                <span className="heatmap-node-label">
                  {node.name}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Floating Legend */}
          <motion.div
            className="heatmap-legend"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            {mapLegendItems.map(item => (
              <div key={item.id} className="heatmap-legend-item">
                <div className="heatmap-legend-dot" style={{ backgroundColor: item.colorHex, boxShadow: `0 0 8px rgba(${item.rgbaStr},0.5)` }}></div>
                {item.name}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: Vertical Panel */}
        <motion.div
          className="heatmap-sidebar"
          style={{ maxHeight: 'calc(100vh - 150px)', overflowY: 'auto', paddingRight: '10px' }}
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {locationCards.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ x: 16, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 + i * 0.06 }}
            >
              <LocationNeedCard card={card} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};
