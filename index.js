let pokemonName = null;
let pokemonImage = null;
let revealAnswer = false;
let userRound = '/';
const guessedUsers = new Set();
let leaderboard = [];
const giftedUsersComments = {};
const WebSocket = require('ws');

function comparePokemonNames(pokemonName) {
  const pokemonList = [
    "nidoran-f", "nidoran-m", "mr-mime", "ho-oh", "deoxys-normal", "wormadam-plant", "mime-jr", "porygon-z", "giratina-altered", "shaymin-land", "basculin-red-striped", "darmanitan-standard", "tornadus-incarnate", "thundurus-incarnate", "landorus-incarnate", "keldeo-ordinary", "meloetta-aria", "meowstic-male", "aegislash-shield", "pumpkaboo-average", "gourgeist-average", "zygarde-50", "oricorio-baile", "lycanroc-midday", "wishiwashi-solo", "type-null", "minior-red-meteor", "mimikyu-disguised", "jangmo-o", "hakamo-o", "kommo-o", "tapu-koko", "tapu-lele", "tapu-bulu", "tapu-fini", "toxtricity-amped", "mr-rime", "eiscue-ice", "indeedee-male", "morpeko-full-belly", "urshifu-single-strike", "basculegion-male", "enamorus-incarnate", "great-tusk", "scream-tail", "brute-bonnet", "flutter-mane", "slither-wing", "sandy-shocks", "iron-treads", "iron-bundle", "iron-hands", "iron-jugulis", "iron-moth", "iron-thorns", "wo-chien", "chien-pao", "ting-lu", "chi-yu", "roaring-moon", "iron-valiant", "walking-wake", "iron-leaves", "deoxys-attack", "deoxys-defense", "deoxys-speed", "wormadam-sandy", "wormadam-trash", "shaymin-sky", "giratina-origin", "rotom-heat", "rotom-wash", "rotom-frost", "rotom-fan", "rotom-mow", "castform-sunny", "castform-rainy", "castform-snowy", "basculin-blue-striped", "darmanitan-zen", "meloetta-pirouette", "tornadus-therian", "thundurus-therian", "landorus-therian", "kyurem-black", "kyurem-white", "keldeo-resolute", "meowstic-female", "aegislash-blade", "pumpkaboo-small", "pumpkaboo-large", "pumpkaboo-super", "gourgeist-small", "gourgeist-large", "gourgeist-super", "venusaur-mega", "charizard-mega-x", "charizard-mega-y", "blastoise-mega", "alakazam-mega", "gengar-mega", "kangaskhan-mega", "pinsir-mega", "gyarados-mega", "aerodactyl-mega", "mewtwo-mega-x", "mewtwo-mega-y", "ampharos-mega", "scizor-mega", "heracross-mega", "houndoom-mega", "tyranitar-mega", "blaziken-mega", "gardevoir-mega", "mawile-mega", "aggron-mega", "medicham-mega", "manectric-mega", "banette-mega", "absol-mega", "garchomp-mega", "lucario-mega", "abomasnow-mega", "floette-eternal", "latias-mega", "latios-mega", "swampert-mega", "sceptile-mega", "sableye-mega", "altaria-mega", "gallade-mega", "audino-mega", "sharpedo-mega", "slowbro-mega", "steelix-mega", "pidgeot-mega", "glalie-mega", "diancie-mega", "metagross-mega", "kyogre-primal", "groudon-primal", "rayquaza-mega", "pikachu-rock-star", "pikachu-belle", "pikachu-pop-star", "pikachu-phd", "pikachu-libre", "pikachu-cosplay", "hoopa-unbound", "camerupt-mega", "lopunny-mega", "salamence-mega", "beedrill-mega", "rattata-alola", "raticate-alola", "raticate-totem-alola", "pikachu-original-cap", "pikachu-hoenn-cap", "pikachu-sinnoh-cap", "pikachu-unova-cap", "pikachu-kalos-cap", "pikachu-alola-cap", "raichu-alola", "sandshrew-alola", "sandslash-alola", "vulpix-alola", "ninetales-alola", "diglett-alola", "dugtrio-alola", "meowth-alola", "persian-alola", "geodude-alola", "graveler-alola", "golem-alola", "grimer-alola", "muk-alola", "exeggutor-alola", "marowak-alola", "greninja-battle-bond", "greninja-ash", "zygarde-10-power-construct", "zygarde-50-power-construct", "zygarde-complete", "gumshoos-totem", "vikavolt-totem", "oricorio-pom-pom", "oricorio-pau", "oricorio-sensu", "lycanroc-midnight", "wishiwashi-school", "lurantis-totem", "salazzle-totem", "minior-orange-meteor", "minior-yellow-meteor", "minior-green-meteor", "minior-blue-meteor", "minior-indigo-meteor", "minior-violet-meteor", "minior-red", "minior-orange", "minior-yellow", "minior-green", "minior-blue", "minior-indigo", "minior-violet", "mimikyu-busted", "mimikyu-totem-disguised", "mimikyu-totem-busted", "kommo-o-totem", "magearna-original", "pikachu-partner-cap", "marowak-totem", "ribombee-totem", "rockruff-own-tempo", "lycanroc-dusk", "araquanid-totem", "togedemaru-totem", "necrozma-dusk", "necrozma-dawn", "necrozma-ultra", "pikachu-starter", "eevee-starter", "pikachu-world-cap", "meowth-galar", "ponyta-galar", "rapidash-galar", "slowpoke-galar", "slowbro-galar", "farfetchd-galar", "weezing-galar", "mr-mime-galar", "articuno-galar", "zapdos-galar", "moltres-galar", "slowking-galar", "corsola-galar", "zigzagoon-galar", "linoone-galar", "darumaka-galar", "darmanitan-galar-standard", "darmanitan-galar-zen", "yamask-galar", "stunfisk-galar", "zygarde-10", "cramorant-gulping", "cramorant-gorging", "toxtricity-low-key", "eiscue-noice", "indeedee-female", "morpeko-hangry", "zacian-crowned", "zamazenta-crowned", "eternatus-eternamax", "urshifu-rapid-strike", "zarude-dada", "calyrex-ice", "calyrex-shadow", "venusaur-gmax", "charizard-gmax", "blastoise-gmax", "butterfree-gmax", "pikachu-gmax", "meowth-gmax", "machamp-gmax", "gengar-gmax", "kingler-gmax", "lapras-gmax", "eevee-gmax", "snorlax-gmax", "garbodor-gmax", "melmetal-gmax", "rillaboom-gmax", "cinderace-gmax", "inteleon-gmax", "corviknight-gmax", "orbeetle-gmax", "drednaw-gmax", "coalossal-gmax", "flapple-gmax", "appletun-gmax", "sandaconda-gmax", "toxtricity-amped-gmax", "centiskorch-gmax", "hatterene-gmax", "grimmsnarl-gmax", "alcremie-gmax", "copperajah-gmax", "duraludon-gmax", "urshifu-single-strike-gmax", "urshifu-rapid-strike-gmax", "toxtricity-low-key-gmax", "growlithe-hisui", "arcanine-hisui", "voltorb-hisui", "electrode-hisui", "typhlosion-hisui", "qwilfish-hisui", "sneasel-hisui", "samurott-hisui", "lilligant-hisui", "zorua-hisui", "zoroark-hisui", "braviary-hisui", "sliggoo-hisui", "goodra-hisui", "avalugg-hisui", "decidueye-hisui", "dialga-origin", "palkia-origin", "basculin-white-striped", "basculegion-female", "enamorus-therian", "tauros-paldea-combat-breed", "tauros-paldea-blaze-breed", "tauros-paldea-aqua-breed", "wooper-paldea", "oinkologne-female", "dudunsparce-three-segment", "palafin-hero", "maushold-family-of-three", "tatsugiri-droopy", "tatsugiri-stretchy", "squawkabilly-blue-plumage", "squawkabilly-yellow-plumage", "squawkabilly-white-plumage", "gimmighoul-roaming", "koraidon-limited-build", "koraidon-sprinting-build", "koraidon-swimming-build", "koraidon-gliding-build", "miraidon-low-power-mode", "miraidon-drive-mode", "miraidon-aquatic-mode", "miraidon-glide-mode", "ursaluna-bloodmoon", "ogerpon-wellspring-mask", "ogerpon-hearthflame-mask", "ogerpon-cornerstone-mask"
  ];

  for (const existingName of pokemonList) {
    let matchedChars = 0;

    for (let i = 0; i < existingName.length; i++) {
      if (pokemonName[i] && existingName[i] === pokemonName[i]) {
        matchedChars++;
      }
    }

    if (matchedChars >= 4) {
      return existingName;
    }
  }

  return pokemonName;
}

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
    userRound = '/';
    leaderboard = [];
    guessedUsers.clear();
    revealAnswer = false;
    const giftedKeys = Object.keys(giftedUsersComments);
  
    while (giftedKeys.length > 0) {
      const giftedUserId = giftedKeys.shift();
      userRound = giftedUserId;
      console.log(`userRound: ${userRound}`);
      console.log( `giftedKeys: ${giftedKeys}`);
      let pokemonToFetch = giftedUsersComments[giftedUserId];
      delete giftedUsersComments[giftedUserId];
  
      try {
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonToFetch}`);
        if (response.ok) {
          let data = await response.json();
          pokemonName = data.species.name;
          pokemonImage = data.sprites.other['official-artwork'].front_default;
          console.log(`${giftedUserId}'s submission: ${pokemonName}`);
          sendToFrontend({ pokemonName, pokemonImage, revealAnswer, userRound, leaderboard });
          return;
        }
  
        // If the name wasn't found, correct it and try again
        pokemonToFetch = comparePokemonNames(pokemonToFetch);
        response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonToFetch}`);
        if (response.ok) {
          let data = await response.json();
          pokemonName = data.species.name;
          pokemonImage = data.sprites.other['official-artwork'].front_default;
          console.log(`${giftedUserId}'s submission: ${pokemonName}`);
          sendToFrontend({ pokemonName, pokemonImage, revealAnswer, userRound, leaderboard });
          return;
        }
      } catch (error) {
        console.log(`An error occurred: ${error}`);
      }
    }
  
    // Fallback to random Pokemon
    userRound = '/';
    const randomId = Math.floor(Math.random() * 1017) + 1;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
    const data = await response.json();
    pokemonName = data.species.name;
    pokemonImage = data.sprites.other['official-artwork'].front_default;
    console.log(`${pokemonName} was chosen randomly`);
    console.log(`userRound: ${userRound}`);
    console.log( `giftedKeys: ${giftedKeys}`);
    sendToFrontend({ pokemonName, pokemonImage, revealAnswer, userRound, leaderboard });
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
    leaderboard.push(userId);
    guessedUsers.add(userId);
    leaderboard = leaderboard.slice(0, 52);
    console.log('Correct!');
    console.log(leaderboard);
    sendToFrontend({ pokemonName, pokemonImage, revealAnswer, userRound, leaderboard });
  }
}

async function handleGameRound() {
  try {
    await fetchNewPokemonFromAPI();
    await new Promise(resolve => setTimeout(resolve, 45000));
    revealAnswer = true;
    sendToFrontend({ pokemonName, pokemonImage, revealAnswer, userRound, leaderboard });
    await new Promise(resolve => setTimeout(resolve, 10000));
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

handleGameRound().catch(console.error);
setInterval(() => {
  handleGameRound().catch(console.error);
}, 55000);

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
    if (data.giftId === 5655) {
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
