import Layout from '@/components/Layout';
import { CodeBlock, PageHero } from '@/components/DocComponents';
import { CheckCircle2, ExternalLink, Key, Link2, Database, Shield } from 'lucide-react';

const installCode = `# Install Supabase JS client
npm install @supabase/supabase-js`;

const envCode = `# .env file in your React project root
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`;

const clientCode = `// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);`;

const queryCode = `// Fetching data from a Supabase table
import { supabase } from '@/lib/supabase';

// SELECT * FROM users
const { data, error } = await supabase
  .from('users')
  .select('*');

if (error) {
  console.error('Error:', error.message);
} else {
  console.log('Users:', data);
}

// SELECT with filter
const { data: activeUsers } = await supabase
  .from('users')
  .select('id, name, email')
  .eq('active', true)
  .order('created_at', { ascending: false })
  .limit(10);`;

const insertCode = `// INSERT — adding new data
const { data, error } = await supabase
  .from('messages')
  .insert({
    name: 'Ahmed',
    email: 'ahmed@example.com',
    subject: 'Hello',
    message: 'This is a test message',
    topic: 'general'
  })
  .select(); // Return the inserted row

console.log('Inserted:', data);`;

const updateDeleteCode = `// UPDATE a row
const { data } = await supabase
  .from('users')
  .update({ name: 'Updated Name' })
  .eq('id', 5)
  .select();

// DELETE a row
const { error } = await supabase
  .from('messages')
  .delete()
  .eq('id', 10);`;

const reactHookCode = `// Custom hook for fetching Supabase data in React
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

function useMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMessages() {
      const { data, error } = await supabase
        .from('data') // Your table name
        .select('*')
        .order('created_at', { ascending: false });

      if (error) setError(error.message);
      else setMessages(data || []);
      setLoading(false);
    }

    fetchMessages();
  }, []);

  return { messages, loading, error };
}

// Usage in a component:
function MessageList() {
  const { messages, loading, error } = useMessages();
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  
  return (
    <ul>
      {messages.map(msg => (
        <li key={msg.id}>{msg.name}: {msg.message}</li>
      ))}
    </ul>
  );
}`;

const steps = [
  {
    step: '1',
    title: 'Create a Supabase account',
    description: 'Go to supabase.com and sign up for a free account.',
    href: 'https://supabase.com',
  },
  {
    step: '2',
    title: 'Create a new project',
    description: 'Click "New Project", choose a region and set a database password.',
  },
  {
    step: '3',
    title: 'Get your API credentials',
    description: 'Go to Project Settings → API. Copy the Project URL and the anon/public API key.',
  },
  {
    step: '4',
    title: 'Create your database tables',
    description: 'Go to Table Editor → New Table. Design your schema (columns and types).',
  },
  {
    step: '5',
    title: 'Install the Supabase JS client',
    description: 'Run: npm install @supabase/supabase-js in your project.',
  },
  {
    step: '6',
    title: 'Initialize the client in your app',
    description: 'Create a supabase.ts file using your URL and anon key from .env.',
  },
];

export default function SupabaseGuide() {
  return (
    <Layout>
      <PageHero
        tag="Supabase BaaS"
        title="Using Supabase as Your Backend"
        subtitle="Supabase gives you a PostgreSQL database, REST API, Auth, and Storage — all without writing backend code."
      />

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* What is Supabase */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <span className="w-1 h-6 bg-chart-2 rounded-full inline-block" />
            What is Supabase?
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <span className="text-chart-2 font-semibold">Supabase</span> is an open-source Backend-as-a-Service (BaaS).
            It gives you a full PostgreSQL database with a REST API, real-time subscriptions, authentication, storage, and Edge Functions —
            all accessible from your frontend with just an <strong className="text-foreground">API key</strong> and a <strong className="text-foreground">project URL</strong>.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Think of Supabase as a ready-made backend. Instead of building your own Node.js server, Express routes, and database setup,
            Supabase handles all of that for you automatically.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-6">
            {[
              { icon: <Database className="w-5 h-5" />, label: 'PostgreSQL Database' },
              { icon: <Shield className="w-5 h-5" />, label: 'Authentication' },
              { icon: <Key className="w-5 h-5" />, label: 'Auto REST API' },
              { icon: <Link2 className="w-5 h-5" />, label: 'Realtime Sync' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 p-4 rounded-lg bg-card border border-border">
                <div className="text-chart-2">{item.icon}</div>
                <span className="text-sm font-medium text-foreground">{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Key Concepts */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <span className="w-1 h-6 bg-chart-2 rounded-full inline-block" />
            Understanding the API Keys & Project URL
          </h2>
          <div className="space-y-4 mb-6">
            <div className="p-5 rounded-xl border border-border bg-card">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary flex-shrink-0"><Link2 className="w-5 h-5" /></div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Project URL</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Your unique Supabase project address. Format: <code className="font-mono bg-muted px-1 rounded text-xs">https://YOUR_PROJECT_ID.supabase.co</code>
                  </p>
                  <p className="text-xs text-muted-foreground">Found in: Project Settings → API → Project URL</p>
                </div>
              </div>
            </div>
            <div className="p-5 rounded-xl border border-border bg-card">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-chart-4/10 text-chart-4 flex-shrink-0"><Key className="w-5 h-5" /></div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Anon Key (Public Key)</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    A long JWT token. Safe to use in frontend code. Allows read/write based on your Row Level Security (RLS) rules.
                  </p>
                  <p className="text-xs text-muted-foreground">Found in: Project Settings → API → Project API keys → anon public</p>
                </div>
              </div>
            </div>
            <div className="p-5 rounded-xl border border-destructive/20 bg-destructive/5">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-destructive/10 text-destructive flex-shrink-0"><Shield className="w-5 h-5" /></div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Service Role Key (Secret — Backend Only!)</h3>
                  <p className="text-sm text-muted-foreground">
                    Full admin access key. <strong className="text-destructive">NEVER use in the frontend</strong>. Only for server-side code (Edge Functions, backend servers).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Setup Steps */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <span className="w-1 h-6 bg-chart-2 rounded-full inline-block" />
            Setup: Step-by-Step
          </h2>
          <div className="space-y-3 mb-8">
            {steps.map((s) => (
              <div key={s.step} className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border">
                <div className="w-8 h-8 rounded-full bg-chart-2/10 text-chart-2 flex items-center justify-center font-mono font-bold text-sm flex-shrink-0">
                  {s.step}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground text-sm">{s.title}</h3>
                    {s.href && (
                      <a href={s.href} target="_blank" rel="noopener noreferrer"
                        className="text-chart-2 hover:underline inline-flex items-center gap-1 text-xs">
                        Visit <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{s.description}</p>
                </div>
                <CheckCircle2 className="w-4 h-4 text-chart-4 flex-shrink-0 mt-0.5" />
              </div>
            ))}
          </div>
        </section>

        {/* Code examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-chart-2 rounded-full inline-block" />
            Install & Configure
          </h2>
          <CodeBlock code={installCode} language="Terminal" />
          <CodeBlock code={envCode} language=".env" />
          <CodeBlock code={clientCode} language="TypeScript" />
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-chart-2 rounded-full inline-block" />
            Reading Data (SELECT)
          </h2>
          <CodeBlock code={queryCode} language="TypeScript" />
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-chart-2 rounded-full inline-block" />
            Writing Data (INSERT / UPDATE / DELETE)
          </h2>
          <CodeBlock code={insertCode} language="TypeScript" />
          <CodeBlock code={updateDeleteCode} language="TypeScript" />
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-chart-2 rounded-full inline-block" />
            Using Supabase in React
          </h2>
          <p className="text-muted-foreground mb-4">
            Here's a complete pattern for fetching Supabase data with a custom React hook:
          </p>
          <CodeBlock code={reactHookCode} language="React + TypeScript" />
        </section>

        {/* Your project credentials */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <span className="w-1 h-6 bg-chart-2 rounded-full inline-block" />
            This Project's Supabase Configuration
          </h2>
          <div className="p-6 rounded-xl border border-chart-2/30 bg-chart-2/5 space-y-4">
            <div>
              <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Project URL</label>
              <div className="mt-1 p-3 rounded-lg bg-background border border-border font-mono text-sm text-foreground break-all">
                https://kjrkqfwwixvapkhtssmh.supabase.co
              </div>
            </div>
            <div>
              <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Database Table</label>
              <div className="mt-1 p-3 rounded-lg bg-background border border-border font-mono text-sm text-chart-2">
                data
              </div>
            </div>
            <div>
              <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Table Schema</label>
              <div className="mt-1 grid grid-cols-2 md:grid-cols-3 gap-2">
                {['id (int8)', 'created_at (timestamptz)', 'message (text)', 'name (text)', 'email (text)', 'subject (text)', 'topic (text)'].map((col) => (
                  <div key={col} className="p-2 rounded bg-background border border-border text-xs font-mono text-muted-foreground">
                    {col}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
