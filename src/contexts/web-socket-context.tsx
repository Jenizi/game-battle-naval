import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

interface WebSocketContextType {
  socket: Socket | null;
  connected: boolean;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

const SOCKET_URL = import.meta.env.VITE_APP_WEBSOCKET_URL;

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) throw new Error("useWebSocket must be used within a WebSocketProvider");
  return context;
};

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socketIo = io(SOCKET_URL, {
      autoConnect: false,
      transports: ["websocket"],
    });

    socketRef.current = socketIo;

    socketIo.connect();

    setSocket(socketIo);
    socketIo.on("connect", () => {
      socketIo.emit("message", "hello server from client", socketIo.id);
      setConnected(true);
    });

    socketIo.on("disconnect", () => {
      setConnected(false);
    });

    return () => {
      socketIo.disconnect();
      setConnected(false);
    };
  }, []);

  return <WebSocketContext.Provider value={{ socket, connected }}>{children}</WebSocketContext.Provider>;
};
