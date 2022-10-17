// // aggiungo il campo di battaglia
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

const draggle = new Monster(monsters.Draggle)

const emby = new Monster(monsters.Emby)

const renderedSprites = [draggle, emby]

emby.attacks.forEach((attack) => {
    const button = document.createElement('button')
    button.innerHTML = attack.name
    document.querySelector('#attacksBox').append(button)
})

let battleAnimationId
// funzione che inizializza la battaglia
function animateBattle() {
    battleAnimationId = window.requestAnimationFrame(animateBattle)
    battleBackground.draw()
    renderedSprites.forEach(sprite => {
        sprite.draw()
    })
}
// animate()
// animateBattle()

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
        // attacco nemico
        const randomAttack = draggle.attacks[Math.floor(Math.random() * draggle.attacks.length)]
        if ( draggle.health <= 0) {
            coda.push(() => {
                draggle.faint()
            })
            coda.push(() => {
                gsap.to('#overlappingDiv', {
                    opacity: 1,
                    onComplete: () => {
                        cancelAnimationFrame(battleAnimationId)
                        animate()
                        document.querySelector('#userInterface').style.display = 'none'
                        gsap.to('#overlappingDiv', {
                            opacity: 0
                        })
                    }
                })
            })

        }

        coda.push(() => {
            draggle.attack({
                attack: randomAttack,
                recipient: emby,
                renderedSprites
            })
            if ( emby.health <= 0) {
                coda.push(() => {
                    emby.faint()
                })
    
            }
        })
    })
    button.addEventListener('mouseenter', (e) => {
        const selectedAttack = attacks[e.currentTarget.innerHTML]
        document.querySelector('#attackType').innerHTML = selectedAttack.type
        document.querySelector('#attackType').style.color = selectedAttack.color
    })
})

document.querySelector('#dialogueBox').addEventListener('click', (e) =>{
    if (coda.length > 0) {
        coda[0] ()
        coda.shift()
    } else e.currentTarget.style.display = 'none'
    
})

///-----------------------------------------------------------------------------------------------------------------------------------------

// const battleBackgroundImage = new Image()
// battleBackgroundImage.src = './img/battleBackground.png'
// const battleBackground = new Sprite({
//   position: {
//     x: 0,
//     y: 0
//   },
//   image: battleBackgroundImage
// })

// let draggle
// let emby
// let renderedSprites
// let battleAnimationId
// let queue

// function initBattle() {
//   document.querySelector('#userInterface').style.display = 'block'
//   document.querySelector('#dialogueBox').style.display = 'none'
//   document.querySelector('#enemyHealthBar').style.width = '100%'
//   document.querySelector('#playerHealthBar').style.width = '100%'
//   document.querySelector('#attacksBox').replaceChildren()

//   draggle = new Monster(monsters.Draggle)
//   emby = new Monster(monsters.Emby)
//   renderedSprites = [draggle, emby]
//   queue = []

//   emby.attacks.forEach((attack) => {
//     const button = document.createElement('button')
//     button.innerHTML = attack.name
//     document.querySelector('#attacksBox').append(button)
//   })

//   // our event listeners for our buttons (attack)
//   document.querySelectorAll('button').forEach((button) => {
//     button.addEventListener('click', (e) => {
//       const selectedAttack = attacks[e.currentTarget.innerHTML]
//       emby.attack({
//         attack: selectedAttack,
//         recipient: draggle,
//         renderedSprites
//       })

//       if (draggle.health <= 0) {
//         queue.push(() => {
//           draggle.faint()
//         })
//         queue.push(() => {
//           // fade back to black
//           gsap.to('#overlappingDiv', {
//             opacity: 1,
//             onComplete: () => {
//               cancelAnimationFrame(battleAnimationId)
//               animate()
//               document.querySelector('#userInterface').style.display = 'none'

//               gsap.to('#overlappingDiv', {
//                 opacity: 0
//               })

//               battle.initiated = false
//               audio.Map.play()
//             }
//           })
//         })
//       }

//       // draggle or enemy attacks right here
//       const randomAttack =
//         draggle.attacks[Math.floor(Math.random() * draggle.attacks.length)]

//       queue.push(() => {
//         draggle.attack({
//           attack: randomAttack,
//           recipient: emby,
//           renderedSprites
//         })

//         if (emby.health <= 0) {
//           queue.push(() => {
//             emby.faint()
//           })

//           queue.push(() => {
//             // fade back to black
//             gsap.to('#overlappingDiv', {
//               opacity: 1,
//               onComplete: () => {
//                 cancelAnimationFrame(battleAnimationId)
//                 animate()
//                 document.querySelector('#userInterface').style.display = 'none'

//                 gsap.to('#overlappingDiv', {
//                   opacity: 0
//                 })

//                 battle.initiated = false
//                 audio.Map.play()
//               }
//             })
//           })
//         }
//       })
//     })

//     button.addEventListener('mouseenter', (e) => {
//       const selectedAttack = attacks[e.currentTarget.innerHTML]
//       document.querySelector('#attackType').innerHTML = selectedAttack.type
//       document.querySelector('#attackType').style.color = selectedAttack.color
//     })
//   })
// }

// function animateBattle() {
//   battleAnimationId = window.requestAnimationFrame(animateBattle)
//   battleBackground.draw()

//   console.log(battleAnimationId)

//   renderedSprites.forEach((sprite) => {
//     sprite.draw()
//   })
// }

// animate()
// // initBattle()
// // animateBattle()

// document.querySelector('#dialogueBox').addEventListener('click', (e) => {
//   if (queue.length > 0) {
//     queue[0]()
//     queue.shift()
//   } else e.currentTarget.style.display = 'none'
// })