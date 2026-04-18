import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code2, Server, Link2, Database, Shield, ArrowRight, Terminal, Layers } from 'lucide-react';
import Layout from '@/components/Layout';
import { springPresets, staggerContainer, staggerItem } from '@/lib/motion';
import { ROUTE_PATHS } from '@/lib/routes';

const topics = [
  {
    icon: <Code2 className="w-7 h-7" />,
    title: 'Frontend',
    description: 'The visible part of a web app — UI, design, and user interactions built with HTML, CSS, JavaScript frameworks.',
    path: ROUTE_PATHS.FRONTEND,
    color: 'from-primary/20 to-primary/5',
    badge: 'React · Vue · Angular',
  },
  {
    icon: <Server className="w-7 h-7" />,
    title: 'Backend',
    description: 'The server-side logic — APIs, databases, authentication, and business rules running behind the scenes.',
    path: ROUTE_PATHS.BACKEND,
    color: 'from-chart-4/20 to-chart-4/5',
    badge: 'Node.js · Python · PHP',
  },
  {
    icon: <Link2 className="w-7 h-7" />,
    title: 'Connecting Both',
    description: 'How the frontend communicates with the backend using HTTP requests, REST APIs, and fetch/axios calls.',
    path: ROUTE_PATHS.CONNECTION,
    color: 'from-chart-3/20 to-chart-3/5',
    badge: 'REST · HTTP · Fetch',
  },
  {
    icon: <Database className="w-7 h-7" />,
    title: 'Supabase Guide',
    description: 'Use Supabase as your backend-as-a-service. Learn API keys, project URLs, and database integration.',
    path: ROUTE_PATHS.SUPABASE_GUIDE,
    color: 'from-chart-2/20 to-chart-2/5',
    badge: 'Supabase · PostgreSQL',
  },
];

export default function Home() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={springPresets.smooth}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-mono mb-6">
              <Terminal className="w-4 h-4" />
              <span>Web Development Education</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
              Learn Web Dev<br />
              <span className="text-primary">from Scratch</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Understand what frontend and backend are, how they talk to each other,
              and how to use <span className="text-primary font-mono">Supabase</span> as your backend — all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <NavLink
                to={ROUTE_PATHS.FRONTEND}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
              >
                Start Learning <ArrowRight className="w-4 h-4" />
              </NavLink>
            </div>
          </motion.div>
        </div>
        {/* BG grid */}
        <div className="absolute inset-0 -z-10 opacity-5"
          style={{
            backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-100 rounded-full -z-10 opacity-10"
          style={{ background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)' }}
        />
      </section>

      {/* Topics Grid */}
      <section className="py-16 md:py-24 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground mb-3">
              <Layers className="w-4 h-4" />
              <span>TOPICS COVERED</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">What you'll learn</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A complete guide from understanding web architecture to building full-stack apps with Supabase.
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {topics.map((topic) => (
              <motion.div key={topic.path} variants={staggerItem}>
                <NavLink to={topic.path} className="block group">
                  <div className={`p-6 rounded-xl border border-border bg-linear-to-br ${topic.color} hover:border-primary/40 transition-all duration-300`}
                    style={{ boxShadow: '0 4px 20px -4px color-mix(in srgb, var(--primary) 8%, transparent)' }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-primary">{topic.icon}</div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{topic.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{topic.description}</p>
                    <span className="inline-flex px-3 py-1 rounded-full bg-background/50 text-xs font-mono text-muted-foreground border border-border/50">
                      {topic.badge}
                    </span>
                  </div>
                </NavLink>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Quick Concept */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">The Big Picture</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
            {/* Frontend box */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={springPresets.gentle}
              className="flex-1 max-w-xs p-6 rounded-xl border border-primary/30 bg-primary/5 text-center"
            >
              <Code2 className="w-10 h-10 text-primary mx-auto mb-3" />
              <h3 className="font-bold text-foreground mb-2">Frontend</h3>
              <p className="text-xs text-muted-foreground">Browser UI — React, HTML, CSS, JavaScript</p>
            </motion.div>

            {/* Arrow */}
            <div className="flex flex-col items-center px-6 gap-1">
              <div className="text-xs font-mono text-muted-foreground">HTTP Requests</div>
              <div className="flex items-center gap-2">
                <div className="w-16 h-0.5 bg-linear-to-r from-primary to-chart-4" />
                <ArrowRight className="w-4 h-4 text-chart-4 -ml-1" />
              </div>
              <div className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-primary rotate-180 -mr-1" />
                <div className="w-16 h-0.5 bg-linear-to-l from-primary to-chart-4" />
              </div>
              <div className="text-xs font-mono text-muted-foreground">JSON Response</div>
            </div>

            {/* Backend box */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={springPresets.gentle}
              className="flex-1 max-w-xs p-6 rounded-xl border border-chart-4/30 bg-chart-4/5 text-center"
            >
              <Server className="w-10 h-10 text-chart-4 mx-auto mb-3" />
              <h3 className="font-bold text-foreground mb-2">Backend</h3>
              <p className="text-xs text-muted-foreground">Server Logic — Node.js, Databases, APIs</p>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
