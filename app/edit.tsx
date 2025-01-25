import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useFlashcards } from '@/services/flashcardsContext';
import Flashcard from '@/components/Flashcard';
import { Ionicons } from '@expo/vector-icons';

export default function EditScreen() {
  const router = useRouter();
  const { flashcards } = useFlashcards();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/')}>
        <Ionicons name="arrow-back-outline" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Umożliwia rozszerzenie całej zawartości
    position: 'relative', // Pozycjonowanie przycisku w lewym górnym rogu
  },
  button: {
    position: 'absolute', // Ustawienie przycisku na absolutną pozycję
    top: 20, // Odstęp od góry
    left: 20, // Odstęp od lewej krawędzi
    width: 50, // Szerokość przycisku
    height: 50, // Wysokość przycisku
    borderRadius: 25, // Okraślenie przycisku jako okrągły
    backgroundColor: 'grey', // Kolor przycisku
    justifyContent: 'center', // Wyśrodkowanie ikony
    alignItems: 'center', // Wyśrodkowanie ikony
    zIndex: 10,
  },
});
