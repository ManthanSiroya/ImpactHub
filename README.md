# ImpactHub 🌍

A modern, offline-first NGO coordination platform designed to bridge the gap between central organizers and on-the-ground volunteers. 

Designed originally for the **Google Solution AI Challenge**, ImpactHub addresses a critical data fragmentation issue in the social sector, enabling reliable field operations, intelligent task prioritization, resilient data collection, and community impact tracking even in environments with unstable or unavailable internet connectivity.

---

## 📑 Table of Contents

* [🎯 Vision](#-vision)
* [✨ Key Features](#-key-features)
* [🏗️ Architecture Highlights](#️-architecture-highlights)
* [📸 Screenshots](#-screenshots)
* [🛠️ Tech Stack](#️-tech-stack)
* [🚀 Getting Started](#-getting-started)
* [📂 Project Structure](#-project-structure)
* [🔄 Current Development Status](#-current-development-status)
* [🗺️ Roadmap](#️-roadmap)
* [🤝 Contributing](#-contributing)
* [📝 License](#-license)

---

## 🎯 The Objective

**The Problem:** 
Local social groups and NGOs collect a lot of important information about community needs through paper surveys and field reports. However, this valuable data is often scattered across different places, making it hard to see the biggest problems clearly. Additionally, traditional systems assume a constant internet connection, resulting in delayed reporting and synchronization issues in disaster zones or remote areas.

**The Solution:** 
ImpactHub is a powerful system that gathers scattered community information to clearly show the most urgent local needs. It features a smart matching system to quickly connect available volunteers with the specific tasks and areas where they are needed most, utilizing a resilient offline-first architecture that allows coordination to continue effectively regardless of network conditions.

---

## ✨ Key Features

### Offline-First Field Operations

* Local-first task management
* Offline data collection
* Sync queue simulation
* Automatic reconnection handling
* Conflict resolution workflows

### Intelligent Resource Prioritization

* Automated urgency scoring
* Dynamic task prioritization
* Assigned and unassigned request tracking
* Visual risk indicators

### Real-Time Operations Dashboard

* Live data pipeline simulation
* Field report monitoring
* Community impact analytics
* Volunteer performance insights

### Volunteer Engagement System

* Volunteer profiles
* Achievement badges
* Streak tracking
* Contribution metrics
* Leaderboards

### Advanced Coordination Tools

* Skill matching system
* Needs heat map visualization
* Field report processing
* Regional coordination monitoring

### Premium User Experience

* Responsive dashboard design
* Smooth animations with Framer Motion
* Reusable component architecture
* Type-safe frontend implementation

---

## 🏗️ Architecture Highlights

### Frontend Architecture

* React + TypeScript
* Strict type-safe domain models
* ViewModel-based UI architecture
* Centralized mock data simulation
* Reusable component-driven design
* Backend-ready service architecture

### Core Modules

* Dashboard
* Skill Matcher
* Needs Heat Map
* Urgency Scoring Engine
* Data Pipeline
* Offline Field Application
* Volunteer Profile System

---

## 📸 Screenshots

Add screenshots here.

### Dashboard

![ DashBoard ](<public/Screenshots/Screenshot 2026-06-23 032637.png>)

### Needs Heat Map

![ HeatMap ](<public/Screenshots/Screenshot 2026-06-23 032907.png>)

### Volunteer Profile

![ Profile ](<public/Screenshots/Screenshot 2026-06-23 033014.png>)

---

## 🛠️ Tech Stack

### Frontend

* React 18
* TypeScript
* Vite
* React Router DOM

### Styling & UI

* CSS
* Framer Motion
* Lucide React
* Font Awesome

### Planned Backend

* Node.js
* Express.js
* MongoDB
* JWT Authentication
* REST APIs
* WebSockets

---

## 🚀 Getting Started

### Prerequisites

* Node.js (v16 or higher)
* npm or yarn

### Installation

#### Fork The repo

```bash
git clone https://github.com/your-username/impacthub.git
cd impacthub
npm install
npm run dev
```

#### Open:

```txt
http://localhost:5173
```

---

## 📂 Project Structure

```txt
src/
├── components/
├── pages/
├── layouts/
├── data/
├── types/
├── routes/
├── assets/
└── services/ (planned)
```

### Key Directories

* `components` — Reusable UI components
* `pages` — Main application views
* `data` — Mock backend simulation
* `types` — TypeScript domain models
* `layouts` — Shared layouts and navigation
* `routes` — Application routing

---

## 🔄 Current Development Status

### Completed

* Frontend UI
* Offline-first simulation
* Dashboard analytics
* Volunteer profiles
* Heat map visualization
* Type-safe architecture
* Component system

### In Progress

* Service layer abstraction
* Backend integration planning

### Planned

* Express backend
* MongoDB persistence
* JWT authentication
* WebSocket synchronization
* AI-assisted volunteer matching

---

## 🗺️ Roadmap

### Phase 1 — Frontend Foundation ✅

* Dashboard
* Volunteer profiles
* Offline workflows
* Data simulation

### Phase 2 — Architecture Hardening ✅

* Type-safe models
* ViewModel architecture
* Backend-ready structure

### Phase 3 — Backend Integration 🚧

* REST APIs
* MongoDB
* Authentication
* Role management

### Phase 4 — Real-Time Operations 🚧

* WebSocket synchronization
* Live notifications
* Real-time coordination

---

## 🤝 Contributing

Contributions, ideas, and feature suggestions are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License.

---

Built with ❤️ to improve NGO coordination, volunteer engagement, and disaster response operations.
