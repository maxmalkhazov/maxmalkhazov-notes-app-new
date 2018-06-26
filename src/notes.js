import moment from 'moment';
import uuidv4 from 'uuid/v4';

let notes = [];

const loadNotes = () => {
	const notesJSON = localStorage.getItem('notes');
	
	try {
		return notesJSON ? JSON.parse(notesJSON) : [];
	} catch (e) {
		return [];
	}
	
}

// Save data to local storage
const saveData = () => {
	localStorage.setItem('notes', JSON.stringify(notes));
}

// Expose notes from module
const getNotes = () => notes;

const createNote = () => {
	const id = uuidv4();
	const timeStamp = moment().valueOf();
	notes.push({
		id: id,
		title: '',
		body: '',
		createdAt: timeStamp,
		updatedAt: timeStamp
	});
	saveData();
	
	return id;
}

// Remove data from the list
const removeNote = (id) => {
	notes.filter((note, i) => {
		if (note.id.includes(id)) {
			notes.splice(i, 1);
			saveData();
		}
	});
}

//Sort notes by one of three ways
const sortNotes = (sortBy) => {
	if (sortBy === 'byEdited') {
		return notes.sort((a, b) => {
			if (a.updatedAt > b.updatedAt) {
				return -1;
			} else if (a.updatedAt < b.updatedAt) {
				return 1;
			} else {
				return 0;
			}
		});
	} else if (sortBy === 'byCreated') {
		return notes.sort((a, b) => {
			if (a.createdAt > b.createdAt) {
				return -1;
			} else if (a.createdAt < b.createdAt) {
				return 1;
			} else {
				return 0;
			}
		});
	} else if (sortBy === 'byAlpha') {
		return notes.sort((a, b) => {
			if (a.title.toLowerCase() > b.title.toLowerCase()) {
				return 1;
			} else if (a.title.toLowerCase() < b.title.toLowerCase()) {
				return -1;
			} else {
				return 0;
			}
		});
	} else {
		return notes;
	}
}

const updateNote = (id, updates) => {
	const note = notes.find((note) => note.id === id);
	
	if (!note) {
		return
	}
	
	if (typeof updates.title === 'string') {
		note.title = updates.title;
		note.updatedAt = moment().valueOf();
	}
	
	if (typeof updates.body === 'string') {
		note.body = updates.body;
		note.updatedAt = moment().valueOf();
	}
	
	saveData();
	return note;
}

notes = loadNotes();

export { getNotes, createNote, removeNote, sortNotes, updateNote };