export const ROUTE_PATHS = {
  HOME: '/',
  FRONTEND: '/frontend',
  BACKEND: '/backend',
  CONNECTION: '/connection',
  SUPABASE_GUIDE: '/supabase-guide',
  ADMIN: '/admin',
} as const;

export const NAV_ITEMS = [
  { label: 'Home', path: ROUTE_PATHS.HOME },
  { label: 'Frontend', path: ROUTE_PATHS.FRONTEND },
  { label: 'Backend', path: ROUTE_PATHS.BACKEND },
  { label: 'Connecting Both', path: ROUTE_PATHS.CONNECTION },
  { label: 'Supabase Guide', path: ROUTE_PATHS.SUPABASE_GUIDE },
  { label: 'Admin', path: ROUTE_PATHS.ADMIN },
] as const;
