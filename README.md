amazonecoreport.onrender.com

Amazon product analysis tool that provides a detailed environmental/sustainability impact report.

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