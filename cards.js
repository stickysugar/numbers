"use strict";

const DECK_API_BASE_URL = 'http://deckofcardsapi.com/api/deck';
let DECK_ID = ""



async function shuffleDeck() {
  let newDeck = await axios({
    method: 'get',
    url: `${DECK_API_BASE_URL}/new/shuffle/`,
    params: {
        deck_count : 1,ChannelMergerNode
    }
  })
  return newDeck.data.deck_id;
}

async function drawCard(deckId) {
  let randomCard = await axios({
    method: 'get',
    url: `${DECK_API_BASE_URL}/${deckId}/draw` ,
    params: {
        count : 1,
    }
  })
  return randomCard.data;
}

// async function getDeckandDrawCard () {
//   const deckId = await shuffleDeck();
//   const randomCard = await drawCard(deckId);
//  return `${randomCard.cards[0].value} of ${randomCard.cards[0].suit}`
// }

async function updateDom () {
  if (DECK_ID === "") {
    DECK_ID = await shuffleDeck()
  } 
  const randomCard = await drawCard(DECK_ID)
  $('<p>')
    .text(`${randomCard.cards[0].value} of ${randomCard.cards[0].suit}`)
    .prependTo($('#drawn-cards'))
}

$('#draw-card').on("click",updateDom);


