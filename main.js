const MOCK_NOTES = [
    { id: 1, title: 'Изучить паттерн MVC', text: 'Изучить паттерн MVC', color: 'blue', isFavorite: true },
    { id: 2, title: 'Изучить паттерн MVC', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora sequi laboriosam dignissimosLorem ipsum dolor sit amet consectetur adipisicing elit. Tempora sequi laboriosam dignissimosLorem ipsum dolor sit amet consectetur adipisicing elit. Tempora sequi laboriosam dignissimosLorem ipsum dolor sit amet consectetur adipisicing elit. Tempora sequi laboriosam dignissimos', color: 'blue', isFavorite: false },

]

// хранение данных, бизнес-логика
const model = {
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

// отображение данных: рендер списка задач, размещение обработчиков событий
const view = {
    init() {
        //получение данных из Local Storage
        model.notes = JSON.parse(localStorage.getItem('modelData'))

        this.renderNotes(model.notes)
        const form = document.querySelector('.form')


        //счетчик ввода символов
        form.textTitle.addEventListener('input', function () {
            const str = form.textTitle.value.trim()
            form.output.textContent = `${0 + str.length} / 50`
            if (str.length > 50) {
                const messageWarning = document.querySelector('.message-warning')
                messageWarning.classList.add('show')
                setTimeout(() => messageWarning.classList.remove('show'), 1000)
                form.textTitle.classList.add('focusMaxTextLength')
                form.output.style.color = 'red'
            } else {
                form.textTitle.classList.remove('focusMaxTextLength')
                form.output.style.color = ''
            }
        })

        form.textDescription.addEventListener('input', function () {
            const str = form.textDescription.value.trim()
            if (str.length > 200) {
                const messageWarningDescrition = document.querySelector('.message-warning-description')
                messageWarningDescrition.classList.add('show')
                setTimeout(() => messageWarningDescrition.classList.remove('show'), 1000)
                form.textDescription.classList.add('focusMaxTextLength')
            } else {
                form.textDescription.classList.remove('focusMaxTextLength')
            }
        })

        //событие для добавления заметки
        form.addEventListener('submit', function (event) {
            event.preventDefault() // Предотвращаем стандартное поведение формы
            const textTitle = form.textTitle.value
            const textDescription = form.textDescription.value
            const color = form.color.value
            if (textTitle.trim().length <= 50 && textDescription.trim().length <= 200) {
                if (textTitle.trim() !== '' && textDescription.trim() !== '') {
                    controller.addNote(textTitle, textDescription, color)
                    form.textTitle.value = ''
                    form.textDescription.value = ''
                    //анимация при добавлении заметки
                    const frameNotes = document.querySelectorAll('.frame-notes')
                    frameNotes[0].classList.add('show-notes')
                    setTimeout(() => frameNotes[0].classList.remove('show-notes'), 0)
                    //Логика для всплывающего окна “Заметка добавлена”. Сообщение скрывается через 3 секунды
                    const messageAddNote = document.querySelector('.message-add-note')
                    messageAddNote.classList.add('show')
                    setTimeout(() => messageAddNote.classList.remove('show'), 3000)
                } else {
                    //Логика для всплывающего окна “Заполните все поля”. Сообщение скрывается через 3 секунды
                    const messageEmptyInput = document.querySelector('.message-empty-input')
                    messageEmptyInput.classList.add('show')
                    setTimeout(() => messageEmptyInput.classList.remove('show'), 3000)
                }
            } else if (textTitle.trim().length > 50) {
                //Логика для всплывающего окна “Максимум 50 символов”. Сообщение скрывается через 3 секунды
                const messageWarning = document.querySelector('.message-warning')
                messageWarning.classList.add('show')
                setTimeout(() => messageWarning.classList.remove('show'), 3000)
            } else if (textDescription.trim().length > 200) {
                //Логика для всплывающего окна “Максимум 200 символов”. Сообщение скрывается через 3 секунды
                const messageWarningDescrition = document.querySelector('.message-warning-description')
                messageWarningDescrition.classList.add('show')
                setTimeout(() => messageWarningDescrition.classList.remove('show'), 3000)
            }
        })
        //событие для удаления заметки
        const notesContainer = document.querySelector('.notes-container')
        notesContainer.addEventListener('click', function (event) {
            if (event.target.classList.contains('img-delete-notes')) {
                const noteId = +event.target.parentElement.id
                controller.deleteNote(noteId)
            }
        })
        //событие добавить удалить в избранное
        notesContainer.addEventListener('click', function (event) {
            if (event.target.classList.contains('img-favorite')) {
                const noteId = +event.target.parentElement.id
                controller.addFavotire(noteId)
            }
        })
        //показать только избранное
        const checkboxForFavorite = document.querySelector('.show-Favorites')
        checkboxForFavorite.addEventListener('click', function (event) {
            if (event.target.tagName === 'INPUT') {
                const checkbox = document.querySelector('.checkbox-for-favorite')
                let isFavorite = checkbox.checked
                controller.viewOnlyFavorites(isFavorite)
            }
        })
    },

    renderNotes(notes) {
        const notesContainer = document.querySelector('.notes-container')
        const showFavorites = document.querySelector('.show-Favorites')

        if (model.notes.length >= 1) {
            showFavorites.style = "display: flex"
            //получение статуса флажка показать избранное
            const checkbox = document.querySelector('.checkbox-for-favorite')
            let isFavorite = checkbox.checked
            model.getStatusIsFavorite(isFavorite)
        } else {
            showFavorites.style = "display: none"
        }

        if (model.notes[0] === undefined) {
            notesContainer.innerHTML = `
            <p class="message">У вас нет еще ни одной заметки<br> 
            Заполните поля выше и создайте свою первую заметку!</p>`
        } else if (model.statusIsFavorite && model.arrNotesForFavorite()[0] === undefined) {
            notesContainer.innerHTML = `
            <p class="message">У вас нет избранных заметок</p>`
        } else {
            notesContainer.innerHTML = ''
            const form = document.querySelector('.form')
            form.output.textContent = `0 / 50`
            notes.forEach(note => {
                notesContainer.innerHTML += `
                <div>
                    <div class="frame-notes">
                        <div id=${note.id} class="frame-title-notes" style="background: #${note.color};">
                            <h3>${note.title}</h3>
                            <img class="img-favorite" src=${note.isFavorite ? "./assets/images/heart-active.svg" : "./assets/images/heart-inactive.svg"} alt="img">
                            <img class="img-delete-notes" src="./assets/images/trash.svg" alt="img">
                        </div>
                        <p>${note.text}</p>
                    </div>
                </div>
                `
            })


        }
        // счетчик заметок
        const counter = document.querySelector('.counter-number')
        counter.textContent = model.notes.length
        //Запись данных в Local Storage
        localStorage.setItem('modelData', JSON.stringify(model.notes))
    },
}

// обработка действий пользователя, обновление модели
const controller = {
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

// Функция инициализации
function init() {
    view.init()
    // здесь может быть код инициализации других модулей
}

// Вызов функции инициализации при загрузке страницы
init()