import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useFlashcards } from '@/services/flashcardsContext';
import Flashcard from '@/components/Flashcard';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function LearnScreen() {
  const router = useRouter();
  const { flashcards } = useFlashcards();
  const [currentIndex, setCurentIndex] = useState(
    Math.floor(Math.random() * flashcards.length)
  );

  const getRandomIndex = (currentIndex: number): number => {
    let randomIndex = currentIndex;
    while (randomIndex === currentIndex) {
      randomIndex = Math.floor(Math.random() * flashcards.length);
    }

    return randomIndex;
  };
  console.log(currentIndex);
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/')}>
        <Ionicons name="arrow-back-outline" size={30} color="white" />
      </TouchableOpacity>

      <Flashcard
        flashcard={flashcards[currentIndex]}
        handleToLearn={() => {
          setCurentIndex(getRandomIndex(currentIndex));
        }}
        handleLearned={() => {
          setCurentIndex(getRandomIndex(currentIndex));
        }}
      />
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
