export const environment = {
  production: true,
  microserviceUrl: 'https://api.thefamesports.com',
  supabase: {
    url: import.meta.env.SUPABASE_URL,
    anonKey: import.meta.env.SUPABASE_ANON_KEY,
  },
  stripe: {
    publishableKey: import.meta.env.STRIPE_PUBLISHABLE_KEY,
    secretKey: import.meta.env.STRIPE_SECRET_KEY,
  },
};
