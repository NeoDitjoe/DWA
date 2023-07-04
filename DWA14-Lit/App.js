
import { LitElement, html, css } from './lit-html.js';
import { store } from './script.js';


export class App extends LitElement {

    static styles = css`
    /* Base styles */

    * {
        box-sizing: border-box;
    }
    
    :root {
    
        --primary: #424250;
        --color-green: #32c48d;
        --color-white: #ffffff;
        --color-dark-grey: #33333d;
        --color-medium-grey: #424250;
        --color-light-grey: #9ca3ae;
    }
    
    body {
    
        padding: 0;
        margin: 0;
        background-color: var(--primary);
        color: white;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
    
    }
    
    /* Styling */
    
    html {
    
        height: 100vh;
    }
    
    h1 {
        font-size: 3rem;
        font-weight: 900;
        color: var(--color-light-grey)
    }
    
    
    nav img {
        width: 500px;
        height: 70px;
        padding: 1%;
    }
    
    nav {
        background-color: #333;
        height: 90px;
    }
    
    /* Counter */
    
    .counter {
        background-color: #424250;
    }
    
    .counter_value {
        width: 100%;
        height: 15rem;
        text-align: center;
        font-size: 8rem;
        font-weight: 900;
        color: white;
        background: none;
        border-width: 0;
        border-bottom: 1px solid lightgray;
    }
    
    .counter_button:disabled {
        background-color: red;
    }
    
    
    
    sl-button {
        margin-left:16em;
        margin-top: 5em;
        color: white;
        margin-right: 160px;
    }
    
    /* Footer */
    
    footer {
        background-color: #5f5f70;
        color: lightgray;
        padding: 2rem;
        font-size: 1.2rem;
        text-align: center;
        margin-top: 12.3%;
    }
    
    .footer_link {
        color: white;
    }
  `;

    static properties = {
        counter: {type: 'Number'}
    };

    constructor(){
        super();
        this.counter = 0;
    };

    connectedCallback() {
        super.connectedCallback();
        this.unsubscribe = store.subscribe(() => {
          this.counter = store.getState().counter;
        });
      }

      disconnectedCallback() {
        super.disconnectedCallback();
        this.unsubscribe();
      }  

    add() {
        store.dispatch({ type: 'addHandler' });
    }

    subtract() {
        store.dispatch({ type: 'subtractHandler' });
    }

    reset() {
        store.dispatch({type: 'resetHandler'})
    }

    render(){
        
        return html`

            <div class="container">
        
                <nav>
        
                    <img src="./tally-count-online-logo.svg" alt="Logo" class="logo">
                    
                </nav>
        
                <header>
        
                    <h1>Tally Count</h1>
        
                </header>
        
                <main class="counter">
        
                    <input class="counter_value" data-number readonly value=${this.counter}>
        
                    <div class="counter_actions">
                           
                        <sl-button @click= "${this.subtract}" style="width: 10%" data-subtract variant="danger" size="large" pill>-</sl-button>
        
                        <sl-button @click= "${this.reset}" style="width: 10%" data-reset variant="primary" size="large" pill>
                            <sl-icon slot="suffix" name="arrow-counterclockwise"></sl-icon>
                            
                            Reset  </sl-button>
        
                        <sl-button  @click= "${this.add}" style="width: 10%" data-add variant="success" size="large" pill >+</sl-button>
        
                </main>
        
                <footer>
        
                    Inspired by <a href="https://tallycount.app/" class="footer_link">Tally Count</a>.
        
        
                </footer>
        
            </div>
    
        `;
    };
}