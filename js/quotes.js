const quotes = [
  {
    quote:
      "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "Nelson Mandela",
  },
  {
    quote: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
  },
  {
    quote:
      "If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough.",
    author: "Oprah Winfrey",
  },
  {
    quote: "Get busy living or get busy dying.",
    author: "Stephen King",
  },
  {
    quote: "You only live once, but if you do it right, once is enough.",
    author: "Mae West",
  },
  {
    quote:
      "Many of life’s failures are people who did not realize how close they were to success when they gave up.",
    author: "Albert Einstein",
  },
  {
    quote: "Never let the fear of striking out keep you from playing the game.",
    author: "Babe Ruth",
  },
  {
    quote:
      "Money and success don’t change people; they merely amplify what is already there.",
    author: "Will Smith",
  },
  {
    quote:
      "Your time is limited, so don’t waste it living someone else’s life. Don’t be trapped by dogma – which is living with the results of other people’s thinking.",
    author: "Steve Jobs",
  },
  {
    quote:
      "If life were predictable it would cease to be life, and be without flavor.",
    author: "Eleanor Roosevelt",
  },
];

const quote1 = document.querySelector("#quotes .quote-text");
const author1 = document.querySelector("#quotes .author");

let currentQuoteIndex = 0;

function updateQuote() {
  const todayQuote = quotes[currentQuoteIndex];
  quote1.innerText = `“${todayQuote.quote}”`;
  author1.innerText = `- ${todayQuote.author}`;
  currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
}

updateQuote();
setInterval(updateQuote, 60000);
