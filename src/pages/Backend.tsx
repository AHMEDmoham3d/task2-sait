import { motion } from 'framer-motion';
import { Server, Database, Lock, GitBranch, Package, Terminal } from 'lucide-react';
import Layout from '@/components/Layout';
import { CodeBlock, SectionCard, TechBadge, PageHero } from '@/components/DocComponents';
import { staggerContainer, staggerItem } from '@/lib/motion';

const backendTechs = [
  { name: 'Node.js', type: 'backend' as const },
  { name: 'Express.js', type: 'backend' as const },
  { name: 'Python', type: 'backend' as const },
  { name: 'Django', type: 'backend' as const },
  { name: 'FastAPI', type: 'backend' as const },
  { name: 'PHP', type: 'backend' as const },
  { name: 'Laravel', type: 'backend' as const },
  { name: 'Ruby on Rails', type: 'backend' as const },
  { name: 'PostgreSQL', type: 'tool' as const },
  { name: 'MySQL', type: 'tool' as const },
  { name: 'MongoDB', type: 'tool' as const },
  { name: 'Redis', type: 'tool' as const },
  { name: 'Supabase', type: 'tool' as const },
  { name: 'Firebase', type: 'tool' as const },
];

const concepts = [
  {
    icon: <Server className="w-6 h-6" />,
    title: 'API (Application Programming Interface)',
    description: 'The backend exposes APIs — endpoints that the frontend can call to request data or trigger actions. Like a menu in a restaurant.',
    color: 'success',
  },
  {
    icon: <Database className="w-6 h-6" />,
    title: 'Database',
    description: 'Persistent storage for all your data — users, posts, orders. Relational (SQL: PostgreSQL, MySQL) or NoSQL (MongoDB, Firestore).',
    color: 'primary',
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: 'Authentication',
    description: 'Verifying who the user is. Handles login, registration, JWT tokens, sessions, and OAuth (Google, GitHub login).',
    color: 'warning',
  },
  {
    icon: <GitBranch className="w-6 h-6" />,
    title: 'Business Logic',
    description: 'The rules and workflows of your app — calculating prices, sending emails, processing payments, validating data.',
    color: 'default',
  },
  {
    icon: <Package className="w-6 h-6" />,
    title: 'Middleware',
    description: 'Code that runs between the request and response — like authentication checks, logging, rate limiting, and CORS handling.',
    color: 'success',
  },
  {
    icon: <Terminal className="w-6 h-6" />,
    title: 'Server Environment',
    description: 'Backend runs on a server (not a browser). Can be hosted on AWS, Vercel, Railway, Render, or services like Supabase Edge Functions.',
    color: 'primary',
  },
];

const nodeApiCode = `// Simple Express.js REST API (Node.js)
const express = require('express');
const app = express();
app.use(express.json());

// GET endpoint — return all users
app.get('/api/users', async (req, res) => {
  const users = await db.query('SELECT * FROM users');
  res.json(users);
});

// POST endpoint — create a new user
app.post('/api/users', async (req, res) => {
  const { name, email } = req.body;
  const newUser = await db.query(
    'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
    [name, email]
  );
  res.status(201).json(newUser.rows[0]);
});

app.listen(3000, () => console.log('Server running on port 3000'));`;

const pythonCode = `# FastAPI example (Python)
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class User(BaseModel):
    name: str
    email: str

@app.get("/api/users")
async def get_users():
    return [{"id": 1, "name": "Ahmed", "email": "ahmed@test.com"}]

@app.post("/api/users")
async def create_user(user: User):
    # Save to database...
    return {"id": 2, "name": user.name, "email": user.email}`;

const dbCode = `-- SQL: Creating a table and querying data
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert a user
INSERT INTO users (name, email)
VALUES ('Ahmed', 'ahmed@example.com');

-- Query users
SELECT * FROM users WHERE email = 'ahmed@example.com';`;

export default function Backend() {
  return (
    <Layout>
      <PageHero
        tag="Backend Development"
        title="What is the Backend?"
        subtitle="The backend is the server-side engine powering your app — handling data, business logic, authentication, and APIs."
      />

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Definition */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <span className="w-1 h-6 bg-chart-4 rounded-full inline-block" />
            What Is Backend?
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The <span className="text-chart-4 font-semibold">backend</span> (also called the "server-side") is the part of a web application
            that runs on a server — invisible to the user but essential for everything to work. It stores your data,
            processes requests, enforces security rules, and sends responses back to the frontend.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            When you log in to a website, the frontend sends your credentials to the backend.
            The backend checks the database, verifies your password, and returns a response.
          </p>
          <div className="p-4 rounded-lg border-l-4 border-chart-4 bg-chart-4/5 my-6">
            <p className="text-sm text-foreground font-medium">
              💡 Continuing the house analogy: the <strong>backend is the foundation and plumbing</strong> —
              the infrastructure that makes everything functional, even if users never see it.
            </p>
          </div>
        </section>

        {/* API section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-chart-4 rounded-full inline-block" />
            Building a REST API with Node.js
          </h2>
          <p className="text-muted-foreground mb-4">
            The most common pattern is a <strong className="text-foreground">REST API</strong>. Each URL endpoint
            handles a specific resource (users, posts, etc.) and responds with JSON data.
          </p>
          <CodeBlock code={nodeApiCode} language="Node.js (Express)" />
        </section>

        {/* Python example */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-chart-4 rounded-full inline-block" />
            Backend with Python (FastAPI)
          </h2>
          <p className="text-muted-foreground mb-4">
            Python is another popular backend language. <strong className="text-foreground">FastAPI</strong> is
            modern, fast, and auto-generates documentation for your API.
          </p>
          <CodeBlock code={pythonCode} language="Python (FastAPI)" />
        </section>

        {/* Database */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-chart-4 rounded-full inline-block" />
            Databases — Storing Your Data
          </h2>
          <p className="text-muted-foreground mb-4">
            Every backend needs a database. SQL databases like <strong className="text-foreground">PostgreSQL</strong> store
            data in structured tables with rows and columns, using SQL queries to interact with data.
          </p>
          <CodeBlock code={dbCode} language="SQL (PostgreSQL)" />
        </section>

        {/* Key Concepts */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <span className="w-1 h-6 bg-chart-4 rounded-full inline-block" />
            Key Backend Concepts
          </h2>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {concepts.map((c) => (
              <motion.div key={c.title} variants={staggerItem}>
                <SectionCard {...c} />
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Technologies */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <span className="w-1 h-6 bg-chart-4 rounded-full inline-block" />
            Backend Technologies & Tools
          </h2>
          <div className="flex flex-wrap gap-2">
            {backendTechs.map((tech) => (
              <TechBadge key={tech.name} name={tech.name} type={tech.type} />
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
