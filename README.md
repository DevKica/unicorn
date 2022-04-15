# 🦄 Unicorn - taking my programming skills to the moon

## 📝 Description

"Unicorn" is the project that aims to take my programming skills to the moon 🚀

Let's get to the real description of this project.
This app is mainly based on tinder logic (swiping, matching, messaging etc.)

If you don't know how tinder works, please familiarize yourself with this topic before reading further.

I thought it would be a good idea for the project, because tinder contains very interesting features such as:

- real time messaging
- matching and filtering users
- swiping
- premium accounts / time subscriptions

It may not seem like it, but the database architecture is really complicated and writing it from scratch was quite a challenge for me.

For detailed documentation of each feauture, please refer to the [features](#features) section.

## 🧭 Navigation

- [🖇️ Installation](#installation)
- [⛲ Features](#features)
- [🧪 Tests](#tests)
- [🌾 Seeders](#seeders)
- [💻 Developmnent](#development)
- [🍃 Environment variables](#environment-variables)
- [📜 Scripts](#scripts)
- [🤠 Credits](#credits)

## Installation

1. Install all yarn dependiencies included in `package.json`

   ```yarn
   yarn install
   ```

2. Configure the [environment variables](#environment-variables)

3. Run **Prisma** commands to handle DB staff `prisma migrate dev` && `prisma generate`, you can also use created [scripts](#scripts)

   > If you face any troubles while running above prisma's commands, just install prisma globally via:

   ```yarn
   yarn add global prisma
   ```

## Features

### NOT FINISHED YET

### 🚗 General

- Creating an account

- Log in
- Password change
  - User can change his password using his old password, new password and repeating it
- Email verification
  - Account is created with an unverified email, you can verify it by clicking on the link sent to the email linked to the account
- Email change

  - User can change his email address with a new e-mail (which is not already in the database) and his password (for security reasons)

  - After changing your email, you need to verify it

- Password reset

  - If you forgot your password don't worry, just enter your email address and the server will send you a link to reset your password

  - The link can of course be used once and is canceled in the event of a change of email address

- Log out

  - from the current sessions

  - from all sessions

- Deleting an account

  - password protected for security reasons

### 🔏 All of the following feautures are protected by active (with vefified email) user middleware

### 🚕 Core app logic

- User profile

  - access to **profile** info

  - update **general** info (name,city,description etc.)
  - update **matching** info (showMeGender, showMeAgeLowerLimit etc.)
  - upload up to **9 profile photos** (stored in 4 different sizes - large, medium, small ,thumbnail)

- Matching

  - The entire **matching process** is based on user preferences, there are **4 key factors** that **influence** which users you get to **match**

    - **ShowMeGender** - Male, Female, or All

    - **ShowMeAgeLowerLimit** and **ShowMeAgeUpperLimit** - based on birthday, filters users who are within a certain age range
    - **ShowMeDistance** - based on user current longitude and latitude, it filters out users that are no more than, for example, 30km away from the user

    - Whether you already **like/reject/match** with user (controlled by the likes and usersRelations tables)

- Swiping

  - **Default** like or **notInterested**

  - Create a new conversation when users have **liked** each other
  - Daily like **limit**

- Conversations

  - Rename

  - Delete the conversation (usersRelation type is set to "removed")

- Messaging

  - Text, photo, video and voice messages

  - Real time with socket.io

  - You can delete the message, but a trace of it remains (content of messase is set to "", and isDeleted property is set to true (default false)), inspired by messenger

### 🏎️ Premium accounts

- Account types

  - Silver
  - Gold
  - Black

- You can activate a premium account if you have a secret token and its ID

  - The token is hashed with the argon2 library so that in the event of a data leak, no one will be able to use it anyway (the same reason why you should hash passwords

  - ```json
      {
            id: "token1",
            token: "silverToken",
            daysOfValidity: 30,
            accountType: "silver",
        },
        {
            id: "token2",
            token: "goldToken",
            daysOfValidity: 30,
            accountType: "gold",
        },
    ```

## Tests

At this point there are **150 tests in total**

Run it with the following command (reference to the [script](#scripts))

```yarn
yarn test
```

Be sure to set up your [environment variables](#environment-variables) and database first

🗝️ Auth

- 🖥️ <a href="https://github.com/DevKica/unicorn/blob/main/server/src/tests/units/user.auth.test.ts">Source code</a>
- ⚗️ Tested features
  - Creating an account
  - Login
  - Password change
  - Email change
  - Email verification
  - Password reset
  - Logout
  - Deleting an account

🌋 WebSockets

- 🖥️ <a href="https://github.com/DevKica/unicorn/blob/main/server/src/tests/units/user.sockets.test.ts">Source code</a>
- ⚗️ Tested features
  - Socket.io authentication && authorization
  - Sending and receiving messages

🤼 Relations

- 🖥️ <a href="https://github.com/DevKica/unicorn/blob/main/server/src/tests/units/user.relations.test.ts">Source code</a>
- ⚗️ Tested features
  - Profile
    - Update
    - View users' photos
  - Matching
    - Proper filtering
    - Likes
    - Superlikes
    - Not interested
    - New pair
  - Messages
    - Text
    - Photos
    - Voice messages
    - Videos
    - Deleting
    - Access to files
  - Conversations
    - Deleting
    - Renaming
    - Proper filtering

💰 Premium Accounts

- 🖥️ <a href="https://github.com/DevKica/unicorn/blob/main/server/src/tests/units/user.premiumAccounts.test.ts">Source code</a>
- ⚗️ Tested features
  - Likes limit
  - Rewind last like
  - Superlikes / limitter
  - Silver, gold and black account protected routes

## Seeders

Currenly in my project you can find two **seed** files that I use mainly them for testing

🌾 **Main seed**

- 🖥️ <a href="https://github.com/DevKica/unicorn/blob/main/server/src/prisma/seed/main.seed.ts">Source code</a>
- 🌻 Data
  - 48 users
  - 5 likes
  - 4 conversations
  - 3 messages
  - 6 users relations
  - 4 premium account tokens

🌾 **Like limit seed**

- 🖥️ <a href="https://github.com/DevKica/unicorn/blob/main/server/src/prisma/seed/likesLimit.seed.ts">Source code</a>
- 🌿 The purpose of this seed is to reach the like limit (set in <a href="https://github.com/DevKica/unicorn/blob/main/server/src/validation/helpers/constants.ts">constants</a>) in order to test the premium account features
- 🌻 Data to seed
  - 2 likes
  - 5 users relations

## Development

The client side is currently being developed just to test and learn about websockets. However, it works very well and will certainly be developed further.

### [ 🌋 See websockets in action !!! ](https://youtu.be/wjArvnhrmd4)

---

🖱️ At the beginning, start the client

```yarn
yarn start
```

And you can log into 3 different accounts

![loginunicorn](https://user-images.githubusercontent.com/89777457/161689246-7bc05b1f-7c5c-425e-a206-8467eb6ef9ad.png)

After logging in, you will see the conversation page

![conversationsunicorn](https://user-images.githubusercontent.com/89777457/161690930-856fec1a-ce7b-4407-8478-5c388cda9ad6.png)

---

## Environment variables

#### 📟 Server:

```
PORT - port on which express server is running
ORIGIN - client hostname
```

#### 🛢️ Database

```
DATABASE_URL - url of the development database
TEST_DATABASE_URL - url of the test database
```

#### 🔐 Authentication && Authorization

```
MAIN_SECRET_TOKEN - token used to sign authentication tokens
ACCESS_TOKEN_TTL - access token time to live
REFRESH_TOKEN_TTL - refresh token time to live
MAX_AGE_TOKEN_COOKIE - cookie time to live, should be equal to REFRESH_TOKEN_TTL
```

#### 📧 Emails

<pre>
SERVER_SUPPORT_EMAIL - server support email address, used to send account verification, password reset emails etc. Must be compatible with the <a href="https://github.com/DevKica/unicorn/blob/main/server/src/config/email.config.ts">transporter</a> and <a href="https://github.com/DevKica/unicorn/blob/main/server/src/tests/helpers/testInbox.ts">inbox test</a>.
SERVER_SUPPORT_PASSWORD - password for server support email
</pre>

```
EMAIL_SECRET_TOKEN - token used to sign tokens included in email links
EMAIL_TOKEN_TTL - email token time to live
```

#### 🧪 Tests

<pre>
FORCE_LOG - by default while NODE_ENV is set to "test", <a href="https://github.com/DevKica/unicorn/blob/886cdeedd9a1e457673c69b68ddc2544a5b58d4b/server/src/utils/logger.ts">logger</a> is disabled. You can change this (set value to "true"), if you want to see logs during testing

TEST_EMAIL_ADDRESS - during testing, an account associated with this email is created, so the verification email is sent to it. Later I can check if everything was successful through <a href="https://github.com/DevKica/unicorn/blob/main/server/src/tests/helpers/inboxTest.ts">inbox test</a>

TEST_EMAIL_PASSWORD - password for test email 
</pre>

## Scripts

---

### 📠 Client

- Start the client
  ```json
    "start": "react-scripts start",
  ```

---

### 📠 Server

#### [💻 Developmnent](#development)

- Start the development server

  ```json
  "dev": "NODE_ENV=development ts-node-dev --respawn --transpile-only src/index.ts"
  ```

- Clean up development files and data

  ```json
  "cleanupdev": "NODE_ENV=development ts-node src/prisma/cleanup/cleanUpDev.ts",
  ```

#### 🛢️ Prisma

- Generate prisma client

  ```json
  "gen": "prisma generate",
  ```

- Synchronize your prisma schema with your database schema (can result in data loss)
  ```json
  "push": "prisma db push",
  ```
- Run prisma studio

  ```json
  "studio": "prisma studio",
  ```

- Create and apply migrations
  ```json
  "migrate": "prisma migrate dev",
  ```
- Format .prisma files
  ```json
  "format": "prisma format",
  ```

#### [🧪 Tests](#tests)

- Run inboxTest

  ```json
  "inboxtest": "ts-node src/tests/helpers/inboxTest.ts",
  ```

- Run all tests

  ```json
  "test": "NODE_ENV=test jest --detectOpenHandles --runInBand && NODE_ENV=test FORCE_LOG=true ts-node src/prisma/cleanup/cleanUpAfterTests.ts",
  ```

- Clean up files and test data ( includes inboxTest )
  ```json
  "cleanup": "NODE_ENV=test FORCE_LOG=true ts-node src/prisma/cleanup/cleanUpAfterTests.ts",
  ```

#### [🌾 Seeders](#seeders)

- Seed the development database

  ```json
  "seeddev": "NODE_ENV=development ts-node src/prisma/seed/main.seed.ts",
  ```

- Seed the test database

  ```json
  "seedtest": "NODE_ENV=test FORCE_LOG=true ts-node src/prisma/seed/main.seed.ts"
  ```

## Credits

One man army - [🎖️ DevKica](https://github.com/DevKica)
