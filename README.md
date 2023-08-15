# The ATM App

It’s payday and there’s a new Pokémon game in town so Michael wants to buy a Switch.
It costs £270, and we’d like you to build an ATM web app he can use.
He will need to enter his PIN (​1111​) which you should check against our PIN API. The API will tell you his current
balance, which should then be shown on screen.
He’s going to make 3 withdrawals:

- £140
- £50
- £90

Unbeknownst to Michael, diggers keep stealing our ATMs so we aren’t carrying a lot of notes. The machine has:

- 4 x £5 notes
- 15 x £10 notes
- 7 x £20 notes

You should try to give a roughly even mix of notes when possible, and will have to take into account what to do when certain ones run out.
Your ATM allows an overdraft of up to £100 and should let users know if they do go overdrawn.

The PIN API
This is a simple endpoint to let you check a user’s PIN. You make a POST call to: `https://frontend->challenge.screencloud-michael.now.sh/api/pin/`

The request body should be of type `application/json` and look like:

```json
{
  "pin":"1111"
}
```

If all is good, the API will return with a 200 status, and a response like:

```json
{
  "currentBalance": 220
}
```

If you’ve coded your request wrong, you will get an error message to help you out, or a 403 error which says if the
PIN itself is wrong.

## Set up

```bash
cd atm-web-app
npm install
```

## Running the app

```bash
npm start
```

## Test suite

The tests are in `__tests__` folder for the `components`. It is using jest.
Test can be run by:

```bash
npx jest

or

npm test <test_file>
```

**Note**: I had a working test suite. For some reason I messed up with the jest config at last minute. Probably the test config won't be working as expected but I believe a clean `npm ci` should fix it.
