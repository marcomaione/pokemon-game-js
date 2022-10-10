// indico dove sara visualizzata la mappa di gioco
const canvas = document.querySelector('canvas');

const c = canvas.getContext('2d');

// do misure in pixel alla mappa di gioco
canvas.width = 1024
canvas.height = 576

c.fillStyle = 'white'
c.fillRect(0, 0, canvas.width, canvas.height);

// importo la mappa ed il person di gioco

const image = new Image();
image.src = './img/mappa pokemon.png'

const playerImage = new Image();
playerImage.src = './img/playerDown.png'

image.onload = () => {
    c.drawImage(image, -640, -450)
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
    );
}




