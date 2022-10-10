// indico dove sara visualizzata la mappa di gioco
const canvas = document.querySelector('canvas');

const c = canvas.getContext('2d');

console.log(muro);

//  misure in pixel alla mappa di gioco
canvas.width = 1024
canvas.height = 576

c.fillStyle = 'white'
c.fillRect(0, 0, canvas.width, canvas.height);

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
    x: -590,
    y: -300
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
    console.log(keys);
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
    console.log(keys);
})



