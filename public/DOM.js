'use strict';
let generateIndexDOM = () => {
	const mainForm = document.createElement('form');
	mainForm.setAttribute('id', 'form');
	mainForm.setAttribute('name', 'form');

	let generateDataDom = (data) => {
		const dataDiv = document.createElement('div');
		const dataSpan = document.createElement('span');
		dataSpan.setAttribute('id', 'data-span');
        const dataLink = document.createElement('a');
        dataLink.setAttribute('id', 'data-link');
        dataLink.setAttribute('href', '/');
        
		const centerDiv = document.querySelector('#main');
		const nameTitle = document.createElement('h2');
		nameTitle.innerHTML = `${data.name}`;
		nameTitle.setAttribute('align', 'center');

		const subjects = document.createElement('h3');
		subjects.innerHTML = `Your Zodiac is: ${data.subjects}`;

		const scenes = document.createElement('p');
		scenes.innerHTML = `${data.scenes}`;

		const styles = document.createElement('h3');
		styles.innerHTML = `Styles: ${data.styles}`;

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

		return dataDiv;
	};
};
