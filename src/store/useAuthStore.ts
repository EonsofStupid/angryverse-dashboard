checkAdminStatus: async (userId) => {
  try {
    console.log('=== Starting Admin Status Check ===');
    if (!userId) {
      console.log('No userId provided, setting isAdmin to false');
      set({ isAdmin: false });
      return;
    }

    const { data: userRoles, error } = await supabase
      .from('user_roles')
      .select('*')
      .eq('user_id', userId);

    if (error) {
      console.error('Error checking admin status:', error);
      throw error;
    }

    console.log('Raw userRoles data:', JSON.stringify(userRoles, null, 2));

    const isAdmin = Array.isArray(userRoles) && userRoles.some(role => role.role === 'admin');
    console.log('Setting isAdmin to:', isAdmin);

    set({ isAdmin });

    const currentState = get();
    console.log('Updated state:', currentState);
    console.log('=== Admin Status Check Complete ===');
  } catch (err) {
    console.error('Unexpected error in checkAdminStatus:', err);
    set({ isAdmin: false });
  }
},
