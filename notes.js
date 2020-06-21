const fs = require('fs');
const chalk = require('chalk');
const { argv } = require('process');

const addNote = (title, body) => {
	const notes = loadNotes();
	const duplicateNote = notes.find((note) => note.title === title);

	if (!duplicateNote) {
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

const readNote = (title) => {
	const notes = loadNotes();
	const findNote = notes.find((note) => note.title === title);

	if (findNote) {
		console.log(chalk.inverse('\t', findNote.title));
		console.log('\t', findNote.body);
	} else {
		console.log(chalk.red.inverse('No note found!'));
	}
};

const listNotes = () => {
	const notes = loadNotes();

	console.log(chalk.blue('Your notes: '));
	notes.forEach((note) => console.log(note.title));
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

module.exports = { addNote, removeNote, listNotes, readNote };
