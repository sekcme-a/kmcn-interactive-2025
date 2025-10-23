
const { createClient } = require('@supabase/supabase-js');

// const ExpoSecureStoreAdapter = {
//   getItem: (key) => {
//     return SecureStore.getItemAsync(key);
//   },
//   setItem: (key, value) => {
//     SecureStore.setItemAsync(key, value);
//   },
//   removeItem: (key) => {
//     SecureStore.deleteItemAsync(key);
//   },
// };

const supabaseUrl = 'https://binodpfjvufvqpxslzhd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpbm9kcGZqdnVmdnFweHNsemhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQxMTMzNzksImV4cCI6MjAzOTY4OTM3OX0.ZUKuYR43segvTg3Orh9GF015cnU8vfwZCpwgWgDEEk0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey
);