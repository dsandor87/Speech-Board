const main = document.querySelector('main')
const voicesSelect = document.getElementById('voices')
const textarea = document.getElementById('text')
const readBtn = document.getElementById('read')
const toggleBtn = document.getElementById('toggle')
const closeBtn = document.getElementById('close')

const data = [
  {
    image: './img/drink.jpeg',
    text: 'I\'m Thirsty'
  },
  {
    image: './img/hungry.jpeg',
    text: 'I\'m Hungry'
  },
  {
    image: './img/tired.jpeg',
    text: 'I\'m Tired'
  },
  {
    image: './img/happy.jpeg',
    text: 'I\'m Happy'
  },
  {
    image: './img/q.jpeg',
    text: 'Are you Hungry?'
  },
  {
    image: './img/home.jpeg',
    text: 'stay at home'
  },
  {
    image: './img/netflix.jpeg',
    text: 'Netflix?'
  },
  {
    image: './img/bored.jpeg',
    text: 'I\'m bored'
  },
  {
    image: './img/outside.jpeg',
    text: 'I Want To Go Outside'
  },
  {
    image: './img/door.jpeg',
    text: 'you can\'t go outside'
  },
  {
    image: './img/q.jpeg',
    text: 'How are you?'
  },
  {
    image: './img/hand.jpeg',
    text: 'wash Your Hand '
  }
]

data.forEach(createBox)

// Create speech boxes
function createBox(item) {
  const box = document.createElement('div')

  const { image, text } = item

  box.classList.add('box')

  box.innerHTML = `
    <img src="${image}" alt="${text}" />
    <p class="info">${text}</p>
  `

  box.addEventListener('click', () => {
    setTextMessage(text)
    speakText()

    // Add active effect
    box.classList.add('active')
    setTimeout(() => box.classList.remove('active'), 800)
  })

  main.appendChild(box)
}

// Init speech synth
const message = new SpeechSynthesisUtterance()

// Store voices
let voices = []

function getVoices() {
  voices = speechSynthesis.getVoices()

  voices.forEach(voice => {
    const option = document.createElement('option')

    option.value = voice.name
    option.innerText = ` ${voice.lang}`

    voicesSelect.appendChild(option)
  })
}

// Set text
function setTextMessage(text) {
  message.text = text
}

// Speak text
function speakText() {
  speechSynthesis.speak(message)
}

// Set voice
function setVoice(e) {
  message.voice = voices.find(voice => voice.name === e.target.value)
}

// Voices changed
speechSynthesis.addEventListener('voiceschanged', getVoices)

// Toggle text box
toggleBtn.addEventListener('click', () =>
  document.getElementById('text-box').classList.toggle('show')
)

// Close button
closeBtn.addEventListener('click', () =>
  document.getElementById('text-box').classList.remove('show')
)

// Change voice
voicesSelect.addEventListener('change', setVoice)

// Read text button
readBtn.addEventListener('click', () => {
  setTextMessage(textarea.value)
  speakText()
})

getVoices()
