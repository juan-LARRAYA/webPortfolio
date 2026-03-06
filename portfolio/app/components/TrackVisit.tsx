'use client';

import { useEffect } from 'react';

export default function TrackVisit() {
  useEffect(() => {
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language: navigator.language,
        screen_width: screen.width,
        screen_height: screen.height,
        referrer: document.referrer || null,
        page_path: window.location.pathname,
      }),
    }).catch(() => {/* silent fail */});
  }, []);

  return null;
}
