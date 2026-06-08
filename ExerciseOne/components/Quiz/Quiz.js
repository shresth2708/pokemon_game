import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const questions = [
  {
    question: 'What type is Pikachu?',
    options: ['Fire', 'Water', 'Electric', 'Grass'],
    answer: 'Electric',
    card: {
      name: 'Pikachu',
      type: 'Electric',
  image: require('../../assets/pikachu.png'),
    },
  },
  {
    question: 'Which Pokémon evolves into Charizard?',
    options: ['Charmander', 'Squirtle', 'Bulbasaur', 'Eevee'],
    answer: 'Charmander',
    card: {
      name: 'Charmander',
      type: 'Fire',
  image: require('../../assets/charmander.png'),
    },
  },
  // Add more questions as needed
];

const Quiz = ({ onWinCard }) => {
  const [current, setCurrent] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [wonCard, setWonCard] = useState(null);

  const handleAnswer = (option) => {
    if (option === questions[current].answer) {
      setWonCard(questions[current].card);
      setShowResult(true);
      onWinCard && onWinCard(questions[current].card);
    } else {
      setShowResult(true);
      setWonCard(null);
    }
  };

  const nextQuestion = () => {
    setShowResult(false);
    setWonCard(null);
    setCurrent((prev) => (prev + 1) % questions.length);
  };

  return (
    <View style={styles.container}>
      {!showResult ? (
        <>
          <Text style={styles.question}>{questions[current].question}</Text>
          {questions[current].options.map((option) => (
            <Button key={option} title={option} onPress={() => handleAnswer(option)} />
          ))}
        </>
      ) : (
        <View>
          {wonCard ? (
            <Text style={styles.result}>Correct! You won a {wonCard.name} card!</Text>
          ) : (
            <Text style={styles.result}>Wrong answer. Try again!</Text>
          )}
          <Button title="Next" onPress={nextQuestion} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  question: { fontSize: 20, marginBottom: 20 },
  result: { fontSize: 18, marginBottom: 20, color: 'green' },
});

export default Quiz;
