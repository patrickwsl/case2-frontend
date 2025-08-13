import { useEffect, useState } from "react";
import { ClientCaptado } from "../interface";


export function useCaptadoUpdates(month?: number, year?: number) {
  const [data, setData] = useState<ClientCaptado[]>([]);

  useEffect(() => {
    const ws = new WebSocket(`ws://127.0.0.1:8000/ws/captado?month=${month}&year=${year}`);

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
  }, [month, year]);

  return data;
}
