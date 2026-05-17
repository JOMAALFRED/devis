import { supabaseAdmin } from './supabase';

export async function checkRateLimit(ip: string): Promise<{ allowed: boolean; remaining: number }> {
  try {
    await supabaseAdmin
      .from('rate_limits')
      .delete()
      .lt('created_at', new Date(Date.now() - 60 * 60 * 1000).toISOString());

    const { count, error } = await supabaseAdmin
      .from('rate_limits')
      .select('*', { count: 'exact', head: true })
      .eq('ip', ip)
      .gt('created_at', new Date(Date.now() - 60 * 60 * 1000).toISOString());

    if (error) throw error;

    const remaining = 3 - (count || 0);
    const allowed = remaining > 0;

    return { allowed, remaining: Math.max(0, remaining) };
  } catch (error) {
    console.error('Rate limit error:', error);
    return { allowed: true, remaining: 3 };
  }
}

export async function recordSubmission(ip: string): Promise<void> {
  await supabaseAdmin
    .from('rate_limits')
    .insert({ ip, created_at: new Date().toISOString() });
}
