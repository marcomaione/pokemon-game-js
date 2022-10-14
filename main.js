// creo le classi
class Confine {
    static width = 48
    static height = 48
    constructor({position}) {
        this.position = position
        this.width = 48
        this.height = 48
    }

    draw() {
        c.fillStyle = 'rgba(255, 0, 0, 0.5)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height )
    }
}

// creo una classe per il personaggio
class Sprite {
    constructor({
        position,
        image,
        frames = { max: 1, hold: 10},
        sprites,
        animate = false,
        isEnemy = false,
        rotation = 0,
        name
        }) {
        this.position = position
        this.image = image
        this.frames = {...frames, val: 0, elapsed: 0 }
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
        }
        this.animate = animate
        this.sprites = sprites
        this.opacity = 1
        this.health = 100
        this.isEnemy = isEnemy
        this.rotation = rotation
        this.name = name
    }
    draw() {
        c.save()
        c.globalAlpha = this.opacity
        c.drawImage(
            this.image,
            this.frames.val * this.width,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,
            this.image.height
        )
        c.restore()
        if (!this.animate) return
        if (this.frames.max > 1) {
            this.frames.elapsed++
        }
        if (this.frames.elapsed % this.frames.hold === 0) {
        if (this.frames.val < this.frames.max - 1) this.frames.val++
        else this.frames.val = 0
        }
    }
    // movimento personaggio quando attacca
    attack({attack, recipient, renderedSprites}) {
        document.querySelector('#boxDialoghi').style.display = 'block'
        document.querySelector('#boxDialoghi').innerHTML = this.name +  ' usa '  + attack.name

        let healthBar = '#barra-salute-enemy'
        if (this.isEnemy) healthBar = '#barra-salute'
        this.health -= attack.damage
        switch (attack.name) {
            case 'Fireball':
                const fireballImage = new Image()
                fireballImage.src = 'img/fireball.png'
                const fireball = new Sprite({
                    position: {
                        x:this.position.x,
                        y:this.position.y
                    },
                    image: fireballImage,
                    frames: {
                        max: 4,
                        hold: 10
                    },
                    animate: true,
                })
                renderedSprites.splice(1, 0, fireball)

                gsap.to(fireball.position, {
                    x: recipient.position.x,
                    y: recipient.position.y,
                    onComplete: () => {
                        gsap.to(healthBar, {
                            width: this.health + '%'
                        })
                        gsap.to(recipient.position, {
                            x: recipient.position.x + 10,
                            yoyo: true,
                            repeat: 5,
                            duration: 0.08
                        })
                        gsap.to(recipient, {
                            opacity: 0,
                            repeat: 5,
                            yoyo: true,
                            duration: 0.08
                        })
                        renderedSprites.splice(1, 1)
                    }
                })
                break
            case 'Tackle':
                const tl = gsap.timeline()
                let movementDistance = 20
                if ( this.isEnemy) movementDistance = -20
                tl.to(this.position, {
                    x: this.position.x - movementDistance
                }).to(this.position, {
                    x: this.position.x + movementDistance * 2,
                    duration: 0.1,
                    onComplete: () => {
                        // animazione vita che scende dopo il colpo
                        gsap.to(healthBar, {
                            width: this.health + '%'
                        })
                        gsap.to(recipient.position, {
                            x: recipient.position.x + 10,
                            yoyo: true,
                            repeat: 5,
                            duration: 0.08
                        })
                        gsap.to(recipient, {
                            opacity: 0,
                            repeat: 5,
                            yoyo: true,
                            duration: 0.08
                        })
                    }
                })
                .to(this.position, {
                    x: this.position.x 
                })
            break
        }
        
    }
}




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

// aggiungo le zone di battaglia sulla mappa
const battleZonesMap = []
for (let i = 0; i < battleZonesData.length; i += 70 ) {
    battleZonesMap.push(battleZonesData.slice(i, 70 + i))
}
// console.log(battleZonesData)

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


const battleZones = []

battleZonesMap.forEach((row, i) => {
    row.forEach((simbolo, j) => {
        if ( simbolo === 1025)
        battleZones.push(
            new Confine({
                position: {
                x: j * Confine.width + offset.x,
                y: i * Confine.height + offset.y
                }
            })
        )
    })
})

// console.log(battleZones)
// importo la mappa ed il person di gioco
const image = new Image();
image.src = './img/mappa.png'

const playerDownImage = new Image();
playerDownImage.src = './img/playerDown.png'

const playerUpImage = new Image();
playerUpImage.src = './img/playerUp.png'

const playerLeftImage = new Image();
playerLeftImage.src = './img/playerLeft.png'

const playerRightImage = new Image();
playerRightImage.src = './img/playerRight.png'

const player = new Sprite({
    position: {
        x: canvas.width / 2 - 192 / 4 / 2,
        y: canvas.height / 2 - 68 / 2
    },
    image: playerDownImage,
    frames: {
        max: 4,
        hold: 10
    },
    sprites: {
        up: playerUpImage,
        left: playerLeftImage,
        right: playerRightImage,
        down: playerDownImage
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

const movables = [background, ...confini, ...battleZones]

function rectangularCollision ({rectangle1, rectangle2}) {
    return(
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y)

}

const battle = {
    initiated: false
}
function animate() {
    const animationId = window.requestAnimationFrame(animate)
    
    background.draw()
     confini.forEach(confine => {
        confine.draw()
    })
    battleZones.forEach(battleZone => {
        battleZone.draw()
    })
    player.draw()

    let moving = true
    player.animate = false
    // console.log(animationId);
    if (battle.initiated) return
    // attivazione zona dellamappa dove si possono trovare nemici e combattere
    if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {
        for (let i = 0; i < battleZones.length; i++) {
            const battleZone = battleZones[i]
            // non ho capito come funziona ma funziona
            const overlappingArea = 
            (Math.min(
                player.position.x + player.width,
                battleZone.position.x + battleZone.width
              ) -
                Math.max(player.position.x, battleZone.position.x)) *
              (Math.min(
                player.position.y + player.height,
                battleZone.position.y + battleZone.height
              ) -
                Math.max(player.position.y, battleZone.position.y))
            if(
                rectangularCollision({
                    rectangle1 : player,
                    rectangle2 : battleZone
                }) &&
                overlappingArea > (player.width * player.height) / 2 &&
                Math.random() < 0.01
            ) {
                // console.log('activate battle')
                // disattiva animazione in loop
                window.cancelAnimationFrame(animationId)
                battle.initiated = true
                // animazione tramite cdn gsap inizio battaglia
                gsap.to('#overlappingDiv', {
                    opacity: 1,
                    repeat: 3,
                    yoyo: true,
                    duration: 0.5,
                    onComplete() {
                        gsap.to('#overlappingDiv', {
                            opacity: 1,
                            duration: 0.4,
                            onComplete() {
                                // attivo una nuova animazio in loop
                                animateBattle()
                                gsap.to('#overlappingDiv', {
                                    opacity: 0,
                                    duration: 0.4,
                                })
                            }
                        })

                    }
                })
                break
            }
        }
    }
    
    //  if (keys.w.pressed) background.position.y = background.position.y + 3// formula non abbreviata per muovere il personaggio
    
    if (keys.w.pressed && lastKey === 'w') {
        player.animate = true
        player.image = player.sprites.up
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
        player.animate = true
        player.image = player.sprites.left
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
                // console.log('')
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
        player.animate = true
        player.image = player.sprites.down
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
                // console.log('')
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
        player.animate = true
        player.image = player.sprites.right
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
                // console.log('')
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
//  animate()

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





