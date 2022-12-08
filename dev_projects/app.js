'use strict';
generateIndexDOM();
renderData(data);
const getDataStuff = new DataStuff()
document.querySelector('#form').addEventListener('submit', (e) => {
	e.preventDefault();
	const id = uuidv4();
	const timestamp = moment().valueOf();
	const bDay = moment(e.target.elements.date.value).date(String);
	const bDayMonth = parseInt(bDay.format('M'));
	const bDayDay = parseInt(bDay.format('D'));
	const bDayYear = parseInt(bDay.format('YYYY'));
	let mood = e.target.elements.mood.value;
	let dataPush = {
		id: id,
		name: e.target.elements.name.value,
		zodiac: '',
		chineseZodiac: '',
		bDay: bDay,
		bDayMonth: bDayMonth,
		bDayDay: bDayDay,
		bDayYear: bDayYear,
		mood: mood,
		mMessage: '',
		zMessage: '',
		czMessage: '',
		createdAt: timestamp,
		updatedAt: timestamp,
	};
	//validation
	if (!e.target.elements.date.value || !e.target.elements.name.value || e.target.elements.mood.value === '----') {
		const errorMessage = document.querySelector('#error');
		errorMessage.textContent
			? (errorMessage.textContent = 'Please Fill the form out completely!')
			: (errorMessage.textContent = '');
		e.target.elements.name.value = '';
		e.target.elements.mood.value = '----';
		e.target.elements.date.value = '';
	} else {
		data.push(dataPush)
		getDataStuff.logicDate(dataPush);
		getDataStuff.logicMood(dataPush);
		getDataStuff.chineseZodiacLogic(dataPush);
		e.target.elements.name.value = '';
		e.target.elements.mood.value = '----';
		e.target.elements.date.value = '';
		saveData(data);
	}
	
});
window.addEventListener('storage', (e) => {
	if (e.key === 'data') {
		data = JSON.parse(e.newValue);
		//renderData(data);
	}
});