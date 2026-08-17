import { useEffect, useState } from "react";
import {
  Container, Paper, Typography, TextField, Button, Stack,
  Table, TableHead, TableRow, TableCell, TableBody, IconButton, Alert
} from "@mui/material";

import { type Gates, listGatesApi } from "../api/gates.api"

export default function AdminGatesPage() {
 const [items, setItems] = useState<Gates[]>([]);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setError("");
      const data = await listGatesApi();
      setItems(data.results); // DRF paginado
    } catch {
      setError("No se pudo cargar la lista pública. ¿Backend encendido?");
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <Container sx={{ mt: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="h5">Lista de Gates (Público)</Typography>
          <Button variant="outlined" onClick={load}>Refrescar</Button>
        </Stack>

        {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}

        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Terminal</TableCell>
              <TableCell>Is_available</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((g) => (
              <TableRow key={g.id}>
                <TableCell>{g.id}</TableCell>
                <TableCell>{g.code}</TableCell>
                <TableCell>{g.terminal}</TableCell>
                <TableCell>{g.is_available ? "Si" : "No"}</TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}