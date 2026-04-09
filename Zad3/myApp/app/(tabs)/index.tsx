// App.tsx
import React, { JSX, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  ActivityIndicator,
  Alert,
  StyleSheet,
  ScrollView,
} from "react-native";

// Typ pojedynczego posta
interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export default function App(): JSX.Element {
  // Lista postów
  const [posts, setPosts] = useState<Post[]>([]);

  // Loading i błędy
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Formularz
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [userId, setUserId] = useState<string>("");

  // Odpowiedź serwera po POST
  const [serverResponse, setServerResponse] = useState<Post | null>(null);

  // =========================
  // Pobieranie danych GET
  // =========================
  const fetchPosts = async (): Promise<void> => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "https://api.jsonplaceholder.dev/posts"
      );

      if (!response.ok) {
        throw new Error("Błąd pobierania danych z serwera.");
      }

      const data: Post[] = await response.json();
      setPosts(data);
    } catch (err: any) {
      setError(err.message || "Wystąpił nieznany błąd.");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // Wysyłanie danych POST
  // =========================
  const createPost = async (): Promise<void> => {
    try {
      // Walidacja pól
      if (!title || !body || !userId) {
        Alert.alert("Błąd", "Wszystkie pola muszą być uzupełnione.");
        return;
      }

      const response = await fetch(
        "https://api.jsonplaceholder.dev",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            body,
            userId: Number(userId),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Błąd podczas wysyłania danych.");
      }

      const data: Post = await response.json();

      // Sukces
      Alert.alert("Sukces", "Post został wysłany poprawnie.");
      setServerResponse(data);

      // Czyszczenie formularza
      setTitle("");
      setBody("");
      setUserId("");

      // Odśwież listę
      fetchPosts();
    } catch (err: any) {
      Alert.alert("Błąd", err.message || "Nie udało się wysłać danych.");
    }
  };

  // Pobierz dane po uruchomieniu
  useEffect(() => {
    fetchPosts();
  }, []);

  // =========================
  // Render pojedynczego posta
  // =========================
  const renderPost = ({ item }: { item: Post }) => (
    <View style={styles.postCard}>
      <Text style={styles.postId}>ID: {item.id}</Text>
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text>{item.body}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>REST API – React Native (TypeScript)</Text>

      {/* FORMULARZ */}
      <View style={styles.formContainer}>
        <Text style={styles.sectionTitle}>Dodaj nowy post</Text>

        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />

        <TextInput
          style={styles.input}
          placeholder="Body"
          value={body}
          onChangeText={setBody}
        />

        <TextInput
          style={styles.input}
          placeholder="User ID"
          value={userId}
          onChangeText={setUserId}
          keyboardType="numeric"
        />

        <Button title="Wyślij" onPress={createPost} />
      </View>

      {/* ODPOWIEDŹ SERWERA */}
      {serverResponse && (
        <View style={styles.responseBox}>
          <Text style={styles.sectionTitle}>Odpowiedź serwera:</Text>
          <Text>ID: {serverResponse.id}</Text>
          <Text>Title: {serverResponse.title}</Text>
          <Text>Body: {serverResponse.body}</Text>
          <Text>User ID: {serverResponse.userId}</Text>
        </View>
      )}

      {/* LOADING */}
      {loading && <ActivityIndicator size="large" />}

      {/* ERROR */}
      {error ? <Text style={styles.error}>{error}</Text> : null}

      {/* LISTA POSTÓW */}
      <Text style={styles.sectionTitle}>Lista postów</Text>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPost}
        scrollEnabled={false}
      />
    </ScrollView>
  );
}

// =========================
// STYLE
// =========================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
    backgroundColor: "#fff",
  },

  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  formContainer: {
    marginBottom: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: "#999",
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
  },

  postCard: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    marginBottom: 10,
  },

  postId: {
    fontWeight: "bold",
  },

  postTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },

  error: {
    color: "red",
    marginVertical: 10,
    textAlign: "center",
  },

  responseBox: {
    padding: 15,
    backgroundColor: "#f2f2f2",
    marginBottom: 20,
    borderRadius: 10,
  },
});