export interface FlashcardSideDetails {
  firstText: string;
  secondText?: string;
}

export interface Flashcard {
  id: string;
  front: FlashcardSideDetails;
  back: FlashcardSideDetails;
  isLearned?: boolean;
}
