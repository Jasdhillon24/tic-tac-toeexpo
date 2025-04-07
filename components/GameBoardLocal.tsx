import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Alert } from 'react-native';
import { saveGameResult } from '../utils/storage'; // ✅ Import result saver

const emptyBoard = Array(9).fill(null);

export default function GameBoardLocal() {
  const [board, setBoard] = useState(emptyBoard);
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');

  const handlePress = (index: number) => {
    if (board[index]) return;

    const updatedBoard = [...board];
    updatedBoard[index] = currentPlayer;
    setBoard(updatedBoard);

    const winner = checkWinner(updatedBoard);
    if (winner) {
      saveGameResult(`Player ${winner} won in local game`); // ✅ Save win
      Alert.alert(`${winner} wins!`, '', [
        { text: 'Play Again', onPress: () => resetGame() },
      ]);
      return;
    }

    if (!updatedBoard.includes(null)) {
      saveGameResult('Draw in local game'); // ✅ Save draw
      Alert.alert("It's a draw!", '', [
        { text: 'Play Again', onPress: () => resetGame() },
      ]);
      return;
    }

    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  const checkWinner = (squares: (string | null)[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (let [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    return null;
  };

  const resetGame = () => {
    setBoard(emptyBoard);
    setCurrentPlayer('X');
  };

  return (
    <View style={styles.boardWrapper}>
      <Text style={styles.turnText}>Turn: {currentPlayer}</Text>
      <View style={styles.board}>
        {board.map((value, index) => (
          <Pressable
            key={index}
            style={styles.cell}
            onPress={() => handlePress(index)}
          >
            <Text style={styles.cellText}>{value}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  boardWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  turnText: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: '600',
  },
  board: {
    width: 300,
    height: 300,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderWidth: 6,
    borderColor: '#ff4d4d', // Red for multiplayer
    borderRadius: 20,
    backgroundColor: '#fff',
  },
  cell: {
    width: '33.33%',
    height: '33.33%',
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
  },
});
