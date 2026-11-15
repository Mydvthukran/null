/**
 * Client-Side Inspection & Shortcut Deterrent
 * Disables right-click context menu and common DevTools shortcuts (F12, Ctrl+Shift+I/J/C, Ctrl+U).
 */

export const initInspectProtection = (options = {}) => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  // In development, keep DevTools accessible for local debugging unless explicitly forced
  if (!options.force && import.meta.env.DEV && !import.meta.env.VITE_ENABLE_INSPECT_BLOCK && import.meta.env.MODE !== 'test') {
    return;
  }

  // 1. Disable Right-Click Context Menu (Inspect)
  document.addEventListener('contextmenu', (e) => {
    // Allow right click inside text fields so users can copy/paste in forms
    const tag = e.target && e.target.tagName ? e.target.tagName.toLowerCase() : '';
    if (tag === 'input' || tag === 'textarea' || e.target.isContentEditable) {
      return;
    }
    e.preventDefault();
  }, { capture: true });

  // 2. Disable Keyboard Shortcuts (F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, Ctrl+U)
  document.addEventListener('keydown', (e) => {
    const isMac = typeof navigator !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.platform);
    const metaOrCtrl = isMac ? e.metaKey : e.ctrlKey;
    const shiftOrOpt = isMac ? e.altKey : e.shiftKey;

    // F12
    if (e.key === 'F12' || e.keyCode === 123) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl+Shift+I (DevTools) / Cmd+Opt+I
    // Ctrl+Shift+J (Console) / Cmd+Opt+J
    // Ctrl+Shift+C (Inspect Element) / Cmd+Opt+C
    if (metaOrCtrl && shiftOrOpt && ['I', 'i', 'J', 'j', 'C', 'c'].includes(e.key)) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl+U / Cmd+U (View Source)
    if (metaOrCtrl && ['U', 'u'].includes(e.key)) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }, { capture: true });
};
