import { books, authors, genres, BOOKS_PER_PAGE, HTML } from './data.js'

let page = 1;
let matches = books

let BooksPerPage =  matches.slice(0, BOOKS_PER_PAGE)

function bookList(createdDocument){
   function HTMLl(){

    page = 1;
    matches = books

    BooksPerPage =  matches.slice(0, BOOKS_PER_PAGE)

    const elements = []

    for (const { author, id, image, title } of BooksPerPage) {
 
        const element = document.createElement('button')
        element.classList = 'preview'
        element.setAttribute('data-preview', id)
    
        element.innerHTML = `
            <img
                class="preview__image"
                src="${image}"
            />
            
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[author]}</div>
            </div>
        `
        elements.push(element)
    }

    return elements
   }

    function appendToo(){

        const createdDocument = document.createDocumentFragment()

        const elements = HTMLl();
        for (const element of elements){
            createdDocument.appendChild(element)
        }

        HTML.list.items.appendChild(createdDocument)
    }
    appendToo()
}

bookList('starting')

function filter(filterHTML, firstElement, query, gendreAuthor){
    filterHTML = document.createDocumentFragment()
    firstElement = document.createElement('option')
    firstElement.value = 'any'
    firstElement.innerText = 'All Genres'
    filterHTML.appendChild(firstElement)

    for (const [id, name] of Object.entries(gendreAuthor)) {
        const element = document.createElement('option')
        element.value = id
        element.innerText = name
        filterHTML.appendChild(element)
    }

    document.querySelector(query).appendChild(filterHTML)
}

filter("genreHtml", "firstGenreElement",'[data-search-genres]' ,genres)
filter("authorsHtml", "firstAuthorsElement",'[data-search-authors]' ,authors)

const Element = document.documentElement.style

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    HTML.setting.theme.value = 'night'
    Element.setProperty('--color-dark', '255, 255, 255');
    Element.setProperty('--color-light', '10, 10, 20');
} else {
    HTML.setting.theme.value = 'day'
    Element.setProperty('--color-dark', '10, 10, 20');
    Element.setProperty('--color-light', '255, 255, 255');
}

const  bookCount = (matches.length - (page * BOOKS_PER_PAGE))

HTML.list.button.disabled = bookCount < 0

HTML.list.button.innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${bookCount > 0 ? bookCount : 0})</span>
`

function events(button, overlay, trueOrFalse, extra){
    button.addEventListener('click', () => {
        overlay.open = trueOrFalse 
        extra
})
}

events(HTML.search.cancel, HTML.search.overlay, false)
events(HTML.setting.cancel, HTML.setting.overlay, false)
events(HTML.header.settings, HTML.setting.overlay, true)
events(HTML.list.close, HTML.list.active, false)
events(HTML.header.search, HTML.search.overlay, true, HTML.search.title.focus())

HTML.setting.form.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const { theme } = Object.fromEntries(formData)

    if (theme === 'night') {
        Element.setProperty('--color-dark', '255, 255, 255');
        Element.setProperty('--color-light', '10, 10, 20');
    } else {
        Element.setProperty('--color-dark', '10, 10, 20');
        Element.setProperty('--color-light', '255, 255, 255');
    }
    
    HTML.setting.overlay.open = false
})

HTML.search.form.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const filters = Object.fromEntries(formData)
    const result = []

    for (const book of books) {
        let genreMatch = filters.genre === 'any'

        for (const singleGenre of book.genres) {
            if (genreMatch) break;
            if (singleGenre === filters.genre) { genreMatch = true }
        }

        if (
            (filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase())) && 
            (filters.author === 'any' || book.author === filters.author) && 
            genreMatch
        ) {
            result.push(book)
        }
    }

    page = 1;
    matches = result

    if (result.length < 1) {
        HTML.list.message.classList.add('list__message_show')
    } else {
        HTML.list.message.classList.remove('list__message_show')
    }

    HTML.list.items.innerHTML = ''
    BooksPerPage = result.slice(0, BOOKS_PER_PAGE)
    bookList('newItems');

    window.scrollTo({top: 0, behavior: 'smooth'});
    HTML.search.overlay.open = false
})

HTML.list.button.innerHTML = `Show more <span class="list__remaining">(${books.length - BOOKS_PER_PAGE})</span>`
HTML.list.button.addEventListener('click', () => {
    BooksPerPage = matches.slice(page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE)
bookList('fragment')
    page += 1
    HTML.list.button.disabled = bookCount <= 0

    HTML.list.button.innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
    `
})

HTML.list.items.addEventListener('click', (event) => {
    const pathArray = Array.from(event.path || event.composedPath())
    let active = null

    for (const node of pathArray) {
        if (active) break

        if (node?.dataset?.preview) {
            let result = null
    
            for (const singleBook of books) {
                if (result) break;
                if (singleBook.id === node?.dataset?.preview) result = singleBook
            } 
        
            active = result
        }
    }
    
    if (active) {
        HTML.list.active.open = true
        HTML.list.blur.src = active.image
        HTML.list.image.src = active.image
        HTML.list.title.innerText = active.title
        HTML.list.subtitle.innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`
        HTML.list.description.innerText = active.description
    }
})