import { http } from "./http";
    
export type Paginated<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export type Flights = {
  id: number;
  gate_id: number;
  gate_code: string;

  flight_number: string;
  destination: string;
  status: string;
  departure_time: string;
  created_at: string;
};

export async function listFlightsApi() {
  const { data } = await http.get<Paginated<Flights>>("/api/flights/");
  return data; // { ... , results: [] }
}
export async function createFlightsApi(payload: Omit<Flights, "id">) {
  const { data } = await http.post<Flights>("/api/flights/", payload);
  return data;
}
