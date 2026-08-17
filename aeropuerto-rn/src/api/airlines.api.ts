import type { Airlines } from "../types/airlines";
import type { Paginated } from "../types/drf";
import { http } from "./http";

export async function listAirlinesApi(): Promise<Paginated<Airlines> | Airlines[]> {
  const { data } = await http.get<Paginated<Airlines> | Airlines[]>("/api/airlines/");
  return data;
}