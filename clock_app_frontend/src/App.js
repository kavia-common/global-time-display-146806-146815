import React, { useEffect, useMemo, useState } from 'react';
import './App.css';

/**
 * Ocean Professional Clock App
 * - Shows current time
 * - Lets user pick a timezone
 * - Modern, minimal UI with blue (#2563EB) and amber (#F59E0B) accents
 */

// Utility to list IANA time zones (modern browsers)
const getTimeZones = () => {
  if (Intl.supportedValuesOf) {
    try {
      return Intl.supportedValuesOf('timeZone');
    } catch {
      // fallback below
    }
  }
  // Fallback list (subset of common zones)
  return [
    'UTC',
    'Europe/London',
    'Europe/Paris',
    'Europe/Berlin',
    'Europe/Madrid',
    'Europe/Rome',
    'Asia/Kolkata',
    'Asia/Tokyo',
    'Asia/Shanghai',
    'Asia/Singapore',
    'Australia/Sydney',
    'America/New_York',
    'America/Chicago',
    'America/Denver',
    'America/Los_Angeles',
    'America/Sao_Paulo',
    'Africa/Johannesburg',
  ];
};

// PUBLIC_INTERFACE
function App() {
  /** Theme is light by default for modern, clean look */
  const [theme] = useState('light');

  // Apply theme to document root for CSS variables
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const zones = useMemo(() => getTimeZones(), []);
  const defaultTZ = useMemo(() => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
    } catch {
      return 'UTC';
    }
  }, []);
  const [timezone, setTimezone] = useState(defaultTZ);
  const [now, setNow] = useState(new Date());

  // Tick every second
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  // PUBLIC_INTERFACE
  const handleZoneChange = (e) => {
    setTimezone(e.target.value);
  };

  // Format the time based on timezone with a "digital clock" style
  const timeString = useMemo(() => {
    try {
      return new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: timezone,
      }).format(now);
    } catch {
      // If timezone invalid, show local time
      return now.toLocaleTimeString('en-US', { hour12: false });
    }
  }, [now, timezone]);

  // Derive a friendly label for the timezone
  const tzLabel = useMemo(() => {
    const parts = timezone.split('/');
    if (parts.length === 1) return timezone;
    return parts.map(p => p.replace(/_/g, ' ')).join(' / ');
  }, [timezone]);

  return (
    <div className="ocean-app">
      <header className="ocean-header">
        <div className="ocean-card">
          <div className="ocean-card-header">
            <div className="badge">Ocean Professional</div>
            <h1 className="title">Global Time</h1>
            <p className="subtitle">Clean. Minimal. Precise.</p>
          </div>

          <div className="controls">
            <label htmlFor="timezone" className="label">
              Timezone
            </label>
            <div className="select-wrap">
              <select
                id="timezone"
                className="select"
                value={timezone}
                onChange={handleZoneChange}
                aria-label="Select timezone"
              >
                {zones.map(z => (
                  <option key={z} value={z}>
                    {z}
                  </option>
                ))}
              </select>
              <div className="select-accent" aria-hidden="true" />
            </div>
          </div>

          <div className="clock-wrap">
            <div className="time" aria-live="polite" aria-atomic="true">
              {timeString}
            </div>
            <div className="tz-label">{tzLabel}</div>
          </div>
        </div>

        <footer className="ocean-footer">
          <span>
            Designed with <span className="accent-amber">precision</span> and{' '}
            <span className="accent-blue">clarity</span>.
          </span>
        </footer>
      </header>
    </div>
  );
}

export default App;
