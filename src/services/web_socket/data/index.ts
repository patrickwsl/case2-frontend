import { useEffect, useState } from "react";
import { ClientCaptado } from "../interface";


export function useCaptadoUpdates() {
  const [data, setData] = useState<ClientCaptado[]>([]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/ws/prices");

    ws.onmessage = (event) => {
      const received = JSON.parse(event.data);
      if (received.error) {
        console.error("WebSocket error:", received.error);
        return;
      }
      setData(received);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      ws.close();
    };
  }, []);

  return data;
}
