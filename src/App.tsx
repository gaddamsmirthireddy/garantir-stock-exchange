import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js';
import './App.css'; // Assuming you have a CSS file for styling
import landingBg from './assets/images/landing-bg.jpg'; // Assuming this image exists in your project

const App: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null); // Using useRef to get the canvas reference

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
            datasets: [
              {
                label: 'Stock Prices',
                data: [150, 200, 180, 220, 240],
                borderColor: 'orange',
                backgroundColor: 'rgba(255, 165, 0, 0.2)',
                borderWidth: 2,
                tension: 0.3, // Smooth line
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: true,
                position: 'top',
              },
            },
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      }
    }
  }, []);

  return (
    <div className="App">
      <div
        className="landing-page"
        style={{
          backgroundImage: `url(${landingBg})`,
          backgroundSize: 'cover',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
        }}
      >
        <h1>Welcome to Garantir Stock Exchange</h1>
        <canvas ref={canvasRef} style={{ maxWidth: '600px', marginTop: '20px' }}></canvas>
      </div>
    </div>
  );
};

export default App;
