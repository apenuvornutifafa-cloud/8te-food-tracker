# 8te - Getting Started Checklist

## ✅ Pre-Setup (Do This First)

- [ ] Install Node.js 18+ from https://nodejs.org/
- [ ] Install MongoDB locally OR create MongoDB Atlas account
- [ ] Install Git (if not already installed)
- [ ] Install VS Code or preferred editor
- [ ] Create a new folder on your computer

## ✅ Environment Setup (Do This Second)

### Backend Configuration

1. **Create `backend/.env` file with:**
   ```
   MONGODB_URI=mongodb://localhost:27017/8te
   JWT_SECRET=your_super_secret_key_12345
   PORT=5000
   NODE_ENV=development
   CLIENT_URL=http://localhost:5173
   GMAIL_USER=your_email@gmail.com
   GMAIL_PASSWORD=your_app_password
   ```

2. **Create `frontend/.env.local` file with:**
   ```
   VITE_API_URL=http://localhost:5000
   ```

## ✅ Quick Installation (5 minutes)

### Terminal 1 - Backend
```bash
cd backend
npm install
npm run dev
```

### Terminal 2 - Frontend
```bash
cd frontend
npm install
npm run dev
```

### Terminal 3 - MongoDB (if using local)
```bash
mongod
```

### Open Browser
- Go to: `http://localhost:5173`
- You should see the login page

## ✅ First Time Setup (15 minutes)

1. **Sign Up**
   - [ ] Create a test account
   - [ ] Use any email format (test@example.com)
   - [ ] Set a password

2. **Verify Login**
   - [ ] Login with your credentials
   - [ ] See the dashboard (should show empty state)
   - [ ] Check notification badge in nav

3. **Add First Food Item**
   - [ ] Click "Add Food" button
   - [ ] Fill in: Name, Category, Expiry Date
   - [ ] Click Save
   - [ ] See item in Dashboard

4. **Explore Features**
   - [ ] View food detail
   - [ ] Edit food item
   - [ ] Check Settings page
   - [ ] View Notifications

## ✅ Feature Testing (20 minutes)

### Authentication
- [ ] Sign up works
- [ ] Login works
- [ ] Profile loads
- [ ] Settings accessible

### Food Tracking
- [ ] Add food manually
- [ ] View in dashboard
- [ ] Edit details
- [ ] Delete item (if needed)

### Dashboard
- [ ] See empty state first time
- [ ] See stats after adding items
- [ ] Count displays correctly
- [ ] Status colors show

### Settings
- [ ] Can change preferences
- [ ] Can set location
- [ ] Can toggle notifications
- [ ] Changes save

### Navigation
- [ ] All menu items clickable
- [ ] Mobile menu works (if on phone)
- [ ] Desktop sidebar responsive
- [ ] No broken links

## ✅ Troubleshooting

If something doesn't work:

1. **Check Backend is Running**
   - Terminal showing "Server running on port 5000"
   - No red error messages

2. **Check Frontend is Running**
   - Terminal showing "Port 5173 is ready"
   - Browser page loads

3. **Check MongoDB is Running**
   - mongosh connects without error
   - Can see "8te" database

4. **Clear Browser Cache**
   - F12 → Application → Storage → Clear All
   - Refresh page

5. **Check Console for Errors**
   - F12 → Console tab
   - Look for red error messages
   - Check what they say

## ✅ Optional: API Testing

### Using Postman or cURL

**Test Backend Health**
```bash
curl http://localhost:5000/api/health
```

**Test Signup**
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"pass123"}'
```

## ✅ Docker Setup (Alternative)

**Skip the above and use Docker instead:**

1. Install Docker Desktop
2. Open terminal in project root
3. Run: `docker-compose up -d`
4. Wait 30 seconds
5. Open: `http://localhost:5173`
6. Stop with: `docker-compose down`

## ✅ Next Steps After Verification

- [ ] Read QUICK_REFERENCE.md (quick overview)
- [ ] Read README.md (complete documentation)
- [ ] Explore the code
- [ ] Try all features
- [ ] Configure real services (Gmail, Twilio, etc.)
- [ ] Customize theme if needed
- [ ] Add more data
- [ ] Plan deployments

## ✅ Configuration for Real Services

### Email Notifications (Gmail)
1. Create Gmail app password
2. Update GMAIL_USER and GMAIL_PASSWORD in .env

### SMS Notifications (Twilio)
1. Sign up at https://www.twilio.com/
2. Get credentials
3. Update TWILIO settings in .env

### AI Recipes (OpenAI)
1. Create OpenAI account
2. Get API key
3. Update OPENAI_API_KEY in .env

### Location (Google Maps)
1. Create Google Cloud project
2. Enable Maps & Places APIs
3. Get API key
4. Update GOOGLE_MAPS_API_KEY in .env

## ✅ Common Errors & Solutions

| Error | Solution |
|-------|----------|
| `Cannot find module 'express'` | Run `npm install` |
| `Cannot connect to MongoDB` | Start mongod or check URI |
| `CORS error` | Check CLIENT_URL in backend .env |
| `404 on API call` | Verify routes are defined |
| `Port 5000 in use` | Kill process or change PORT |
| `Port 5173 in use` | Kill process or change port |
| `Token invalid/expired` | Clear localStorage, login again |
| `Database connection timeout` | Check MongoDB is running |

## ✅ File Organization Check

After installation, verify you have:

**Backend**
- [ ] server.js
- [ ] package.json
- [ ] .env file (with YOUR values)
- [ ] middleware/ folder
- [ ] models/ folder
- [ ] routes/ folder
- [ ] services/ folder

**Frontend**
- [ ] src/App.jsx
- [ ] src/main.jsx
- [ ] src/index.css
- [ ] src/pages/ (8 files)
- [ ] src/store/ (2 files)
- [ ] src/utils/ (3 files)
- [ ] package.json
- [ ] .env.local file

## ✅ Support & Help

1. **Documentation**: Check 10+ guide files
2. **Code Comments**: Read inline explanations
3. **Terminal Output**: Read error messages carefully
4. **Browser Console**: F12 → Console for errors
5. **MongoDB**: Use mongosh to inspect database
6. **Network**: Browser DevTools → Network tab to see API calls

## ✅ Performance Tips

- Keep MongoDB running in background
- Use development mode for faster builds
- Clear cache if styles don't update
- Restart frontend if state gets stuck
- Use incognito window to test fresh session

## ✅ Final Verification

Before considering setup complete, verify:

- [ ] Backend starts without errors
- [ ] Frontend loads in browser
- [ ] Can sign up new user
- [ ] Can login with credentials
- [ ] Can see dashboard
- [ ] Can add food item
- [ ] Can navigate all pages
- [ ] Can access settings
- [ ] Can view notifications
- [ ] No console errors

---

## 🎉 You're Ready!

Once you complete all checkboxes above, your 8te application is ready to use and develop!

### Next Actions:
1. Read the documentation files
2. Explore the code
3. Test all features
4. Configure external services
5. Customize as needed
6. Deploy when ready

### Recommended Reading Order:
1. QUICK_REFERENCE.md (5 min)
2. README.md (20 min)
3. FEATURES.md (30 min)
4. Code exploration (as needed)

---

**Remember**: If something doesn't work, check the documentation and browser console first!

**Happy coding! 🚀**
