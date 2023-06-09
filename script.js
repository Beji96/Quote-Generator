const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];
//Show LOading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
//Hide Loading
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}
//Show new quote
function newQuotes() {
  loading();
  //Pick a random quotes from api quotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  //Check if Author field is blank and replace it with "Unknown"
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }
  // Check lenght to determaine styling
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quotes");
  } else {
    quoteText.classList.remove("long-quotes");
  }
  //Set Quotes, Hide loader
  quoteText.textContent = quote.text;
  complete();
}

// Get QuOtes from API
async function gteQuotes() {
  loading();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuotes();
  } catch (error) {
    // Catch Error
  }
}

//Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

//Event Listeners
newQuoteBtn.addEventListener("click", newQuotes);
twitterBtn.addEventListener("click", tweetQuote);
//On Load
gteQuotes();
