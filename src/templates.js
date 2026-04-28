import { cards, marqueeLines, navItems } from "./data.js";

const repeatedMarquee = [...marqueeLines, ...marqueeLines]
  .map((line) => `<p>${line}</p>`)
  .join("");

const navMarkup = navItems
  .map((item) => `<li><a href="#${item.id}" data-nav-link="${item.id}">${item.label}</a></li>`)
  .join("");

const cardsMarkup = cards
  .map(
    (card) => `
      <article class="card reveal">
        <img src="${card.image}" alt="${card.alt}" loading="lazy" />
        <div class="card-body">
          <h4>${card.title}</h4>
          <p>${card.desc}</p>
        </div>
      </article>
    `
  )
  .join("");

export const appTemplate = `
  <header class="site-header app-shell">
    <div>
      <p class="title-kicker">(a cafe-shaped portfolio)</p>
      <h1 class="brand-name">ALt.</h1>
      <p class="header-owner">Maria Eugenia Solano</p>
    </div>
    <a class="header-email" href="mailto:marusolanoo@gmail.com">marusolanoo@gmail.com</a>
  </header>

  <nav class="menu" aria-label="Section navigation">
    <div class="menu-inner">
      <button class="mobile-menu-btn" type="button" aria-expanded="false" aria-controls="menu-list">
        Menu
      </button>
      <ul id="menu-list" class="menu-list">
        ${navMarkup}
      </ul>
    </div>
  </nav>

  <main id="main" class="main-layout app-shell">
    <section class="section hero-grid reveal" id="alt" aria-label="ALt opening">
      <article class="panel hero-copy">
        <p class="section-label">TABLE: 4</p>
        <p class="section-label">DINE IN</p>
        <h2>Each mug is a project.<br />Get a taste.</h2>
        <p>Sunset mood, coffee o'clock and all those ideas that didn't make it to the menu.</p>
        <div class="button-row">
          <a class="btn btn-primary" href="#coffee">Choose your quote</a>
          <a class="btn btn-secondary" href="#contact">Email me</a>
        </div>
      </article>
      <figure class="panel hero-media">
        <img src="https://i.imgur.com/ouTF5XU.png" alt="Coffee themed hero visual" loading="eager" />
      </figure>
    </section>

    <section class="section marquee reveal" aria-label="Animated coffee text">
      <div class="marquee-track">
        ${repeatedMarquee}
      </div>
    </section>

    <section class="section split-grid" id="behind" aria-label="Who's behind it">
      <article class="panel hero-copy reveal">
        <p class="section-label">* WHO'S BEHIND IT?</p>
        <h3>Not to bite,<br />but to write</h3>
        <p>
          Made in Uruguay. ALt. 2025. A warm portfolio table with editorial visuals and playful
          interaction cues.
        </p>
        <p>THANK YOU :)</p>
      </article>
      <article class="panel hero-media reveal">
        <img src="https://i.imgur.com/GkozSSr.png" alt="Portfolio owner visual collage" loading="lazy" />
      </article>
    </section>

    <section class="section reveal" id="coffee" aria-label="Coffee recommendations">
      <p class="section-label">* COFFEE SHOPS RECOMENDATIONS?</p>
      <h3 class="brand-name" style="font-size:clamp(1.5rem,4vw,3rem);margin:0.4rem 0 1.2rem;">
        Choose your motivational quote here
      </h3>
      <div class="cards-grid">
        ${cardsMarkup}
      </div>
    </section>

    <section class="section marquee reveal" aria-label="Coffee notes strip">
      <div class="marquee-track">
        <p>SUNSET MOOD</p>
        <p>THIS ONE GOT COLD...</p>
        <p>TAKE ANOTHER ONE, GOES ON ME</p>
        <p>A SONG TO SHAZAM AND NEVER LISTEN TO IT AGAIN</p>
        <p>IT'S COFFEE O'CLOCK</p>
        <p>FINALLY ONE THAT I CAN'T KILL</p>
        <p>SUNSET MOOD</p>
        <p>THIS ONE GOT COLD...</p>
      </div>
    </section>

    <section class="section split-grid" id="tea" aria-label="Tea section">
      <article class="panel hero-media reveal">
        <img src="https://i.imgur.com/Ra2iQy8.png" alt="Tea person side visuals" loading="lazy" />
      </article>
      <article class="panel hero-copy reveal">
        <p class="section-label">* YOU ARE MORE OF A TEA PERSON?</p>
        <h3>Ideas that didn't make it to the menu</h3>
        <p>NOT EVEN AI CAN FIX IT, HERE IS MY EMAIL: marusolanoo@gmail.com</p>
        <a class="btn btn-primary" href="https://framerusercontent.com/assets/JJ89xY1BeRK4llhuZjewRfe6jY.pdf">
          Download File
        </a>
      </article>
    </section>

    <section class="section reveal image-cluster" aria-label="Extra visuals">
      <article class="panel hero-media">
        <img src="https://i.imgur.com/ZFssdLJ.png" alt="Coffee visual panel one" loading="lazy" />
      </article>
      <article class="panel hero-media">
        <img src="https://i.imgur.com/3IcE9SS.png" alt="Coffee visual panel two" loading="lazy" />
      </article>
      <article class="panel hero-media">
        <img src="https://i.imgur.com/HxYmVFs.png" alt="Coffee visual panel three" loading="lazy" />
      </article>
      <article class="panel hero-media">
        <img src="https://i.imgur.com/GkozSSr.png" alt="Coffee visual panel four" loading="lazy" />
      </article>
    </section>

    <section class="section panel contact-panel reveal" id="contact" aria-label="Contact details">
      <h3>NOT EVEN AI CAN FIX IT,<br />HERE IS MY EMAIL:</h3>
      <a class="contact-email" href="mailto:marusolanoo@gmail.com">marusolanoo@gmail.com</a>
    </section>

    <section class="section marquee fast reveal" aria-label="Closing motion strip">
      <div class="marquee-track">
        <p>THANK YOU :)</p>
        <p>ALt. 2025</p>
        <p>MADE IN URUGUAY</p>
        <p>EACH MUG IS A PROJECT</p>
        <p>THANK YOU :)</p>
        <p>ALt. 2025</p>
        <p>MADE IN URUGUAY</p>
        <p>EACH MUG IS A PROJECT</p>
      </div>
    </section>
  </main>

  <footer class="footer app-shell">
    <p class="footer-line">
      MADE IN
      <a href="https://share.google/Q8JnFNsLy2tM0q5bA" target="_blank" rel="noreferrer">URUGUAY</a>
    </p>
    <p class="footer-line">ALt. 2025</p>
    <p class="footer-line">THANK YOU :)</p>
  </footer>
`;

export const loadingTemplate = `
  <div class="loading-screen">
    <div class="loading-inner">
      <h2 class="loading-title">ALt.</h2>
      <p class="loading-subtitle">(a cafe-shaped portfolio)</p>
      <div class="loading-rule" aria-hidden="true"></div>
    </div>
  </div>
`;
