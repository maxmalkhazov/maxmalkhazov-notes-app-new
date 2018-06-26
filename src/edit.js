import { initEditPage, generateLastEdited } from './views';
import { updateNote, removeNote } from './notes';


const titleElement = document.querySelector('#note-title');
const bodyElement = document.querySelector('#note-body');
const updatedAt = document.querySelector('#note-updated-at');
const removeElement = document.querySelector('#remove-note');
const noteID = location.hash.substring(1);

initEditPage(noteID);


titleElement.addEventListener('input', (e) => {
	const note = updateNote(noteID, {
		title: e.target.value
	})
	updatedAt.textContent = generateLastEdited(note.updatedAt);
});

bodyElement.addEventListener('input', (e) => {
	const note = updateNote(noteID, {
		body: e.target.value
	})
	updatedAt.textContent = generateLastEdited(note.updatedAt);
});

removeElement.addEventListener('click', () => {
	removeNote(noteID);
	location.assign('/index.html');
});

window.addEventListener('storage', (e) => {
	if (e.key === 'notes') {
		initEditPage(noteID);
	}
});