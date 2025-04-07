import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, Alert } from 'react-native';
import { saveGameResult } from '../utils/storage'; // ✅ Import AsyncStorage function

const emptyBoard = Array(9).fill(null);

export default function GameBoard() {
  const [board, setBoard] = useState(emptyBoard);
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (currentPlayer === 'O' && !gameOver) {
      const timeout = setTimeout(() => {
        const bestMove = getBestMove(board);
        makeMove(bestMove, 'O');
      }, 700);
      return () => clearTimeout(timeout);
    }
  }, [currentPlayer]);

  const handlePress = (index: number) => {
    if (board[index] || gameOver || currentPlayer !== 'X') return;
    makeMove(index, 'X');
  };

  const makeMove = (index: number, player: 'X' | 'O') => {
    const updatedBoard = [...board];
    updatedBoard[index] = player;
    setBoard(updatedBoard);

    const winner = checkWinner(updatedBoard);
    if (winner) {
      setGameOver(true);
      const resultText = winner === 'X' ? 'You (X) won against AI' : 'AI (O) won';
      saveGameResult(resultText); // ✅ Save result
      Alert.alert(`${winner} wins!`, '', [{ text: 'Play Again', onPress: resetGame }]);
      return;
    }

    if (!updatedBoard.includes(null)) {
      setGameOver(true);
      saveGameResult('Game was a draw'); // ✅ Save draw result
      Alert.alert("It's a draw!", '', [{ text: 'Play Again', onPress: resetGame }]);
      return;
    }

    setCurrentPlayer(player === 'X' ? 'O' : 'X');
  };

  const resetGame = () => {
    setBoard(emptyBoard);
    setCurrentPlayer('X');
    setGameOver(false);
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

  const getBestMove = (newBoard: (string | null)[]): number => {
    let bestScore = -Infinity;
    let move = -1;

    for (let i = 0; i < newBoard.length; i++) {
      if (!newBoard[i]) {
        newBoard[i] = 'O';
        const score = minimax(newBoard, 0, false);
        newBoard[i] = null;

        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }
    return move;
  };

  const minimax = (board: (string | null)[], depth: number, isMaximizing: boolean): number => {
    const winner = checkWinner(board);
    if (winner === 'O') return 10 - depth;
    if (winner === 'X') return depth - 10;
    if (!board.includes(null)) return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < board.length; i++) {
        if (!board[i]) {
          board[i] = 'O';
          bestScore = Math.max(bestScore, minimax(board, depth + 1, false));
          board[i] = null;
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < board.length; i++) {
        if (!board[i]) {
          board[i] = 'X';
          bestScore = Math.min(bestScore, minimax(board, depth + 1, true));
          board[i] = null;
        }
      }
      return bestScore;
    }
  };

  return (
    <View style={styles.boardWrapper}>
      <Text style={styles.turnText}>Your Turn: {currentPlayer === 'X' ? 'You (X)' : 'AI (O)'}</Text>
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
    borderColor: '#00bfff',
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
