import type { Paginated } from "../types/drf";
import type { FlightEvents } from "../types/flight_events";
import { http } from "./http";

export async function listFlightEventsApi(): Promise<Paginated<FlightEvents> | FlightEvents[]> {
  const { data } = await http.get<Paginated<FlightEvents> | FlightEvents[]>("/api/events/");
  return data;
}