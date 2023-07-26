'use strict';

//get saved data
const getSavedData = () => {
	const dataJSON = localStorage.getItem('messageData');
	try {
		return dataJSON ? JSON.parse(dataJSON) : fetch('data.json');
	} catch (e) {
		return [];
	}
};

//declare data && get saved data from local storage
let data = getSavedData();
//functionality to save data back into local storage
const saveData = (data) => {
	localStorage.setItem('messageData', JSON.stringify(data));
	// refreshDOM(data);
};
function confirmDelete() {
	const confirmation = confirm('Are you sure you want to delete?');

	if (confirmation) {
		// Perform the delete operation by returning bool true (deleted upon exit to parent call)
		return true;
	} else {
		location.assign('index2.html');
		return false;
	}
}
function processSongLyrics() {
    const inputTextarea = document.getElementById('transcriberText');
    const genreInput = document.getElementById('genreInput');
    const artistInput = document.getElementById('artistInput');
    const songTitleInput = document.getElementById('songTitleInput');

    const genre = genreInput.value.trim();
    const artist = artistInput.value.trim();
    const songTitle = songTitleInput.value.trim();
    const lyrics = inputTextarea.value.trim();

    if (lyrics === '') {
        console.log('Please enter song lyrics or poem lines.');
        return;
    }

    if (songTitle === '') {
        console.log('Please enter a song title.');
        return;
    }

    const lines = lyrics.split('\n');

    const categorizedLines = JSON.parse(localStorage.getItem('songLyrics')) || {};

    if (!categorizedLines.hasOwnProperty(genre)) {
        categorizedLines[genre] = {};
    }

    if (!categorizedLines[genre].hasOwnProperty(artist)) {
        categorizedLines[genre][artist] = {};
    }

    if (categorizedLines[genre][artist].hasOwnProperty(songTitle)) {
        console.log('Song title already exists. Please choose a different title.');
        return;
    }

    categorizedLines[genre][artist][songTitle] = lines;

    localStorage.setItem('songLyrics', JSON.stringify(categorizedLines));

    console.log('Song lyrics or poem processed and saved successfully.');

    // Clear the input fields
    inputTextarea.value = '';
    genreInput.value = '';
    artistInput.value = '';
    songTitleInput.value = '';

    // Update the log display
    updateLogDisplay(categorizedLines);
}
function updateLogDisplay(categorizedLines) {
	const logSpan = document.getElementById('logspan2');
	logSpan.innerHTML = '';

	for (const genre in categorizedLines) {
		const artists = categorizedLines[genre];

		const genreEntryContainer = document.createElement('div');
		genreEntryContainer.className = 'genre-entry-container';

		const genreHeader = document.createElement('h2');
		genreHeader.textContent = genre;
		genreHeader.addEventListener('click', toggleGenreGroup);
		genreHeader.classList.add('accordion');
		genreEntryContainer.appendChild(genreHeader);

		for (const artist in artists) {
			const songs = artists[artist];

			const artistEntryContainer = document.createElement('div');
			artistEntryContainer.className = 'artist-entry-container';
			artistEntryContainer.style.display = 'none';

			const artistHeader = document.createElement('h3');
			artistHeader.textContent = artist;
			artistHeader.addEventListener('click', toggleArtistGroup);
			artistHeader.classList.add('accordion');
			artistEntryContainer.appendChild(artistHeader);

			for (const songTitle in songs) {
				const lines = songs[songTitle];

				const songEntryContainer = document.createElement('div');
				songEntryContainer.className = 'song-entry-container';
				// songEntryContainer.style.display = 'flex';
				songEntryContainer.id = 'output'
				songEntryContainer.setAttribute('data-artist', artist);

				const songTitleHeader = document.createElement('h4');
				songTitleHeader.textContent = songTitle;
				songTitleHeader.style.display = 'block';
				songTitleHeader.addEventListener('click', toggleSongGroup);
				songTitleHeader.classList.add('accordion');
				songEntryContainer.appendChild(songTitleHeader);

				const deleteSongButton = document.createElement('button');
				deleteSongButton.textContent = 'Delete Song';
				deleteSongButton.classList.add('delete-button');
				deleteSongButton.addEventListener('click', () => {
					deleteSongEntry(genre, artist, songTitle);
				});
				// songEntryContainer.appendChild(deleteSongButton);

				const linesContainer = document.createElement('div');
				linesContainer.classList.add('panel');

				lines.forEach((line) => {
					const lineContainer = document.createElement('div');
					lineContainer.className = 'line-container';

					const lineText = document.createElement('span');
					lineText.textContent = line;
					lineContainer.appendChild(lineText);

					const copyButton = document.createElement('button');
					copyButton.textContent = 'Copy';
					copyButton.addEventListener('click', () => {
						navigator.clipboard
							.writeText(line)
							.then(() => {
								alert('Line copied to clipboard!');
							})
							.catch((error) => {
								console.error('Error copying line to clipboard:', error);
							});
					});
					lineContainer.appendChild(copyButton);

					const deleteLineButton = document.createElement('button');
					deleteLineButton.textContent = 'Delete Line';
					deleteLineButton.classList.add('delete-button');
					deleteLineButton.addEventListener('click', () => {
						deleteLineEntry(genre, artist, songTitle, line);
					});
					
					lineContainer.appendChild(deleteLineButton);

					linesContainer.appendChild(lineContainer);
					songEntryContainer.appendChild(linesContainer);
					songEntryContainer.appendChild(deleteSongButton);
					
				});

				
				
				
				artistEntryContainer.appendChild(songEntryContainer);
			}

			genreEntryContainer.appendChild(artistEntryContainer);
		}

		logSpan.appendChild(genreEntryContainer);
	}

	// Function to handle accordion-style behavior
	function toggleGenreGroup(event) {
		const genreHeader = event.target;
		const artistEntryContainer = genreHeader.nextElementSibling;

		if (artistEntryContainer.style.display === 'block') {
			artistEntryContainer.style.display = 'none';
		} else {
			artistEntryContainer.style.display = 'block';
		}
	}

	function toggleArtistGroup(event) {
		const artistHeader = event.target;
		const songEntryContainer = artistHeader.nextElementSibling;
		const artistName = artistHeader.textContent;
	  
		// Find all the song entry containers with matching artists
		const matchingSongContainers = document.querySelectorAll(
		  `.song-entry-container[data-artist="${artistName}"]`
		);
	  
		matchingSongContainers.forEach((container) => {
		  if (container.style.display === 'block') {
			container.style.display = 'none';
		  } else {
			container.style.display = 'block';
		  }
		});
	  }
	  

	function toggleSongGroup(event) {
		const songTitleHeader = event.target;
		const linesContainer = songTitleHeader.nextElementSibling;

		if (linesContainer.style.display === 'block') {
			linesContainer.style.display = 'none';
		} else {
			linesContainer.style.display = 'block';
		}
	}

	// Function to delete a song entry
	function deleteSongEntry(genre, artist, songTitle) {
		// Retrieve the existing data from local storage
		const storedCategorizedLines = JSON.parse(localStorage.getItem('songLyrics'));
	  
		// Check if the genre exists in the data
		if (storedCategorizedLines.hasOwnProperty(genre)) {
		  const artists = storedCategorizedLines[genre];
	  
		  // Check if the artist exists in the data
		  if (artists.hasOwnProperty(artist)) {
			const songs = artists[artist];
	  
			// Check if the song title exists in the data
			if (songs.hasOwnProperty(songTitle)) {
			  // Delete the song entry
			  delete songs[songTitle];
	  
			  // If there are no more songs under the artist, delete the artist entry
			  if (Object.keys(songs).length === 0) {
				delete artists[artist];
			  }
	  
			  // If there are no more artists under the genre, delete the genre entry
			  if (Object.keys(artists).length === 0) {
				delete storedCategorizedLines[genre];
			  }
	  
			  // Save the updated data back to local storage
			  localStorage.setItem('songLyrics', JSON.stringify(storedCategorizedLines));
	  
			  // Refresh the log display after deletion
			  updateLogDisplay(storedCategorizedLines);
			} else {
			  console.log('Song title not found.');
			}
		  } else {
			console.log('Artist not found.');
		  }
		} else {
		  console.log('Genre not found.');
		}
	  }
	  
	  function deleteLineEntry(genre, artist, songTitle, line) {
		// Retrieve the existing data from local storage
		const storedCategorizedLines = JSON.parse(localStorage.getItem('songLyrics'));
	  
		// Check if the genre exists in the data
		if (storedCategorizedLines.hasOwnProperty(genre)) {
		  const artists = storedCategorizedLines[genre];
	  
		  // Check if the artist exists in the data
		  if (artists.hasOwnProperty(artist)) {
			const songs = artists[artist];
	  
			// Check if the song title exists in the data
			if (songs.hasOwnProperty(songTitle)) {
			  const lines = songs[songTitle];
	  
			  // Find the index of the line in the array
			  const lineIndex = lines.indexOf(line);
	  
			  // If the line exists in the array, remove it
			  if (lineIndex !== -1) {
				lines.splice(lineIndex, 1);
	  
				// If there are no more lines under the song title, delete the song entry
				if (lines.length === 0) {
				  delete songs[songTitle];
				}
	  
				// If there are no more songs under the artist, delete the artist entry
				if (Object.keys(songs).length === 0) {
				  delete artists[artist];
				}
	  
				// If there are no more artists under the genre, delete the genre entry
				if (Object.keys(artists).length === 0) {
				  delete storedCategorizedLines[genre];
				}
	  
				// Save the updated data back to local storage
				localStorage.setItem('songLyrics', JSON.stringify(storedCategorizedLines));
	  
				// Refresh the log display after deletion
				updateLogDisplay(storedCategorizedLines);
			  } else {
				console.log('Line not found.');
			  }
			} else {
			  console.log('Song title not found.');
			}
		  } else {
			console.log('Artist not found.');
		  }
		} else {
		  console.log('Genre not found.');
		}
	  }
	  
}

function transcribeButton() {
	const generateButton = document.createElement('button');
	generateButton.id = 'transcribeButton';
	generateButton.textContent = 'Transcribe';
	generateButton.addEventListener('click', processSongLyrics);

	const generateContainer = document.getElementById('transcribeContainer');
	generateContainer.innerHTML = ''; // Clear previous content
	generateContainer.appendChild(generateButton);
}

// Call the transcribeButton function to initialize the button
transcribeButton();

// Retrieve the existing song lyrics from storage and update the log display
const storedCategorizedLines = JSON.parse(localStorage.getItem('songLyrics'));
updateLogDisplay(storedCategorizedLines || {});

// Create and append the "Generate" button
function createGenerateButton() {
	const generateButton = document.createElement('button');
	generateButton.id = 'generateButton';
	generateButton.textContent = 'Generate';
	generateButton.addEventListener('click', handleGenerateClick);

	const generateContainer = document.getElementById('generateContainer');
	// generateContainer.innerHTML = ''; // Clear previous content
	generateContainer.appendChild(generateButton);
}
// Event handler for the "Generate" button click
function handleGenerateClick(event) {
	event.preventDefault();
	const selectedSubjects = Array.from(
		document.querySelectorAll('#subjects input[type="checkbox"]:checked')
	).map((checkbox) => checkbox.value);
	const selectedScenes = Array.from(
		document.querySelectorAll('#scenes input[type="checkbox"]:checked')
	).map((checkbox) => checkbox.value);
	const selectedStyles = Array.from(
		document.querySelectorAll('#styles input[type="checkbox"]:checked')
	).map((checkbox) => checkbox.value);
	const selectedArtists = Array.from(
		document.querySelectorAll('#artists input[type="checkbox"]:checked')
	).map((checkbox) => checkbox.value);
	const selectedMediums = Array.from(
		document.querySelectorAll('#mediums input[type="checkbox"]:checked')
	).map((checkbox) => checkbox.value);

	const message = function (
		selectedSubjects,
		selectedScenes,
		selectedStyles,
		selectedArtists,
		selectedMediums
	) {
		const fragments = [];

		if (selectedSubjects.length > 0) {
			fragments.push(`The subject matter of {${selectedSubjects.join(', ')}}`);
		}

		if (selectedScenes.length > 0) {
			fragments.push(`in the scene of {${selectedScenes.join(', ')}}`);
		}

		if (selectedStyles.length > 0) {
			fragments.push(`with the style of {${selectedStyles.join(', ')}}`);
		}

		if (selectedArtists.length > 0) {
			fragments.push(
				`with influence from the artist {${selectedArtists.join(', ')}}`
			);
		}

		if (selectedMediums.length > 0) {
			fragments.push(`as the medium of {${selectedMediums.join(', ')}}`);
		}

		const message = `/imagine prompt: ${fragments.join(' ')}`;
		return message.trim();
	};

	document.getElementById('preview').value = message(
		selectedSubjects,
		selectedScenes,
		selectedStyles,
		selectedArtists,
		selectedMediums
	);

	//   // Add event listeners to checkboxes
	const subjectCheckboxes = document.querySelectorAll(
		'#subjects input[type="checkbox"]'
	);
	subjectCheckboxes.forEach((checkbox) => {
		checkbox.addEventListener('click', handleCheckboxClick);
	});

	const sceneCheckboxes = document.querySelectorAll(
		'#scenes input[type="checkbox"]'
	);
	sceneCheckboxes.forEach((checkbox) => {
		checkbox.addEventListener('click', handleCheckboxClick);
	});

	const styleCheckboxes = document.querySelectorAll(
		'#styles input[type="checkbox"]'
	);
	styleCheckboxes.forEach((checkbox) => {
		checkbox.addEventListener('click', handleCheckboxClick);
	});
	const artistCheckboxes = document.querySelectorAll(
		'#artists input[type="checkbox"]'
	);
	artistCheckboxes.forEach((checkbox) => {
		checkbox.addEventListener('click', handleCheckboxClick);
	});

	const mediumCheckboxes = document.querySelectorAll(
		'#mediums input[type="checkbox"]'
	);
	mediumCheckboxes.forEach((checkbox) => {
		checkbox.addEventListener('click', handleCheckboxClick);
	});

	// Load log entries when the page is loaded
	// window.addEventListener('DOMContentLoaded', loadLogEntries);

	// Create and append the copy button
	const newCopyButton = document.createElement('button');
	newCopyButton.id = 'copyButton';

	newCopyButton.className = 'copyButton';
	newCopyButton.textContent = `Copy`;
	newCopyButton.setAttribute(
		'data-message',
		message(
			selectedSubjects,
			selectedScenes,
			selectedStyles,
			selectedArtists,
			selectedMediums
		)
	);
	newCopyButton.addEventListener('click', handleCopyClick);

	// Event handler for the "Copy" button click
	function handleCopyClick(event) {
		event.preventDefault();
		const msg = event.target.getAttribute('data-message');

		navigator.clipboard
			.writeText(msg)
			.then(() => {
				alert('Copied to clipboard!');
			})
			.catch((error) => {
				console.error('Error copying to clipboard:', error);
			});
	}

	const generateContainer = document.getElementById('generateContainer');
	generateContainer.appendChild(document.createElement('br'));
	generateContainer.appendChild(newCopyButton);
	//generateContainer.innerHTML = ''; // Clear previous content
	const generateMessage = document.createElement('textarea');
	generateMessage.className = 'message';
	generateMessage.value = `Generated Message: ${message(
		selectedSubjects,
		selectedScenes,
		selectedStyles,
		selectedArtists,
		selectedMediums
	)}`;
	generateContainer.appendChild(generateMessage);

	generateContainer.appendChild(document.createElement('br'));
	generateContainer.appendChild(document.getElementById('preview'));
	generateContainer.appendChild(document.createElement('br'));

	addLogEntry(
		data,
		message(
			selectedSubjects,
			selectedScenes,
			selectedStyles,
			selectedArtists,
			selectedMediums
		)
	);

	// Remove the event listeners for checkboxes
	removeCheckboxEventListeners();

	// Add the event listeners for checkboxes
	addCheckboxEventListeners();
}
// Event handler for checkbox click events
function handleCheckboxClick() {
	const selectedSubjects = Array.from(
		document.querySelectorAll('#subjects input[type="checkbox"]:checked')
	).map((checkbox) => checkbox.value);
	const selectedScenes = Array.from(
		document.querySelectorAll('#scenes input[type="checkbox"]:checked')
	).map((checkbox) => checkbox.value);
	const selectedStyles = Array.from(
		document.querySelectorAll('#styles input[type="checkbox"]:checked')
	).map((checkbox) => checkbox.value);
	const selectedArtists = Array.from(
		document.querySelectorAll('#artists input[type="checkbox"]:checked')
	).map((checkbox) => checkbox.value);
	const selectedMediums = Array.from(
		document.querySelectorAll('#mediums input[type="checkbox"]:checked')
	).map((checkbox) => checkbox.value);
	let combinations = getTotalCombinations();

	function msg(
		selectedSubjects,
		selectedScenes,
		selectedStyles,
		selectedArtists,
		selectedMediums
	) {
		const fragments = [];

		if (selectedSubjects.length > 0) {
			fragments.push(`The subject matter of {${selectedSubjects.join(', ')}}`);
		}

		if (selectedScenes.length > 0) {
			fragments.push(`in the scene of {${selectedScenes.join(', ')}}`);
		}

		if (selectedStyles.length > 0) {
			fragments.push(`with the style of {${selectedStyles.join(', ')}}`);
		}

		if (selectedArtists.length > 0) {
			fragments.push(
				`with influence from the artist {${selectedArtists.join(', ')}}`
			);
		}

		if (selectedMediums.length > 0) {
			fragments.push(`as the medium of {${selectedMediums.join(', ')}}`);
		}

		const message = `/imagine prompt: ${fragments.join(' ')}`;
		return message.trim();
	}
	const message = msg(
		selectedSubjects,
		selectedScenes,
		selectedStyles,
		selectedArtists,
		selectedMediums
	);

	// Update the preview textarea with the generated message
	document.getElementById('preview').textContent = message;

	let data = getSavedData();

	let messageData = localStorage.getItem('messageData');
	data.outputMessage = combinations;
	localStorage.setItem('messageData', JSON.stringify(data));
	let counterh1 = document.getElementById('h1');

	if (combinations <= 39) {
		counterh1.innerHTML = `Total Combinations Permutations: ${combinations}`;
		counterh1.classList = 'green';
	} else if (combinations >= 41) {
		counterh1.innerHTML = `Total Combinations Permutations: ${combinations}`;
		counterh1.classList = 'red';
	} else if ((combinations = 40)) {
		counterh1.innerHTML = `Total Combinations Permutations: ${combinations}`;
		counterh1.classList = 'gold';
	}
}
function addCheckboxEventListeners() {
	const subjectCheckboxes = document.querySelectorAll(
		'#subjects input[type="checkbox"]'
	);
	subjectCheckboxes.forEach((checkbox) => {
		checkbox.addEventListener('click', handleCheckboxClick);
	});

	const sceneCheckboxes = document.querySelectorAll(
		'#scenes input[type="checkbox"]'
	);
	sceneCheckboxes.forEach((checkbox) => {
		checkbox.addEventListener('click', handleCheckboxClick);
	});

	const styleCheckboxes = document.querySelectorAll(
		'#styles input[type="checkbox"]'
	);
	styleCheckboxes.forEach((checkbox) => {
		checkbox.addEventListener('click', handleCheckboxClick);
	});

	const artistCheckboxes = document.querySelectorAll(
		'#artists input[type="checkbox"]'
	);
	artistCheckboxes.forEach((checkbox) => {
		checkbox.addEventListener('click', handleCheckboxClick);
	});

	const mediumCheckboxes = document.querySelectorAll(
		'#mediums input[type="checkbox"]'
	);
	mediumCheckboxes.forEach((checkbox) => {
		checkbox.addEventListener('click', handleCheckboxClick);
	});
}
// Function to remove event listeners from checkboxes
function removeCheckboxEventListeners() {
	const subjectCheckboxes = document.querySelectorAll(
		'#subjects input[type="checkbox"]'
	);
	subjectCheckboxes.forEach((checkbox) => {
		checkbox.removeEventListener('click', handleCheckboxClick);
	});

	const sceneCheckboxes = document.querySelectorAll(
		'#scenes input[type="checkbox"]'
	);
	sceneCheckboxes.forEach((checkbox) => {
		checkbox.removeEventListener('click', handleCheckboxClick);
	});

	const styleCheckboxes = document.querySelectorAll(
		'#styles input[type="checkbox"]'
	);
	styleCheckboxes.forEach((checkbox) => {
		checkbox.removeEventListener('click', handleCheckboxClick);
	});

	const artistCheckboxes = document.querySelectorAll(
		'#artists input[type="checkbox"]'
	);
	artistCheckboxes.forEach((checkbox) => {
		checkbox.removeEventListener('click', handleCheckboxClick);
	});

	const mediumCheckboxes = document.querySelectorAll(
		'#mediums input[type="checkbox"]'
	);
	mediumCheckboxes.forEach((checkbox) => {
		checkbox.removeEventListener('click', handleCheckboxClick);
	});
}
// Function to add log entry to local storage
function addLogEntry(data, message) {
	const storedLog = data;
	storedLog.log.push(message);
	saveData(storedLog);
	refreshDOM(data);
}
// Function to delete log entry from local storage
function deleteLogEntry(entry) {
	const storedLog = data;
	const indexEntry = storedLog.log.indexOf(entry);
	if (indexEntry > -1) {
		storedLog.log.splice(indexEntry, 1);
		saveData(storedLog);
		refreshDOM(data);
	}
	// location.reload()
}
// Function to load log entries from local storage
function loadLogEntries(data) {
	// const storedLog = JSON.parse(localStorage.getItem('messageData')) || [];
	const storedLog = data;
	const logContainer = document.getElementById('log');
	logContainer.innerHTML = '';
	data.log.forEach((element) => {
		// console.log(`element.length = ${element.length}`);
		const logEntry = document.createElement('div');
		logEntry.textContent = element;
		// console.log(`logEntry = ${logEntry}`)
		// Create delete button for the log entry
		const deleteButton = document.createElement('button');
		deleteButton.textContent = 'Delete';
		deleteButton.addEventListener('click', () => {
			//confirm delete
			if (confirmDelete()) {
				deleteLogEntry(element);
			} else {
			}

			// Remove the log entry from local storage

			// Remove the log entry from the log container
			// logContainer.removeChild(logEntry);
		});
		// Append the log entry to the log container
		logContainer.appendChild(logEntry);
		// Append the delete button to the log entry
		logEntry.appendChild(deleteButton);
	});
}
/////////////////////////////
// Populate Subjects Category
function populateSubjects() {
	const subjectsDiv = document.getElementById('subjects');
	subjectsDiv.innerHTML = ''; // Clear previous checkboxes and input fields
	data.subjects.forEach((subject, index) => {
		const checkbox = document.createElement('input');
		checkbox.type = 'checkbox';
		checkbox.className = 'checkbox';
		checkbox.value = subject;
		checkbox.id = `subjectCheckbox_${index}`;
		const input = document.createElement('input');
		input.type = 'text';
		input.value = subject;
		input.id = `subjectInput_${index}`;
		input.classList = 'subjectInput';
		input.addEventListener('input', () => {
			checkbox.value = input.value;
			saveData(data);
			// updateLocalStorageSubjects();
		});
		const label = document.createElement('label');
		label.htmlFor = `subjectCheckbox_${index}`;
		label.classList = 'subjectInput';
		label.appendChild(checkbox);
		label.appendChild(input);
		subjectsDiv.appendChild(label);
		const deleteButton = document.createElement('button');
		deleteButton.textContent = 'x';
		deleteButton.addEventListener('click', () => {
			//confirm delete
			if (confirmDelete()) {
				deleteSubject(subject);
			} else {
				// refreshDOM()
			}
		});
		function deleteSubject(subject) {
			const subjectIndex = data.subjects.indexOf(subject);
			if (subjectIndex > -1) {
				data.subjects.splice(subjectIndex, 1);
				localStorage.setItem('messageData', JSON.stringify(data));
				populateSubjects(data.subjects);
			}
		}
		const subjectContainer = document.createElement('div');
		subjectContainer.classList.add('subject-container');
		label.appendChild(checkbox);
		subjectContainer.appendChild(label);
		label.appendChild(deleteButton);
		subjectsDiv.appendChild(subjectContainer);
	});
	// addCustomSubjectInput(subjectsDiv);
}
// Add custom subject input field
function addCustomSubjectInput(parentElement) {
	const input = document.createElement('input');
	input.type = 'text';
	input.placeholder = 'Enter a new subject';
	const container = document.querySelector('#subjects-head');
	input.addEventListener('keyup', (event) => {
		if (event.key === 'Enter') {
			const newSubject = input.value.trim();
			if (newSubject !== '') {
				const checkbox = document.createElement('input');
				checkbox.type = 'checkbox';
				checkbox.value = newSubject;
				checkbox.id = `subjectCheckbox_${data.subjects.length}`;
				const label = document.createElement('label');
				label.htmlFor = `subjectCheckbox_${data.subjects.length}`;
				label.appendChild(checkbox);
				label.appendChild(document.createTextNode(newSubject));
				const br = document.createElement('br');
				parentElement.insertBefore(label, input);
				parentElement.insertBefore(br, input);
				const addButton = document.createElement('button');
				data.subjects.push(newSubject);
				saveData(data);

				// updateLocalStorageSubjects();
				input.value = '';
			}
		}
	});
	//parentElement.appendChild(input);
	const addButton = document.createElement('button');
	addButton.textContent = 'Add';
	addButton.addEventListener('click', () => {
		const newSubject = input.value.trim();
		if (newSubject !== '') {
			data.subjects.push(newSubject);
			saveData(data);
			// updateLocalStorageSubjects();
			populateSubjects(data.subjects); // Refresh the subjects list
			input.value = '';
		}
	});
	container.appendChild(input);
	container.appendChild(addButton);
}
// Populate scenes category
function populateScenes() {
	const scenesDiv = document.getElementById('scenes');
	scenesDiv.innerHTML = ''; // Clear previous checkboxes
	data.scenes.forEach((scene, index) => {
		const checkbox = document.createElement('input');
		checkbox.type = 'checkbox';
		checkbox.className = 'checkbox';
		checkbox.value = scene;
		checkbox.id = `sceneCheckbox_${index}`;
		const input = document.createElement('input');
		input.type = 'text';
		input.value = scene;
		input.id = `sceneInput_${index}`;
		input.addEventListener('input', () => {
			checkbox.value = input.value;
			// updateLocalStorageScenes();
			saveData(data);
			populateScenes(data.scenes);
		});
		const label = document.createElement('label');
		label.htmlFor = `sceneCheckbox_${index}`;
		label.classList = 'sceneInput';
		label.appendChild(checkbox);
		label.appendChild(input);
		scenesDiv.appendChild(label);
		const deleteButton = document.createElement('button');
		deleteButton.textContent = 'x';
		deleteButton.addEventListener('click', () => {
			//confirm delete
			if (confirmDelete()) {
				deleteScene(scene);
			} else {
				// refreshDOM()
			}
		});
		function deleteScene(scene) {
			const sceneIndex = data.scenes.indexOf(scene);
			if (sceneIndex > -1) {
				data.scenes.splice(sceneIndex, 1);
				localStorage.setItem('messageData', JSON.stringify(data));
				populateScenes(data.scenes);
			}
		}
		const sceneContainer = document.createElement('div');
		sceneContainer.classList.add('scene-container');
		label.appendChild(checkbox);
		sceneContainer.appendChild(label);
		label.appendChild(deleteButton);
		scenesDiv.appendChild(sceneContainer);
	});
	// addCustomSceneInput(scenesDiv);
}
function addCustomSceneInput(parentElement) {
	const input = document.createElement('input');
	input.type = 'text';
	input.placeholder = 'Enter a new scene';
	const container = document.querySelector('#scenes-head');

	input.addEventListener('keyup', (event) => {
		if (event.key === 'Enter') {
			const newScene = input.value.trim();
			if (newScene !== '') {
				const checkbox = document.createElement('input');
				checkbox.type = 'checkbox';
				checkbox.value = newScene;
				checkbox.id = `sceneCheckbox_${data.scenes.length}`;

				const label = document.createElement('label');
				label.htmlFor = `sceneCheckbox_${data.scenes.length}`;
				label.appendChild(checkbox);
				label.appendChild(document.createTextNode(newScene));

				const br = document.createElement('br');

				parentElement.insertBefore(label, input);
				parentElement.insertBefore(br, input);

				const addButton = document.createElement('button');
				data.scenes.push(newScene);
				saveData(data);
				populateScenes(data.scenes);
				// updateLocalStorageScenes();

				input.value = '';
			}
		}
	});

	const addButton = document.createElement('button');
	addButton.textContent = 'Add';
	addButton.addEventListener('click', () => {
		const newScene = input.value.trim();
		if (newScene !== '') {
			data.scenes.push(newScene);
			saveData(data);
			// updateLocalStorageScenes();
			populateScenes(data.scenes); // Refresh the scenes list
			input.value = '';
		}
	});

	container.appendChild(input);
	container.appendChild(addButton);
}
// Populate styles category
function populateStyles() {
	const stylesDiv = document.getElementById('styles');
	stylesDiv.innerHTML = ''; // Clear previous checkboxes
	data.styles.forEach((style, index) => {
		const checkbox = document.createElement('input');
		checkbox.type = 'checkbox';
		checkbox.className = 'checkbox';
		checkbox.value = style;
		checkbox.id = `styleCheckbox_${index}`;
		const input = document.createElement('input');
		input.type = 'text';
		input.value = style;
		input.id = `styleInput_${index}`;
		input.addEventListener('input', () => {
			checkbox.value = input.value;
			saveData(data);
			// updateLocalStorageStyles();
		});
		const label = document.createElement('label');
		label.htmlFor = `styleCheckbox_${index}`;
		const deleteButton = document.createElement('button');
		deleteButton.textContent = 'x';
		deleteButton.addEventListener('click', () => {
			//confirm delete
			if (confirmDelete()) {
				deleteStyle(style);
			} else {
				// refreshDOM()
			}
		});
		function deleteStyle(style) {
			const styleIndex = data.styles.indexOf(style);
			if (styleIndex > -1) {
				data.styles.splice(styleIndex, 1);
				localStorage.setItem('messageData', JSON.stringify(data));
				populateStyles(data.styles);
			}
		}
		const styleContainer = document.createElement('div');
		styleContainer.classList.add('style-container');
		stylesDiv.appendChild(styleContainer);
		styleContainer.appendChild(label);
		label.appendChild(checkbox);
		styleContainer.appendChild(input);
		styleContainer.appendChild(deleteButton);
	});
	// addCustomStyleInput(stylesDiv);
}
function addCustomStyleInput(parentElement) {
	const input = document.createElement('input');
	input.classList.add('add-new-style');
	input.type = 'text';
	input.placeholder = 'Enter a new style';
	const container = document.querySelector('#styles-head');
	input.addEventListener('keyup', (event) => {
		if (event.key === 'Enter') {
			const newStyle = input.value.trim();
			if (newStyle !== '') {
				const checkbox = document.createElement('input');
				checkbox.type = 'checkbox';
				checkbox.value = newStyle;
				checkbox.id = `styleCheckbox_${data.styles.length}`;
				const label = document.createElement('label');
				label.htmlFor = `styleCheckbox_${data.styles.length}`;
				label.appendChild(checkbox);
				label.appendChild(document.createTextNode(newStyle));
				const br = document.createElement('br');
				parentElement.insertBefore(label, input);
				parentElement.insertBefore(br, input);
				const addButton = document.createElement('button');
				data.styles.push(newStyle);
				saveData(data);
				populateStyles(data.styles);
				// updateLocalStorageStyles();
				input.value = '';
			}
		}
	});
	const addButton = document.createElement('button');
	addButton.textContent = 'Add';
	addButton.addEventListener('click', () => {
		const newStyle = input.value.trim();
		if (newStyle !== '') {
			data.styles.push(newStyle);
			// updateLocalStorageStyles();
			saveData(data);
			populateStyles(data.styles); // Refresh the styles list
			input.value = '';
		}
	});
	container.appendChild(input);
	container.appendChild(addButton);
}
// Populate artist category
function populateArtists() {
	const artistsDiv = document.getElementById('artists');
	artistsDiv.innerHTML = ''; // Clear previous checkboxes
	data.artists.forEach((artist, index) => {
		const checkbox = document.createElement('input');
		checkbox.type = 'checkbox';
		checkbox.className = 'checkbox';
		checkbox.value = artist;
		checkbox.id = `artistCheckbox_${index}`;
		const input = document.createElement('input');
		input.type = 'text';
		input.value = artist;
		input.id = `artistInput_${index}`;
		input.addEventListener('input', () => {
			checkbox.value = input.value;
			saveData(data);
			// updateLocalStorageArtists();
		});
		const label = document.createElement('label');
		label.htmlFor = `artistCheckbox_${index}`;
		const deleteButton = document.createElement('button');
		deleteButton.textContent = 'x';
		deleteButton.addEventListener('click', () => {
			//confirm delete
			if (confirmDelete()) {
				deleteStyle(artist);
			} else {
				// refreshDOM()
			}
		});
		function deleteStyle(artist) {
			const artistIndex = data.artists.indexOf(artist);
			if (artistIndex > -1) {
				data.artists.splice(artistIndex, 1);
				localStorage.setItem('messageData', JSON.stringify(data));
				saveData(data);
				populateStyles(data.artists);
			}
		}
		const artistContainer = document.createElement('div');
		artistContainer.classList.add('artist-container');
		artistsDiv.appendChild(artistContainer);
		artistContainer.appendChild(label);
		label.appendChild(checkbox);
		artistContainer.appendChild(input);
		artistContainer.appendChild(deleteButton);
	});
	// addCustomStyleInput(stylesDiv);
}
function addCustomArtistInput(parentElement) {
	const input = document.createElement('input');
	input.classList.add('add-new-artist');
	input.type = 'text';
	input.placeholder = 'Enter a new artist';
	const container = document.querySelector('#artists-head');
	input.addEventListener('keyup', (event) => {
		if (event.key === 'Enter') {
			const newArtist = input.value.trim();
			if (newArtist !== '') {
				const checkbox = document.createElement('input');
				checkbox.type = 'checkbox';
				checkbox.value = newArtist;
				checkbox.id = `artistCheckbox_${data.artist.length}`;
				const label = document.createElement('label');
				label.htmlFor = `artistCheckbox_${data.artist.length}`;
				label.appendChild(checkbox);
				label.appendChild(document.createTextNode(newArtist));
				const br = document.createElement('br');
				parentElement.insertBefore(label, input);
				parentElement.insertBefore(br, input);
				const addButton = document.createElement('button');
				data.styles.push(newArtist);
				saveData(data);
				populateArtists(data.artists);
				// updateLocalStorageArtists();
				input.value = '';
			}
		}
	});
	const addButton = document.createElement('button');
	addButton.textContent = 'Add';
	addButton.addEventListener('click', () => {
		const newArtist = input.value.trim();
		if (newArtist !== '') {
			data.artists.push(newArtist);
			// updateLocalStorageStyles();
			saveData(data);
			populateArtists(data.artists); // Refresh the styles list
			input.value = '';
		}
	});
	container.appendChild(input);
	container.appendChild(addButton);
}
// Populate medium category
function populateMedium() {
	const mediumDiv = document.getElementById('mediums');
	mediumDiv.innerHTML = ''; // Clear previous checkboxes
	data.medium.forEach((medium, index) => {
		const checkbox = document.createElement('input');
		checkbox.type = 'checkbox';
		checkbox.className = 'checkbox';
		checkbox.value = medium;
		checkbox.id = `mediumCheckbox_${index}`;
		const input = document.createElement('input');
		input.type = 'text';
		input.value = medium;
		input.id = `mediumInput_${index}`;
		input.addEventListener('input', () => {
			checkbox.value = input.value;
			saveData(data);
			// updateLocalStorageMedium();
		});
		const label = document.createElement('label');
		label.htmlFor = `mediumCheckbox_${index}`;
		label.classList = 'subjectInput';
		label.appendChild(checkbox);
		label.appendChild(input);
		mediumDiv.appendChild(label);
		const deleteButton = document.createElement('button');
		deleteButton.textContent = 'x';
		deleteButton.addEventListener('click', () => {
			//confirm delete
			if (confirmDelete()) {
				deleteMedium(medium);
			} else {
				// refreshDOM()
			}
		});
		function deleteMedium(medium) {
			const mediumIndex = data.medium.indexOf(medium);
			if (mediumIndex > -1) {
				data.medium.splice(mediumIndex, 1);
				localStorage.setItem('messageData', JSON.stringify(data));
				populateMedium(data.medium);
			}
		}
		const mediumContainer = document.createElement('div');
		mediumContainer.classList.add('mediums-container');
		label.appendChild(checkbox);
		mediumContainer.appendChild(label);
		label.appendChild(deleteButton);

		mediumDiv.appendChild(mediumContainer);
	});
	// addCustomStyleInput(stylesDiv);
}
function addCustomMediumInput(parentElement) {
	const input = document.createElement('input');
	input.classList.add('add-new-medium');
	input.type = 'text';
	input.placeholder = 'Enter a new medium';
	const container = document.querySelector('#mediums-head');
	input.addEventListener('keyup', (event) => {
		if (event.key === 'Enter') {
			const newMedium = input.value.trim();
			if (newMedium !== '') {
				const checkbox = document.createElement('input');
				checkbox.type = 'checkbox';
				checkbox.value = newMedium;
				checkbox.id = `mediumCheckbox_${data.medium.length}`;
				const label = document.createElement('label');
				label.htmlFor = `MediumCheckbox_${data.medium.length}`;
				label.appendChild(checkbox);
				label.appendChild(document.createTextNode(newMedium));
				const br = document.createElement('br');
				parentElement.insertBefore(label, input);
				parentElement.insertBefore(br, input);
				const addButton = document.createElement('button');
				data.medium.push(newMedium);
				saveData(data);
				// updateLocalStorageMedium();
				populateMedium(data.medium);
				input.value = '';
			}
		}
	});
	const addButton = document.createElement('button');
	addButton.textContent = 'Add';
	addButton.addEventListener('click', () => {
		const newMedium = input.value.trim();
		if (newMedium !== '') {
			data.medium.push(newMedium);
			saveData(data);
			// updateLocalStorageMedium();
			populateMedium(data.medium); // Refresh the styles list
			input.value = '';
		}
	});
	container.appendChild(input);
	container.appendChild(addButton);
}
