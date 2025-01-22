import {model} from "./Model.js"

// обработка действий пользователя, обновление модели
export const controller = {
    addNote(textTitle, textDescription, color) {
        model.addNote(textTitle, textDescription, color)
    },
    deleteNote(noteId) {
        model.deleteNote(noteId)
    },
    addFavotire(noteId) {
        model.addFavotire(noteId)
    },
    viewOnlyFavorites(isFavorite) {
        model.viewOnlyFavorites(isFavorite)
    }
}

