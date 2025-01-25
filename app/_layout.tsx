import { FlashcardsProvider } from '@/services/flashcardsContext';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <FlashcardsProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </FlashcardsProvider>
  );
}
