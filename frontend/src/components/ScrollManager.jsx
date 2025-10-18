import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Handles scroll restoration and hash-based smooth scrolling after route changes
export default function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    const { pathname, hash } = location;

    // Always reset scroll to top on pathname change
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });

    if (hash) {
      // Try to scroll to the element once it's in the DOM
      const id = hash.replace('#', '');
      let attempts = 0;
      const maxAttempts = 20;

      const scrollToHash = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return true;
        }
        return false;
      };

      // Attempt immediately, then retry a few times to accommodate route/component rendering
      if (!scrollToHash()) {
        const interval = setInterval(() => {
          attempts += 1;
          if (scrollToHash() || attempts >= maxAttempts) {
            clearInterval(interval);
          }
        }, 50);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, location.hash]);

  return null;
}
