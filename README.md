# 🦄 Unicorn - taking my programming skills to the moon

## 📝 Description

"Unicorn" is the project that aims to take my programming skills to the moon 🚀

## 🧭 Navigation

- [🖇️ Installation](#installation)
- [⛲ Features](#features)
- [🧪 Tests](#tests)
- [🌾 Seeders](#seeders)
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

coming soon

## Tests

coming soon

```yarn
yarn test
```

## Seeders

coming soon

## Environment-variables

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

#### ⚒️ Development

```json
"dev": "NODE_ENV=development ts-node-dev --respawn --transpile-only src/index.ts"
```

```json
"cleanupdev": "NODE_ENV=development ts-node src/prisma/cleanup/cleanUpDev.ts",
```

#### 🛢️ Prisma

```json
"gen": "prisma generate",
```

```json
"push": "prisma db push",
```

```json
"studio": "prisma studio",
```

```json
"migrate": "prisma migrate dev",
```

```json
"format": "prisma format",
```

#### 🧪 Tests

```json
"inboxtest": "ts-node src/tests/helpers/inboxTest.ts",
```

```json
"test": "NODE_ENV=test jest --detectOpenHandles --runInBand && NODE_ENV=test FORCE_LOG=true ts-node src/prisma/cleanup/cleanUpAfterTests.ts",
```

```json
"cleanup": "NODE_ENV=test FORCE_LOG=true ts-node src/prisma/cleanup/cleanUpAfterTests.ts",
```

#### 🌾 Seeders

```json
"seeddev": "NODE_ENV=development ts-node src/prisma/seed/main.seed.ts",
```

```json
"seedtest": "NODE_ENV=test FORCE_LOG=true ts-node src/prisma/seed/main.seed.ts"
```

## Credits

One man army - [DevKica](https://github.com/DevKica)
