# ember-maybe-import-regenerator

This is an addon that'll import the
[Regenerator](https://github.com/facebook/regenerator)
in your Ember app, but only if you didn't already set
`babel.includePolyfill` to true. This is useful for:

1. Apps that want to use ES6 generator functions but don't want to
   import the large Babel polyfill
2. Addons that depend on generator functions (or other addons
   that depend on generator functions) but don't want to
   force users to have to add `babel.includePolyfill: true` to
   their config files (like ember-concurrency, ember-power-select).

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).
