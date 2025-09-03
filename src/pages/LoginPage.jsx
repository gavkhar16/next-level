import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { loginUser } from '../Utils/App';
import AppInput from '../components/AppInput/AppInput';
import AppButton from '../components/AppButton/AppButton';
import AppHeader from '../components/AppHeader/AppHeader';
import PageContainer from '../components/PageContainer/PageContainer';
import LinkText from '../components/LinkText/LinkText';

export const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Сообщение после регистрации
  const message = location.state?.message;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // 1. Пытаемся войти
      const result = await loginUser(formData.email, formData.password);
      
      // 2. Если успешно - переходим на главную
      console.log('Вход успешен:', result);
      navigate('/mainpage');
      
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer>
      <AppHeader text="Вход" />
      
      {message && (
        <div style={{ color: 'green', margin: '10px 0' }}>
          {message}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <AppInput
          inputPlaceholder="Введите ваш email"
          value={formData.email}
          labelChange={(value) => handleInputChange('email', value)}
          inputType="email"
          isRequired
        />
        
        <AppInput
          inputPlaceholder="Введите ваш пароль"
          value={formData.password}
          labelChange={(value) => handleInputChange('password', value)}
          inputType="password"
          isRequired
        />
        
        {error && (
          <div style={{ color: 'red', margin: '10px 0' }}>
            {error}
          </div>
        )}
        
        <AppButton
          type="submit"
          text={isLoading ? 'Вход...' : 'Войти'}
          disabled={isLoading || !formData.email || !formData.password}
        />
      </form>
      
      <LinkText 
        text="Нет аккаунта? Зарегистрироваться" 
        to="/registerpage" 
      />
    </PageContainer>
  );
};