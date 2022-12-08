'use strict'
let generateIndexDOM = () => {
	//linebreaks
	const linebreak0 = document.createElement('br');
	const linebreak1 = document.createElement('br');
	const linebreak2 = document.createElement('p');
	const linebreak3 = document.createElement('br');
	const linebreak4 = document.createElement('p');
	const linebreak5 = document.createElement('br');
	const linebreak6 = document.createElement('br');
	//main page div
	const mainDiv = document.querySelector('#main');
	const pageDiv = document.querySelector('#page-div');
	//center panel div
	const outputDiv = document.querySelector('#output');
	//left panel div
	const leftDiv = document.querySelector('#left');
	//right panel div
	const rigthDiv = document.querySelector('#right');
	//output paragraphs
	const outputText = document.querySelector('#output-para');
	//outputText.setAttribute('class', 'subhead2');
	outputText.setAttribute('align', 'center');
	outputText.textContent = 'Click an entry for more information!';
	//generate inputs
	const mainForm = document.createElement('form');
	mainForm.setAttribute('id', 'form');
	mainForm.setAttribute('name', 'form');
	//name label
	const nameLabel = document.createElement('label');
	nameLabel.textContent = 'Please Enter Your Name: ';
	//first name input
	const fName = document.createElement('input');
	fName.setAttribute('id', 'fName');
	fName.setAttribute('name', 'name');
	fName.setAttribute('placeholder', 'First Name');
	const dateLabel = document.createElement('label');
	dateLabel.textContent = 'Please select your birthday: ';
	//date input
	const date = document.createElement('input');
	date.setAttribute('type', 'date');
	date.setAttribute('id', 'date');
	date.setAttribute('class', 'date');
	//label for mood
	const moodLabel = document.createElement('label');
	moodLabel.textContent = 'Select your current mood: ';
	//select setup
	const moodSelect = document.createElement('select');
	moodSelect.setAttribute('name', 'mood');
	//select options
	const optEmpty = document.createElement('option');
	optEmpty.setAttribute('value', '----');
	optEmpty.textContent = '----';
	const opt0 = document.createElement('option');
	opt0.setAttribute('value', 'happy');
	opt0.textContent = 'Happy';
	const opt1 = document.createElement('option');
	opt1.setAttribute('value', 'fearful');
	opt1.textContent = 'Fearful';
	const opt2 = document.createElement('option');
	opt2.setAttribute('value', 'sad');
	opt2.textContent = 'Sad';
	const opt3 = document.createElement('option');
	opt3.setAttribute('value', 'angry');
	opt3.textContent = 'Angry';
	const opt4 = document.createElement('option');
	opt4.setAttribute('value', 'depressed');
	opt4.textContent = 'Depressed';
	//submit button setup
	const submitButton = document.createElement('button');
	submitButton.setAttribute('id', 'submit');
	submitButton.setAttribute('class', 'button');
	submitButton.textContent = 'Submit';
	//start layout
	document.querySelector('#left').appendChild(linebreak0);
	document.querySelector('#left').appendChild(mainForm);
	mainForm.appendChild(nameLabel);
	nameLabel.appendChild(linebreak6);
	mainForm.appendChild(fName);
	mainForm.appendChild(linebreak5);
	mainForm.appendChild(dateLabel);
	dateLabel.appendChild(linebreak1);
	mainForm.appendChild(date);
	mainForm.appendChild(linebreak2);
	mainForm.appendChild(moodLabel);
	mainForm.appendChild(linebreak3);
	mainForm.appendChild(moodSelect);
	moodSelect.appendChild(optEmpty);
	moodSelect.appendChild(opt0);
	moodSelect.appendChild(opt1);
	moodSelect.appendChild(opt2);
	moodSelect.appendChild(opt3);
	moodSelect.appendChild(opt4);
	mainForm.appendChild(linebreak4);
	mainForm.appendChild(submitButton);
	//setup right column based on storage data check
	if (!localStorage.getItem('data')) {
		outputText.textContent = 'There are no entries';
		saveData([]);
	} else if (localStorage.getItem('data').length <= 0) {
		window.alert('No data in the array present');
		outputText.textContent = 'There are no entries';
		throw new Error('No data in the array present');
	} else {
		outputText.textContent = 'Click an entry for more information!';
		rigthDiv.appendChild(outputDiv);
	}
};
let generateDataDOM = (data) => {
	const dataDiv = document.createElement('div');
	const dataSpan = document.createElement('span');
	dataSpan.setAttribute('id', 'data-span');
	const dataLink = document.createElement('a');
	dataLink.setAttribute('id', 'data-link');
	dataLink.setAttribute('href', '/');
	//edit page link
	const editLink = document.createElement('a');
	editLink.setAttribute('class', 'right');
	editLink.setAttribute('href', `edit.html#${data.id}`);
	editLink.textContent = 'Go to Edit Page >>';
	editLink.setAttribute('align', 'right');
	const centerDiv = document.querySelector('#center-div');
	const nameTitle = document.createElement('h2');
	nameTitle.innerHTML = `${data.name}`;
	nameTitle.setAttribute('align', 'center');
	const bDayInfo = document.createElement('p');
	bDayInfo.innerHTML = `Your Birthday is: ${moment(data.bDay).format(
		'MMM Do, YYYY'
	)}`;

	const zodiacTitle = document.createElement('h3');
	zodiacTitle.innerHTML = `Your Zodiac is: ${data.zodiac}`;

	const zodiacMessage = document.createElement('p');
	zodiacMessage.innerHTML = `${data.zMessage}`;

	const cZodiacTitle = document.createElement('h3');
	cZodiacTitle.innerHTML = `Your Chinese Zodiac is: ${data.chineseZodiac}`;

	const cZodiacMessage = document.createElement('p');
	cZodiacMessage.innerHTML = `${data.czMessage}`;

	const inspMessage = document.createElement('p');
	inspMessage.innerHTML = `${data.mMessage}`;
	inspMessage.setAttribute('class', 'subhead2');
	inspMessage.setAttribute('id', 'message');

	dataLink.addEventListener('click', (e) => {
		e.preventDefault();

		document.querySelector('#center-div').innerHTML = '';
		centerDiv.appendChild(nameTitle);
		centerDiv.appendChild(editLink);
		centerDiv.appendChild(bDayInfo);
		centerDiv.appendChild(inspMessage);

		centerDiv.appendChild(zodiacTitle);
		centerDiv.appendChild(zodiacMessage);
		centerDiv.appendChild(cZodiacTitle);
		centerDiv.appendChild(cZodiacMessage);
	});

	const dataRem = document.createElement('button');
	dataRem.setAttribute('class', 'button');
	dataRem.textContent = 'x';
	dataRem.addEventListener('click', () => removeData(data.id));
	dataLink.innerHTML = `<p class="subhead2">${data.name}<br />${moment(
		data.bDay
	).format(`MMM Do, YYYY`)}</span>`;
	dataDiv.appendChild(dataSpan);
	dataSpan.appendChild(dataLink);

	dataSpan.appendChild(dataRem);

	return dataDiv;
};
const generateEditPageDOM = () => {
	const mainDiv = document.querySelector('#main');
	const homeLink = document.createElement('a');
	homeLink.setAttribute('href', 'index.html');
	homeLink.textContent = '<< Go Back';

	const dataID = document.createElement('h1');
	dataID.setAttribute('id', 'title');

	const editBody = document.createElement('h3');
	editBody.setAttribute('align', 'center');
	editBody.setAttribute('id', 'body');

	const updateSpan = document.createElement('span');
	updateSpan.setAttribute('id', 'update');

	const updateForm = document.createElement('form');
	updateForm.setAttribute('id', 'update-form');

	const remButton = document.createElement('button');
	remButton.setAttribute('id', 'remove');
	remButton.setAttribute('class', 'button');
	remButton.textContent = 'Remove Entry';

	//label for mood
	const moodLabel = document.createElement('label');
	moodLabel.textContent = 'Select your current mood: ';
	//select setup
	const moodSelect = document.createElement('select');
	moodSelect.setAttribute('name', 'mood');
	//select options
	const optEmpty = document.createElement('option');
	optEmpty.setAttribute('value', '----');
	optEmpty.textContent = '----';
	const opt0 = document.createElement('option');
	opt0.setAttribute('value', 'happy');
	opt0.textContent = 'Happy';
	const opt1 = document.createElement('option');
	opt1.setAttribute('value', 'fearful');
	opt1.textContent = 'Fearful';
	const opt2 = document.createElement('option');
	opt2.setAttribute('value', 'sad');
	opt2.textContent = 'Sad';
	const opt3 = document.createElement('option');
	opt3.setAttribute('value', 'angry');
	opt3.textContent = 'Angry';
	const opt4 = document.createElement('option');
	opt4.setAttribute('value', 'depressed');
	opt4.textContent = 'Depressed';
	//submit button setup
	const submitButton = document.createElement('button');
	submitButton.setAttribute('id', 'submit');
	submitButton.setAttribute('class', 'button');
	submitButton.textContent = 'Submit';

	mainDiv.appendChild(homeLink);
	mainDiv.appendChild(dataID);
	mainDiv.appendChild(editBody);
	mainDiv.appendChild(remButton);
	mainDiv.appendChild(updateForm);
	updateForm.appendChild(moodLabel);
	moodLabel.appendChild(moodSelect);
	moodSelect.appendChild(optEmpty);
	moodSelect.appendChild(opt0);
	moodSelect.appendChild(opt1);
	moodSelect.appendChild(opt2);
	moodSelect.appendChild(opt3);
	moodSelect.appendChild(opt4);
	updateForm.appendChild(submitButton);
	mainDiv.appendChild(updateSpan);
};
