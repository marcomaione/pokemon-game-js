// aggiungo il campo di battaglia
const battleBackgroundImage = new Image()
battleBackgroundImage.src = 'img/battleBackground.png'
const battleBackground = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    image: battleBackgroundImage
})
// aggiungo i mostricciattoli sul campo di battaglia

const draggle = new Sprite(monsters.Draggle)

const emby = new Sprite(monsters.Emby)

const renderedSprites = [draggle, emby]

const button = document.createElement('button')
button.innerHTML = 'Fireball'
document.querySelector('#attacksBox').append(button)

// funzione che inizializza la battaglia
function animateBattle() {
    window.requestAnimationFrame(animateBattle)
    battleBackground.draw()
    renderedSprites.forEach(sprite => {
        sprite.draw()
    })
}
// animate()
animateBattle()

const coda = []
//ascoltatori di eventi per i nostri pulsanti(attacco)
document.querySelectorAll('button').forEach((button) =>{
    button.addEventListener('click', (e) => {
        // creo una costante che al premere del pulsante usera l'attacco ad esso associato con relativo danno
        const selectedAttack = attacks[e.currentTarget.innerHTML]
         emby.attack({
            attack: selectedAttack,
            recipient: draggle,
            renderedSprites
        })

        coda.push(() => {
            draggle.attack({
                attack: attacks.Tackle,
                recipient: emby,
                renderedSprites
            })
        })
        coda.push(() => {
            draggle.attack({
                attack: attacks.Fireball,
                recipient: emby,
                renderedSprites
            })
        })
    })
})

document.querySelector('#boxDialoghi').addEventListener('click', (e) =>{
    if (coda.length > 0) {
        coda[0] ()
        coda.shift()
    } else e.currentTarget.style.display = 'none'
    
})