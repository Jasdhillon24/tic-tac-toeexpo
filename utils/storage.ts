import AsyncStorage from '@react-native-async-storage/async-storage';

const GAME_RESULTS_KEY = 'game_results';

export type GameResult = {
  result: string;
  date: string;
};

export async function saveGameResult(result: string): Promise<void> {
  try {
    const existing = await AsyncStorage.getItem(GAME_RESULTS_KEY);
    const results: GameResult[] = existing ? JSON.parse(existing) : [];

    const newEntry: GameResult = {
      result,
      date: new Date().toISOString(),
    };

    results.push(newEntry);
    await AsyncStorage.setItem(GAME_RESULTS_KEY, JSON.stringify(results));
  } catch (error) {
    console.error('Error saving game result:', error);
  }
}

export async function getGameResults(): Promise<GameResult[]> {
  try {
    const results = await AsyncStorage.getItem(GAME_RESULTS_KEY);
    return results ? JSON.parse(results) : [];
  } catch (error) {
    console.error('Error retrieving game results:', error);
    return [];
  }
}

export async function clearGameResults(): Promise<void> {
  try {
    await AsyncStorage.removeItem(GAME_RESULTS_KEY);
  } catch (error) {
    console.error('Error clearing game results:', error);
  }
}
