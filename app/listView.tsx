import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useFlashcards } from '@/services/flashcardsContext';
import { Ionicons } from '@expo/vector-icons';
import { FlashcardListItem } from '@/components/FlashcardListItem';

export default function ListView() {
  const router = useRouter();
  const { selectedFlashcards, playMode, flashcards } = useFlashcards();

  console.log('mode', playMode);
  console.log('selectedFlashcards', selectedFlashcards);
  console.log('flashcards', flashcards);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/')}>
        <Ionicons name="arrow-back-outline" size={30} color="white" />
      </TouchableOpacity>
      <Text>Nauczone</Text>

      <View style={styles.listContainer}>
        <FlatList
          data={selectedFlashcards}
          renderItem={({ item }) => (
            <FlashcardListItem
              id={item.id}
              frontFirstText={item.front.firstText}
              backFirstText={item.back.firstText}
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>
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
  listContainer: {
    marginTop: 60,
  },
});
