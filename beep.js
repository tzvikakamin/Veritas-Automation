const sound = require('play-sound')()

export default function beep() {
    sound.play('./beep.mp3')
}