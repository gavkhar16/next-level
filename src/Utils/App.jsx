import axios from "axios";
// Симуляция работы с API
const API_URL = 'https://jsonplaceholder.typicode.com';

// Ключи для localStorage
const USERS_KEY = 'app_users';
const CURRENT_USER_KEY = 'current_user';

// Получить всех пользователей из "базы"
export const getUsersFromDB = () => {
  try {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  } catch (error) {
    console.error('Ошибка получения пользователей:', error);
    return [];
  }
};

// Сохранить пользователя в "базу"
export const saveUserToDB = async (userData) => {
  try {
    // 1. Получаем текущих пользователей
    const users = getUsersFromDB();
    
    // 2. Проверяем, нет ли такого email
    const userExists = users.find(user => user.email === userData.email);
    if (userExists) {
      throw new Error('Пользователь с таким email уже существует');
    }
    
    // 3. Добавляем нового пользователя
    const newUser = {
      id: Date.now(),
      ...userData,
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    
    // 4. Сохраняем в localStorage
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    
    // 5. Имитируем запрос к реальному API
    const response = await axios.post(`${API_URL}/users`, {
      title: 'New user registered',
      body: `User ${userData.email} registered successfully`,
      userId: 1
    });
    
    return { 
      success: true, 
      user: newUser,
      apiResponse: response.data // ответ от JSONPlaceholder
    };
    
  } catch (error) {
    console.error('Ошибка сохранения пользователя:', error);
    throw error;
  }
};

// Проверить логин и пароль
export const loginUser = async (email, password) => {
  try {
    // 1. Получаем пользователей из "базы"
    const users = getUsersFromDB();
    
    // 2. Ищем пользователя
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Неверный email или пароль');
    }
    
    // 3. Сохраняем текущего пользователя
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    
    // 4. Имитируем запрос к API
    const response = await axios.post(`${API_URL}/posts`, {
      title: 'User login',
      body: `User ${email} logged in successfully`,
      userId: user.id
    });
    
    return {
      success: true,
      user: user,
      apiResponse: response.data
    };
    
  } catch (error) {
    console.error('Ошибка входа:', error);
    throw error;
  }
};

// Получить текущего пользователя
export const getCurrentUser = () => {
  try {
    const userData = localStorage.getItem(CURRENT_USER_KEY);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Ошибка получения пользователя:', error);
    return null;
  }
};

// Выйти из системы
export const logoutUser = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};