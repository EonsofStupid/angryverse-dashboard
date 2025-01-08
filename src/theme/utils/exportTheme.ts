import { supabase } from '@/integrations/supabase/client';
import type { Theme } from '@/types/theme';

export const exportThemeToDatabase = async (theme: Theme): Promise<void> => {
  try {
    const { error } = await supabase
      .from('themes')
      .upsert({
        id: theme.id,
        name: theme.name,
        description: theme.description,
        is_default: theme.is_default,
        status: theme.status,
        configuration: theme.configuration,
        created_by: theme.created_by,
        created_at: theme.created_at,
        updated_at: new Date().toISOString()
      });

    if (error) throw error;
  } catch (error) {
    console.error('Error exporting theme:', error);
    throw error;
  }
};

export const createThemeBackup = async (theme: Theme): Promise<void> => {
  try {
    const { data: latestBackup, error: fetchError } = await supabase
      .from('theme_backups')
      .select('version')
      .eq('theme_id', theme.id)
      .order('version', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (fetchError && fetchError.message !== 'No rows found') throw fetchError;

    const newVersion = latestBackup ? latestBackup.version + 1 : 1;

    const { error } = await supabase
      .from('theme_backups')
      .insert({
        theme_id: theme.id,
        version: newVersion,
        configuration: theme.configuration,
        created_by: theme.created_by,
        notes: `Automatic backup - Version ${newVersion}`
      });

    if (error) throw error;
  } catch (error) {
    console.error('Error creating theme backup:', error);
    throw error;
  }
};