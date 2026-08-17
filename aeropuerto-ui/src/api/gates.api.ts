import { http } from "./http";
    
export type Paginated<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export type Gates = {
  id: number;
  code: string;
  terminal: string;
  is_available: boolean;
  created_at: string;
};

export async function listGatesApi() {
  const { data } = await http.get<Paginated<Gates>>("/api/gates/");
  return data; // { ... , results: [] }
}

