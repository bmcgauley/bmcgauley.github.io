'use strict';
const getZodiac = async (zodiacData) => {
	const response = await fetch(
		'https://raw.githubusercontent.com/bmcgauley/bmcgauley.github.io/main/api/zodiac.json'
	);
	if (response.status === 200) {
		const data = await response.json();
		zodiacData = data;
		return data;
	} else {
		throw new Error('Error: Unable to get Zodiac data from API');
	}
};
const getCZodiac = async () => {
	const response = await fetch(
		'https://raw.githubusercontent.com/bmcgauley/bmcgauley.github.io/main/api/cZodiac.json'
	);
	if (response.status === 200) {
		const data = await response.json();
		return data;
	} else {
		throw new Error(`Error: Unable to get Chinese Zodiac data from API`);
	}
};
const getMood = async () => {
	const response = await fetch(
		'https://raw.githubusercontent.com/bmcgauley/bmcgauley.github.io/main/api/mood.json'
	);
	if (response.status === 200) {
		const data = await response.json();
		return data;
	} else {
		throw new Error(`Error: Unable to get Mood data from API`);
	}
};
