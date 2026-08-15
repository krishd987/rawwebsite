# Team RAW - Robotics & Aviation Wing Official Website

Welcome to the official website repository for **Team RAW (Robotics & Aviation Wing)** of St. Francis Institute of Technology.

This is a modern, high-performance web platform built to showcase the team's robots, achievements, competition history, and technical updates. The project includes a public-facing frontend and a secure, authenticated Admin Dashboard for content management.

---

## 🌟 Key Features

- **Robots Showcase**: An interactive, dynamic gallery displaying the team's robotic creations.
- **Competitions & Achievements**: A timeline of past and upcoming robotics competitions.
- **Live Updates**: A dedicated section for team announcements and latest news.
- **Contact & Registration**: Built-in forms for getting in touch and event registrations.
- **Admin Dashboard**: A secure backend panel to manage robots, gallery images, updates, and competition details.

## 🛠 Tech Stack

### Frontend
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Library**: [React 18](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: Pure CSS Modules (`.module.css`) with a futuristic, robotics-themed design system.
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)

### Backend & Cloud
- **Database**: [Firebase Firestore](https://firebase.google.com/docs/firestore) (Server-side via Admin SDK)
- **Media Storage**: [Cloudinary](https://cloudinary.com/) (Optimized image and video hosting)
- **Deployment**: [Vercel](https://vercel.com/)

---

## 🎨 Design System

- **Color Palette**: Navy Blue (`#0A1A3A`), Dark Steel (`#0F0F17`), Red Accent (`#E10600`), White (`#ffffff`)
- **Typography**: Orbitron (Headings), Montserrat/Roboto (Body)
- **Theme**: Futuristic, minimalistic, modern with soft shadows and technical grid patterns.

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18.x or newer) and `npm` installed on your machine.

### 1. Clone the Repository
```bash
git clone https://github.com/teamrawsfit/rawwebsite.git
cd rawwebsite
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables setup
This project uses Firebase (Admin SDK) and Cloudinary. You must create a `.env` file in the root directory and an `admin/.env` file in the admin directory. 

Populate them with the following variables:

```env
# API & Site URLs
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_ADMIN_URL=http://localhost:3001

# Firebase Admin (Server-side SECRETS - DO NOT expose to browser)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-service-account-email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# Firebase Client (Public Config - Safe for browser)
CONFIG_FIREBASE_API_KEY=your-api-key
CONFIG_FIREBASE_AUTH_DOMAIN=your-auth-domain
CONFIG_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
CONFIG_FIREBASE_APP_ID=your-app-id
CONFIG_FIREBASE_MEASUREMENT_ID=your-measurement-id

# Cloudinary (Media Storage)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### 4. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the main website.

---

## 📁 Project Structure

```
rawwebsite/
├── admin/                      # Dedicated Admin Dashboard project
├── public/                     # Static assets (images, icons)
├── src/
│   ├── app/                    # Next.js App Router (Pages & API routes)
│   │   ├── api/                # Backend Serverless API endpoints
│   │   ├── components/         # Reusable React components
│   │   ├── (routes)/           # Public-facing pages (Home, Gallery, etc.)
│   ├── lib/                    # Core library files (Firebase initialization)
│   ├── styles/                 # CSS Modules for component styling
│   └── config/                 # Global configuration files
├── .env                        # Environment variables (Ignored by Git)
└── package.json                # Project dependencies and scripts
```

## ☁️ Deployment

This project is optimized for deployment on **Vercel**. 
When deploying, ensure that you manually copy the contents of your local `.env` files into the **Vercel Environment Variables** settings panel for both the main site and the admin project.

---

*Engineered by Team RAW | St. Francis Institute of Technology*
