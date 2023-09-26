let pokemonName = null;
let pokemonImage = null;
let revealAnswer = false;
let roundStartTime = null;
let giftedUserId = null;
let userRound = null;
const guessedUsers = new Set();
let leaderboard = [];
const giftedUsersComments = {};
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 9653 });

function sendToFrontend(data) {
    const dataToSend = JSON.stringify(data);
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(dataToSend);
      }
    });
  }

async function fetchNewPokemonFromAPI() {
  const giftedKeys = Object.keys(giftedUsersComments);

  while (giftedKeys.length > 0) {
    giftedUserId = giftedKeys[0];
    const pokemonToFetch = giftedUsersComments[giftedUserId];
    delete giftedUsersComments[giftedUserId];
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonToFetch}`);
    const data = await response.json();

    if (data && data.name) {
      pokemonName = data.name;
      pokemonImage = data.sprites.other['official-artwork'].front_default;
      console.log(`${giftedUserId}'s submission: ${pokemonName}`)
      return;
    }
  }

  // Fallback to random Pokemon
  giftedUserId = null;
  const randomId = Math.floor(Math.random() * 1017) + 1;
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
  const data = await response.json();
  pokemonName = data.name;
  pokemonImage = data.sprites.other['official-artwork'].front_default;
  console.log(`${pokemonName} was chosen randomly`);
}

function onChatMessage(data) {
  const userId = data.uniqueId;
  const comment  = data.comment;

  // If this userId exists in giftedUsersComments, update its next comment
  if (giftedUsersComments.hasOwnProperty(userId)) {
    if (giftedUsersComments[userId] === null) {
      giftedUsersComments[userId] = comment.toLowerCase();
      console.log(`${comment} was added to the upcoming pokemon list`);
      return;
    }
  }

  if (guessedUsers.has(userId)) {
    console.log('You already guessed!');
    return; 
  }

  if (comment.toLowerCase() === pokemonName.toLowerCase()) {
    const timestamp = new Date().toISOString();
    leaderboard.push({ userId, timestamp });
    guessedUsers.add(userId);
    leaderboard = leaderboard.slice(0, 50);
    console.log('Correct!');
    console.log(leaderboard);
    sendToFrontend({leaderboard});
  }
}

async function handleGameRound() {
  try {
    await fetchNewPokemonFromAPI();
    leaderboard = [];
    guessedUsers.clear();
    revealAnswer = false;
    sendToFrontend({ pokemonName, pokemonImage, revealAnswer, userRound, roundStartTime, guessedUsers });
    await new Promise(resolve => setTimeout(resolve, 60000));
    revealAnswer = true;
    sendToFrontend({revealAnswer});
    await new Promise(resolve => setTimeout(resolve, 10000));
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// On server start
handleGameRound().catch(console.error);
setInterval(() => {
  handleGameRound().catch(console.error);
}, 70000);

const { WebcastPushConnection } = require('tiktok-live-connector');

// Username of someone who is currently live
let tiktokUsername = "whosthatlive";

let tiktokLiveConnection = new WebcastPushConnection(tiktokUsername);

tiktokLiveConnection.connect().then(state => {
    console.info(`Connected to roomId ${state.roomId}`);
}).catch(err => {
    console.error('Failed to connect', err);
})

tiktokLiveConnection.on('chat', data => {
    console.log(`${data.uniqueId} (userId:${data.userId}) writes: ${data.comment}`);
    onChatMessage(data);
})

tiktokLiveConnection.on('gift', data => {
    console.log(`${data.uniqueId} (userId:${data.userId}) sends ${data.giftId}`);
    if (data.giftId === 5879) {
        userId = data.uniqueId;
        if (!giftedUsersComments.hasOwnProperty(userId)) {
            giftedUsersComments[userId] = null;
            console.log(giftedUsersComments);
        }
        else {
            console.log(`${userId} has pending comment`);
        }
    }
})
