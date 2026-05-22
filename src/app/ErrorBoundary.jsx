import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, isChunkError: false };
  }

  static getDerivedStateFromError(error) {
    const isChunkError = error.name === 'ChunkLoadError' || 
                         (error.message && error.message.includes('dynamically imported module'));
    return { hasError: true, error, isChunkError };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    if (this.state.isChunkError && !window.sessionStorage.getItem('chunk_reloaded')) {
      window.sessionStorage.setItem('chunk_reloaded', 'true');
      window.location.reload();
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.state.isChunkError && !window.sessionStorage.getItem('chunk_reloaded')) {
        return (
          <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'system-ui' }}>
            <h2 style={{ color: '#ce3e3e' }}>Loading...</h2>
            <p>Retrying connection...</p>
          </div>
        );
      }
      return (
        <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'system-ui' }}>
          <h2 style={{ color: '#ce3e3e' }}>Something went wrong.</h2>
          <p>Please try refreshing the page.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
