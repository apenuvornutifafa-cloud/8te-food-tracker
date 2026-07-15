# 8te - Quick Reference Guide

## 🎯 Project at a Glance

**Project**: 8te - Food Expiry Tracking & Waste Reduction App
**Tech Stack**: React + Vite + Tailwind | Node.js + Express | MongoDB
**Theme**: Yellow (#FFD700) & Black (#1a1a1a)
**Status**: ✅ Production-Ready

---

## ⚡ Quick Start (5 minutes)

```bash
# Terminal 1: Backend
cd backend && npm install && npm run dev

# Terminal 2: Frontend  
cd frontend && npm install && npm run dev

# Terminal 3: MongoDB (if local)
mongod

# Open browser
http://localhost:5173
```

---

## 📁 Project Structure

```
8te-food-tracker/
├── backend/          → Node.js API
├── frontend/         → React SPA
├── docker-compose.yml
└── Documentation files
```

---

## 🔌 Key Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | /api/auth/signup | Register |
| POST | /api/auth/login | Login |
| GET | /api/foods | List items |
| POST | /api/foods | Add item |
| GET | /api/notifications | Get notifications |
| POST | /api/donations | Create donation |
| GET | /api/dashboard/stats | Get stats |

---

## 🎨 Color Palette

| Color | Hex | Use |
|-------|-----|-----|
| Primary Yellow | #FFD700 | Buttons, highlights |
| Dark | #1a1a1a | Background, text |
| Light | #f5f5f5 | Card backgrounds |
| Green | #10b981 | Fresh status |
| Yellow | #f59e0b | Expiring soon |
| Red | #ef4444 | Expired |

---

## 🗄️ Database Collections

- **users** - User accounts & preferences
- **fooditems** - Inventory items
- **notifications** - User notifications
- **donations** - Donation records
- **charities** - Food banks & charities

---

## 📱 Main Pages

| Page | Route | Purpose |
|------|-------|---------|
| Login | /login | Authentication |
| Dashboard | /dashboard | Overview & stats |
| Add Food | /add-food | Add items |
| Food Detail | /food/:id | Item details |
| Donations | /donations | Charity finder |
| Settings | /settings | Preferences |
| Notifications | /notifications | Alerts |

---

## 🔑 Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/8te
JWT_SECRET=your_secret
PORT=5000
CLIENT_URL=http://localhost:5173
GMAIL_USER=email@gmail.com
GMAIL_PASSWORD=app_password
```

### Frontend (.env.local)
```
VITE_API_URL=http://localhost:5000
```

---

## 🚀 Common Commands

```bash
# Backend
npm run dev          # Start dev server
npm test             # Run tests
npm run build        # Build for production

# Frontend
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview build

# Root
npm run dev          # Run both (needs concurrently)
docker-compose up    # Start with Docker
```

---

## 🔐 Authentication Flow

1. User signs up → Password hashed with bcryptjs
2. JWT token generated → Stored in localStorage
3. Token sent in Authorization header → Protected routes verified
4. Token expires after 7 days → User logs out
5. Logout → Token cleared from storage

---

## 📊 Data Flow Example

```
User adds food item
    ↓
Frontend sends POST /api/foods
    ↓
Backend validates & stores in MongoDB
    ↓
User receives confirmation
    ↓
Item appears in Dashboard
    ↓
Reminder scheduled for expiry date
```

---

## 🔔 Notification Channels

- 📧 **Email** - Gmail integration
- 📱 **SMS** - Twilio integration
- 🔔 **Push** - Web Push API
- 💬 **In-App** - Real-time notifications

---

## 🎯 Feature Checklist

- ✅ User Authentication (JWT)
- ✅ Food Inventory Tracking
- ✅ Smart Reminders (Email, SMS, Push, In-app)
- ✅ Receipt Scanning (OCR)
- ✅ AI Recipe Suggestions (OpenAI)
- ✅ Donation Finder (Geolocation)
- ✅ Dashboard & Stats
- ✅ Settings & Preferences
- ✅ Empty State UX
- ✅ Mobile Responsive
- ✅ Service Worker (PWA)

---

## 🧪 Testing

```bash
# Manual API Testing
curl http://localhost:5000/api/health

# Frontend Testing
npm test

# Backend Testing
cd backend && npm test
```

---

## 📈 Performance Tips

- ✅ Database indexes on userId, expiryDate
- ✅ Lazy-loaded routes with React
- ✅ Code splitting with Vite
- ✅ Image optimization
- ✅ Caching strategies

---

## 🐛 Debugging

**Backend Issues**:
```bash
DEBUG=* npm run dev
# Check backend/server.js logs
```

**Frontend Issues**:
```javascript
// Browser DevTools (F12)
// React DevTools extension
// Check Application → Cookies for token
```

**Database Issues**:
```bash
mongosh
use 8te
db.fooditems.find().pretty()
```

---

## 🚨 Troubleshooting

| Issue | Solution |
|-------|----------|
| MongoDB connection error | Start mongod or check URI |
| CORS error | Check CLIENT_URL in .env |
| API not responding | Verify backend on port 5000 |
| Frontend blank page | Check console, npm run dev |
| Port in use | Kill process or change PORT |

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| README.md | Complete feature & API docs |
| SETUP_GUIDE.md | Installation & configuration |
| FEATURES.md | Detailed feature docs |
| INTEGRATION_EXAMPLES.md | Code samples |
| PROJECT_SUMMARY.md | Project overview |
| INSTALLATION.md | Step-by-step setup |
| **THIS FILE** | Quick reference |

---

## 🔗 Useful Links

- [Express Docs](https://expressjs.com/)
- [React Docs](https://react.dev/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite Docs](https://vitejs.dev/)
- [Zustand](https://github.com/pmndrs/zustand)

---

## 💡 Pro Tips

1. **Save time** - Use `.env.example` as template
2. **Local dev** - MongoDB local is faster than Atlas for testing
3. **Testing** - Use Postman for API testing
4. **Debugging** - Browser DevTools is your friend
5. **Scaling** - Add Redis caching for better performance

---

## 🎓 Key Concepts

- **JWT**: Stateless authentication
- **MongoDB**: Document-based database
- **Zustand**: Lightweight state management
- **Tailwind**: Utility-first CSS framework
- **Service Worker**: Offline & push notifications
- **Cron Jobs**: Scheduled reminder execution

---

## 🚀 Next Steps

1. Complete INSTALLATION.md
2. Start backend & frontend
3. Test authentication (signup/login)
4. Add a food item
5. View dashboard
6. Configure settings
7. Explore features

---

## 📞 Support

- Check documentation files
- Review code comments
- Check error messages in console
- Google the specific error
- Check GitHub issues (if available)

---

**Last Updated**: 2024
**Version**: 1.0.0
**Status**: Production Ready ✅

---

**Happy coding! 🎉 Let's reduce food waste with 8te!**
