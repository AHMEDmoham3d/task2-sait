import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Layout from '@/components/Layout';
import { CodeBlock, PageHero } from '@/components/DocComponents';

const fetchGetCode = `// 1. GET request — fetch data from the backend
async function loadUsers() {
  try {
    const response = await fetch('https://api.example.com/users');
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const users = await response.json();
    console.log(users); // Array of user objects
    return users;
  } catch (error) {
    console.error('Failed to fetch users:', error);
  }
}`;

const fetchPostCode = `// 2. POST request — send data to the backend
async function createUser(name, email) {
  const response = await fetch('https://api.example.com/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_API_TOKEN'
    },
    body: JSON.stringify({ name, email })
  });
  
  const newUser = await response.json();
  console.log('Created user:', newUser);
  return newUser;
}

// Call it
createUser('Ahmed', 'ahmed@example.com');`;

const axiosCode = `// Using Axios (popular alternative to fetch)
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.example.com',
  headers: {
    'Authorization': \`Bearer \${process.env.API_KEY}\`
  }
});

// GET
const { data: users } = await api.get('/users');

// POST
const { data: newUser } = await api.post('/users', {
  name: 'Ahmed',
  email: 'ahmed@example.com'
});

// PUT (update)
await api.put(\`/users/\${userId}\`, { name: 'Updated Name' });

// DELETE
await api.delete(\`/users/\${userId}\`);`;

const restConventions = `// REST API URL Conventions:
// GET    /api/users          → Get all users
// GET    /api/users/:id      → Get one user by ID
// POST   /api/users          → Create a new user
// PUT    /api/users/:id      → Update a user (full update)
// PATCH  /api/users/:id      → Update a user (partial)
// DELETE /api/users/:id      → Delete a user

// HTTP Status Codes:
// 200 OK              → Success
// 201 Created         → Resource created successfully
// 400 Bad Request     → Invalid data sent
// 401 Unauthorized    → Not logged in
// 403 Forbidden       → Not allowed
// 404 Not Found       → Resource doesn't exist
// 500 Internal Error  → Server crashed`;

const corsCode = `// On the BACKEND (Node.js/Express) — allow frontend requests
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:5173', // Your React dev server
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// In production, set the actual frontend domain:
// origin: 'https://yourapp.com'`;

const envCode = `// .env file (NEVER commit this to Git!)
VITE_API_BASE_URL=https://api.example.com
VITE_SUPABASE_URL=https://xyz.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...your_key_here

// In your React code:
const apiUrl = import.meta.env.VITE_API_BASE_URL;
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;`;

const steps = [
  'Frontend sends an HTTP request to a backend URL (API endpoint)',
  'The request travels over the internet to the server',
  'Backend receives the request, validates it, and processes the logic',
  'Backend queries the database if needed',
  'Backend returns a JSON response',
  'Frontend receives the response and updates the UI',
];

export default function Connection() {
  return (
    <Layout>
      <PageHero
        tag="Frontend ↔ Backend"
        title="Connecting Frontend to Backend"
        subtitle="Learn how the browser talks to the server using HTTP requests, REST APIs, and secure API keys."
      />

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* How it works */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <span className="w-1 h-6 bg-chart-3 rounded-full inline-block" />
            How the Connection Works — Step by Step
          </h2>
          <div className="space-y-3 mb-8">
            {steps.map((step, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border">
                <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-mono font-bold flex-shrink-0">
                  {i + 1}
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-chart-4 flex-shrink-0" />
                  <p className="text-sm text-foreground">{step}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Visual flow */}
          <div className="p-6 rounded-xl bg-muted border border-border font-mono text-sm">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center">
              <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 text-primary">
                🖥️ Browser (React)<br />
                <span className="text-xs text-muted-foreground">fetch('/api/users')</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-muted-foreground">
                <div className="text-xs">HTTP Request →</div>
                <ArrowRight className="w-5 h-5 text-primary" />
                <div className="text-xs">← JSON Response</div>
              </div>
              <div className="p-3 rounded-lg bg-chart-4/10 border border-chart-4/20 text-chart-4">
                ⚙️ Server (API)<br />
                <span className="text-xs text-muted-foreground">Express / FastAPI</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-muted-foreground">
                <div className="text-xs">SQL Query →</div>
                <ArrowRight className="w-5 h-5 text-chart-4" />
                <div className="text-xs">← Rows</div>
              </div>
              <div className="p-3 rounded-lg bg-chart-2/10 border border-chart-2/20 text-chart-2">
                🗄️ Database<br />
                <span className="text-xs text-muted-foreground">PostgreSQL / MySQL</span>
              </div>
            </div>
          </div>
        </section>

        {/* REST Conventions */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-chart-3 rounded-full inline-block" />
            REST API Conventions
          </h2>
          <p className="text-muted-foreground mb-4">
            REST (Representational State Transfer) is the most common style for designing APIs.
            It uses HTTP methods (GET, POST, PUT, DELETE) and meaningful URLs to perform operations on resources.
          </p>
          <CodeBlock code={restConventions} language="REST Conventions" />
        </section>

        {/* Fetch API */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-chart-3 rounded-full inline-block" />
            Using the Fetch API
          </h2>
          <CodeBlock code={fetchGetCode} language="JavaScript" />
          <CodeBlock code={fetchPostCode} language="JavaScript" />
        </section>

        {/* Axios */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-chart-3 rounded-full inline-block" />
            Using Axios (Recommended)
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong className="text-foreground">Axios</strong> is a popular HTTP client library that simplifies API calls
            with automatic JSON parsing, interceptors, and better error handling.
          </p>
          <CodeBlock code={axiosCode} language="JavaScript (Axios)" />
        </section>

        {/* CORS */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-chart-3 rounded-full inline-block" />
            CORS — Cross-Origin Resource Sharing
          </h2>
          <div className="p-4 rounded-lg border-l-4 border-destructive bg-destructive/5 mb-4">
            <p className="text-sm text-foreground font-medium">
              ⚠️ <strong>Common Error:</strong> When your React app (localhost:5173) calls a backend on a different
              origin (localhost:3000), browsers block it by default. You must configure CORS on the backend.
            </p>
          </div>
          <CodeBlock code={corsCode} language="Node.js CORS Setup" />
        </section>

        {/* API Keys / Environment Variables */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-chart-3 rounded-full inline-block" />
            API Keys & Environment Variables
          </h2>
          <p className="text-muted-foreground mb-4">
            API keys are secret credentials that identify your application to the backend.
            Always store them in <strong className="text-foreground">.env files</strong> — never hardcode them in your source code.
          </p>
          <CodeBlock code={envCode} language=".env + React" />
          <div className="p-4 rounded-lg border-l-4 border-chart-3 bg-chart-3/5 mt-4">
            <p className="text-sm text-foreground font-medium">
              🔑 In React (Vite), environment variables MUST start with <code className="font-mono bg-muted px-1 rounded">VITE_</code> to be accessible
              in your code via <code className="font-mono bg-muted px-1 rounded">import.meta.env.VITE_...</code>
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
}
