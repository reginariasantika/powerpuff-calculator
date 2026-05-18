# Powerpuff Calculator

A cute Powerpuff Girls-themed calculator that works perfectly... until you hit `=`.

**[Try it live](https://reginariasantika.github.io/powerpuff-calculator/)**

## What happens when you press =?

Mojo Jojo blocks your answer! You'll need to pay $9.99/month to "Save Townsville" and unlock the result.

## Features

- Full calculator with +, -, x, ÷
- Pastel Powerpuff Girls design with floating stars and hearts
- Blossom, Bubbles & Buttercup color-coded eyes
- Keyboard support
- Stripe paywall on the = button
- "Chemical X math powers" as a premium perk
- "Free DLC: Numbers 0-9" included

## Setup

Just open `index.html` in your browser, or run locally:

```bash
node server.js
# open http://localhost:8090
```

## Stripe Integration

Replace the placeholder URL in `script.js` with your real Stripe Payment Link:

```js
function redirectToStripe() {
    window.open('https://buy.stripe.com/your-real-link', '_blank');
}
```

## Built With

- HTML, CSS, JavaScript
- Baloo 2 font
- Stripe (for the paywall)
- Sugar, Spice & Everything Nice
