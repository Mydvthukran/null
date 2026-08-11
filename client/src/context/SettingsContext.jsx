import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

const SettingsContext = createContext();
const SETTINGS_UPDATED_EVENT = 'siet:settings-updated';

const defaultSettings = {
  welcome_title: 'Welcome to SIET',
  welcome_subtitle: 'Empowering the next generation of engineers with practical skills and innovative thinking.',
  contact_email: 'sietpkl@gmail.com',
  contact_phone: '0172-2979887',
  address: 'Sector 26, Panchkula, Haryana, India',
  facebook_link: '#',
  twitter_link: '#',
  instagram_link: '#',
  linkedin_link: '#',
};

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(defaultSettings);

  const refreshSettings = useCallback(async () => {
    const apiBase = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '');
    try {
      const response = await fetch(`${apiBase}/settings`, { cache: 'no-store' });
      const data = await response.json();
      if (response.ok && data && !data.error) {
        setSettings((previous) => ({ ...previous, ...data }));
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  }, []);

  useEffect(() => {
    refreshSettings();

    const handleSettingsUpdated = (event) => {
      if (event.detail && typeof event.detail === 'object') {
        setSettings((previous) => ({ ...previous, ...event.detail }));
      } else {
        refreshSettings();
      }
    };

    window.addEventListener(SETTINGS_UPDATED_EVENT, handleSettingsUpdated);
    return () => window.removeEventListener(SETTINGS_UPDATED_EVENT, handleSettingsUpdated);
  }, [refreshSettings]);

  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
};
