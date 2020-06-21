const fs = require('fs');
const chalk = require('chalk');
const { argv } = require('process');

const getNotes = () => {
	return 'Your notes...';
};

const addNote = (title, body) => {
	const notes = loadNotes();
	const duplicateNotes = notes.filter((note) => note.title === title);

	if (duplicateNotes.length === 0) {
		notes.push({
			title,
			body
		});

		saveNotes(notes);
		console.log(chalk.green.inverse('Note saved!'));
	} else {
		console.log(chalk.red.inverse('Note taken!'));
	}
};

const removeNote = (title) => {
	const notes = loadNotes();
	const noteRemoved = notes.filter((note) => note.title !== title);

	if (noteRemoved.length < notes.length) {
		saveNotes(noteRemoved);
		console.log(chalk.inverse.green('Note removed!'));
	} else {
		console.log(chalk.inverse.red('Note not found!'));
	}
};

const saveNotes = (notes) => {
	const dataJSON = JSON.stringify(notes);
	fs.writeFileSync('notes.json', dataJSON);
};

const loadNotes = () => {
	try {
		const dataBuffer = fs.readFileSync('notes.json');
		const dataJSON = dataBuffer.toString();
		return JSON.parse(dataJSON);
	} catch (err) {
		return [];
	}
};

module.exports = { getNotes, addNote, removeNote };
