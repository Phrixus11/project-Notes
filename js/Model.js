import {view} from "./View.js"

const MOCK_NOTES = [
    { id: 1, title: 'Изучить паттерн MVC', text: 'Изучить паттерн MVC', color: 'blue', isFavorite: true },
    { id: 2, title: 'Изучить паттерн MVC', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora sequi laboriosam dignissimosLorem ipsum dolor sit amet consectetur adipisicing elit. Tempora sequi laboriosam dignissimosLorem ipsum dolor sit amet consectetur adipisicing elit. Tempora sequi laboriosam dignissimosLorem ipsum dolor sit amet consectetur adipisicing elit. Tempora sequi laboriosam dignissimos', color: 'blue', isFavorite: false },

]

// хранение данных, бизнес-логика
export const model = {
    notes: [],
    statusIsFavorite: false,
    // статус флажка isFavorite
    getStatusIsFavorite(isFavorite) {
        this.statusIsFavorite = isFavorite
    },
    // создание массива избранных 
    arrNotesForFavorite() {
        return this.notes.filter(note => note.isFavorite === true)
    },

    addNote(textTitle, textDescription, color) {
        let newNote = {
            id: new Date().getTime(),
            title: textTitle,
            text: textDescription,
            color: color,
            isFavorite: false
        }
        this.notes.unshift(newNote)
        if (this.statusIsFavorite) {
            view.renderNotes(this.arrNotesForFavorite())
        } else {
            view.renderNotes(this.notes)
        }
    },
    deleteNote(noteId) {
        this.notes = this.notes.filter(note => noteId !== note.id)
        if (this.statusIsFavorite) {
            view.renderNotes(this.arrNotesForFavorite())
        } else {
            view.renderNotes(this.notes)
        }
    },
    addFavotire(noteId) {
        this.notes.forEach(note => {
            if (noteId === note.id) {
                note.isFavorite = !note.isFavorite
            }
            if (this.statusIsFavorite) {
                view.renderNotes(this.arrNotesForFavorite())
            } else {
                view.renderNotes(this.notes)
            }
        })
    },
    viewOnlyFavorites(isFavorite) {
        if (isFavorite) {
            view.renderNotes(this.arrNotesForFavorite())
        } else {
            view.renderNotes(this.notes)
        }
    },
}
