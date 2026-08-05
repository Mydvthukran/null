import React, { createContext, useState, useEffect, useContext } from 'react';

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    welcome_title: 'Welcome to SIET',
    welcome_subtitle: 'Empowering the next generation of engineers with practical skills and innovative thinking.',
    contact_email: 'sietpkl@gmail.com',
    contact_phone: '0172-2979887',
    address: 'Sector 26, Panchkula, Haryana, India',
    facebook_link: '#',
    twitter_link: '#',
    instagram_link: '#',
    linkedin_link: '#'
  });

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + '/settings')
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
