import { View, Text, StyleSheet, Image } from 'react-native';
import { useTheme } from '../components/ThemeContext';

export default function Challenges() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const challenges = [
    {
      title: 'Challenge 1',
      desc: 'Win your first game',
      icon: 'https://img.icons8.com/emoji/96/1st-place-medal-emoji.png', // 🥇
      completed: true,
    },
    {
      title: 'Challenge 2',
      desc: 'Win 2 games in a row',
      icon: 'https://img.icons8.com/emoji/96/2nd-place-medal-emoji.png', // 🥈
    },
    {
      title: 'Challenge 3',
      desc: 'Win 10 games in a row',
      icon: 'https://img.icons8.com/emoji/96/brain-emoji.png', // 🧠
    },
    {
      title: 'Challenge 4',
      desc: 'Win 50 games in a row',
      icon: 'https://img.icons8.com/emoji/96/trophy-emoji.png', // 🏆
    },
    {
      title: 'Challenge 5',
      desc: 'Coming Soon',
      icon: 'https://img.icons8.com/fluency/96/calendar.png',
    },
    {
      title: 'Challenge 6',
      desc: 'Coming Soon',
      icon: 'https://img.icons8.com/fluency/96/calendar.png',
    },
    {
      title: 'Challenge 7',
      desc: 'Coming Soon',
      icon: 'https://img.icons8.com/fluency/96/calendar.png',
    },
    {
      title: 'Challenge 8',
      desc: 'Coming Soon',
      icon: 'https://img.icons8.com/fluency/96/calendar.png',
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}>
      <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>Challenges</Text>
      <View style={[styles.underline, { backgroundColor: 'red' }]} />

      <View style={styles.grid}>
        {challenges.map((item, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.headerRow}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              {item.completed && <Text style={styles.checkmark}>✅</Text>}
            </View>
            <Image source={{ uri: item.icon }} style={styles.icon} />
            <Text style={styles.cardDesc}>{item.desc}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  underline: {
    height: 6,
    width: 100,
    borderRadius: 4,
    marginTop: 8,
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#d96d63',
    width: '47%',
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
    alignItems: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  cardTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  checkmark: {
    fontSize: 14,
  },
  icon: {
    width: 48,
    height: 48,
    marginBottom: 10,
  },
  cardDesc: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 12,
  },
});
