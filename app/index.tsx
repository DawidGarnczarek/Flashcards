export const options = {
  headerShown: false,
};

import { FlashcardsBox } from '@/components/FlashcardsBox';
import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Flashcard } from './types';
import { addFlashcard, getFlashcards } from '@/services/realmService';
import { router, UnknownInputParams } from 'expo-router';
import { useFlashcards } from '@/services/flashcardsContext';

export default function Index() {
  console.log('HELLO');
  const { flashcards } = useFlashcards();

  // Pobranie fiszek z bazy danych po załadowaniu komponentu

  console.log('Flashcards first', flashcards[0]);

  const handleAddNewFlashcard = () => {
    console.log('handleAddNewFlashcard');
    try {
      addFlashcard({
        front: { firstText: 'koza' },
        back: { firstText: 'goat' },
      });
    } catch (error: unknown) {
      console.log('Add new flashcard error', error);
    }
  };

  return (
    <View style={styles.container}>
      <FlashcardsBox number={20} areLearned={true} />
      <FlashcardsBox number={122} areLearned={false} />

      <TouchableOpacity
        style={styles.floatingButton}
        // onPress={handleAddNewFlashcard}
        onPress={() => router.push('/learn')}
      >
        <Icon name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  floatingButton: {
    width: 60,
    height: 60,
    backgroundColor: '#007bff',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});
