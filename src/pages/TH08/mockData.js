export const initData = () => {
	if (!localStorage.getItem('workouts')) {
		localStorage.setItem(
			'workouts',
			JSON.stringify([
				{
					id: 1,
					date: '2026-04-20',
					type: 'Cardio',
					duration: 30,
					calories: 250,
					note: 'Chạy bộ',
					status: 'Hoàn thành',
				},
				{
					id: 2,
					date: '2026-04-21',
					type: 'Strength',
					duration: 45,
					calories: 350,
					note: 'Tập gym',
					status: 'Hoàn thành',
				},
				{
					id: 3,
					date: '2026-04-22',
					type: 'Yoga',
					duration: 60,
					calories: 200,
					note: 'Yoga sáng',
					status: 'Hoàn thành',
				},
				{
					id: 4,
					date: '2026-04-23',
					type: 'HIIT',
					duration: 20,
					calories: 280,
					note: 'HIIT training',
					status: 'Hoàn thành',
				},
				{
					id: 5,
					date: '2026-04-25',
					type: 'Cardio',
					duration: 40,
					calories: 300,
					note: 'Chạy bộ + nhảy dây',
					status: 'Hoàn thành',
				},
				{
					id: 6,
					date: '2026-04-26',
					type: 'Strength',
					duration: 50,
					calories: 380,
					note: 'Tập gym ngày 2',
					status: 'Bỏ lỡ',
				},
				{
					id: 7,
					date: '2026-04-27',
					type: 'Yoga',
					duration: 55,
					calories: 180,
					note: 'Yoga chiều',
					status: 'Hoàn thành',
				},
				{
					id: 8,
					date: '2026-04-28',
					type: 'Cardio',
					duration: 35,
					calories: 270,
					note: 'Chạy bộ',
					status: 'Hoàn thành',
				},
			]),
		);
	}

	if (!localStorage.getItem('health')) {
		localStorage.setItem(
			'health',
			JSON.stringify([
				{ id: 1, date: '2026-04-20', weight: 67, height: 170, heartRate: 75, sleep: 7 },
				{ id: 2, date: '2026-04-21', weight: 66.8, height: 170, heartRate: 72, sleep: 8 },
				{ id: 3, date: '2026-04-22', weight: 66.5, height: 170, heartRate: 70, sleep: 7.5 },
				{ id: 4, date: '2026-04-23', weight: 66.2, height: 170, heartRate: 68, sleep: 8 },
				{ id: 5, date: '2026-04-25', weight: 65.9, height: 170, heartRate: 70, sleep: 7 },
				{ id: 6, date: '2026-04-26', weight: 65.5, height: 170, heartRate: 72, sleep: 8 },
				{ id: 7, date: '2026-04-27', weight: 65.2, height: 170, heartRate: 69, sleep: 7.5 },
				{ id: 8, date: '2026-04-28', weight: 65, height: 170, heartRate: 68, sleep: 8 },
			]),
		);
	}

	if (!localStorage.getItem('goals')) {
		localStorage.setItem(
			'goals',
			JSON.stringify([
				{
					id: 1,
					name: 'Giảm cân',
					type: 'Giảm cân',
					target: 60,
					current: 65,
					deadline: '2026-06-30',
					status: 'Đang thực hiện',
				},
				{
					id: 2,
					name: 'Tăng cơ bụng',
					type: 'Tăng cơ',
					target: 50,
					current: 20,
					deadline: '2026-08-31',
					status: 'Đang thực hiện',
				},
				{
					id: 3,
					name: 'Chạy bộ 5km',
					type: 'Cải thiện sức bền',
					target: 5,
					current: 3,
					deadline: '2026-07-15',
					status: 'Đang thực hiện',
				},
			]),
		);
	}

	if (!localStorage.getItem('exercises')) {
		localStorage.setItem(
			'exercises',
			JSON.stringify([
				{
					id: 1,
					name: 'Push-up',
					muscle: 'Chest',
					level: 'Dễ',
					description: 'Nằm sấp, tay áp dưới vai...',
					calories: 5,
				},
				{
					id: 2,
					name: 'Squat',
					muscle: 'Legs',
					level: 'Trung bình',
					description: 'Đứng thẳng, cong gối...',
					calories: 8,
				},
				{ id: 3, name: 'Deadlift', muscle: 'Back', level: 'Khó', description: 'Nâng tạ từ dưới lên...', calories: 12 },
				{
					id: 4,
					name: 'Pull-up',
					muscle: 'Back',
					level: 'Khó',
					description: 'Kéo cơ thể lên bằng thanh...',
					calories: 10,
				},
				{ id: 5, name: 'Curl', muscle: 'Arms', level: 'Trung bình', description: 'Cong tay cầm tạ...', calories: 6 },
				{
					id: 6,
					name: 'Plank',
					muscle: 'Core',
					level: 'Trung bình',
					description: 'Giữ tư thế nằm sấp...',
					calories: 7,
				},
				{
					id: 7,
					name: 'Shoulder Press',
					muscle: 'Shoulders',
					level: 'Trung bình',
					description: 'Đẩy tạ từ vai lên...',
					calories: 9,
				},
				{
					id: 8,
					name: 'Running',
					muscle: 'Full Body',
					level: 'Dễ',
					description: 'Chạy bộ ngoài trời...',
					calories: 10,
				},
				{ id: 9, name: 'Cycling', muscle: 'Legs', level: 'Dễ', description: 'Đạp xe...', calories: 9 },
			]),
		);
	}
};
