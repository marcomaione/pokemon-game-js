// indico dove sara visualizzata la mappa di gioco
const canvas = document.querySelector('canvas');

const c = canvas.getContext('2d');

//  misure in pixel alla mappa di gioco
canvas.width = 1024
canvas.height = 576

c.fillStyle = 'white'
c.fillRect(0, 0, canvas.width, canvas.height);

// importo la mappa ed il person di gioco

const image = new Image();
image.src = './img/mappa pokemon.png'

const playerImage = new Image();
playerImage.src = './img/playerDown.png'

// creo una classe per il movimento del personaggio
class Sprite {
    constructor({position, velocity, image}) {
        this.position = position
        this.image = image
    }
    draw() {
    c.drawImage(this.image, -640, -450)
    }
}

const background = new Sprite({
    position: {
    x: -640,
    y: -450
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
    // if () 
}
animate()


// aggiungo la tastiera al gioco

window.addEventListener('keydown', (e) => {
    
    switch (e.key) {
        case 'w':
            keys.w.pressed = true
        break

        case 'a':
            keys.a.pressed = true
        break

        case 's':
            keys.s.pressed = true
        break

        case 'd':
            keys.d.pressed = true
        break
    }
    console.log(keys);
})




