import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://kkwmirokqampyltvjepo.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtrd21pcm9rcWFtcHlsdHZqZXBvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxNTYyMDExNCwiZXhwIjoyMDMxMTk2MTE0fQ.Xt9MPK7bg5AxPtOnJmfzdKiQmgQ4l8VLlyXhxLY0Tfo";

export const supabase = createClient(supabaseUrl!, supabaseAnonKey!, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});