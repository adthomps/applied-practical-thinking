
import React, { useEffect, useState } from 'react';
import './styles/theme.css';
import { fetchInfo } from './services/api';
import { AptCard } from './app/components/AptCard';
import { AptButton } from './app/components/AptButton';

export default function App() {
  const [info, setInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchInfo()
      .then(setInfo)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'none',
      boxSizing: 'border-box',
    }}>
      <div className="apt-card apt-glass" style={{
        maxWidth: 420,
        width: '100%',
        padding: '2.5rem 2.5rem 2rem 2.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '0 8px 40px rgba(140,255,200,0.18), 0 1.5px 8px rgba(0,0,0,0.12)',
        borderRadius: '1.1rem',
        border: '1.5px solid var(--apt-border)',
        background: 'rgba(255,255,255,0.10)',
        backdropFilter: 'blur(18px) saturate(1.2)',
      }}>
        <h1 className="apt-title" style={{
          marginBottom: '2.2rem',
          fontSize: '2.1rem',
          fontWeight: 700,
          textAlign: 'center',
          lineHeight: 1.2,
        }}
        dangerouslySetInnerHTML={{__html: info ? info.message : 'Loading...'}} />
        <div className="apt-buttons" style={{
          display: 'flex',
          gap: '1rem',
          width: '100%',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
          {info && info.buttons.map((label) => {
            let href = '#';
            if (label === 'Design System') href = 'https://github.com/adthomps/apt-design-system';
            if (label === 'Design Thinking') href = 'https://github.com/adthomps/apt-design-thinking';
            if (label === 'Design Architecture') href = 'https://github.com/adthomps/apt-design-architecture';
            return (
              <AptButton
                key={label}
                as="a"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: '#fff',
                  color: '#070b16',
                  border: 'none',
                  borderRadius: '1.1rem',
                  padding: '1rem 1.5rem',
                  fontSize: '1.08rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(140,255,200,0.10)',
                  marginBottom: '0.5rem',
                  transition: 'background 220ms cubic-bezier(0.2,0.8,0.2,1), box-shadow 220ms cubic-bezier(0.2,0.8,0.2,1), color 220ms cubic-bezier(0.2,0.8,0.2,1)',
                  outline: 'none',
                }}
              >
                {label}
              </AptButton>
            );
          })}
        </div>
        {error && <div style={{color: 'red', marginTop: '1rem'}}>{error}</div>}
      </div>
    </div>
  );
}
