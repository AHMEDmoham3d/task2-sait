import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { springPresets } from '@/lib/motion';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = 'js' }: CodeBlockProps) {
  return (
    <div className="my-4 rounded-lg overflow-hidden border border-border">
      <div className="flex items-center justify-between px-4 py-2 bg-muted border-b border-border">
        <span className="text-xs font-mono text-muted-foreground">{language}</span>
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-destructive/60" />
          <div className="w-3 h-3 rounded-full bg-chart-3/60" />
          <div className="w-3 h-3 rounded-full bg-chart-4/60" />
        </div>
      </div>
      <pre className="p-4 overflow-x-auto bg-card text-sm font-mono text-foreground leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

interface SectionCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  color?: string;
}

export function SectionCard({ icon, title, description, color = 'primary' }: SectionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={springPresets.gentle}
      className="p-6 rounded-xl border border-border bg-card hover:border-primary/40 transition-all duration-300"
      style={{ boxShadow: '0 4px 20px -4px color-mix(in srgb, var(--primary) 10%, transparent)' }}
    >
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
        color === 'primary' ? 'bg-primary/10 text-primary' :
        color === 'success' ? 'bg-chart-4/10 text-chart-4' :
        color === 'warning' ? 'bg-chart-3/10 text-chart-3' :
        'bg-accent text-accent-foreground'
      }`}>
        {icon}
      </div>
      <h3 className="font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </motion.div>
  );
}

interface TechBadgeProps {
  name: string;
  type?: 'frontend' | 'backend' | 'tool' | 'default';
}

export function TechBadge({ name, type = 'default' }: TechBadgeProps) {
  const colors = {
    frontend: 'bg-primary/10 text-primary border-primary/20',
    backend: 'bg-chart-4/10 text-chart-4 border-chart-4/20',
    tool: 'bg-chart-3/10 text-chart-3 border-chart-3/20',
    default: 'bg-accent text-accent-foreground border-border',
  };
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-medium border ${colors[type]}`}>
      {name}
    </span>
  );
}

interface PageHeroProps {
  tag: string;
  title: string;
  subtitle: string;
  gradient?: string;
}

export function PageHero({ tag, title, subtitle, gradient }: PageHeroProps) {
  return (
    <div className={`relative overflow-hidden py-16 md:py-24 ${gradient || 'bg-gradient-to-br from-background via-accent/5 to-primary/5'}`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springPresets.smooth}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            {tag}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
            {title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        </motion.div>
      </div>
      {/* Decorative grid */}
      <div className="absolute inset-0 -z-10 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />
    </div>
  );
}
