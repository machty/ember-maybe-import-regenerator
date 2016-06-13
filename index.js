/* jshint node: true */
'use strict';

var path = require('path');
var mergeTrees = require('broccoli-merge-trees');
var Funnel = require('broccoli-funnel');

module.exports = {
  name: 'ember-maybe-import-regenerator',

  included: function(app) {
    this._super.included.apply(this, arguments);

    let hostApp = this._findApp(app);
    this._regeneratorAlreadyIncluded =
      hostApp.options &&
      hostApp.options.babel &&
      hostApp.options.babel.includePolyfill;

    if (!this._regeneratorAlreadyIncluded) {
      hostApp.import('vendor/regenerator-runtime/runtime.js', {
        prepend: true
      });
    }
  },

  treeForVendor: function(tree){
    if (this._regeneratorAlreadyIncluded) {
      return tree;
    }

    var regeneratorRuntimePath = path.dirname(require.resolve('regenerator-runtime'));
    var regeneratorRuntimeTree = new Funnel(this.treeGenerator(regeneratorRuntimePath), {
      srcDir: '/',
      destDir: 'regenerator-runtime'
    });

    return mergeTrees([tree, regeneratorRuntimeTree]);
  },

  _findApp: function(hostApp) {
    var app = this.app || hostApp;
    while (app.app) {
      app = app.app;
    }

    return app;
  }
};
