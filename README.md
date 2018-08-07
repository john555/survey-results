# Survey results

This project is meant for visualizing survey results.

## Installation.

### Installation requirements.
- [Nodejs](https://nodejs.org/en/download/) (Use the latest stable version).
- [Yarn](https://yarnpkg.com/en/docs/install) or npm.

### Clone the repo.
Open a terminal and run the following command.
```
git clone https://github.com/john555/survey-results.git
cd survey-results
yarn install
```

### Add the following raw files to the `survey-data/` folder in the root directory.
- `summary.json`
- `survey_questions.json`
- `survey_responses.json`
- `skipt.txt`
- `merge.txt`

### Generate data.
```
yarn generate
```

### Generate login password.
Run:
```
yarn make:password '<password>'
```
You __MUST__ enclose the password with double or single quotes.

### Start the authentication server.
```
NODE_ENV=<development|production> SECRET=<secret-key> yarn start:auth
```

### Start the server.
```
yarn start
```

### How to test.

```
yarn test
```
