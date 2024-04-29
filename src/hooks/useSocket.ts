/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

interface UseSocketOptions {
  autoConnect?: boolean;
  reconnectionAttempts?: number;
  reconnectionDelay?: number;
  id: string;
  [key: string]: any;
}

export const useSocket = (url: string, options?: UseSocketOptions) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(url, {
      autoConnect: true,
      query: { id: options?.id },
      ...options,
    });
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [url]);

  const emit = (event: string, data?: any) => {
    socket?.emit(event, data);
  };

  const on = (event: string, func: (...args: any[]) => void) => {
    socket?.on(event, func);
    return () => socket?.off(event, func);
  };

  return { socket, emit, on };
};
