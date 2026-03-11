import { Card, Button, Row, Col, Table, Typography, message } from 'antd';
import { useState } from 'react';

const { Title } = Typography;

const choices = ['Kéo', 'Búa', 'Bao'];

export default function Bai1() {
	const [history, setHistory] = useState([]);

	const playGame = (playerChoice) => {
		const computerChoice = choices[Math.floor(Math.random() * 3)];

		let result = '';

		if (playerChoice === computerChoice) {
			result = 'Hòa';
		} else if (
			(playerChoice === 'Kéo' && computerChoice === 'Bao') ||
			(playerChoice === 'Búa' && computerChoice === 'Kéo') ||
			(playerChoice === 'Bao' && computerChoice === 'Búa')
		) {
			result = 'Bạn thắng';
		} else {
			result = 'Bạn thua';
		}

		message.info(`Bạn: ${playerChoice} | Máy: ${computerChoice} → ${result}`);

		const newRecord = {
			key: history.length + 1,
			player: playerChoice,
			computer: computerChoice,
			result,
		};

		setHistory([newRecord, ...history]);
	};

	const columns = [
		{ title: 'Lượt', dataIndex: 'key' },
		{ title: 'Bạn chọn', dataIndex: 'player' },
		{ title: 'Máy chọn', dataIndex: 'computer' },
		{ title: 'Kết quả', dataIndex: 'result' },
	];

	return (
		<Card>
			<Title level={3}>🎮 Trò chơi Oẳn Tù Tì</Title>

			<Row gutter={16} style={{ marginBottom: 20 }}>
				{choices.map((c) => (
					<Col key={c}>
						<Button type='primary' size='large' onClick={() => playGame(c)}>
							{c}
						</Button>
					</Col>
				))}
			</Row>

			<Table columns={columns} dataSource={history} pagination={false} />
		</Card>
	);
}
