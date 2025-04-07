import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../components/ThemeContext';
// ✅ Import ThemeContext

export default function LandingScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}>
      <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>Ultimate Tic-Tac-Toe</Text>

      <View style={styles.iconsRow}>
        <Text style={styles.xIcon}>X</Text>
        <Text style={styles.oIcon}>O</Text>
      </View>

      <Pressable
        style={[
          styles.playButton,
          {
            backgroundColor: isDark ? '#333' : '#fff',
            shadowColor: isDark ? '#fff' : '#000',
          },
        ]}
        onPress={() => router.push('/choose')}
      >
        <Text style={[styles.playText, { color: isDark ? '#fff' : '#000' }]}>Let’s play</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  iconsRow: {
    flexDirection: 'row',
    gap: 30,
    marginBottom: 40,
  },
  xIcon: {
    fontSize: 80,
    color: 'red',
    fontWeight: 'bold',
  },
  oIcon: {
    fontSize: 80,
    color: 'blue',
    fontWeight: 'bold',
  },
  playButton: {
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 15,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
  },
  playText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
