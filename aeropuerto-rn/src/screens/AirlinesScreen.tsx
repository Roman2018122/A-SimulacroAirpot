import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import { listAirlinesApi } from "../api/airlines.api";
import type { Airlines } from "../types/airlines";
import { toArray } from "../types/drf";

export default function AirlinesScreen() {
  const [airlines, setAirlines] = useState<Airlines[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  const loadAll = async (): Promise<void> => {
    try {
      setErrorMessage("");

      const loadAirlines = await listAirlinesApi();
      const list = toArray(loadAirlines);
      

      setAirlines(list);
      
    } catch {
      setErrorMessage("No se pudo cargar info. ¿Token? ¿baseURL? ¿backend encendido?");
    }
  };

  useEffect(() => { loadAll(); }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={airlines}
        keyExtractor={(item) => item.id}
        style={styles.list}
        ListHeaderComponent={
          <View>
            <Text style={styles.title}>Airlines</Text>
            {!!errorMessage && <Text style={styles.error}>{errorMessage}</Text>}    

            <Pressable onPress={loadAll} style={[styles.btn, { marginBottom: 12 }]}>
              <Text style={styles.btnText}>Refrescar</Text>
            </Pressable>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={{ flex: 1, marginRight: 10 }}>

              <Text style={styles.rowText} numberOfLines={1}>ID: {item.id}</Text>
              <Text style={styles.rowText} numberOfLines={1}>Name: {item.name}</Text>
              <Text style={styles.rowSub} numberOfLines={1}>Code: {item.code}</Text>
              <Text style={styles.rowText} numberOfLines={1}>Country: {item.country}</Text>
              <Text style={styles.rowSub} numberOfLines={1}>Is Active: {item.is_active ? "activo" : "No activo" }</Text>

              <Text style={styles.rowSub} numberOfLines={1}>Created At: {item.created_at}</Text>

              
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0d1117", padding: 16 },
  title: { color: "#58a6ff", fontSize: 22, fontWeight: "800", marginBottom: 10 },
  error: { color: "#ff7b72", marginBottom: 10 },
  label: { color: "#8b949e", marginBottom: 6, marginTop: 6 },

  pickerWrap: {
    backgroundColor: "#161b22",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#30363d",
    marginBottom: 10,
    overflow: "hidden",
  },
  picker: { color: "#c9d1d9" },

  input: {
    backgroundColor: "#161b22",
    color: "#c9d1d9",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#30363d",
  },

  btn: { backgroundColor: "#21262d", borderColor: "#58a6ff", borderWidth: 1, padding: 12, borderRadius: 8 },
  btnText: { color: "#58a6ff", textAlign: "center", fontWeight: "700" },
  list: { flex: 1 },

  row: {
    backgroundColor: "#161b22",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#30363d",
  },
  rowText: { color: "#c9d1d9", fontWeight: "800" },
  rowSub: { color: "#8b949e", marginTop: 2 },
  del: { color: "#ff7b72", fontWeight: "800" },
});