import { supabase } from '@/integrations/supabase/client';
import type { Theme, DatabaseTheme } from '@/types/theme';

export const exportThemeToDatabase = async (theme: Theme): Promise<void> => {
  try {
    const dbTheme: DatabaseTheme = {
      ...theme,
      configuration: theme.configuration as any
    };

    const { error } = await supabase
      .from('themes')
      .upsert(dbTheme);

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

    const backupData = {
      theme_id: theme.id,
      version: newVersion,
      configuration: theme.configuration as any,
      created_by: theme.created_by,
      notes: `Automatic backup - Version ${newVersion}`
    };

    const { error } = await supabase
      .from('theme_backups')
      .insert(backupData);

    if (error) throw error;
  } catch (error) {
    console.error('Error creating theme backup:', error);
    throw error;
  }
};