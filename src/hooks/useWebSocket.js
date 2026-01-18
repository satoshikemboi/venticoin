
// hooks/useWebSocket.js
import { useEffect, useRef, useCallback, useState } from 'react';

export const useWebSocket = (url, onMessage) => {
  const wsRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);

  const connect = useCallback(() => {
    const ws = new WebSocket(url);
    
    ws.onopen = () => {
      setIsConnected(true);
      console.log('WebSocket connected');
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onMessage(data);
      } catch (error) {
        console.error('WebSocket message error:', error);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      setIsConnected(false);
      console.log('WebSocket disconnected');
      // Reconnect after 5 seconds
      setTimeout(() => connect(), 5000);
    };

    wsRef.current = ws;
  }, [url, onMessage]);

  const disconnect = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
    }
  }, []);

  const send = useCallback((data) => {
    if (wsRef.current && isConnected) {
      wsRef.current.send(JSON.stringify(data));
    }
  }, [isConnected]);

  useEffect(() => {
    connect();
    return () => disconnect();
  }, [connect, disconnect]);

  return { send, isConnected };
};