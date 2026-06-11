# ResumeGenie 🧞

**AI-Powered Resume Builder for Indian Job Seekers**

Create professional, ATS-friendly resumes and cover letters in under 2 minutes. Built for Indian freshers, students, and job seekers.

## Screenshots

> ![ResumeGenie Landing Page](screenshot.png)
> *Landing page with hero, features, pricing, and more*

## Tech Stack

| Frontend | Backend | AI | Payment | PDF |
|----------|---------|-----|---------|-----|
| React.js | Node.js | Claude | Razorpay | jsPDF |
| Tailwind CSS | Express.js | claude-sonnet-4-20250514 | — | html2canvas |
| Vite | — | — | — | — |

## Features

- 🤖 **AI-Powered Writing** — Claude AI writes your resume content
- 📄 **ATS Optimized** — Pass automated resume filters easily
- 💌 **Cover Letter** — Matching cover letter generated instantly
- ⚡ **2 Minute Process** — Fill form, get resume, download PDF
- 🔒 **Secure Payment** — Razorpay encrypted transactions
- 📱 **Mobile Friendly** — Build from anywhere

## Folder Structure

```
resumegenie/
├── client/                  # React frontend
│   ├── src/
│   │   ├── components/      # UI components
│   │   ├── pages/           # Home, Builder pages
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   └── package.json
├── server/                  # Express backend
│   ├── routes/
│   │   ├── generate.js      # AI resume generation
│   │   └── payment.js       # Razorpay integration
│   ├── index.js
│   ├── .env
│   └── package.json
└── README.md
```

## Installation

### Prerequisites

- Node.js 18+
- npm or yarn

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/resumegenie.git
cd resumegenie
```

### 2. Set up the Server

```bash
cd server
npm install
```

Create `server/.env`:

```env
ANTHROPIC_API_KEY=your_claude_api_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
PORT=5000
```

### 3. Set up the Client

```bash
cd client
npm install
```

Create `client/.env`:

```env
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
VITE_API_URL=http://localhost:5000
```

### 4. Run Locally

**Terminal 1 — Server:**
```bash
cd server
npm run dev
```

**Terminal 2 — Client:**
```bash
cd client
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Frontend → Vercel

```bash
cd client
npm run build
```

1. Push to GitHub
2. Import repo into Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

### Backend → Render

1. Push server folder to GitHub
2. Create new Web Service on Render
3. Set:
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `node index.js`
4. Add environment variables in Render dashboard
5. Deploy

**Update client `.env` after deployment:**

```env
VITE_API_URL=https://your-render-app.onrender.com
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/generate` | Generate resume & cover letter |
| POST | `/api/payment/create-order` | Create Razorpay order |
| POST | `/api/payment/verify` | Verify payment signature |
| GET | `/api/health` | Health check |

## Environment Variables

### Server (`server/.env`)

| Variable | Description |
|----------|-------------|
| `ANTHROPIC_API_KEY` | Claude API key for AI generation |
| `RAZORPAY_KEY_ID` | Razorpay public key |
| `RAZORPAY_KEY_SECRET` | Razorpay secret key |
| `PORT` | Server port (default: 5000) |

### Client (`client/.env`)

| Variable | Description |
|----------|-------------|
| `VITE_RAZORPAY_KEY_ID` | Razorpay public key |
| `VITE_API_URL` | Backend API URL |

## Pricing

- **Resume Only** — ₹49 (one-time)
- **Resume + Cover Letter** — ₹79 (one-time)

## License

MIT
