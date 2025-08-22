
[Try it here](https://amazonecoreport.onrender.com)

## Project Overview

This is a tool that analyzes Amazon product pages to provide a detailed environmental and sustainability impact report. By leveraging real-time web scraping and AI-powered analysis, the tool extracts product information directly from Amazon and generates a comprehensive report on the product's materials, features, and potential environmental impact.

This project aims to help consumers make more informed, eco-conscious purchasing decisions by surfacing sustainability information that is often buried or difficult to interpret. The backend uses Axios and Cheerio to extract product data, and the OpenAI API to generate insightful, human-readable summaries.

### Setup Instructions

#### 1. Clone the repository
```sh
git clone <repo-url>
cd eco-parse-insight
```

#### 2. Install dependencies (frontend)
```sh
npm install
```

#### 3. Set up environment variables

Create a `.env` file in the project root with the following:
```env
VITE_OPENAI_API_KEY=your-openai-api-key-here
# Change the below to your backend URL if hosting
VITE_API_URL=http://localhost:4000
```

#### 4. Install backend dependencies
```sh
cd backend
npm install
```

#### 5. Start the backend server
```sh
node server.js
# or, if you use nodemon for auto-reload:
# npx nodemon server.js
```

#### 6. Start the frontend (in a new terminal, from the project root)
```sh
npm run dev
```

#### 7. If using a hosting service:
```sh
# Frontend Build Command
npm run build
# Publish directory
dist
```

### Technologies Used

#### Frontend
- Vite, React, Tailwind CSS

#### Backend
- OpenAI API (Analysis Generation)
- Axios (Web Extraction)
- Cheerio (HTML Parsing)