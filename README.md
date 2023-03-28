This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

1 - Ask Rolando for `aws-exports.ts` file to then be added inside the `src` folder
2- Add the amplify cli `npm install -g @aws-amplify/cli`
2- Run `npm i` or `yarn`
3 - Run
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Branch flow

1 - Create a branch from dev
2 - Name the branch with the ticket title
3 - Run `amplify pull` to grab any changes made by other from back end
3 - Once your work is ready, reabase agaist dev
4 - If there is no conflicts, push your changes
5 - Make a PR against the dev branch

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## AWS Amplify 

Docs [here](https://docs.amplify.aws/cli/)

To pull the dev env run `amplify pull --appId d3ke5sg4u6i26g --envName dev`

To check the amplify console, run `amplify console`, choose AWS console, this will open a page where you need to enter your login details

### Trouble shooting

Errors related to amplify mock, could possible be solve by deleting all mock files, then runnning `amplify mock` again

If the backend still pointing at the fake enviroment, running `amplify pull` could help solve the problem as well


### Schema

Everytime you update the schema, changes should be push to the service by runing `amplify push`, you might have to do `amplify pull` first

## Stripe

Fake card `4242 4242 4242 4242`
*For now stripe payments are disabled

## Create a user account

Create accounts with : https://10minemail.com/en/

## Creating different ENV

To add a new testing env, follow [this](https://docs.amplify.aws/cli/teams/overview/) and [this](https://docs.amplify.aws/cli/migration/override/)

## Mock data

To test the app with mock data, refer to [this](https://docs.amplify.aws/cli/usage/mock/#api-mocking-setup)


