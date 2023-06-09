import { books, authors, genres, BOOKS_PER_PAGE, HTML } from './data.js'
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

            .overlay__button:hover {
              background-color: rgba(var((var(--color-blue))), 0.2);
            }

            .overlay__button_primary:hover {
              background-color: rgba(var(--color-blue), 0.8);
              color: rgba(var(--color-force-light), 1);
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

            <div class="backdrop"></div>
` ;

class previewDetails extends HTMLElement{

    constructor(){
        super();
        this.attachShadow({ mode: 'open'})
        this.button = document.querySelector('[data-list-items]')
        console.log(this.shadowRoot)
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

                this.shadowRoot.querySelector('[class="backdrop"]').open = true
               

                this.shadowRoot.querySelector('[data-list-close]').addEventListener('click', (e)=> {
                    dialog.open = false

                    
                })

            }
            
        })
    }
}

customElements.define('preview-content', previewDetails)