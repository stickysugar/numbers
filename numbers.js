"use strict";

async function getNumbersFacts(nums) {
  let facts = await axios.get(`http://numbersapi.com/${nums}?json`);
  return Object.values(facts.data); //returns array
}

async function getMultipleNumberFacts(num) {
  let fact1 = axios.get(`http://numbersapi.com/${num}?json`);
  let fact2 = axios.get(`http://numbersapi.com/${num}?json`);
  let fact3 = axios.get(`http://numbersapi.com/${num}?json`);
  let fact4 = axios.get(`http://numbersapi.com/${num}?json`);

  let numberFacts = await Promise.allSettled(
    [fact1, fact2, fact3, fact4]);
  return numberFacts.map(fact => fact.value.data.text);
}

async function updateDom() {
  let facts = await getNumbersFacts("1,2,3,4");
  let numberFacts = await getMultipleNumberFacts("1");

  for (let fact of facts) {
    $("<p>").text(fact).appendTo($("#display1"));
  }

  for (let fact of numberFacts)
  $("<p>").text(fact).appendTo($("#display2"));
}

updateDom();