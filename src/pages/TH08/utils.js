export const getData = (key) => JSON.parse(localStorage.getItem(key)) || [];

export const setData = (key, data) => {
	localStorage.setItem(key, JSON.stringify(data));
};

export const calcBMI = (w, h) => {
	const m = h / 100;
	return +(w / (m * m)).toFixed(1);
};

export const bmiTag = (bmi) => {
	if (bmi < 18.5) return { text: 'Thiếu cân', color: 'blue' };
	if (bmi < 25) return { text: 'Bình thường', color: 'green' };
	if (bmi < 30) return { text: 'Thừa cân', color: 'gold' };
	return { text: 'Béo phì', color: 'red' };
};
