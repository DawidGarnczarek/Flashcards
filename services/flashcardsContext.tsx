import { Flashcard } from '@/app/types';
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
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
