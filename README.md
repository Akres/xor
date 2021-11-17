#XOR: A currency converter

This is a demonstration project only.

## Development
For instructions on how to build and run the repo locally, refer to the
Running the app section.
Development workflow is then
1. Develop your code in a separate branch
2. Commit all changes
3. Run `yarn merge` command (described in `cli` section).

## Repo structure
The repo uses [Yarn workspaces](https://yarnpkg.com/features/workspaces) and
[Lerna](https://github.com/lerna/lerna) to split code into multiple
independently versioned packages. All packages in this repo use the `@xor`
scope.
### `cli`
Contains command line interface for automating development. It contains
commands for
* commit linting
* package versioning
* merging (this emulates a CI job)

#### `merge` command
The main command in CLI is `merge`. When invoked, it:
1. Runs a `verify` script, which verifies that there are no changes to 
   tracked files, that commits and the code follow linting rules, that 
   the repo can be built
2. Checks out `master` branch
3. Merges the specified branch to `master`
4. Creates a versioning commit using `lerna`

The command can either be run like
```shell
yarn xor merge
```
which will merge the current branch into master, or
```shell
yarn xor merge -b <branch>
```
which will merge the specified branch into master.
Neither can merge master to master, the command will end with an error if
such a situation is encountered.

There is a shortcut script in the root `package.json`, so that merging the 
current branch into master is done simply by running
```shell
yarn merge
```

### `configuration`
Contains shareable configuration packages for 
[ESLint](https://eslint.org/docs/developer-guide/shareable-configs), 
[TypeScript](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) 
and [commitlint](https://commitlint.js.org/#/reference-configuration?id=shareable-configuration).

## `common`
Contains application packages (i.e. not tooling configs etc.), that are 
common to both UI and API. 
### `xor-api-schema`
Houses a schema for data exchange between UI and API.
It utilizes [quicktype](https://quicktype.io/) to generate TypeScript
interfaces and JSON serializers and parsers for them. The generation
is run as part of the build of this package, and the result is committed, so 
if there are any changes in the schema, the generated files will be dirty
and the `merge` script will not allow merging to master.

## `frontend`
Contains the browser UI for the app. It uses React for rendering and Redux
for state management. The UI can be run in two modes: Live and Mock.

In live mode, the app communicates with the API normally, so this is the
way to run the app in production or when developing the API.

In mock mode, the app does no requests to API whatsoever. All the requests have
mocked responses, and they are defined in `xor-adapters-mock`. This is the mode
to run the app in when developing the UI.
### `xor-ui`
Contains the actual React classes and the state management. This package is
completely agnostic of whether it runs in live or mock mode. 
### `xor-adapters-mock`
This is a package that serves as the mocked API in mock mode. All mock data is
saved here and is returned to the UI on demand.
### `xor-adapters-live`
Contains the actual implementation of the requests to API
### `xor-domain`
This is a package that binds `ui` and `adapters`. It contains definition of
data and other classes, that an adapter must conform to, so that it can be
plugged into `ui`. For all intents and purposes, it defines the interface of
an adapter. 

If we had unit tests in the repo, we would create a `xor-adapters-test` package,
which would contain (probably) Jest mock implementations of the adapter
interface, so that we could tailor the data to suit our tests. Adapters are 
the same idea as clients in API.

### `hosts`
This folder contains packages, that can be actually executed. `live-xor-ui`
for live mode and `mock-xor-ui` for mock mode.
They both contain webpack with configurations for transforming the compiled TS libraries
to JS and CSS bundles, and boilerplate code for serving them along with other
assets, such as static css ([Bootstrap](https://getbootstrap.com/)) and base 
HTML page. It also contains code for mounting the app, creating the redux 
store etc.

## `api`
Contains the backend of the app. It is mostly an orchestration layer that 
communicates with external services for exchange rates and stats.

### `clients`
Contains clients, which are the thinnest possible abstractions of the 
external services APIs. These are the same idea asi adapters in UI.
#### `xor-client-mock`
Mock client for exchange rates. Doesn't do any actual requests, just returns
predefined data with a validity of 10s.
#### `xor-client-openexchangerates`
A client for [Openexchangerates](https://openexchangerates.org)
#### `xor-client-domain`
Defines data types and general interface for an exchange rates client. Any
client must conform to this interface if it is to be used in the API.
### `hosts`
This is the same thing as `hosts` in UI. It contains packages, that can 
actually be executed `mock-xor-api` for mock mode and `live-xor-api` for 
live mode. In mock mode, the api does not communicate with the external
services at all, and it just returns a predefined data, that is stored 
in mock client. In live mode, all requests to external services are actually
executed.
### `xor-api`
Contains the API runtime. It uses whatever client it gets and runs the 
api server, using [Express](https://expressjs.com/).
### `xor-cache`
Contains a cache for the exchange rates. Implemented because there is a limited
amount of requests per month with the free accounts on all exchange rates
services.

## Running the app
The repo is meant to be developed on Mac. It should work on Linux and Windows
also, but is definitely not optimized for that.

### Prerequisites
* [nvm](https://github.com/nvm-sh/nvm)
  * In case you are using Homebrew: `brew install nvm`
* [Yarn](https://yarnpkg.com/) 
  * In case you are using Homebrew: `brew install yarn`
  * The project contains its own version of Yarn in `.yarn` folder, but 
    it needs a globally installed version to know how to run it.
    
### Installation
If you haven't run NVM before, run
```shell
nvm install
nvm use
```
in the root repo. NVM will pick up the `.nvmrc` file and install and set up 
the correct version of `npm`.
Then just run 
```shell
yarn install
``` 
in the root folder.

### Running the UI
After installation, running the UI is a simple matter of executing either
```shell
yarn mock:ui:start
```
to start the UI in mock mode, or
```shell
yarn live:ui:start
```
to start it in Live mode. In either case, the app will be available on
http://localhost:3000.

### Running the API
It is the same story as UI
```shell
yarn mock:api:start
```
to start in mock mode, or
```shell
yarn live:api:start
```
to start in live mode. The API will be available on http://localhost:3333

So far, the API does not have live mode implemented. There will be additional 
configuration needed for API keys and like.

## What should be here, if it was a production app
* Tests, tests, tests
* Translations
* Accessibility
* Logging
* Error handling - not leaking implementation details to user in case
  of production app
* Deployment
