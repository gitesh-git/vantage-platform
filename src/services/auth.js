const STORAGE_KEY = 'photo_app_user';

export const authService = {
  login: async (email, password) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Demo login for ANY credential for now, but in a real app would check DB
    // Storing a dummy user object
    const user = {
      id: 'user_123',
      name: email.split('@')[0],
      email: email,
      avatar: `https://ui-avatars.com/api/?name=${email}&background=random`
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return user;
  },

  signup: async (name, email, password) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const user = {
      id: `user_${Date.now()}`,
      name,
      email,
      avatar: `https://ui-avatars.com/api/?name=${name}&background=random`
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return user;
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEY);
  },

  getCurrentUser: () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  },
  
  isAuthenticated: () => {
    return !!localStorage.getItem(STORAGE_KEY);
  }
};
