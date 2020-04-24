const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find( note => note.title === title)

    if (!duplicateNote) {
        
        notes.push({
            'title': title,
            'body': body,
        })
        saveNotes(notes)
        console.log(chalk.bgGreen('New note added!'))
    } else {
        console.log(chalk.bgRed('Note tiltle is taken!'))
    }
    
}

const saveNotes = notes => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }

}

const removeNote = title => {
    const notes = loadNotes()
    const newNotes = notes.filter( note => note.title !== title)

    if (notes.length == newNotes.length) {
        console.log(chalk.bgRed(`No Note found with title "${title}"`))
    } else {
        saveNotes(newNotes)
        console.log(chalk.bgGreen(`Note with the title "${title}" is removed.`))
    }
}

const listNotes = () => {
    const notes = loadNotes()

    console.log(chalk.inverse('Your notes\n'))

    for (const note of notes) 
    {
        console.log(chalk.inverse.magenta(note.title))
    }
}

const readNote = title => {

    const notes = loadNotes()
    const reqNote = notes.find( note => note.title === title)

    if (reqNote) {
        console.log(chalk.bold.blueBright(reqNote.title))
        console.log(chalk.underline(reqNote.body))
    } else {
        console.log(chalk.redBright('No Note found with that title'))
    }
}

module.exports = {
    "addNote": addNote,
    "removeNote": removeNote,
    "listNotes": listNotes,
    "readNote": readNote
}