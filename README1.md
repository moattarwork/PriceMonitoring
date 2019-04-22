# The algoB coding challenge (frontend)

In this coding challenge, you have to design a simple dashboard that presents
live prices for a list of securities.

## Requirements

### Frontend

The dashboard consists of 2 components:

1. `favourites`: A table of up to 10 rows with prices for our "favourite"
   securities.
2. `all`: A table containing all securities for which a price has been received.

In particular:

`favourites`:

* A table of up to 10 securities.
* Securities can be marked as favourite from the `all` table.
* Securities can be unmarked as favourite from the `favourites` table.
* Each row shows the security symbol and its live price.
* Each row also shows the average price for that symbol in the last 3 minutes.
  Note: This is a moving-window average.

`all`:

* A table showing all the securities for which we have received a price so far.
* Each row contains the security symbol and its live price.
* The user can select which securities to make their favourite from this table.

The live price of each security should not flash on the screen more than once
every second, even when data comes in more often than that for that security.

### Backend

We provide a simple node.js server that delivers data through a web-socket on
port 8043. Each data point is a JSON-stringified object of the following form:

```js
{
  'symbol': 'AAPL',
  'price': 178.92,
}
```

Prices arrive through the web-socket at random intervals between 10 and 1500 ms.
The order in which price updates arrive is also random.

## Delivery

We expect the challenge to be completed as an Angular project. You can use
another framework if you want but you'll have to bring in your own boilerplate
code.

We expect a tidy, up-to-spec interface that a user would find easy to interact
with, but please also make sure to write high quality, well tested code and to
document anything that you consider relevant: design decisions, corner cases,
etc.

## Quickstart

Install the npm packages:

```bash
$ npm install
```

In one console, run the backend server:

```bash
$ npm run backend
```

You can connect to the web-socket with:

```js
ws = new WebSocket('ws://localhost:8043');
ws.onmessage = (msg) => {
  console.log(msg);
};
```

In another console, run the frontend dev server:

```bash
$ ng serve
```

The website is served live at <http://localhost:4200>.
