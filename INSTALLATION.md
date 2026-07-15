# 8te - Complete Installation & Running Guide

## 📋 Prerequisites

- Node.js 18+ ([Download](https://nodejs.org/))
- npm or yarn
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- Git
- A code editor (VS Code recommended)

## 🚀 Installation Steps

### Step 1: Clone/Setup Project

```bash
# Navigate to your desired directory
cd Documents

# Create project directory
mkdir 8te-food-tracker
cd 8te-food-tracker
```

### Step 2: Backend Setup

```bash
# Create backend folder
mkdir backend
cd backend

# Initialize Node project
npm init -y

# Install dependencies
npm install express dotenv mongoose bcryptjs jsonwebtoken cors multer axios nodemailer web-push openai sharp tesseract.js express-validator firebase-admin

# Install dev dependencies
npm install --save-dev nodemon jest

# Go back to root
cd ..
```

### Step 3: Frontend Setup

```bash
# Create frontend folder
mkdir frontend
cd frontend

# Install Vite and dependencies
npm create vite@latest . -- --template react

# Install additional dependencies
npm install
npm install zustand axios react-router-dom date-fns lucide-react qrcode.react

# Install dev dependencies
npm install --save-dev tailwindcss postcss autoprefixer

# Initialize Tailwind
npx tailwindcss init -p

# Go back to root
cd ..
```

### Step 4: Environment Configuration

#### Backend (.env file)

Create `backend/.env`:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/8te

# JWT
JWT_SECRET=your_super_secret_key_change_this_in_production
JWT_EXPIRE=7d

# Server
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# Email (Gmail)
GMAIL_USER=your_email@gmail.com
GMAIL_PASSWORD=your_app_password

# SMS (Twilio) - Optional
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1234567890

# AI (OpenAI) - Optional
OPENAI_API_KEY=your_openai_api_key

# Firebase (Push Notifications) - Optional
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_CLIENT_EMAIL=your_client_email

# Google Maps - Optional
GOOGLE_MAPS_API_KEY=your_maps_api_key

# Web Push - Optional
VAPID_PUBLIC_KEY=your_vapid_public_key
VAPID_PRIVATE_KEY=your_vapid_private_key
```

#### Frontend Environment

Create `frontend/.env.local`:

```env
VITE_API_URL=http://localhost:5000
```

### Step 5: Database Setup

#### Option A: Local MongoDB

```bash
# Install MongoDB Community Edition
# Follow https://docs.mongodb.com/manual/installation/

# Start MongoDB server
mongod

# In another terminal, verify connection
mongosh
```

#### Option B: MongoDB Atlas (Cloud)

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

### Step 6: Copy Project Files

Copy all the files from this documentation into their respective locations:

- Backend files → `backend/` folder
- Frontend files → `frontend/src/` folder
- Configuration files → root directory

### Step 7: Install MongoDB Locally (Windows)

```bash
# Using chocolatey (if installed)
choco install mongodb-community

# Or download installer from:
# https://www.mongodb.com/try/download/community
```

## ▶️ Running the Application

### Option 1: Manual Start (Recommended for Development)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

**Terminal 3 - MongoDB (if running locally):**
```bash
mongod
```

Then open: `http://localhost:5173`

### Option 2: Docker (All-in-One)

```bash
# Make sure Docker is installed
# https://www.docker.com/products/docker-desktop

# From root directory
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f

# Stop when done
docker-compose down
```

Access at: `http://localhost:5173`

### Option 3: Concurrent Start (Root Level)

```bash
# From root directory
npm install concurrently

# Update root package.json scripts, then:
npm run dev
```

## 🔧 Troubleshooting

### MongoDB Connection Error

```bash
# Check if MongoDB is running
# Windows: Services > MongoDB Server
# Mac: brew services list
# Linux: sudo service mongod status

# If not running, start it:
# Windows: net start MongoDB
# Mac: brew services start mongodb-community
# Linux: sudo service mongod start
```

### Port Already in Use

```bash
# Find process using port 5000
# Windows
netstat -ano | findstr :5000

# Kill process
taskkill /PID <PID> /F

# Or change PORT in .env to 5001, etc.
```

### CORS Error

- Check `CLIENT_URL` in backend `.env`
- Ensure it matches frontend URL (default: http://localhost:5173)

### Frontend Not Loading

```bash
# Clear cache and reinstall
cd frontend
rm -rf node_modules
npm install
npm run dev
```

### Backend API Not Responding

```bash
# Check if server is running
curl http://localhost:5000/api/health

# Check logs for errors
# Restart with fresh install
cd backend
npm install
npm run dev
```

## ✅ Verification Checklist

- [ ] Node.js installed (node --version)
- [ ] MongoDB running (mongosh or Compass)
- [ ] Backend dependencies installed (npm ls)
- [ ] Frontend dependencies installed (npm ls)
- [ ] Environment variables configured (.env)
- [ ] Backend running on port 5000
- [ ] Frontend running on port 5173
- [ ] API responding (http://localhost:5000/api/health)
- [ ] Login page loads (http://localhost:5173)
- [ ] Can sign up and login

## 🎯 First Steps After Setup

1. **Open http://localhost:5173** - You should see login page
2. **Sign Up** - Create a test account
3. **Login** - Access the dashboard
4. **Add Food Item** - Try manual entry
5. **View Dashboard** - Should show empty state with CTA
6. **Go to Settings** - Configure preferences
7. **Add Charity** - Set your location for donations (optional)

## 📝 API Testing

### Using Postman

1. Download [Postman](https://www.postman.com/downloads/)
2. Create new request
3. Test endpoints from [README.md](README.md)

### Using cURL

```bash
# Test if backend is running
curl http://localhost:5000/api/health

# Sign up
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
```

## 🐛 Debug Mode

### Backend Debug

```bash
# Run with debug logging
DEBUG=* npm run dev
```

### Frontend Debug

```bash
# React DevTools recommended
# Browser DevTools (F12) → Application → Console
```

## 📊 Database Inspection

```bash
# Connect to MongoDB
mongosh

# List databases
show dbs

# Use 8te database
use 8te

# List collections
show collections

# View users
db.users.find().pretty()

# View food items
db.fooditems.find().pretty()
```

## 🌐 Testing Features

### 1. Authentication
- Sign up with email
- Login with credentials
- Token stored in localStorage
- Navigate to dashboard

### 2. Food Tracking
- Add food manually
- View in dashboard
- Edit food item
- Delete food item

### 3. Notifications
- Check notification preferences
- Enable/disable channels
- Set reminder timing

### 4. Dashboard
- View empty state (first time)
- Add items to see dashboard
- Check stats cards
- See expiring items

## 🚀 Production Preparation

### Before Deploying

1. **Security**
   - Change JWT_SECRET
   - Use strong MongoDB password
   - Enable HTTPS
   - Add rate limiting

2. **Environment**
   - Set NODE_ENV=production
   - Configure real email service
   - Set up proper logging
   - Configure CDN

3. **Database**
   - Use MongoDB Atlas
   - Enable backups
   - Configure replicas

4. **Monitoring**
   - Set up error tracking
   - Configure analytics
   - Monitor API performance

### Deployment Platforms

- **Heroku**: `heroku create 8te-app`
- **Vercel**: Frontend only
- **Railway**: Full stack
- **Fly.io**: Full stack
- **DigitalOcean**: VPS option

## 📞 Getting Help

1. Check logs first
2. Review SETUP_GUIDE.md
3. Check TROUBLESHOOTING section below
4. Look at INTEGRATION_EXAMPLES.md
5. Check individual file comments

## 🎓 Learning Resources

- [Express.js Docs](https://expressjs.com/)
- [React Docs](https://react.dev/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite Docs](https://vitejs.dev/)

## 📋 File Checklist

### Backend Files
- [ ] server.js
- [ ] package.json
- [ ] .env.example
- [ ] middleware/auth.js
- [ ] models/User.js
- [ ] models/FoodItem.js
- [ ] models/Notification.js
- [ ] models/Charity.js
- [ ] models/Donation.js
- [ ] routes/auth.js
- [ ] routes/foods.js
- [ ] routes/notifications.js
- [ ] routes/donations.js
- [ ] routes/settings.js
- [ ] routes/dashboard.js
- [ ] routes/reminders.js
- [ ] services/reminderService.js
- [ ] services/aiService.js

### Frontend Files
- [ ] src/App.jsx
- [ ] src/main.jsx
- [ ] src/index.css
- [ ] src/pages/*.jsx (8 files)
- [ ] src/components/Layout.jsx
- [ ] src/store/authStore.js
- [ ] src/store/foodStore.js
- [ ] src/utils/apiClient.js
- [ ] src/utils/helpers.js
- [ ] src/utils/notifications.js
- [ ] src/config/app.config.js
- [ ] public/service-worker.js
- [ ] index.html
- [ ] vite.config.js
- [ ] tailwind.config.js
- [ ] postcss.config.js
- [ ] package.json

### Root Files
- [ ] README.md
- [ ] SETUP_GUIDE.md
- [ ] FEATURES.md
- [ ] INTEGRATION_EXAMPLES.md
- [ ] PROJECT_SUMMARY.md
- [ ] docker-compose.yml
- [ ] .gitignore
- [ ] package.json

---

**You're all set! 🎉 Enjoy building with 8te!**

For issues or questions, refer to the documentation files or check the inline code comments.
