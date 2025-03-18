export const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/verify', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        // Empêche les redirections automatiques
        redirect: 'manual'
      });
  
      // Vérification du type de contenu
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.error('Invalid response format:', await response.text());
        return null;
      }
  
      const data = await response.json();
      return data.user;
  
    } catch (error) {
      console.error('Auth check failed:', error);
      return null;
    }
  };