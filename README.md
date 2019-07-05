# PriceMonitoring

## Frontend

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

## Backend

Backend is a simple node.js server that delivers data through a web-socket on
port 8043. Each data point is a JSON-stringified object of the following form:

```js
{
  'symbol': 'AAPL',
  'price': 178.92,
}
```

Prices arrive through the web-socket at random intervals between 10 and 1500 ms.
The order in which price updates arrive is also random.

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


## Components

- Favorite and Securities components to display the ticker and price
- security-store service that is listening to web-socket and pump the relevant data to the display components
- socket-factory that facilitate the testing and mocking of the web-socket
- card component which is for layout management.
- slidingWindow operator (rxjs operator) to facilitate the sliding operation on observable.

## Extensions Points

There are the following extension points to the code base:

- Better error handling for web socket connection. Currently it get logged to the console
- Implementing the solution using ngrx (redux like) which make the solution more extensible when the solution get bigger. It wasn't necessary at this stage and for small code bases
- Providing a search box based on the list of symbols which make the filtering easier for the users.

## External libraries

- Bootstrap and ngx-bootstrap
- ngx-toastr
- ngx-config

