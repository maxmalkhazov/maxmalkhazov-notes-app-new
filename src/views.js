import moment from 'moment';
import { getFilters } from './filters';
import { sortNotes, getNotes } from './notes';

// Generate the DOM structure for the data
const generateDataDOM = (note) => {
	const noteEl = document.createElement('a');
	const textEl = document.createElement('p');
	const statusEl = document.createElement('p');
	
	// Set up the link to the edit page
	noteEl.setAttribute('href', `/edit.html#${note.id}`);
	noteEl.classList.add('class', 'list-item');
	
	// Set up the note title text
	if (note.title.length > 0) {
		textEl.textContent = note.title;
	} else {
		textEl.textContent = 'Unnamed note';
	}
	
	textEl.classList.add('class', 'list-item__title');

	noteEl.appendChild(textEl);
	
	// Set up the status message
	statusEl.textContent = generateLastEdited(note.updatedAt);
	statusEl.classList.add('class', 'list-item__subtitle');
	noteEl.appendChild(statusEl);
	
	return noteEl;
}

//Render application data
const renderNotes = () => {
	const notesElement = document.querySelector('#notes');
	const filters = getFilters();
	const notes = sortNotes(filters.sortBy);
	const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()));
	
	notesElement.innerHTML = '';
	
	if (filteredNotes.length > 0) {
		filteredNotes.forEach((note) => {
			const noteEl = generateDataDOM(note);
			notesElement.appendChild(noteEl);
		});
	} else {
		const message = document.createElement('p');
		message.textContent = 'No notes to display';
		notesElement.appendChild(message);
		message.classList.add('class', 'empty-message');
	}
}

// Generate last edited message
const generateLastEdited = (timeStamp) => `Last edited ${moment(timeStamp).fromNow()}`;

const initEditPage = (noteID) => {
	const titleElement = document.querySelector('#note-title');
	const bodyElement = document.querySelector('#note-body');
	const updatedAt = document.querySelector('#note-updated-at');
	const notes = getNotes();
	const note = notes.find((note) => note.id === noteID);

	if (!note) {
		location.assign("/index.html");
	}

	titleElement.value = note.title;
	bodyElement.value = note.body;
	updatedAt.textContent = generateLastEdited(note.updatedAt);
}

export { generateDataDOM, renderNotes, generateLastEdited, initEditPage };