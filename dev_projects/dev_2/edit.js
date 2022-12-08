'use strict';
generateEditPageDOM();
const titleElement = document.querySelector('#title');
const bodyElement = document.querySelector('#body');
const updateElement = document.querySelector('#update');
const removeElement = document.querySelector('#remove');
!datas ? location.assign('index.html') : console.log('data found');
let updateIndex = (datas) => {
	let i = data.findIndex((datas) => datas.id === dataId);
	return i;
};
let moodUpdate = document
	.querySelector('#update-form')
	.addEventListener('submit', (e) => {
		e.preventDefault();
		const timestamp = moment().valueOf();
		let mood = e.target.elements.mood.value;
        const dataId = data[updateIndex(datas)].id;
		let dataPush = {
			id: datas.id,
			name: datas.name,
			zodiac: datas.zodiac,
			chineseZodiac: datas.chineseZodiac,
			bDay: datas.bDay,
			bDayMonth: datas.bDayMonth,
			bDayDay: datas.bDayDay,
			bDayYear: datas.bDayYear,
			mood: mood,
			mMessage: '',
			zMessage: datas.zMessage,
			czMessage: datas.czMessage,
			createdAt: timestamp,
			updatedAt: timestamp,
		};
        dataPush.mMessage = new DataStuff().logicMood(dataPush)
        data.splice(updateIndex(datas), 1, dataPush);
        saveData(data)
		
	});
titleElement.innerHTML = `Data ID: <br /> ${dataId}<br />`;
bodyElement.innerHTML = `<div class='subhead2'>${datas.name}, your birthday is: ${moment(data[updateIndex(datas)].bDay).format(
	'MMM Do, YYYY'
)}</div> <br />
<div class="subhead2">
<span id="message">${datas.mMessage}</span></div><br />
Your Zodiac is: ${datas.zodiac} <br />
${datas.zMessage} <br />
Your Chinese Zodiac is: ${datas.chineseZodiac} <br />
${datas.czMessage} <br />`;
updateElement.textContent = `Last Updated: ${moment(data.updatedAt).fromNow()}`;
removeElement.addEventListener('click', () => {
	removeData(datas.id);
	saveData(data);
	location.assign('index.html');
});
window.addEventListener('storage', (e) => {
	if (e.key === 'data') {
		data = JSON.parse(e.newValue);
		datas = data.find((datas) => datas.id === dailyId);
		!datas
			? location.assign('index.html')
			: console.log('data found _ storage note');
	}
});
const generateUpdateDOM = (updateElement) => {
	const updateEl = document.createElement('span');
	updateElement.appendChild(updateEl);
	updateEl.textContent = data.updatedAt;
    //renderData(data)
	return updateEl;
};