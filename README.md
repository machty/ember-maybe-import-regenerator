# ember-maybe-import-regenerator

> Uncaught TypeError: regeneratorRuntime is not a function

It is now.

This is an addon that'll import the
[Regenerator](https://github.com/facebook/regenerator)
Runtime in your Ember app, but only if you didn't already set
`babel.includePolyfill` to true. This is useful for:

1. Apps that want to use ES6 generator functions (including `async/await`) but don't want to
   import the large ~30kb (gzipped) Babel polyfill. This package adds ~2kb (gzipped).
2. Addons that depend on generator functions (or other addons
   that depend on generator functions) but don't want to
   force users to have to add `babel.includePolyfill: true` to
   their config files (like ember-concurrency, ember-power-select), but
   shouldn't double import regenerator-runtime if the user already
   has `includePolyfill: true`


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.12 or above
* Ember CLI v2.13 or above
* Node.js v10 or above


Installation
------------------------------------------------------------------------------

```
ember install my-addon
```


Usage
------------------------------------------------------------------------------

[Longer description of how to use the addon in apps.]


Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
