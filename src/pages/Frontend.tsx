import { motion } from 'framer-motion';
import { Code2, Palette, Cpu, Globe, Smartphone, Monitor } from 'lucide-react';
import Layout from '@/components/Layout';
import { CodeBlock, SectionCard, TechBadge, PageHero } from '@/components/DocComponents';
import { staggerContainer, staggerItem } from '@/lib/motion';

const frontendTechs = [
  { name: 'HTML5', type: 'frontend' as const },
  { name: 'CSS3', type: 'frontend' as const },
  { name: 'JavaScript', type: 'frontend' as const },
  { name: 'TypeScript', type: 'frontend' as const },
  { name: 'React', type: 'frontend' as const },
  { name: 'Vue.js', type: 'frontend' as const },
  { name: 'Angular', type: 'frontend' as const },
  { name: 'Svelte', type: 'frontend' as const },
  { name: 'Tailwind CSS', type: 'tool' as const },
  { name: 'Bootstrap', type: 'tool' as const },
  { name: 'Next.js', type: 'tool' as const },
  { name: 'Vite', type: 'tool' as const },
];

const concepts = [
  {
    icon: <Globe className="w-6 h-6" />,
    title: 'The Browser is the Runtime',
    description: 'Frontend code runs directly in the user\'s browser. The browser downloads HTML, CSS, and JavaScript files and renders the visual interface.',
    color: 'primary',
  },
  {
    icon: <Palette className="w-6 h-6" />,
    title: 'Structure, Style, Behavior',
    description: 'HTML provides structure (skeleton), CSS handles visual style (appearance), and JavaScript adds interactivity and dynamic behavior.',
    color: 'warning',
  },
  {
    icon: <Cpu className="w-6 h-6" />,
    title: 'Component-Based Architecture',
    description: 'Modern frameworks like React break the UI into reusable components — small pieces that can be composed to build complex interfaces.',
    color: 'success',
  },
  {
    icon: <Monitor className="w-6 h-6" />,
    title: 'SPA vs MPA',
    description: 'Single Page Apps (React/Vue) load once and update dynamically. Multi-Page Apps reload the full page on each navigation.',
    color: 'default',
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: 'Responsive Design',
    description: 'Frontend must work on all screen sizes — phones, tablets, and desktops. CSS media queries and utility frameworks (Tailwind) help achieve this.',
    color: 'primary',
  },
  {
    icon: <Code2 className="w-6 h-6" />,
    title: 'State Management',
    description: 'Managing dynamic data in the UI. Tools like React\'s useState, Context API, Redux, and Zustand help track and update application state.',
    color: 'warning',
  },
];

const reactExampleCode = `// A simple React component
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>
        Click me!
      </button>
    </div>
  );
}

export default Counter;`;

const htmlCssCode = `<!-- HTML Structure -->
<div class="card">
  <h2 class="card-title">Hello World</h2>
  <p class="card-body">Frontend is what users see!</p>
  <button class="btn-primary">Click Me</button>
</div>

/* CSS Styling */
.card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.btn-primary {
  background: #6366f1;
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}`;

const fetchCode = `// Calling a backend API from the frontend
async function getUserData(userId) {
  const response = await fetch(\`/api/users/\${userId}\`);
  const data = await response.json();
  console.log(data); // { name: "Ahmed", email: "a@example.com" }
}`;

export default function Frontend() {
  return (
    <Layout>
      <PageHero
        tag="Frontend Development"
        title="What is the Frontend?"
        subtitle="The frontend is everything the user sees and interacts with in their browser — the visual layer of a web application."
      />

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Definition */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <span className="w-1 h-6 bg-primary rounded-full inline-block" />
            What Is Frontend?
          </h2>
          <div className="prose max-w-none">
            <p className="text-muted-foreground leading-relaxed mb-4">
              The <span className="text-primary font-semibold">frontend</span> (also called the "client-side") is the part of a web application
              that runs in the user's browser. It's everything you see when you open a website — the buttons, images, text, animations,
              navigation menus, and forms.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Frontend developers are responsible for translating visual designs into code that the browser can render.
              They work with three core technologies: <strong className="text-foreground">HTML</strong>, <strong className="text-foreground">CSS</strong>, and <strong className="text-foreground">JavaScript</strong>.
            </p>
            <div className="p-4 rounded-lg border-l-4 border-primary bg-primary/5 my-6">
              <p className="text-sm text-foreground font-medium">
                💡 Think of it this way: If a website is a house, the <strong>frontend is the interior</strong> — walls, furniture, colors,
                and decorations — everything the visitor interacts with.
              </p>
            </div>
          </div>
        </section>

        {/* Core Technologies */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <span className="w-1 h-6 bg-primary rounded-full inline-block" />
            The Three Pillars of Frontend
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 rounded-xl border border-chart-3/30 bg-chart-3/5">
              <div className="text-3xl mb-3">🏗️</div>
              <h3 className="font-bold text-foreground mb-2">HTML</h3>
              <p className="text-sm text-muted-foreground">HyperText Markup Language — defines the <strong className="text-foreground">structure</strong> and content. Headings, paragraphs, images, links.</p>
            </div>
            <div className="p-6 rounded-xl border border-chart-1/30 bg-chart-1/5">
              <div className="text-3xl mb-3">🎨</div>
              <h3 className="font-bold text-foreground mb-2">CSS</h3>
              <p className="text-sm text-muted-foreground">Cascading Style Sheets — controls the <strong className="text-foreground">visual appearance</strong>. Colors, fonts, layout, animations.</p>
            </div>
            <div className="p-6 rounded-xl border border-chart-2/30 bg-chart-2/5">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="font-bold text-foreground mb-2">JavaScript</h3>
              <p className="text-sm text-muted-foreground">Adds <strong className="text-foreground">interactivity</strong> and dynamic behavior. Handles clicks, form submissions, API calls.</p>
            </div>
          </div>

          <CodeBlock code={htmlCssCode} language="html + css" />
        </section>

        {/* React Example */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-primary rounded-full inline-block" />
            Modern Frontend: React
          </h2>
          <p className="text-muted-foreground mb-4">
            Today, most frontend apps are built with frameworks like <strong className="text-foreground">React</strong>.
            React lets you build reusable UI components and manage state efficiently.
          </p>
          <CodeBlock code={reactExampleCode} language="React (JSX)" />
        </section>

        {/* How Frontend Calls Backend */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-primary rounded-full inline-block" />
            Frontend → Backend Communication
          </h2>
          <p className="text-muted-foreground mb-4">
            The frontend doesn't work in isolation. It calls the backend via <strong className="text-foreground">HTTP requests</strong> to
            fetch or send data. The browser's built-in <code className="font-mono bg-muted px-1 rounded">fetch()</code> or the <code className="font-mono bg-muted px-1 rounded">axios</code> library make this easy.
          </p>
          <CodeBlock code={fetchCode} language="JavaScript (fetch)" />
        </section>

        {/* Key Concepts */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <span className="w-1 h-6 bg-primary rounded-full inline-block" />
            Key Frontend Concepts
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
            <span className="w-1 h-6 bg-primary rounded-full inline-block" />
            Frontend Technologies & Tools
          </h2>
          <div className="flex flex-wrap gap-2">
            {frontendTechs.map((tech) => (
              <TechBadge key={tech.name} name={tech.name} type={tech.type} />
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
