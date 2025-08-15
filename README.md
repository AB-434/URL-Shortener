# URL Shortener

A full-stack URL shortening service built with React, Node.js, Express, and MongoDB.

## Features

- 🔗 Convert long URLs into short, shareable links
- 📊 Track click analytics for each shortened URL
- 📋 Copy shortened URLs with one click
- 📱 Responsive design works on all devices
- ⚡ Fast and lightweight

## Technologies Used

**Frontend:**
- React.js
- Framer Motion (for animations)
- Heroicons (for icons)
- Axios (for API calls)

**Backend:**
- Node.js
- Express.js
- MongoDB (with Mongoose ODM)
- ShortID (for generating unique codes)

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas cluster)
- Git

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/url-shortener.git
   cd url-shortener
Set up the backend

bash
cd url-shortener-backend
npm install
Configure environment variables
Create a .env file in the backend directory:

env
MONGODB_URI=mongodb://localhost:27017/urlshortener
PORT=5000
Set up the frontend

bash
cd ../url-shortener-frontend
npm install
Running the Application
Start the backend server

bash
cd url-shortener-backend
node server.js
Start the frontend development server

bash
cd url-shortener-frontend
npm start
Access the application
Open http://localhost:3000 in your browser

Project Structure
text
url-shortener/
├── url-shortener-backend/       # Backend code
│   ├── models/                  # MongoDB models
│   │   └── shortUrl.js          # URL model definition
│   ├── server.js               # Express server
│   ├── package.json
│   └── .env                    # Environment variables
│
├── url-shortener-frontend/      # Frontend code
│   ├── public/                 # Static files
│   ├── src/                    # React components
│   │   ├── App.js              # Main component
│   │   └── index.js            # Entry point
│   ├── package.json
│   └── README.md
│
├── .gitignore
└── README.md                   # This file
API Endpoints
Endpoint	Method	Description
/shorten	POST	Create a new short URL
/:shortCode	GET	Redirect to original URL
/api/urls	GET	Get all shortened URLs
