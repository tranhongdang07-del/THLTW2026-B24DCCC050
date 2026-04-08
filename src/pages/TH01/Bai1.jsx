import { useState } from 'react';
import { Card, InputNumber, Button, Typography } from 'antd';

const { Title, Text } = Typography;

export default function Bai1() {
  const [randomNumber, setRandomNumber] = useState(
    Math.floor(Math.random() * 100) + 1
  );
  const [guess, setGuess] = useState(null);
  const [message, setMessage] = useState('');
  const [count, setCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const handleGuess = () => {
    if (guess == null) return;

    if (count >= 10) return;

    const newCount = count + 1;
    setCount(newCount);

    if (guess < randomNumber) {
      setMessage('Bạn đoán quá thấp!');
    } else if (guess > randomNumber) {
      setMessage('Bạn đoán quá cao!');
    } else {
      setMessage('🎉 Chúc mừng! Bạn đã đoán đúng!');
      setGameOver(true);
      return;
    }

    if (newCount === 10) {
      setMessage(`Bạn đã hết lượt! Số đúng là ${randomNumber}`);
      setGameOver(true);
    }
  };

  const resetGame = () => {
    setRandomNumber(Math.floor(Math.random() * 100) + 1);
    setGuess(null);
    setMessage('');
    setCount(0);
    setGameOver(false);
  };

  return (
    <Card style={{ maxWidth: 500, margin: '0 auto' }}>
      <Title level={3}>Trò chơi đoán số (1 - 100)</Title>

      <p>Số lượt còn lại: {10 - count}</p>

      <InputNumber
        min={1}
        max={100}
        value={guess}
        onChange={setGuess}
        disabled={gameOver}
        style={{ width: '100%', marginBottom: 10 }}
      />

      <Button
        type="primary"
        block
        onClick={handleGuess}
        disabled={gameOver}
      >
        Đoán
      </Button>

      <p style={{ marginTop: 15 }}>
        <Text strong>{message}</Text>
      </p>

      <Button style={{ marginTop: 10 }} onClick={resetGame} block>
        Chơi lại
      </Button>
    </Card>
  );
}