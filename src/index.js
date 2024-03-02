import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from "./components/App"
// import DateCounter from "./Lesson/DateCounter";
// import DateCounter2 from "./Lesson/DateCounter2";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    {/* <DateCounter /> */}
    {/* <DateCounter2 /> */}
  </React.StrictMode>
);
