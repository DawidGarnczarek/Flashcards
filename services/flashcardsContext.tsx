import { Flashcard } from '@/app/types';
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getFlashcards } from './realmService';

export enum PlayMode {
  NOT_SELECTED = 'NOT_SELECTED',
  LEARNED = 'LEARNED',
  NOT_LEARNED = 'NOT_LEARNED',
}

export interface FlashcardsContextValue {
  flashcards: Flashcard[];
  playMode: PlayMode;
  selectedFlashcards: Flashcard[];
  setLearnedPlayMode: () => void;
  setNotLearnedPlayMode: () => void;
}

const FlashcardsContext = createContext<FlashcardsContextValue>(
  {} as FlashcardsContextValue
);

export const FlashcardsProvider = ({ children }: any) => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [playMode, setPlayMode] = useState<PlayMode>(PlayMode.NOT_SELECTED);

  const setLearnedPlayMode = () => {
    setPlayMode(PlayMode.LEARNED);
  };

  const setNotLearnedPlayMode = () => {
    setPlayMode(PlayMode.NOT_LEARNED);
  };

  const flashCardsToLearn = flashcards.filter(
    flashcard => flashcard.isLearned === false
  );
  const flashCardsLearned = flashcards.filter(
    flashcard => flashcard.isLearned === true
  );
  const selectedFlashcards = useMemo(() => {
    if (playMode === PlayMode.LEARNED) {
      return flashCardsLearned;
    }
    if (playMode === PlayMode.NOT_LEARNED) {
      return flashCardsToLearn;
    }
    return [];
  }, [flashcards, playMode]);

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const data = await getFlashcards();
        setFlashcards(data as unknown as Flashcard[]);
      } catch (error: unknown) {
        console.log('Error while fetching flashcards', error);
      }
    };
    fetchFlashcards();
  }, []);

  return (
    <FlashcardsContext.Provider
      value={{
        flashcards,
        selectedFlashcards: selectedFlashcards,
        playMode,
        setLearnedPlayMode,
        setNotLearnedPlayMode,
      }}
    >
      {children}
    </FlashcardsContext.Provider>
  );
};

export const useFlashcards = (): FlashcardsContextValue => {
  const context = useContext(FlashcardsContext);

  if (context) {
    return context;
  }
  throw new Error('Component beyond UserThemeContext');
};
