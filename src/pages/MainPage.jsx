import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutUser } from '../Utils/App';
import AppHeader from '../components/AppHeader/AppHeader';
import AppButton from '../components/AppButton/AppButton';
import PageContainer from '../components/PageContainer/PageContainer';

export const MainPage = () => {
  const user = getCurrentUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  if (!user) {
    return (
      <PageContainer>
        <AppHeader text="Доступ запрещен" />
        <p>Пожалуйста, войдите или зарегистрируйтесь</p>
        <AppButton text="Войти" onClick={() => navigate('/')} />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <AppHeader text={`Добро пожаловать, ${user.name}!`} />
      
      <div style={{ margin: '20px 0' }}>
        <h3>Ваши данные:</h3>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Имя:</strong> {user.name}</p>
        <p><strong>ID:</strong> {user.id}</p>
        <p><strong>Зарегистрирован:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
      </div>
      
      <AppButton 
        text="Выйти" 
        onClick={handleLogout}
      />
    </PageContainer>
  );
};