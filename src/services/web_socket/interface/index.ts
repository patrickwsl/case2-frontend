export interface ClientCaptado {
  client_name: string;
  anual: {
    captado: number;
    atual: number;
    rentabilidade: number;
  };
  semestral: {
    captado: number;
    atual: number;
    rentabilidade: number;
  };
  mensal: {
    captado: number;
    atual: number;
    rentabilidade: number;
  };
  semanal: {
    captado: number;
    atual: number;
    rentabilidade: number;
  };
}
