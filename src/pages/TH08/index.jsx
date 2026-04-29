import { Card, Row, Col, Statistic, Timeline } from 'antd';
import { Column, Line } from '@ant-design/charts';
import { getData } from './utils';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { initData } from './mockData';

export default function Dashboard() {
	useEffect(() => {
		initData();
	}, []);

	const workouts = getData('workouts') || [];
	const health = getData('health') || [];
	const goals = getData('goals') || [];

	const tongBuoi = workouts.length;
	const tongCalo = workouts.reduce((a, b) => a + (+b.calories || 0), 0);

	// Tính streak (số ngày tập liên tiếp)
	const calculateStreak = () => {
		if (workouts.length === 0) return 0;
		const sortedByDate = [...workouts]
			.map((w) => dayjs(w.date))
			.sort((a, b) => b.diff(a))
			.filter((date, index, arr) => index === 0 || !date.isSame(arr[index - 1]));

		let streak = 0;
		const today = dayjs();
		for (let i = 0; i < sortedByDate.length; i++) {
			const expectedDate = today.subtract(i, 'day');
			if (sortedByDate[i].isSame(expectedDate, 'day')) {
				streak++;
			} else {
				break;
			}
		}
		return streak;
	};

	const percent = goals.length ? Math.round((goals[0].current / goals[0].target) * 100) : 0;

	// Dữ liệu cho biểu đồ cột (buổi tập theo tuần)
	const weeklyData = Array(4)
		.fill(0)
		.map((_, i) => {
			const week = i + 1;
			const count = workouts.filter((w) => {
				const date = dayjs(w.date);
				const dayOfMonth = date.date();
				return dayOfMonth >= i * 7 + 1 && dayOfMonth <= (i + 1) * 7;
			}).length;
			return { tuần: `Tuần ${week}`, soBuoi: count };
		});

	// Dữ liệu cho biểu đồ đường (cân nặng theo ngày)
	const weightData = health
		.map((h) => ({ ngày: h.date, cannang: h.weight }))
		.sort((a, b) => a.ngày.localeCompare(b.ngày));

	// 5 buổi tập gần nhất
	const recentWorkouts = [...workouts].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

	return (
		<>
			<Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
				<Col span={6}>
					<Card style={{ borderRadius: 10, textAlign: 'center' }}>
						<Statistic title='💪 Buổi tập trong tháng' value={tongBuoi} />
					</Card>
				</Col>
				<Col span={6}>
					<Card style={{ borderRadius: 10, textAlign: 'center' }}>
						<Statistic title='🔥 Tổng calo đã đốt' value={tongCalo} />
					</Card>
				</Col>
				<Col span={6}>
					<Card style={{ borderRadius: 10, textAlign: 'center' }}>
						<Statistic title='📈 Ngày tập liên tiếp' value={calculateStreak()} />
					</Card>
				</Col>
				<Col span={6}>
					<Card style={{ borderRadius: 10, textAlign: 'center' }}>
						<Statistic title='🎯 Mục tiêu hoàn thành' value={percent} suffix='%' />
					</Card>
				</Col>
			</Row>

			<Row gutter={16} style={{ marginBottom: 16 }}>
				<Col span={12}>
					<Card title='📊 Số buổi tập theo tuần'>
						{weeklyData.some((d) => d.soBuoi > 0) ? (
							<Column
								data={weeklyData}
								xField='tuần'
								yField='soBuoi'
								seriesField='tuần'
								color={['#1890ff']}
								style={{ height: 300 }}
							/>
						) : (
							<p>Chưa có dữ liệu</p>
						)}
					</Card>
				</Col>
				<Col span={12}>
					<Card title='⚖️ Thay đổi cân nặng theo thời gian'>
						{weightData.length > 0 ? (
							<Line
								data={weightData}
								xField='ngày'
								yField='cannang'
								seriesField='ngày'
								color={['#FF6B6B']}
								style={{ height: 300 }}
							/>
						) : (
							<p>Chưa có dữ liệu</p>
						)}
					</Card>
				</Col>
			</Row>

			<Card title='📅 5 Buổi tập gần nhất'>
				<Timeline
					items={recentWorkouts.map((w) => ({
						children: (
							<div>
								<strong>{w.date}</strong> - {w.type} ({w.duration} phút) - {w.calories} calo - {w.note}
							</div>
						),
					}))}
				/>
			</Card>
		</>
	);
}
