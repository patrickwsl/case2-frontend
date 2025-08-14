export interface Client {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'inactive';
}

export interface ClientData {
  items: Client[];
  total_pages: number;
}