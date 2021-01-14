# compare-gh-webhook-to-schema-function

Azure function that compares gh webhook payloads against their schema.

## Usage

This project is deployed as an azure function using serverless, and can be found
[here](https://sls-ause-dev-gh-webhooks-schema-checker.azurewebsites.net/api/github).

Alternatively you can deploy your own instance of this function to Azure - to do
this, follow the steps
[here](https://www.serverless.com/framework/docs/providers/azure/guide/credentials/)
to set up credentials, and then run `sls deploy`.

Create a new webhook in GitHub by following the steps in the
[docs](https://docs.github.com/en/free-pro-team@latest/developers/webhooks-and-events/creating-webhooks),
using the url of the azure function.

(The secret value is currently a secret - you can contact me on Github if you
wish to know it)

When an event triggers the webhook, the function will validate the event against
the appropriate json schemas, and returns the results of the validation as its
response.

You can review these results in webhook's management page on GitHub, in the
"Recent Deliveries" section.

## Contributing

### Typechecking

This project is powered by TypeScript, with the types for the event handlers
provided by `@azure/functions`.

You can type-check your project using the `typecheck` script:

    npm run typecheck

Compiling is done using the `build` command:

    npm run build

This command is run by serverless (via `serverless-plugin-scripts`) before
packaging or deploying due to custom configuration that can be found in the
`serverless.yml` file.

### Linting

Linting is powered by `eslint` with `prettier` and eslint config sourced from
`eslint-config-ackam`.

You can perform linting on your project using the `lint` script:

    npm run lint

You can have `eslint` apply fixes where possible by passing `--fix`:

    npm run lint -- --fix

You can run `prettier` on files not checked by `eslint` (such as `md` and `yml`
files) using the `format` script:

    npm run format

You can have `prettier` just report if any files need formatting by passing
`--check`:

    npm run format --check

This can be useful for CI, to ensure docs & `serverless.yml` remain well
formatted.

### Testing

Testing is powered by `jest` and can run with the `test` script:

    npm run test # or just npm test

You can get coverage information by passing `--coverage`:

    npm run test -- --coverage

Testing related code lives in the `test` directory, with the specs for specific
files living in `test/src`. Ideally this folder should mirror `src` to make it
easy to look up tests for particular files.

Other code-related tests, like setup scripts, fixtures, and functions for
building common objects, should live within the `test` directory outside of
`test/src`.

### Schemas

The schemas used by this repo are copied from `@octokit/webhooks-definitions`,
and can be updated by running the `copy-schemas` script:

    npm run copy-schemas

The types for these schemas can be updated with the `generate-types` script:

    npm run generate-types

### Deploying

Deployments are done using the serverless cli, like so:

    sls deploy --stage <stage>

Currently, deployments are done manually but ideally will be moved to CI at some
point.
