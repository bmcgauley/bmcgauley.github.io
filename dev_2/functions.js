'use strict';

//get data from storage
const getSavedData = () => {
	const dataJSON = localStorage.getItem('data');
	try {
		return dataJSON ? JSON.parse(dataJSON) : [];
	} catch (e) {
		return [];
	}
};
//saves to local storage
const saveData = (data) => localStorage.setItem('data', JSON.stringify(data));
const removeData = (id) => {
	const dataIndex = data.findIndex((data) => data.id == id);
	const dataId = location.hash.substring(1);
		if (dataIndex > -1) {
			data.splice(dataIndex, 1);
			saveData(data);
			location.assign('index.html');
		}
	};
const data = getSavedData();
const dataId = location.hash.substring(1);
let datas = data.find((datas) => datas.id === dataId);
const renderData = (data) => {
	let filteredData = data;
	if (!localStorage.getItem('data')) {
	} else {
		filteredData = data.filter((data) => {
			if (!data.length) {
				return data.id.length;
			}
		});
	}
	let mainPage = document.title.includes('Mood App');
	let editPage = document.title.includes('Edit');
	if (editPage) editPage = true, mainPage = false;
	else if (mainPage) editPage = false, mainPage = true;
	
	const edit = document.querySelector('#message');
	const main = document.querySelector('#right-output-span');
	if (editPage) edit.innerHTML = '', edit.innerHTML = `${datas.mMessage}`, window.location.reload()
	
	else if (mainPage) {
		main.innerHTML = ''
		filteredData.forEach((data) => {
			const dataEl = generateDataDOM(data);
			main.appendChild(dataEl);
	});
}
};
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
class DataStuff {
	logicDate(dataPush) {
		const date = moment(dataPush.bDay).format('M/D/YYYY');
		getZodiac()
			.then((zodiacData) => {
				const zodiacs = {
					aries: moment(date).format('x') >=moment(zodiacData[0].ariesStart).year(dataPush.bDay.format('YYYY')).format('x') && moment(date).format('x') <= moment(zodiacData[0].ariesEnd).year(dataPush.bDay.format('YYYY')).format('x'),
					taurus: moment(date).format('x') >= moment(zodiacData[1].taurusStart).year(dataPush.bDay.format('YYYY')).format('x') && moment(date).format('x') <= moment(zodiacData[1].taurusEnd).year(dataPush.bDay.format('YYYY')).format('x'),
					gemini: moment(date).format('x') >= moment(zodiacData[2].geminiStart).year(dataPush.bDay.format('YYYY')).format('x') && moment(date).format('x') <= moment(zodiacData[2].geminiEnd).year(dataPush.bDay.format('YYYY')).format('x'),
					cancer: moment(date).format('x') >= moment(zodiacData[3].cancerStart).year(dataPush.bDay.format('YYYY')).format('x') && moment(date).format('x') <= moment(zodiacData[3].cancerEnd).year(dataPush.bDay.format('YYYY')).format('x'),
					leo: moment(date).format('x') >= moment(zodiacData[4].leoStart).year(dataPush.bDay.format('YYYY')).format('x') && moment(date).format('x') <= moment(zodiacData[4].leoEnd).year(dataPush.bDay.format('YYYY')).format('x'),
					virgo: moment(date).format('x') >= moment(zodiacData[5].virgoStart).year(dataPush.bDay.format('YYYY')).format('x') && moment(date).format('x') <= moment(zodiacData[5].virgoEnd).year(dataPush.bDay.format('YYYY')).format('x'),
					libra: moment(date).format('x') >= moment(zodiacData[6].libraStart).year(dataPush.bDay.format('YYYY')).format('x') && moment(date).format('x') <= moment(zodiacData[6].libraEnd).year(dataPush.bDay.format('YYYY')).format('x'),
					scorpio: moment(date).format('x') >= moment(zodiacData[7].scorpioStart).year(dataPush.bDay.format('YYYY')).format('x') && moment(date).format('x') <= moment(zodiacData[7].scorpioEnd).year(dataPush.bDay.format('YYYY')).format('x'),
					sagitt: moment(date).format('x') >= moment(zodiacData[8].sagittStart).year(dataPush.bDay.format('YYYY')).format('x') && moment(date).format('x') <= moment(zodiacData[8].sagittEnd).year(dataPush.bDay.format('YYYY')).format('x'),
					aquarius: moment(date).format('x') >= moment(zodiacData[10].aquariusStart).year(dataPush.bDay.format('YYYY')).format('x') && moment(date).format('x') <= moment(zodiacData[10].aquariusEnd).year(dataPush.bDay.format('YYYY')).format('x'),
					pisces: moment(date).format('x') >= moment(zodiacData[11].piscesStart).year(dataPush.bDay.format('YYYY')).format('x') && moment(date).format('x') <= moment(zodiacData[11].piscesEnd).year(dataPush.bDay.format('YYYY')).format('x'),
					capricorn: moment(date).format('x') >= moment(zodiacData[9].capricornStart).year(dataPush.bDay.format('YYYY')).add(-1, 'year').format('x') || moment(date).format('x') <= moment(zodiacData[9].capricornEnd).year(dataPush.bDay.format('YYYY')).format('x')
				};
				if (!dataPush.bDay) throw new Error('Error, no bDay found in dataPush array');
				else if (zodiacs.aries) dataPush.zodiac = zodiacData[0].zodiac, dataPush.zMessage = zodiacData[0].zMessage;
				else if (zodiacs.taurus) dataPush.zodiac = zodiacData[1].zodiac, dataPush.zMessage = zodiacData[1].zMessage;
				else if (zodiacs.gemini) dataPush.zodiac = zodiacData[2].zodiac, dataPush.zMessage = zodiacData[2].zMessage;
				else if (zodiacs.cancer) dataPush.zodiac = zodiacData[3].zodiac, dataPush.zMessage = zodiacData[3].zMessage;
				else if (zodiacs.leo) dataPush.zodiac = zodiacData[4].zodiac, dataPush.zMessage = zodiacData[4].zMessage;
				else if (zodiacs.virgo) dataPush.zodiac = zodiacData[5].zodiac, dataPush.zMessage = zodiacData[5].zMessage;
				else if (zodiacs.libra) dataPush.zodiac = zodiacData[6].zodiac, dataPush.zMessage = zodiacData[6].zMessage;
				else if (zodiacs.scorpio) dataPush.zodiac = zodiacData[7].zodiac, dataPush.zMessage = zodiacData[7].zMessage;
				else if (zodiacs.sagitt) dataPush.zodiac = zodiacData[8].zodiac, dataPush.zMessage = zodiacData[8].zMessage;
				else if (zodiacs.aquarius) dataPush.zodiac = zodiacData[10].zodiac, dataPush.zMessage = zodiacData[10].zMessage;
				else if (zodiacs.pisces) dataPush.zodiac = zodiacData[11].zodiac, dataPush.zMessage = zodiacData[11].zMessage;
				else if (zodiacs.capricorn) dataPush.zodiac = zodiacData[9].zodiac, dataPush.zMessage = zodiacData[9].zMessage;
				saveData(data);
				renderData(data)
			})
			.catch((err) => {
				window.alert(`Error: ${err}`);
				throw new Error(`Error: ${err}`);
			});
	}

	chineseZodiacLogic(dataPush) {
		//setup current year as variable if needed in future
		const currentYear = 2022;
		//extract the year from input
		const extractYear = parseInt(moment(dataPush.bDay).format('YYYY'));
		//compare input extracted year against the newly populated arrays
		//zodiac information credit to: https://www.chinahighlights.com/travelguide/chinese-zodiac/
		getCZodiac()
			.then((arr) => {
				const array = {
					rooster: arr[0].cRoosterArr.includes(extractYear),
					dog: arr[1].cDogArr.includes(extractYear),
					pig: arr[2].cPigArr.includes(extractYear),
					rat: arr[3].cRatArr.includes(extractYear),
					ox: arr[4].cOxArr.includes(extractYear),
					tiger: arr[5].cTigerArr.includes(extractYear),
					rabbit: arr[6].cRabbitArr.includes(extractYear),
					dragon: arr[7].cDragonArr.includes(extractYear),
					snake: arr[8].cSnakeArr.includes(extractYear),
					horse: arr[9].cHorseArr.includes(extractYear),
					goat: arr[10].cGoatArr.includes(extractYear),
					monkey: arr[11].cMonkeyArr.includes(extractYear)
				}
				if (!dataPush.bDay) throw new Error('Error: No birthday to compare with Chinese Zodiac found in data!');
				else if (array.rooster) dataPush.chineseZodiac = arr[0].cZodiac, dataPush.czMessage = arr[0].czMessage;
				else if (array.dog) dataPush.chineseZodiac = arr[1].cZodiac, dataPush.czMessage = arr[1].czMessage;
				else if (array.pig) dataPush.chineseZodiac = arr[2].cZodiac,dataPush.czMessage = arr[2].czMessage;
				else if (array.rat) dataPush.chineseZodiac = arr[3].cZodiac, dataPush.czMessage = arr[3].czMessage;
				else if (array.ox) dataPush.chineseZodiac = arr[4].cZodiac, dataPush.czMessage = arr[4].czMessage;
				else if (array.tiger) dataPush.chineseZodiac = arr[5].cZodiac, dataPush.czMessage = arr[5].czMessage;
				else if (array.rabbit) dataPush.chineseZodiac = arr[6].cZodiac, dataPush.czMessage = arr[6].czMessage;
				else if (array.dragon) dataPush.chineseZodiac = arr[7].cZodiac, dataPush.czMessage = arr[7].czMessage;
				else if (array.snake) dataPush.chineseZodiac = arr[8].cZodiac, dataPush.czMessage = arr[8].czMessage;
				else if (array.horse) dataPush.chineseZodiac = arr[9].cZodiac, dataPush.czMessage = arr[9].czMessage;
				else if (array.goat) dataPush.chineseZodiac = arr[10].cZodiac, dataPush.czMessage = arr[10].czMessage;
				else if (array.monkey) dataPush.chineseZodiac = arr[11].cZodiac, dataPush.czMessage = arr[11].czMessage;
				saveData(data);
				renderData(data)
			})
			.catch((err) => {
				window.alert(`Error: ${err}`);
				throw new Error(`Error: ${err}`);
			});
	}
	logicMood(dataPush) {
		//couldn't quite figure out the random selection between two random ints so I had to reference stackoverflow for a good solution to this problem.
		//I used the function answer here and modified it to reduce what really wasn't needed and convert to arrow function;
		//https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
		getMood()
			.then((moodData) => {
				const mood = dataPush.mood;
				if (!mood) throw new Error('Error: No mood found in data!');
				else if (mood === 'happy') dataPush.mMessage = moodData[0].happy[rand(0, 2)];
				else if (mood === 'fearful') dataPush.mMessage = moodData[0].fearful[rand(0, 2)];
				else if (mood === 'sad') dataPush.mMessage = moodData[0].sad[rand(0, 2)];
				else if (mood === 'angry') dataPush.mMessage = moodData[0].angry[rand(0, 2)];
				else if (mood === 'depressed') dataPush.mMessage = moodData[0].depressed[rand(0, 2)];
				saveData(data)
				renderData(data)
			})
			.catch((err) => {
				window.alert(`Error: ${err}`);
				throw new Error(`Error: ${err}`);
			});
	}
}
const generateLastEdited = (timestamp) =>
	`Last Edited: ${moment(timestamp).fromNow()}`;

window.addEventListener('storage', (e) => {
	if (e.key === 'data') {
		data = JSON.parse(e.newValue);
		//renderData(data);
	}
});