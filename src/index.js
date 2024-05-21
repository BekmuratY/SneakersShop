import React from 'react';
import ReactDOM from 'react-dom/client'; // Импорт ReactDOM для работы с клиентским DOM
import { BrowserRouter as Router } from 'react-router-dom'; // Импорт BrowserRouter для маршрутизации
import './index.scss'; // Импорт стилей для основного файла
import 'macro-css'; // Импорт стилей для макросов
import App from './App'; // Импорт основного компонента приложения
import reportWebVitals from './reportWebVitals'; // Импорт функции для отслеживания веб-показателей

const root = ReactDOM.createRoot(document.getElementById('root')); // Создание корневого компонента ReactDOM

// Рендеринг приложения в корневой DOM-элемент с использованием строгого режима React
root.render(
  <React.StrictMode>
    {/* Оборачиваем приложение в компонент Router для использования маршрутизации */}
    <Router>
      <App /> {/* Рендерим основной компонент приложения */}
    </Router> 
  </React.StrictMode>
);

reportWebVitals(); // Запуск функции отслеживания веб-показателей
