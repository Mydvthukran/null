import React, { createContext, useState, useEffect, useContext } from 'react';

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    welcome_title: 'Welcome to SIET',
    welcome_subtitle: 'Empowering the next generation of engineers with practical skills and innovative thinking.',
    contact_email: 'info@siet.edu.in',
    contact_phone: '+91-1234567890',
    address: 'SIET Campus, Main Road, City, State 123456',
    facebook_link: '#',
    twitter_link: '#',
    instagram_link: '#',
    linkedin_link: '#'
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data && !data.error) {
          setSettings(prev => ({ ...prev, ...data }));
        }
      })
      .catch(err => console.error('Error fetching settings:', err));
  }, []);

  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
};
