'use strict'
// Load data from local storage on page load
window.addEventListener('load', () => {
	const storedData = localStorage.getItem('messageData');
	if (storedData) {
		data = JSON.parse(storedData);

		refreshDOM(data);
	} else {
		fetch('data.json')
			.then((response) => response.json())
			.then((jsonData) => {
				const messageData = jsonData[0];
				data.subjects = messageData.subjects || [];
				data.scenes = messageData.scenes || [];
				data.styles = messageData.styles || [];
				data.artists = messageData.artists || [];
				data.medium = messageData.medium || [];
				data.log = messageData.log || [];
				data.outputMessage = messageData.outputMessage || '';
				localStorage.setItem('messageData', JSON.stringify(data));
			});
	}
});
// Load the checkbox event listeners when the page is loaded
window.addEventListener('load', addCheckboxEventListeners);
//add custom input sections
addCustomSubjectInput()
addCustomSceneInput()
addCustomStyleInput()
addCustomArtistInput()
addCustomMediumInput()

// Refresh the DOM with the updated data
function refreshDOM(data) {
	populateSubjects(data);
	populateScenes(data);
	populateStyles(data);
	populateArtists(data);
	populateMedium(data)
	loadLogEntries(data);
	getTotalCombinations(data)
}
//create the generate button
createGenerateButton(data);