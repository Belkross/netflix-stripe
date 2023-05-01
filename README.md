# Netflix Stripe

This project allow a user to subscribe for a monthly payment with Stripe under the hood.

# Features

- Create a Stripe customer with a provided email
- Allow the user to pick an billing plan
- Create the invoice of a monthly subscription
- Payment with a credit card

# Deployment

To begin, you need a Stripe account and to get your Stripe’s API test keys. More informations here:
https://stripe.com/docs/keys

1. Provide your Stripe’s secret API key in ./apps/back-end/.env
2. Provide your Stripe’s public API key in ./apps/front-end/.env
3. pnpm install
4. pnpm run dev

# Important

If you want to test a valid credit card number, use this one: 4242 4242 4242 4242

# Built with

- [Typescript](https://www.typescriptlang.org/) - Javascript language superset
- [Node](https://nodejs.org/en/) - server environment
- [Express](https://expressjs.com/) - Node.js framework
- [Stripe](https://stripe.com/docs) - payment platform
- [React](https://en.reactjs.org/) - user interface Javascript library
