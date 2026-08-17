import { useEffect, useState } from "react";
import {
  Container, Paper, Typography, TextField, Button, Stack,
  Table, TableHead, TableRow, TableCell, TableBody,  Alert,
  FormControl, InputLabel, Select, MenuItem
} from "@mui/material";


import {listFlightsApi, createFlightsApi, } from "../api/flights.api";
import type { Flights } from "../api/flights.api";
import type { Gates } from "../api/gates.api";
import { listGatesApi } from "../api/gates.api";

export default function AdminFlightsPage() {
    
  const [items, setItems] = useState<Flights[]>([]);
  const [gates, setGates] = useState<Gates[]>([]);
  const [error, setError] = useState("");


  const [gate_id, setGate_id] = useState<number>(0);
  const [flight_number, setFlight_number] = useState("");
  const [destination, setDestination] = useState("");
  const [status, setStatus] = useState("");
  const [departure_time, setDeparture_time] = useState("");

  const load = async () => {
    try {
      setError("");
      const data = await listFlightsApi();
      setItems(data.results); // DRF paginado
    } catch {
      setError("No se pudo cargar flights. ¿Login? ¿Token admin?");
    }
  };

  const loadGates = async () => {
    try {
      const data = await listGatesApi();
      setGates(data.results); // DRF paginado
      if (!gate_id && data.results.length > 0) setGate_id(data.results[0].id);
    } catch {
      // si falla, no bloquea la pantalla
    }
  };

  useEffect(() => { load(); loadGates(); }, []);

  const save = async () => {
    try {
      setError("");
      if (!gate_id) return setError("Seleccione una Gate");
      if (!flight_number.trim() || !destination.trim()) return setError("flight number y destination son requeridos");

      const payload = {
        gate_id: Number(gate_id),
        flight_number: flight_number.trim(),
        destination: destination.trim(),
        status: status.trim(),
        departure_time: departure_time.trim(),
      };

      await createFlightsApi(payload as any);

      setFlight_number("");
      setDestination("");
      setStatus("");
      setDeparture_time("");
      await load();

    } catch { 
      setError("No se pudo guardar Flight. ¿Token admin?");
    }
  };

  return (
    <Container sx={{ mt: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Flights </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Stack spacing={2} sx={{ mb: 2 }}>

          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>

            <FormControl sx={{ width: 260 }}>
              <InputLabel id="gate_id-label">Gates</InputLabel>
              <Select
                labelId="gate_id-label"
                label="Gate"
                value={gate_id}
                onChange={(e) => setGate_id(Number(e.target.value))}
              >
                {gates.map((gate) => (
                  <MenuItem key={gate.id} value={gate.id}>
                    {gate.code} (#{gate.id})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField label="flight_number" value={flight_number} onChange={(e) => setFlight_number(e.target.value)} sx={{ width: 200 }} />
            <TextField label="destination" value={destination} onChange={(e) => setDestination(e.target.value)} sx={{ width: 200 }} />
          </Stack>

          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>

            <FormControl sx={{ width: 260 }}>
              <InputLabel id="status-label">Status</InputLabel>
                <Select
                  labelId="status-label"
                  label="Status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <MenuItem value="scheduled">Scheduled</MenuItem>
                  <MenuItem value="boarding">Boarding</MenuItem>
                  <MenuItem value="departed">Departed</MenuItem>
                  <MenuItem value="delayed">Delayed</MenuItem>
                  <MenuItem value="cancelled">Cancelled</MenuItem>

            </Select>
            </FormControl>
            <TextField label="departure_time" value={departure_time} onChange={(e) => setDeparture_time(e.target.value)} sx={{ width: 200 }} />

            <Button variant="contained" onClick={save}>{"Crear"}</Button>
            <Button variant="outlined" onClick={() => { load(); loadGates(); }}>Refrescar</Button>
          </Stack>
        </Stack>

        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Gate</TableCell>
              <TableCell>Flight Number</TableCell>
              <TableCell>Destination</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Departure Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((v) => (
              <TableRow key={v.id}>
                <TableCell>{v.id}</TableCell>
                <TableCell>{v.gate_code}</TableCell>
                <TableCell>{v.flight_number}</TableCell>
                <TableCell>{v.destination}</TableCell>
                <TableCell>{v.status}</TableCell>
                <TableCell>{v.departure_time}</TableCell>

                <TableCell align="right">
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}