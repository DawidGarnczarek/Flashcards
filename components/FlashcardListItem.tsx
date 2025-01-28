import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Z biblioteki expo/vector-icons
import { router } from 'expo-router';
import { useFlashcards } from '@/services/flashcardsContext';

export const FlashcardListItem = ({
  id,
  frontFirstText,
  backFirstText,
}: {
  id: string;
  frontFirstText: string;
  backFirstText: string;
}) => {
  const handleEdit = () => {};
  const handleDelete = () => {};

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{frontFirstText}</Text>
      <Text style={styles.text}>{backFirstText}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleEdit}>
          <Ionicons name="pencil-outline" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleDelete}>
          <Ionicons name="trash-outline" size={20} color="white" />
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
