export const environment = {
  production: true,
  microserviceUrl: 'https://cha-ching-microservice.vercel.app',
  supabase: {
    url: import.meta.env.SUPABASE_URL,
    anonKey: import.meta.env.SUPABASE_ANON_KEY,
  },
  stripe: {
    publishableKey: import.meta.env.STRIPE_PUBLISHABLE_KEY,
    secretKey: import.meta.env.STRIPE_SECRET_KEY,
  },
};
