// indico dove sara visualizzata la mappa di gioco
const canvas = document.querySelector('canvas');

const c = canvas.getContext('2d');

//  misure in pixel alla mappa di gioco
canvas.width = 1024
canvas.height = 576

// aggiungo il muro nella mappa
const muroMappa =[]

for (let i = 0; i < muro.length; i += 70 ) {
    muroMappa.push(muro.slice(i, 70 + i))
}

class Confine {
    static width = 48
    static height = 48
    constructor({position}) {
        this.position = position
        this.width = 48
        this.height = 48
    }

    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height )
    }
}
console.log()

const confini = []
const offset = {
    x: -590 ,
    y: -300
}

muroMappa.forEach((row, i) => {
    row.forEach((simbolo, j) => {
        if ( simbolo === 1025)
        confini.push(
            new Confine({
                position: {
                x: j * Confine.width + offset.x,
                y: i * Confine.height + offset.y
                }
            })
        )
    })
})

// importo la mappa ed il person di gioco

const image = new Image();
image.src = './img/mappa.png'

const playerImage = new Image();
playerImage.src = './img/playerDown.png'

// creo una classe per il movimento del personaggio
class Sprite {
    constructor({position, velocity, image}) {
        this.position = position
        this.image = image
    }
    draw() {
    c.drawImage(this.image, this.position.x, this.position.y)
    }
}

const background = new Sprite({
    position: {
    x: offset.x,
    y: offset.y
    },
    image: image
})

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}
// vado ad posizionare il player sulla mappa e avvio loop animazione personaggio 

function animate() {
    window.requestAnimationFrame(animate)
    background.draw()
    confini.forEach(confine => {
        confine.draw()
    })
    c.drawImage(
        playerImage,
        0,
        0,
        playerImage.width / 4,
        playerImage.height,
        canvas.width / 2 - (playerImage.width / 4) / 2,
        canvas.height / 2 - playerImage.height / 2,
        playerImage.width / 4,
        playerImage.height
    )
    //  if (keys.w.pressed) background.position.y = background.position.y + 3// formula non abbreviata per muovere il personaggio
    if (keys.w.pressed && lastKey === 'w') background.position.y += 3
    else if (keys.a.pressed && lastKey === 'a') background.position.x += 3
    else if (keys.s.pressed && lastKey === 's') background.position.y -= 3
    else if (keys.d.pressed && lastKey === 'd') background.position.x -= 3 
}
animate()


// aggiungo la tastiera al gioco
let lastKey = ''
window.addEventListener('keydown', (e) => {
    
    switch (e.key) {
        case 'w':
            keys.w.pressed = true
            lastKey = 'w'
        break

        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
        break

        case 's':
            keys.s.pressed = true
            lastKey = 's'
        break

        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
        break
    }

})

window.addEventListener('keyup', (e) => {
    
    switch (e.key) {
        case 'w':
            keys.w.pressed = false
        break

        case 'a':
            keys.a.pressed = false
        break

        case 's':
            keys.s.pressed = false
        break

        case 'd':
            keys.d.pressed = false
        break
    }

})



