import { books, authors, genres, BOOKS_PER_PAGE, HTML } from './data.js'

function factoryFuntion(){

    function variable(){
        let page = 1;
        let matches = books
    
        let BooksPerPage =  matches.slice(0, BOOKS_PER_PAGE)
    
        return {
            page: page,
            matches: matches,
            BooksPerPage: BooksPerPage
        }
    }
    
    const variables = variable()

    function bookList(){

        for (const { author, id, image, title } of variables.BooksPerPage) {
    
            const createdDocument = document.createDocumentFragment()
            
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
        
            createdDocument.appendChild(element)
            HTML.list.items.appendChild(createdDocument)
        }
        
    }
    

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
    

    return {
        bookList: bookList,
        filter: filter,
        variables: variables,
 
    }
}

const factoryFuntions = factoryFuntion()

factoryFuntions.bookList()
factoryFuntions.filter("genreHtml", "firstGenreElement",'[data-search-genres]' ,genres)
factoryFuntions.filter("authorsHtml", "firstAuthorsElement",'[data-search-authors]' ,authors)



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

const  bookCount = (factoryFuntions.variables.matches.length - (factoryFuntions.variables.page * BOOKS_PER_PAGE))

HTML.list.button.disabled = bookCount < 0

HTML.list.button.innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${bookCount > 0 ? bookCount : 0})</span>
`


// function events(button, overlay, trueOrFalse, extra) {

//     button.addEventListener('click', () => {
//         overlay.open = trueOrFalse 
//         extra
        
// })
// }

// events(HTML.search.cancel, HTML.search.overlay, false)
// events(HTML.setting.cancel, HTML.setting.overlay, false)
// events(HTML.header.settings, HTML.setting.overlay, true)
// events(HTML.list.close, HTML.list.active, false)
// events(HTML.header.search, HTML.search.overlay, true, HTML.search.title.focus())





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

    
    factoryFuntions.variables.matches = result

    if (result.length < 1) {
        HTML.list.message.classList.add('list__message_show')
    } else {
        HTML.list.message.classList.remove('list__message_show')
    }

    HTML.list.items.innerHTML = ''
    factoryFuntions.variables.BooksPerPage = result.slice(0, BOOKS_PER_PAGE)

    factoryFuntions.bookList();

    window.scrollTo({top: 0, behavior: 'smooth'});
    HTML.search.overlay.open = false
})

HTML.list.button.innerHTML = `Show more <span class="list__remaining">(${books.length - BOOKS_PER_PAGE})</span>`
HTML.list.button.addEventListener('click', () => {
    factoryFuntions.variables.BooksPerPage = factoryFuntions.variables.matches.slice(factoryFuntions.variables.page * BOOKS_PER_PAGE, (factoryFuntions.variables.page + 1) * BOOKS_PER_PAGE)
    factoryFuntions.bookList()
    factoryFuntions.variables.page += 1
    HTML.list.button.disabled = bookCount <= 0

    HTML.list.button.innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${(factoryFuntions.variables.matches.length - (factoryFuntions.variables.page * BOOKS_PER_PAGE)) > 0 ? (factoryFuntions.variables.matches.length - (factoryFuntions.variables.page * BOOKS_PER_PAGE)) : 0})</span>
    `
})

const bookDetails = document.createElement('div')

bookDetails.innerHTML =  `

            <style>

            /* overlay */

            .overlay {
              position: fixed;
              bottom: 0;
              left: 0;
              width: 100%;
              border-width: 0;
              box-shadow: 0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12);
              animation-name: enter;
              animation-duration: 0.6s;
              z-index: 10;
              background-color: rgba(var(--color-light), 1);
            }
            
            @media (min-width: 30rem) {
              .overlay {
                max-width: 30rem;
                left: 0%;
                top: 0;
                border-radius: 8px;;
              }
            }
            
            .overlay__form {
              padding-bottom: 0.5rem;
              margin: 0 auto;
            }
            
            .overlay__row {
              display: flex;
              gap: 0.5rem;
              margin: 0 auto;
              justify-content: center;
            }
            
            .overlay__button {
              font-family: Roboto, sans-serif;
              background-color: rgba(var(--color-blue), 0.1);
              transition: background-color 0.1s;
              border-width: 0;
              border-radius: 6px;
              height: 2.75rem;
              cursor: pointer;
              width: 50%;
              color: rgba(var(--color-blue), 1);
              font-size: 1rem;
              border: 1px solid rgba(var(--color-blue), 1);
            }
            
            .overlay__button_primary {
              background-color: rgba(var(--color-blue), 1);
              color: rgba(var(--color-force-light), 1);
            }
            
            .overlay__button:hover {
              background-color: rgba(var((var(--color-blue))), 0.2);
            }
            
            
            .overlay__button_primary:hover {
              background-color: rgba(var(--color-blue), 0.8);
              color: rgba(var(--color-force-light), 1);
            }
            
            .overlay__input {
              width: 100%;
              margin-bottom: 0.5rem;
              background-color: rgba(var(--color-dark), 0.05);
              border-width: 0;
              border-radius: 6px;
              width: 100%;
              height: 4rem;
              color: rgba(var(--color-dark), 1);
              padding: 1rem 0.5rem 0 0.75rem;
              font-size: 1.1rem;
              font-weight: bold;
              font-family: Roboto, sans-serif;
              cursor: pointer;
            }
            
            .overlay__input_select {
              padding-left: 0.5rem;
            }
            
            .overlay__field {
              position: relative;
              display: block;
            }
            
            .overlay__label {
              position: absolute;
              top: 0.75rem;
              left: 0.75rem;
              font-size: 0.85rem;
              color: rgba(var(--color-dark), 0.4);
            }
            
            .overlay__input:hover {
              background-color: rgba(var(--color-dark), 0.1);
            }
            
            .overlay__title {
              padding: 1rem 0 0.25rem;
              font-size: 1.25rem;
              font-weight: bold;
              line-height: 1;
              letter-spacing: -0.1px;
              max-width: 25rem;
              margin: 0 auto;
              color: rgba(var(--color-dark), 0.8)
            }
            
            .overlay__blur {
              width: 100%;
              height: 200px;
              filter: blur(10px);
              opacity: 0.5;
              transform: scale(2);
            }
            
            .overlay__image {
              max-width: 10rem;
              position: absolute;
              top: 1.5m;
              left: calc(50% - 5rem);
              border-radius: 2px;
              box-shadow: 0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12);
            }
            
            .overlay__data {
              font-size: 0.9rem;
              display: -webkit-box;
              -webkit-line-clamp: 6;
              -webkit-box-orient: vertical;  
              overflow: hidden;
              color: rgba(var(--color-dark), 0.8)
            }
            
            .overlay__data_secondary {
              color: rgba(var(--color-dark), 0.6)
            }
            
            .overlay__content {
              padding: 2rem 1.5rem;
              text-align: center;
              padding-top: 3rem;
            }
            
            .overlay__preview {
              overflow: hidden;
              margin: -1rem;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            
            .overlay__background {
              background: rgba(var(--color-dark), 0.6);
              position: fixed;
              top: 0;
              left: 0;
              height: 100vh;
              width: 100vw;
            }
            
            /* backdrop */
            
            .backdrop {
              display: none;
              background: rgba(var(--color-dark), 0.3);
              position: fixed;
              top: 0;
              left: 0;
              height: 100vh;
              width: 100vw;
            }
            
            .overlay[open] ~ .backdrop {
              display: block;
            }
            
            
            </style>

            <dialog class="overlay" data-list-active>

                <div class="overlay__preview">
                    <img class="overlay__blur" data-list-blur src=""/><img class="overlay__image" data-list-image src=""/>
                </div>
                
                <div class="overlay__content">
                    <h3 class="overlay__title" data-list-title></h3>
                
                    <div class="overlay__data" data-list-subtitle></div>
                    <p class="overlay__data overlay__data_secondary" data-list-description></p>
                </div>

                <div class="overlay__row">
                    <button class="overlay__button overlay__button_primary" data-list-close>Close</button>
                </div>

            </dialog>
` ;

class previewDetails extends HTMLElement{

    constructor(){
        super();
        this.attachShadow({ mode: 'open'})
        this.button = document.querySelector('[data-list-items]')
    }

    connectedCallback(){ 
         
        
        this.button.addEventListener('click', (event) => {

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

            this.shadowRoot.appendChild(bookDetails);
            
            const dialog = this.shadowRoot.querySelector('[data-list-active]');
            const subtitle = this.shadowRoot.querySelector('[data-list-subtitle]');

            
            dialog.open = true

            if (active){
                this.shadowRoot.querySelector('[data-list-title]').innerText = active.title;
                this.shadowRoot.querySelector('[data-list-blur]').src = active.image
                this.shadowRoot.querySelector('[data-list-image]').src = active.image
                this.shadowRoot.querySelector('[data-list-subtitle]').innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`
                this.shadowRoot.querySelector('[data-list-description]').innerText = active.description

                this.shadowRoot.querySelector('[data-list-close]').addEventListener('click', (e)=> {
                    dialog.open = false
                })

            }
            
        })
    }
}

customElements.define('preview-content', previewDetails)
