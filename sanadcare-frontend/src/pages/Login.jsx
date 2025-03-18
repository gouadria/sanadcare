import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Card } from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Appel API d'authentification
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (response.ok) {
      const { token } = await response.json();
      localStorage.setItem('access_token', token);
      navigate('/dashboard');
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="p-6 w-96">
        <h2 className="text-2xl font-bold mb-4">Connexion</h2>
        <form onSubmit={handleSubmit}>
          <TextField 
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField 
            label="Mot de passe"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button 
            type="submit"
            variant="contained"
            fullWidth
            className="mt-4"
          >
            Se connecter
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;