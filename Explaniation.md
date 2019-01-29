This mocks a set of Rest API calls

The first queue represent an api call.
The random calls to the api should fill up a queue.
Once it has reached its limit of processing 5 calls another queue will be started.
This first API takes a certain amount of time to process a request, in this case 2 seconds.
Once a request has been processed it's moved to a second queue, which is a representation of an asyc call.
The goal of the first queue is to process all requests proformanttly, but also to keep resources to a minimum.
All new calls to it will be placed in the first available queue and once a queue is empty, unless its the first queue, it will be closed.

The second queue represents an async call.  Since this call can be done without affecting user interaction it is processed on only one service saving resources.
