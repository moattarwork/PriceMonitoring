# PriceMonitoring


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

