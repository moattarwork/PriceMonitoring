# Test Result

The test result almost covers every requirement except the following one which needs applying grouping and windowing function to calculating the moving average.
That has been missed due to my mis-reading of the requirements:

Each row also shows the average price for that symbol in the last 3 minutes.
  Note: This is a moving-window average.

The solution has full coverage of unit tests. The configuration file in assets folder contains the configuration elements including webSocket API which has been injected to relevant service.

There are the following extension points to the code base:

- Implementing the missing feature (moving average calculation) - It can apply quickly to code base with one day more work.
- Better error handling for web socket connection. Currently it get logged to the console
- Implementing the solution using ngrx (redux like) which make the solution more extensible when the solution get bigger. It wasn't necessary at this stage and for small code bases
- Providing a search box based on the list of symbols which make the filtering easier for the users.

## External libraries
- Bootstrap and ngx-bootstrap
- ngx-toastr
- ngx-config
