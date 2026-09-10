import React, { useState, useCallback, useRef } from "react";

/**
 * useToast - hook that returns { showToast, ToastContainer }
 * Usage: const { showToast, ToastContainer } = useToast();
 * Then place <ToastContainer /> anywhere in the component tree
 * and call showToast("message", "success"|"error"|"info"|"warning")
 */
export const useToast = () => {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  const showToast = useCallback((message, type = "success", duration = 3500) => {
    const id = ++idRef.current;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  }, []);

  const dismiss = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const ToastContainer = () => (
    <div className="toast-container" aria-live="polite" aria-atomic="false">
      {toasts.map(t => <ToastItem key={t.id} toast={t} onDismiss={dismiss} />)}
    </div>
  );

  return { showToast, ToastContainer };
};

const ICONS = {
  success: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  error:   <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  info:    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
  warning: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
};

const COLORS = {
  success: { border: "rgba(31,141,99,0.45)",  left: "#1f8d63", icon: "#1f8d63" },
  error:   { border: "rgba(206,62,62,0.45)",  left: "#ce3e3e", icon: "#ce3e3e" },
  info:    { border: "rgba(56,189,248,0.45)", left: "#0ea5e9", icon: "#0ea5e9" },
  warning: { border: "rgba(245,158,11,0.45)", left: "#d97706", icon: "#d97706" },
};

const ToastItem = ({ toast, onDismiss }) => {
  const c = COLORS[toast.type] || COLORS.info;
  return (
    <div className="toast-item" style={{
      background: "var(--surface)",
      border: `1px solid ${c.border}`,
      borderLeft: `4px solid ${c.left}`,
      borderRadius: "10px",
      padding: "0.85rem 1.1rem",
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      boxShadow: "0 8px 24px rgba(10,25,47,0.14)",
      minWidth: "260px",
      maxWidth: "420px",
    }}>
      <span style={{ color: c.icon, flexShrink: 0 }}>{ICONS[toast.type]}</span>
      <span style={{ fontSize: "0.9rem", color: "var(--ink-900)", flex: 1, fontWeight: 500 }}>{toast.message}</span>
      <button onClick={() => onDismiss(toast.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--ink-300)", padding: 0, lineHeight: 1, flexShrink: 0 }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
  );
};

export default ToastItem;
