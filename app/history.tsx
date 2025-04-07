import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Alert,
} from 'react-native';
import { getGameResults, clearGameResults } from '../utils/storage'; // ✅ Updated
import { useTheme } from '../components/ThemeContext';

export default function HistoryScreen() {
  const [results, setResults] = useState<{ result: string; date: string }[]>([]);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    const data = await getGameResults();
    setResults(data.reverse());
  };

  const handleClearHistory = () => {
    Alert.alert('Clear All History?', 'This will delete all your saved game results.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Clear',
        style: 'destructive',
        onPress: async () => {
          await clearGameResults();
          setResults([]);
        },
      },
    ]);
  };

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}>
      <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>Game History</Text>

      {results.length === 0 ? (
        <Text style={[styles.emptyText, { color: isDark ? '#888' : '#666' }]}>
          No games recorded yet.
        </Text>
      ) : (
        <>
          <FlatList
            data={results}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.resultItem,
                  { backgroundColor: isDark ? '#222' : '#f0f0f0' },
                ]}
              >
                <Text style={[styles.resultText, { color: isDark ? '#fff' : '#000' }]}>
                  {item.result}
                </Text>
                <Text style={[styles.dateText, { color: isDark ? '#aaa' : '#666' }]}>
                  {new Date(item.date).toLocaleString()}
                </Text>
              </View>
            )}
          />

          <Pressable style={styles.clearBtn} onPress={handleClearHistory}>
            <Text style={styles.clearText}>🗑️ Clear History</Text>
          </Pressable>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 50,
  },
  resultItem: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  resultText: {
    fontSize: 16,
    fontWeight: '600',
  },
  dateText: {
    fontSize: 12,
    marginTop: 4,
  },
  clearBtn: {
    marginTop: 20,
    backgroundColor: '#ff4d4d',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  clearText: {
    color: '#fff',
    fontWeight: '600',
  },
});
