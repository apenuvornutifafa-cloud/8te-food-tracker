# 8te - Food Expiry Tracking & Waste Reduction App

**8te** is a comprehensive web application that helps users track food expiry dates, reduce food waste, and support local charities through donations.

## 🌟 Features

### 1. Food Inventory Tracking
- Add food items manually with details (name, quantity, expiry date, category, location)
- Scan receipts to automatically detect items and estimate expiry dates (AI-powered)
- Visual freshness indicators (green = fresh, yellow = expiring soon, red = expired)
- Edit and delete items easily
- Categorize foods: fruits, vegetables, dairy, meat, bakery, pantry, frozen, beverages

### 2. Smart Expiry Reminders
- Customizable reminder timing (default: 30 days, 2 weeks, 1 week, 3 days before expiry)
- Multi-channel notifications: Email, Push Notifications, SMS
- Friendly, specific reminder messages (e.g., "Your bananas expire in 3 days!")
- In-app notification center with read/unread tracking
- Mute or adjust reminder frequency from Settings

### 3. AI-Powered Repurposing Suggestions
- Get recipe ideas when items are expiring soon
- Includes recipe cards with ingredients and simple instructions
- Suggestions like "banana bread" for expiring bananas

### 4. Donation Finder
- Find nearby charities and food banks based on your location
- View contact info, operating hours, and accepted items
- Mark items as "Donated" to track your impact
- Donation history and impact statistics

### 5. Dashboard & Statistics
- Summary view: items expiring soon, expired, donated
- Impact metrics: total items tracked, donations made, waste saved
- Empty state guidance for new users
- Mobile-responsive design with yellow & black theme

### 6. User Management
- Sign up/Login with email and password
- Gmail or SMS notification preferences
- Location-based features
- Profile customization

## 🎨 Design

- **Color Scheme**: Yellow (#FFD700) and Black (#1a1a1a) with earthy accents
- **UI/UX**: Clean, modern, approachable design
- **Mobile Responsive**: Fully responsive across all devices
- **Accessibility**: High contrast colors, semantic HTML

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Image Processing**: Sharp, Tesseract (OCR)
- **Notifications**: Firebase Admin SDK, Nodemailer, Twilio
- **AI**: OpenAI API (for recipe suggestions)

### Frontend
- **Framework**: React 18+
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Date Utility**: date-fns

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- MongoDB (local or Atlas)
- Git

## 🚀 Installation & Setup

### Option 1: Local Development

#### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

#### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`
The backend API will be at `http://localhost:5000`

### Option 2: Docker Setup

```bash
docker-compose up -d
```

This will start:
- MongoDB on port 27017
- Backend on port 5000
- Frontend on port 5173

## 🔧 Configuration

### Backend Environment Variables

Create a `.env` file in the `backend` folder with:

```env
MONGODB_URI=mongodb://localhost:27017/8te
JWT_SECRET=your_super_secret_key
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# Email (Gmail)
GMAIL_USER=your_email@gmail.com
GMAIL_PASSWORD=your_app_password

# SMS (Twilio)
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1234567890

# AI (OpenAI)
OPENAI_API_KEY=your_openai_api_key

# Push Notifications (Firebase)
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_CLIENT_EMAIL=your_client_email

# Location (Google Maps)
GOOGLE_MAPS_API_KEY=your_maps_api_key

# Web Push
VAPID_PUBLIC_KEY=your_vapid_public_key
VAPID_PRIVATE_KEY=your_vapid_private_key
```

## 📦 Project Structure

```
8te-food-tracker/
├── backend/
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── FoodItem.js
│   │   ├── Notification.js
│   │   ├── Charity.js
│   │   └── Donation.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── foods.js
│   │   ├── notifications.js
│   │   ├── donations.js
│   │   ├── settings.js
│   │   ├── dashboard.js
│   │   └── reminders.js
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── AddFood.jsx
│   │   │   ├── FoodDetail.jsx
│   │   │   ├── Donations.jsx
│   │   │   ├── Settings.jsx
│   │   │   └── Notifications.jsx
│   │   ├── components/
│   │   │   └── Layout.jsx
│   │   ├── store/
│   │   │   ├── authStore.js
│   │   │   └── foodStore.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── package.json
│   ├── Dockerfile
│   └── .gitignore
├── docker-compose.yml
└── README.md
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update profile

### Food Items
- `GET /api/foods` - Get all food items
- `POST /api/foods` - Add new food item
- `GET /api/foods/:id` - Get food item details
- `PUT /api/foods/:id` - Update food item
- `DELETE /api/foods/:id` - Delete food item
- `POST /api/foods/scan/image` - Scan receipt via OCR

### Notifications
- `GET /api/notifications` - Get all notifications
- `PUT /api/notifications/:id/read` - Mark as read
- `POST /api/notifications/subscribe` - Subscribe to push notifications

### Donations
- `GET /api/donations` - Get donations
- `POST /api/donations` - Create donation
- `PUT /api/donations/:id` - Update donation status
- `GET /api/donations/charities/nearby` - Find nearby charities

### Settings
- `GET /api/settings` - Get user settings
- `PUT /api/settings/notifications` - Update notification preferences
- `PUT /api/settings/location` - Update location

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/dashboard/summary` - Get food summary

## 🌐 Database Schema

### User
```javascript
{
  name: String,
  email: String (unique),
  phone: String,
  password: String (hashed),
  location: { address, latitude, longitude },
  preferences: { notificationsEnabled, emailNotifications, pushNotifications, smsNotifications, reminderDays },
  stats: { totalItemsAdded, totalItemsDonated, totalItemsWasted, estimatedWasteSaved },
  pushSubscription: { endpoint, keys }
}
```

### FoodItem
```javascript
{
  userId: ObjectId,
  name: String,
  category: String,
  quantity: Number,
  unit: String,
  expiryDate: Date,
  addedDate: Date,
  location: String,
  status: String (fresh, expiring_soon, expired, donated, used, discarded),
  notes: String,
  aiSuggestions: Array
}
```

## 🚨 Common Issues & Solutions

### MongoDB Connection Error
Ensure MongoDB is running:
```bash
# Local MongoDB
mongod

# Or use MongoDB Atlas with correct URI
```

### Port Already in Use
Change ports in .env or stop the service using the port

### Missing Environment Variables
Copy `.env.example` to `.env` and fill in your values

## 📱 Mobile App Considerations

The frontend is fully responsive and works on mobile devices. To add PWA features:

1. Add service worker support
2. Create manifest.json
3. Configure offline functionality

## 🔄 Workflow

1. **User Registration** → Creates account with email
2. **Location Setup** → Enables location-based charity finder
3. **Add Foods** → Manual or scan receipts
4. **Track Expiry** → Dashboard shows food status
5. **Receive Reminders** → Email/SMS/Push notifications
6. **Get Suggestions** → AI-powered recipe ideas
7. **Donate Items** → Find and contact charities
8. **View Impact** → Track donations and waste saved

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For issues or questions:
1. Check existing GitHub issues
2. Create a new issue with details
3. Contact: support@8te.app

## 🎯 Future Enhancements

- [ ] Mobile app (React Native)
- [ ] Barcode scanning
- [ ] Recipe integration with external APIs
- [ ] Meal planning features
- [ ] Community food sharing
- [ ] AI shopping list
- [ ] Carbon footprint calculation
- [ ] Leaderboard for donations
- [ ] Integration with grocery stores
- [ ] Multi-language support

---

Made with ❤️ to reduce food waste and save the planet.
