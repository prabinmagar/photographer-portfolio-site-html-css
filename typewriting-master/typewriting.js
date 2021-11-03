/**
 * @package     typeWriting
 * @description Lightweight JavaScript plugin for adding nice, customizable Typewriting effect using custom HTML5 attributes.
 * @author      Awran5 <github.com/awran5>
 * @version     1.0.1
 * @license     under MIT https://github.com/awran5/typewriting/blob/master/LICENSE
 * @see         <github.com/awran5/typewriting>
 * @tutorial    TraversyMedia https://www.youtube.com/watch?v=POX3dT-pB4E&t=307s
 */


class typeWriting {

  constructor(element) {
    this.element = element; // Selector
    this.words = JSON.parse(element.getAttribute('data-words')); // Input words
    this.speed = parseInt(element.getAttribute('data-speed'), 10) || 100; // fallback 100 ms
    this.delay = parseInt(element.getAttribute('data-delay'), 10) || 1000; // fallback 1000 ms
    this.loop = element.getAttribute('data-loop');
    this.char = ''; // word letters
    this.counter = 0; // loop counter
    this.isDeleting = false; // check when deleting letters
    this.type(); // Typing method
  }

  type() {
    // Set the words index.
    const index = this.loop === 'yes' ? this.counter % this.words.length : this.counter;
    // Get the full word
    const fullWord = this.words[index];
    // Typing speed
    let typeSpeed = this.speed;

    if (this.isDeleting) {
      // Divide speed by 2
      typeSpeed /= 2;
      // Add chars
      this.char = fullWord.substring(0, this.char.length - 1);
    } else {
      // Delete chars
      this.char = fullWord.substring(0, this.char.length + 1);
    }
    // Display on DOM
    this.element.innerHTML = `<span class="write">${this.char}</span><span class="blinking-cursor">|</span>`;
    // When word is completed
    if (!this.isDeleting && this.char === fullWord) {
      // break the loop before deletion.
      if (this.loop === "no" && this.counter >= this.words.length - 1) {
        return;
      }
      // Set char delete to true
      this.isDeleting = true;
      // Set time delay before new word
      typeSpeed = this.delay;
    } else if (this.isDeleting && this.char === '') {
      this.isDeleting = false;
      // Move to next word
      this.counter++;
    }
    // Set time out
    setTimeout(() => this.type(), typeSpeed);

  }

}

// Call the class on DOMContentLoaded
document.addEventListener('DOMContentLoaded', init)
// Select all elements and trigger the class
function init() {
  document.querySelectorAll('.typewrite').forEach(e => new typeWriting(e));
}
