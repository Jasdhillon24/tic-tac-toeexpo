import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../components/ThemeContext'; // ✅ Theme support

export default function ChooseScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}>
      <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>Choose Game</Text>
      <View style={[styles.underline, { backgroundColor: isDark ? '#fff' : 'red' }]} />

      <View style={styles.grid}>
        <Pressable style={[styles.box, styles.red]} onPress={() => router.push('/single')}>
          <Image
            source={{ uri: 'https://img.icons8.com/emoji/96/robot-emoji.png' }}
            style={styles.icon}
          />
          <Text style={styles.boxText}>SINGLE PLAYER</Text>
        </Pressable>

        <Pressable style={[styles.box, styles.blue]} onPress={() => router.push('/multi')}>
          <Image
            source={{ uri: 'https://img.icons8.com/ios-filled/100/controller.png' }}
            style={styles.icon}
          />
          <Text style={styles.boxText}>MULTIPLAYER</Text>
        </Pressable>

        <Pressable style={[styles.box, styles.blue]} onPress={() => router.push('/challenges')}>
          <Image
            source={{ uri: 'https://img.icons8.com/fluency/96/target.png' }}
            style={styles.icon}
          />
          <Text style={styles.boxText}>CHALLENGES</Text>
        </Pressable>
      </View>

      {/* Settings Button */}
      <Pressable
        style={[
          styles.settingsBtn,
          { backgroundColor: isDark ? '#fff' : '#333' }
        ]}
        onPress={() => router.push('/settings')}
      >
        <Text style={[styles.settingsText, { color: isDark ? '#000' : '#fff' }]}>⚙️ Settings</Text>
      </Pressable>

      {/* Game History Button */}
      <Pressable
        style={[
          styles.settingsBtn,
          { backgroundColor: isDark ? '#fff' : '#333', marginTop: 15 }
        ]}
        onPress={() => router.push('/history')}
      >
        <Text style={[styles.settingsText, { color: isDark ? '#000' : '#fff' }]}>📜 Game History</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  underline: {
    height: 4,
    width: 50,
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius: 2,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
    marginTop: 30,
  },
  box: {
    width: 120,
    height: 120,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  red: {
    backgroundColor: '#ff4d4d',
  },
  blue: {
    backgroundColor: '#00bfff',
  },
  icon: {
    width: 48,
    height: 48,
    marginBottom: 8,
  },
  boxText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  settingsBtn: {
    marginTop: 40,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  settingsText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
