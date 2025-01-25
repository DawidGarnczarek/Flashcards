import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Z biblioteki expo/vector-icons
import { router } from 'expo-router';
import { useFlashcards } from '@/services/flashcardsContext';

export const FlashcardsBox = ({
  number,
  areLearned,
}: {
  number: number;
  areLearned: boolean;
}) => {
  const { setLearnedPlayMode, setNotLearnedPlayMode } = useFlashcards();

  const handlePlay = () => {
    router.push('/learn');
    areLearned ? setLearnedPlayMode() : setNotLearnedPlayMode();
  };

  return (
    <View style={styles.container}>
      {/* Ikona "X" */}
      {areLearned ? (
        <Ionicons name="checkmark-done-circle-outline" size={40} color="grey" />
      ) : (
        <Ionicons name="checkmark-done-circle-sharp" size={40} color="green" />
      )}

      <Text style={styles.text}>
        {number} {areLearned ? 'to learn' : 'learnded'}
      </Text>

      {/* Przyciski */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="pencil-outline" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handlePlay}>
          <Ionicons name="play-outline" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5', // Jasny szary kolor tła
    borderRadius: 20, // Zaokrąglone rogi
    padding: 10,
    margin: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3, // Cień dla Androida
  },
  icon: {
    marginLeft: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1, // Zajmuje pozostałą przestrzeń między ikoną "X" a przyciskami
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007BFF', // Kolor przycisku (np. niebieski)
    borderRadius: 20, // Okrągły kształt
    padding: 10,
    marginHorizontal: 5,
  },
});
