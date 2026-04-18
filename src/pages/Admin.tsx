import { useState, useEffect } from 'react';
import { supabase, type DataRow } from '@/lib/supabase';
import Layout from '@/components/Layout';
import { PageHero } from '@/components/DocComponents';
import { RefreshCw, Database, Mail, User, MessageSquare, Tag, Calendar, Search, AlertCircle, Inbox } from 'lucide-react';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/motion';

export default function Admin() {
  const [data, setData] = useState<DataRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [lastFetched, setLastFetched] = useState<string>('');

  async function fetchData() {
    setLoading(true);
    setError(null);
    try {
      const { data: rows, error: err } = await supabase
        .from('data')
        .select('*')
        .order('created_at', { ascending: false });

      if (err) {
        setError(err.message);
      } else {
        setData(rows || []);
        setLastFetched(new Date().toLocaleTimeString());
      }
    } catch (e) {
      setError('Failed to connect to Supabase');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const filtered = data.filter((row) => {
    const q = search.toLowerCase();
    return (
      (row.name?.toLowerCase().includes(q) ?? false) ||
      (row.email?.toLowerCase().includes(q) ?? false) ||
      (row.subject?.toLowerCase().includes(q) ?? false) ||
      (row.topic?.toLowerCase().includes(q) ?? false) ||
      (row.message?.toLowerCase().includes(q) ?? false)
    );
  });

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  return (
    <Layout>
      <PageHero
        tag="Admin Dashboard"
        title="Data Admin Panel"
        subtitle="View and manage all records stored in your Supabase 'data' table in real-time."
      />

      <div className="container mx-auto px-4 py-10 max-w-7xl">
        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            {
              icon: <Database className="w-5 h-5" />,
              label: 'Total Records',
              value: loading ? '...' : data.length.toString(),
              color: 'text-primary',
              bg: 'bg-primary/10',
            },
            {
              icon: <Mail className="w-5 h-5" />,
              label: 'With Email',
              value: loading ? '...' : data.filter(d => d.email).length.toString(),
              color: 'text-chart-2',
              bg: 'bg-chart-2/10',
            },
            {
              icon: <MessageSquare className="w-5 h-5" />,
              label: 'With Message',
              value: loading ? '...' : data.filter(d => d.message).length.toString(),
              color: 'text-chart-4',
              bg: 'bg-chart-4/10',
            },
            {
              icon: <Tag className="w-5 h-5" />,
              label: 'Unique Topics',
              value: loading ? '...' : new Set(data.map(d => d.topic).filter(Boolean)).size.toString(),
              color: 'text-chart-3',
              bg: 'bg-chart-3/10',
            },
          ].map((stat) => (
            <div key={stat.label} className="p-4 rounded-xl border border-border bg-card flex items-center gap-3">
              <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>{stat.icon}</div>
              <div>
                <div className={`text-2xl font-bold font-mono ${stat.color}`}>{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name, email, subject, topic, or message..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-border bg-input text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <button
            onClick={fetchData}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Loading...' : 'Refresh'}
          </button>
        </div>

        {lastFetched && (
          <p className="text-xs text-muted-foreground mb-4">
            Last fetched: {lastFetched} · Showing {filtered.length} of {data.length} records
          </p>
        )}

        {/* Error State */}
        {error && (
          <div className="flex items-start gap-3 p-4 rounded-xl border border-destructive/30 bg-destructive/5 mb-6">
            <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground text-sm">Connection Error</p>
              <p className="text-sm text-muted-foreground">{error}</p>
              <p className="text-xs text-muted-foreground mt-1">Make sure the VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set correctly in your .env file.</p>
            </div>
          </div>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-24 rounded-xl bg-muted animate-pulse" />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
              <Inbox className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">
              {search ? 'No results found' : 'No data yet'}
            </h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              {search
                ? `No records match "${search}". Try a different search term.`
                : 'Your Supabase "data" table is empty. Add some records to see them here.'}
            </p>
          </div>
        )}

        {/* Data Cards */}
        {!loading && !error && filtered.length > 0 && (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
          >
            {filtered.map((row) => (
              <motion.div
                key={row.id}
                variants={staggerItem}
                className="p-5 rounded-xl border border-border bg-card hover:border-primary/40 transition-all duration-200"
                style={{ boxShadow: '0 2px 12px -2px color-mix(in srgb, var(--primary) 8%, transparent)' }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-mono font-bold">
                      #{row.id}
                    </div>
                    {row.name && (
                      <div>
                        <div className="text-sm font-semibold text-foreground flex items-center gap-1">
                          <User className="w-3 h-3 text-muted-foreground" />
                          {row.name}
                        </div>
                      </div>
                    )}
                  </div>
                  {row.topic && (
                    <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-mono bg-chart-3/10 text-chart-3 border border-chart-3/20">
                      {row.topic}
                    </span>
                  )}
                </div>

                {/* Email */}
                {row.email && (
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                    <a href={`mailto:${row.email}`} className="text-xs text-chart-2 hover:underline font-mono truncate">
                      {row.email}
                    </a>
                  </div>
                )}

                {/* Subject */}
                {row.subject && (
                  <div className="flex items-center gap-2 mb-2">
                    <Tag className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                    <span className="text-xs text-foreground font-medium">{row.subject}</span>
                  </div>
                )}

                {/* Message */}
                {row.message && (
                  <div className="mt-3 p-3 rounded-lg bg-muted/50 border border-border/50">
                    <div className="flex items-start gap-2">
                      <MessageSquare className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">{row.message}</p>
                    </div>
                  </div>
                )}

                {/* Footer */}
                <div className="flex items-center gap-1 mt-4 pt-3 border-t border-border">
                  <Calendar className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs font-mono text-muted-foreground">
                    {formatDate(row.created_at)}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Connection info footer */}
        <div className="mt-10 p-4 rounded-xl border border-border bg-muted/30">
          <p className="text-xs text-muted-foreground font-mono">
            <span className="text-chart-2">Connected to:</span>{' '}
            <span className="text-foreground">https://kjrkqfwwixvapkhtssmh.supabase.co</span>
            {' · '}
            <span className="text-chart-2">Table:</span>{' '}
            <span className="text-foreground">data</span>
          </p>
        </div>
      </div>
    </Layout>
  );
}
