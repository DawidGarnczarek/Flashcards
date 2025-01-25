import { Flashcard } from '@/app/types';
import Realm from 'realm';
import 'react-native-get-random-values'; // required to use uuid
import { v4 as uuidv4 } from 'uuid';

const FlashcardDetailsSchema = {
  name: 'FlashcardDetails',
  properties: {
    firstText: 'string',
    secondText: 'string',
  },
};

const FlashcardSchema = {
  name: 'Flashcard',
  primaryKey: 'id',
  properties: {
    id: 'string',
    front: 'FlashcardDetails',
    back: 'FlashcardDetails',
    isLearned: 'bool',
  },
};

const openDatabase = async (): Promise<Realm> => {
  const realm = await Realm.open({
    path: 'flashcards.realm',
    schema: [FlashcardDetailsSchema, FlashcardSchema],
  });
  return realm;
};

export const addFlashcard = async (flashcard: Omit<Flashcard, 'id'>) => {
  try {
    const realm = await openDatabase();
    realm.write(() => {
      realm.create('Flashcard', {
        id: uuidv4(),
        front: {
          firstText: flashcard.front.firstText,
          secondText: flashcard.front.secondText || '',
        },
        back: {
          firstText: flashcard.back.firstText,
          secondText: flashcard.back.secondText || '',
        },
        isLearned: false,
      });
    });
    realm.close();
  } catch (error: unknown) {
    console.log('Error inside addFlashCard', error);
  }
};

export const getFlashcards = async (): Promise<
  Realm.Results<Realm.Object<Flashcard, never> & Flashcard>
> => {
  const realm = await openDatabase();
  const flashcards = realm.objects<Flashcard>('Flashcard');
  return flashcards;
};

export const setFlashcardIsLearnedStatus = async (
  id: string,
  newStatus: boolean
) => {
  const realm = await openDatabase();
  const flashcard = realm.objects('Flashcard').filtered(`id == "${id}"`)[0];
  if (flashcard) {
    realm.write(() => {
      flashcard.isLearned = newStatus;
    });
  }
  realm.close();
};
