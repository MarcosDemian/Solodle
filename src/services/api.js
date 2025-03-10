const API_URL = 'https://solodleapi.up.railway.app/api/characters';

export const login = async () => {
  try {
    const credentials = {
      username: import.meta.env.VITE_API_USERNAME,
      password: import.meta.env.VITE_API_USERPASSWORD,
    };

    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Error al iniciar sesión');
    }

    const data = await response.json();
    return data.token;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getRandomCharacter = async (token) => {
  try {
    const response = await fetch(`${API_URL}/random-character`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener el personaje del día');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};