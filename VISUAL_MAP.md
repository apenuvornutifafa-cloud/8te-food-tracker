# 8te - Visual Project Map

```
╔════════════════════════════════════════════════════════════════════════════╗
║                    8te - FOOD EXPIRY TRACKING APP                         ║
║                  Track Food • Save Waste • Help Community                  ║
╚════════════════════════════════════════════════════════════════════════════╝

┌─────────────────────────────────────────────────────────────────────────────┐
│                         📱 USER INTERFACE LAYER                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │ 🔐 Auth     │  │ 📊 Dashboard │  │ ➕ Add Food  │  │ 🔔 Alerts   │   │
│  │ Login/Signup│  │ Stats & Info │  │ Manual/Scan  │  │ Manage Notif│   │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘   │
│                                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │ 🍎 Details  │  │ ❤️ Donations │  │ ⚙️ Settings  │  │ 📱 Layout   │   │
│  │ View/Edit   │  │ Charity Finder│ │ Preferences  │  │ Navigation   │   │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘   │
│                                                                              │
│                    React 18 + Vite + Tailwind CSS                          │
│                    State: Zustand | Routing: React Router                   │
│                          Yellow & Black Theme                              │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                         🌉 API GATEWAY LAYER                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────┐    │
│  │  Express.js REST API (Port 5000)                                  │    │
│  │  ┌─────────────┬─────────────┬─────────────┬─────────────┐       │    │
│  │  │ Auth Routes │ Food Routes │ Donation    │ Dashboard   │       │    │
│  │  │ signup      │ GET all     │ create      │ stats       │       │    │
│  │  │ login       │ POST add    │ find nearby │ summary     │       │    │
│  │  │ profile     │ PUT edit    │ track       │ reminders   │       │    │
│  │  │ update      │ DELETE item │ update      │             │       │    │
│  │  │             │ scan image  │ status      │             │       │    │
│  │  └─────────────┴─────────────┴─────────────┴─────────────┘       │    │
│  │                                                                     │    │
│  │  30+ API Endpoints | JWT Auth | Input Validation                 │    │
│  └────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                        🔧 SERVICES LAYER                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │ 🔔 Reminders │  │ 🤖 AI Service│  │ 📧 Email    │  │ 📱 Notifications│
│  │ • Scheduler  │  │ • Recipes    │  │ • Gmail API │  │ • Push        │
│  │ • Formatter  │  │ • Suggestions│  │ • Nodemailer│  │ • SMS         │
│  │ • Triggers   │  │ • Messages   │  │ • Templates │  │ • In-app      │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘   │
│                                                                              │
│  Node Cron | OpenAI | Nodemailer | Twilio | Firebase | Tesseract.js      │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                     💾 DATABASE LAYER (MongoDB)                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │ Users        │  │ FoodItems    │  │ Notifications│ │ Donations    │   │
│  │ ├─ name      │  │ ├─ name      │  │ ├─ type      │  │ ├─ userId    │   │
│  │ ├─ email     │  │ ├─ category  │  │ ├─ title     │  │ ├─ charityId │   │
│  │ ├─ password  │  │ ├─ quantity  │  │ ├─ message   │  │ ├─ status    │   │
│  │ ├─ location  │  │ ├─ expiryDate│  │ ├─ isRead    │  │ └─ timestamp │   │
│  │ ├─ prefs     │  │ ├─ status    │  │ └─ deliveryOpt │              │   │
│  │ └─ stats     │  │ ├─ reminders │  │              │  │ Charities    │   │
│  │              │  │ └─ suggestions│ │              │  │ ├─ name      │   │
│  │              │  │              │  │              │  │ ├─ location  │   │
│  │              │  │              │  │              │  │ ├─ hours     │   │
│  └──────────────┘  └──────────────┘  └──────────────┘  │ └─ contact   │   │
│                                                         └──────────────┘   │
│  ┌─ Indexed on: userId, expiryDate, status                                │
│  └─ Geospatial: Charity locations for proximity search                     │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                    🌐 EXTERNAL INTEGRATIONS                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │ 🤖 OpenAI    │  │ 📧 Gmail     │  │ 📱 Twilio    │  │🗺️ Google Maps│
│  │ Recipe Ideas │  │ Email Alerts │  │ SMS Alerts   │  │ Location Data │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘

╔════════════════════════════════════════════════════════════════════════════╗
║                        DATA FLOW EXAMPLE                                   ║
╠════════════════════════════════════════════════════════════════════════════╣
║                                                                             ║
║  USER ACTION          API CALL           BACKEND LOGIC      DATABASE       ║
║  ──────────────────────────────────────────────────────────────────────   ║
║                                                                             ║
║  1. User adds food  → POST /api/foods → Validate data → Store in DB      ║
║  2. Days pass       → Scheduler runs → Check expiry → Trigger reminders  ║
║  3. Expiry near     → Cron job 9am  → Find items → Send notifications   ║
║  4. User opens app  → GET /api/notifications → Return user alerts       ║
║  5. AI suggested    → GET /suggestions → OpenAI API → Show recipes      ║
║  6. User wants to   → GET /charities/nearby → Geospatial query → List  ║
║     donate items    → POST /donations → Track donation → Update stats   ║
║                                                                             ║
╚════════════════════════════════════════════════════════════════════════════╝

┌─────────────────────────────────────────────────────────────────────────────┐
│                    TECH STACK SUMMARY                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Frontend Framework:    React 18 + Vite                                    │
│  State Management:      Zustand                                            │
│  Styling:              Tailwind CSS                                        │
│  Routing:              React Router v6                                     │
│  HTTP Client:          Axios                                               │
│  Date Utilities:       date-fns                                            │
│  Icons:                Lucide React                                        │
│  PWA:                  Service Workers                                     │
│                                                                              │
│  Backend Runtime:       Node.js 18+                                        │
│  Framework:            Express.js                                          │
│  Database:             MongoDB                                             │
│  Authentication:       JWT + bcryptjs                                      │
│  Validation:           express-validator                                   │
│  Scheduling:           node-cron                                           │
│  AI:                   OpenAI API                                          │
│  Image Processing:     Tesseract.js + Sharp                               │
│  Notifications:        Email/SMS/Push                                      │
│                                                                              │
│  Deployment:           Docker + Docker Compose                             │
│  Cloud Options:        Heroku, Railway, Fly.io, DigitalOcean              │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                    COLOR THEME & DESIGN SYSTEM                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Primary:    ■ #FFD700 (Gold Yellow)    - Buttons, highlights             │
│  Dark:       ■ #1a1a1a (Black)          - Backgrounds, text               │
│  Light:      ■ #f5f5f5 (Off-white)      - Card backgrounds                │
│  Success:    ■ #10b981 (Green)          - Fresh items                     │
│  Warning:    ■ #f59e0b (Amber)          - Expiring soon                   │
│  Danger:     ■ #ef4444 (Red)            - Expired items                   │
│                                                                              │
│  Responsive: Mobile-first | Tablet optimized | Desktop enhanced            │
│  Icons:      Lucide React                                                  │
│  Typography: System fonts with fallbacks                                   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘

╔════════════════════════════════════════════════════════════════════════════╗
║                        QUICK STATS                                         ║
╠════════════════════════════════════════════════════════════════════════════╣
║                                                                             ║
║  Total Files:          40+                  API Endpoints:    30+          ║
║  Database Collections: 5                    Components:       10+          ║
║  Pages:                8                    Services:         6+           ║
║  Models:               5                    Utilities:        10+          ║
║  Routes:               7                    Documentation:    8+ files     ║
║  Theme Colors:         6                    Responsive:       ✅           ║
║  Animations:           CSS                  Accessibility:    ✅           ║
║                                                                             ║
╚════════════════════════════════════════════════════════════════════════════╝

                    🎉 READY TO START? 🎉
                    
                    1. Read INDEX.md
                    2. Read QUICK_REFERENCE.md
                    3. Follow INSTALLATION.md
                    4. Run the app!
                    
                    Happy coding! 🚀
```

---

## 🎯 Feature Highlights

```
┌─────────────────────────────────────────────┐
│ ✨ KEY FEATURES                             │
├─────────────────────────────────────────────┤
│                                              │
│ 🔐 Authentication                           │
│    JWT-based, bcryptjs hashing              │
│                                              │
│ 📋 Food Inventory                           │
│    Manual + OCR scanning                    │
│                                              │
│ 🔔 Smart Reminders                          │
│    Email, SMS, Push, In-app                 │
│                                              │
│ 🤖 AI Suggestions                           │
│    OpenAI recipe generation                 │
│                                              │
│ ❤️ Donation System                          │
│    Charity finder, geolocation             │
│                                              │
│ 📊 Dashboard & Stats                        │
│    Real-time metrics                        │
│                                              │
│ ⚙️ User Settings                            │
│    Preferences, location                    │
│                                              │
│ 📱 Responsive Design                        │
│    Mobile & desktop support                 │
│                                              │
└─────────────────────────────────────────────┘
```

---

**Let's reduce food waste together! 🌱✨**
