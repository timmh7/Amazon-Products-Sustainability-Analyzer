https://lovable.dev/projects/1d7ad583-cfc2-4826-9451-34333be8a9c5

Amazon product analysis tool that provides an detailed environmental/sustainability impact report.

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

#### 7. Usage
- Open your browser to the local address shown in the terminal (usually http://localhost:5173)
- Paste an Amazon product URL and analyze its sustainability impact!

### Technologies Used

#### Frontend
- Vite, React, Tailwind CSS

#### Backend
- OpenAI API (Analysis Generation)
- Axios (Web Extraction)
- Cheerio (HTML Parsing)