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
    constructor({position, velocity, image, frames = { max: 1} }) {
        this.position = position
        this.image = image
        this.frames = frames
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
            // console.log(this.width)
            // console.log(this.height)
        }
    }
    draw() {
        c.drawImage(
            this.image,
            0,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,
            this.image.height
        )
    }
}

const player = new Sprite({
    position: {
        x: canvas.width / 2 - 192 / 4 / 2,
        y: canvas.height / 2 - 68 / 2
    },
    image: playerImage,
    frames: {
        max: 4
    }
})


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

const movables = [background, ...confini]

function rectangularCollision ({rectangle1, rectangle2}) {
    return(
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y)

}
function animate() {
    window.requestAnimationFrame(animate)
    background.draw()
     confini.forEach(confine => {
        confine.draw()
    })
    player.draw()
    
    //  if (keys.w.pressed) background.position.y = background.position.y + 3// formula non abbreviata per muovere il personaggio
    let moving = true
    if (keys.w.pressed && lastKey === 'w') {
        for (let i = 0; i < confini.length; i++) {
            const confine = confini[i]
            if(
                rectangularCollision({
                    rectangle1 : player,
                    rectangle2: {...confine, position:{
                        x: confine.position.x ,
                        y: confine.position.y + 3
                    }}
                })
            ) {
                console.log('')
                moving = false
                break
            }
        }
        if(moving)
        movables.forEach((movable) => {
            movable.position.y += 3
        })
    }
    else if (keys.a.pressed && lastKey === 'a') {
        for (let i = 0; i < confini.length; i++) {
            const confine = confini[i]
            if(
                rectangularCollision({
                    rectangle1 : player,
                    rectangle2: {...confine, position:{
                        x: confine.position.x + 3,
                        y: confine.position.y 
                    }}
                })
            ) {
                console.log('')
                moving = false
                break
            }
        }
        if(moving)
        movables.forEach((movable) => {
            movable.position.x += 3
        })
    }
    else if (keys.s.pressed && lastKey === 's') {
        for (let i = 0; i < confini.length; i++) {
            const confine = confini[i]
            if(
                rectangularCollision({
                    rectangle1 : player,
                    rectangle2: {...confine, position:{
                        x: confine.position.x,
                        y: confine.position.y - 3
                    }}
                })
            ) {
                console.log('')
                moving = false
                break
            }
        }
        if(moving)
        movables.forEach((movable) => {
            movable.position.y -= 3
        })
    }
    else if (keys.d.pressed && lastKey === 'd') {
        for (let i = 0; i < confini.length; i++) {
            const confine = confini[i]
            if(
                rectangularCollision({
                    rectangle1 : player,
                    rectangle2: {...confine, position:{
                        x: confine.position.x - 3,
                        y: confine.position.y
                    }}
                })
            ) {
                console.log('')
                moving = false
                break
            }
        }
        if(moving)
        movables.forEach((movable) => {
            movable.position.x -= 3
        })
    }
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



