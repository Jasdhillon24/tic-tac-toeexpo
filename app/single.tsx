import { View, Text, StyleSheet, Image } from 'react-native';
import GameBoard from '../components/GameBoardAI';
import { useTheme } from '../components/ThemeContext';

export default function SinglePlayer() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}>
      <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>Tic Tac Toe</Text>
      <View style={[styles.underline, { backgroundColor: isDark ? '#fff' : 'red' }]} />

      <View style={styles.players}>
        <View style={styles.playerBox}>
          <Image
            source={{ uri: 'https://img.icons8.com/fluency/96/user-male-circle.png' }}
            style={styles.avatar}
          />
          <Text style={[styles.playerLabel, { color: isDark ? '#fff' : 'red' }]}>You</Text>
          <Text style={[styles.symbol, { color: isDark ? '#fff' : '#000' }]}>X</Text>
        </View>

        <View style={styles.playerBox}>
          <Image
            source={{ uri: 'https://img.icons8.com/emoji/96/robot-emoji.png' }}
            style={styles.avatar}
          />
          <Text style={[styles.playerLabel, { color: isDark ? '#fff' : '#00bfff' }]}>AI</Text>
          <Text style={[styles.symbol, { color: isDark ? '#fff' : '#000' }]}>O</Text>
        </View>
      </View>

      <GameBoard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  underline: {
    height: 4,
    width: 80,
    marginTop: 8,
    borderRadius: 2,
    marginBottom: 30,
  },
  players: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  playerBox: {
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    marginBottom: 6,
  },
  playerLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  symbol: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 4,
  },
});
