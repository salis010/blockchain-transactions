## What it Does

Upon loading, the frontend requests to the backend details about the default address.

The backend trims off unnecessary data, sorts in date order, groups in categories (today, last week, lasat month, etc.) and sends to the frontend.

The frontend displays a Splash screen while waiting to receive the data and proceeds to display the data in tables.

The data received is stored in `sessionStorage`.

If the user selects a new address from the dropdown, a check is made whether the data is already located in `sessionStorage`, in which case it is loaded from `sessionStorage`.

If not, a request is made to backend, and the received data is stored to `sessionStorage` too.

On clicking a transaction, the user is taken to another 'page', but without any reloading.

Transactions details are requested to backend, and the details page is populated accordingly.

Frontend is responsive to different screen sizes.


##Problems

###sochain

The sochain api kept returning a status of 503 and gave cors errors. I could not make it work.

I even installed the sochain package and ran it on node, still got 503.

Therefore I shifted to using blockcypher.

However the addresses provided in the email do not work.

So I looked up the internet for "busy blockchaing addresses", and used them instead:
"1DUb2YYbQA1jjaNYzVXLZ7ZioEhLXtbUru"
"168o1kqNquEJeR9vosUB5fw4eAwcVAgh8P"
"1D5bPm1YAdn9WvAAixht7PbACU3TtkqtJJ"
"1Po4J4SNyJuGnMGYJfGTXLEvGgAZKiddr7"

Some return just 10 transactions, and some have duplicates, I do not know why.

###Fetching Transaction Details

I kept getting errors when trying to fetch transaction details from the blockcypher api.

Probably I am picking the wrong hash due to my lack of knowledge in blockchain, e.g.:

`error: 'Transaction 00000000000000000010653b10c8dcf3d18eed2dac60dace178b509b70d27e10 not found' `

So, I hard-coded the 'transaction-details', and always send the same details back to frontend.


##Improvements

A node server could run in the background fetching transaction details and writing them to a MongoDB. When the user requests transaction details, a check is made on whether the database already has the required data, and if yes provide the data to frontend via socketing. If not, a request to the sochain api is made.

Many unnecessary data is returned with these apis; this app would have benefitted a lot from GraphQL.

User to have the possibility input own address and get the respective data about transactions.

The splash screen should also be show when the 'Get Data' button is pressed.

Screen size used for media querying should have been stored in one file and accessed as required.

Redux would not be overkill for an app like this; it would have facilitated some development.

Some Jest testing would have been beneficial.
