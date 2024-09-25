// import { html, render } from 'lit-html';
// import { hi_backend } from 'declarations/hi_backend';
// import logo from './logo2.svg';

// class App {
//   greeting = '';

//   constructor() {
//     this.#render();
//   }

//   #handleSubmit = async (e) => {
//     e.preventDefault();
//     const name = document.getElementById('name').value;
//     this.greeting = await hi_backend.greet(name);
//     this.#render();
//   };

//   #render() {
//     const body = html`
//       <main>
//         <img src="${logo}" alt="DFINITY logo" />
//         <br />
//         <br />
//         <form>
//           <label for="name">Enter your name: &nbsp;</label>
//           <input id="name" type="text" required />
//           <button type="submit">Click Me!</button>
//         </form>
//         <section id="greeting">${this.greeting}</section>
//       </main>
//     `;
//     render(body, document.getElementById('root'));
//     document.querySelector('form').addEventListener('submit', this.#handleSubmit);
//   }
// }

// export default App;


import { html, render } from 'lit-html';
import { hi_backend } from 'declarations/hi_backend';
import './App.css';

class App {
  is24HourFormat = false;
  isLightTheme = false;

  constructor() {
    this.#renderClock();
    this.#setupClock();
  }

  // Update the clock every second
  #updateClock = () => {
    const clockElement = document.getElementById('clock');
    const dateElement = document.getElementById('date');
    const now = new Date();

    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    let amPm = '';

    if (!this.is24HourFormat) {
      amPm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
    }

    const formattedTime = `${hours}:${minutes}:${seconds} ${amPm}`;
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = now.toLocaleDateString('en-US', options);

    clockElement.textContent = formattedTime;
    dateElement.textContent = formattedDate;
  };

  // Toggle 12/24 hour format
  toggleFormat = () => {
    this.is24HourFormat = !this.is24HourFormat;
    this.#updateClock();
  };

  // Toggle light/dark theme
  toggleTheme = () => {
    this.isLightTheme = !this.isLightTheme;
    const clockContainer = document.getElementById('clock-container');
    if (this.isLightTheme) {
      clockContainer.classList.add('light-theme');
    } else {
      clockContainer.classList.remove('light-theme');
    }
  };

  // Render the clock UI
  #renderClock() {
    const template = html`
      <main>
        <div class="clock-container" id="clock-container">
          <div class="clock" id="clock">00:00:00 AM</div>
          <div class="date" id="date">January 01, 2024</div>
          <div class="buttons">
            <button @click=${this.toggleFormat}>Toggle 12/24 Hour</button>
            <button @click=${this.toggleTheme}>Toggle Theme</button>
          </div>
        </div>
      </main>
    `;
    render(template, document.getElementById('root'));
  }

  // Start the clock and update it every second
  #setupClock() {
    setInterval(this.#updateClock, 1000);
    this.#updateClock(); 
  }
}

export default App;
