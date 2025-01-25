import { Flashcard as FlashcardType } from '@/app/types';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

interface FlashcardProps {
  flashcard: FlashcardType;
  handleToLearn: () => void;
  handleLearned: () => void;
}

const { height } = Dimensions.get('window'); // Pobranie wysokości ekranu

const Flashcard: React.FC<FlashcardProps> = ({
  flashcard,
  handleToLearn,
  handleLearned,
}) => {
  const [isFront, setIsFront] = useState(true);
  const toggleSide = () => {
    setIsFront(prev => !prev);
  };

  const flashcardSide = isFront ? flashcard.front : flashcard.back;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.card} onPress={toggleSide}>
        <View>
          <Text style={styles.text}>{flashcardSide.firstText}</Text>
          {flashcardSide.secondText && (
            <Text style={styles.text}>{flashcardSide.secondText}</Text>
          )}
        </View>
      </TouchableOpacity>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'grey' }]}
          onPress={handleToLearn}
        >
          <Ionicons name="close-outline" size={20} color="white" />

          <Text style={styles.buttonText}>Don't know</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLearned}>
          <Ionicons name="checkmark-outline" size={20} color="white" />
          <Text style={styles.buttonText}>Know</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: height,
    display: 'flex',
    justifyContent: 'space-between',
    padding: 40,
  },
  card: {
    width: '90%', // Karta zajmuje 80% szerokości ekranu
    height: height * 0.5, // Karta zajmuje połowę wysokości ekranu
    margin: 'auto',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3, // Cień dla Androida
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Flashcard;
