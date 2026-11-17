# Reading Skills Profile Generation of Children

A modern, responsive educational SaaS platform built with **React**, **Vite**, and **Tailwind CSS** for evaluating and profiling children's reading skills across two independent assessment modules:

1. **Oral Reading Fluency Assessment** (Acoustic ASR, Word Error Rate, Character Error Rate, Estimated WPM, and alignment diffs)
2. **Question & Answer Reading Comprehension Assessment** (ML Ensemble classification calibrated on SciEntsBank and Beetle benchmarks with automated Teacher Review flags)

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18+ recommended)
- npm or pnpm

### 1. Navigate to Project Directory
```bash
cd "C:\Users\Sumit\.gemini\antigravity\scratch\reading-skills-frontend"
```

### 2. Start Development Server
```bash
npm run dev
```

The application will start locally at **`http://localhost:5173`**.

### 3. Build for Production
```bash
npm run build
```

---

## 🔑 Demo Login Credentials
- **Email:** `sarah.jenkins@lincoln.edu`
- **Password:** `educator2026`
- *(Or click the "Auto-Fill Demo" button directly on the Login page)*

---

## 📂 Project Architecture

```
reading-skills-frontend/
├── public/
├── src/
│   ├── assets/              # Static assets & icons
│   ├── components/          # Reusable UI components
│   │   ├── Sidebar.jsx      # Collapsible dark navy navigation
│   │   ├── Navbar.jsx       # Breadcrumb, global search, notifications, teacher profile
│   │   ├── StatCard.jsx     # Metric cards with trends & badges
│   │   ├── DataTable.jsx    # Professional paginated table with sorting & empty states
│   │   ├── AudioUploader.jsx# WAV/MP3 drag-and-drop audio player with waveform preview
│   │   ├── QuestionCard.jsx # Benchmark question card with sample student responses
│   │   └── ResultCard.jsx   # Status indicator pill cards for diagnostic metrics
│   ├── context/
│   │   └── AuthContext.jsx  # Authentication session state & persistence
│   ├── data/
│   │   └── mockData.js      # Demonstration data (SciEntsBank, Beetle, sample children)
│   ├── layouts/
│   │   ├── AuthLayout.jsx   # Educational SaaS split auth layout
│   │   └── DashboardLayout.jsx # Collapsible layout with navy sidebar & top navbar
│   ├── pages/
│   │   ├── Login.jsx        # Login page with validation & show/hide password
│   │   ├── Register.jsx     # Educator registration with role selection
│   │   ├── Dashboard.jsx    # Analytics dashboard with Recharts visualizations
│   │   ├── Children.jsx     # Student directory with filters, edit & delete modals
│   │   ├── AddChild.jsx     # Registration form for new students
│   │   ├── ChildProfile.jsx # Individual child profile with independent dimensions
│   │   ├── OralReading.jsx  # Module 1 assessment interface with audio upload
│   │   ├── OralReadingResult.jsx # WER, CER, Est. WPM & alignment diff viewer
│   │   ├── QnAAssessment.jsx# Module 2 comprehension assessment interface
│   │   ├── QnAResult.jsx    # ML ensemble classification & review notice
│   │   ├── QuestionBank.jsx # 253 SciEntsBank & Beetle benchmark questions
│   │   ├── AssessmentHistory.jsx # Audit trail with filters & inspection drawer
│   │   ├── Reports.jsx      # Child-wise & cohort analytics, CSV export, print
│   │   └── Settings.jsx     # Educator profile, password change & system specs
│   ├── services/            # Axios API layer prepared for Python FastAPI backend
│   │   ├── api.js           # Base axios instance with interceptors
│   │   ├── authService.js   # Auth endpoints with mock fallback
│   │   ├── childService.js  # Children CRUD endpoints with persistent local fallback
│   │   ├── oralReadingService.js # Oral reading acoustic scoring service
│   │   ├── qaService.js     # ML ensemble comprehension scoring service
│   │   ├── questionService.js# Benchmark questions retrieval & creation
│   │   └── assessmentService.js # Combined assessment history management
│   ├── App.jsx              # React Router DOM route hierarchy & protected guards
│   ├── main.jsx             # Entry point
│   └── index.css            # Tailwind directives, print media styles & scrollbars
├── index.html
├── tailwind.config.js       # Custom navy colors, brand scale & typography
├── postcss.config.js
├── vite.config.js           # Chunk-splitting configuration
└── .env                     # VITE_API_BASE_URL=http://localhost:8000
```

---

## 🔬 Core Methodological Principles

1. **Independent Skill Dimensions:**
   - Oral Reading Fluency and Reading Comprehension are rendered as **separate skill dimensions** on student profiles without arbitrary composite score collapse.
2. **Model-Generated Indicator Safeguards:**
   - Estimated Words Per Minute (Est. WPM) is clearly demarcated as an acoustic model-generated indicator rather than standardized Words Correct Per Minute (WCPM).
3. **ML Ensemble Classification:**
   - Q&A scoring indicates classification via ML ensemble (DeBERTa + Ridge/SVM), displaying automated **"Review Required"** recommendations whenever prediction confidence falls below 0.78.
4. **Standardized Corpora Integration:**
   - Pre-loaded with items from **SciEntsBank** and **Beetle** (253 benchmark science questions and 16,003 student answer distributions).
