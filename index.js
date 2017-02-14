/* jshint node: true */
'use strict';

var path = require('path');
var mergeTrees = require('broccoli-merge-trees');
var Funnel = require('broccoli-funnel');
var babelPresetEnv = require('babel-preset-env');
let plugins = require(path.relative('.', path.join(path.resolve('babel-preset-env'), 'data', 'plugins.json')));
let regeneratorSupportMatrix = plugins['transform-regenerator'];

module.exports = {
  name: 'ember-maybe-import-regenerator',

  included(app) {
    this._super.included.apply(this, arguments);

    var hostApp = this._findApp(app);
    this._regeneratorAlreadyIncluded =
      hostApp.__ember_maybe_import_regenerator_included ||
      hostApp.options &&
      hostApp.options.babel &&
      hostApp.options.babel.includePolyfill;

    hostApp.__ember_maybe_import_regenerator_included = true;

    if (this._regeneratorAlreadyIncluded) {
      return;
    }

    let targetsSupportGenerators = false;
    if (hostApp.project.targets) {
      targetsSupportGenerators = babelPresetEnv.isPluginRequired(hostApp.project.targets, regeneratorSupportMatrix)
    }

    if (targetsSupportGenerators) {
      return;
    }

    hostApp.import('vendor/regenerator-runtime/runtime.js', {
      prepend: true
    });
  },

  treeForVendor() {
    var regeneratorRuntimePath = path.dirname(require.resolve('regenerator-runtime'));
    return new Funnel(this.treeGenerator(regeneratorRuntimePath), {
      srcDir: '/',
      destDir: 'regenerator-runtime'
    });
  },

  _findApp(hostApp) {
    var app = this.app || hostApp;
    var parent = this.parent;
    while (parent.parent) {
      if (parent.app) {
        app = parent.app;
        break;
      }

      parent = parent.parent;
    }
    return app;
  }
};
