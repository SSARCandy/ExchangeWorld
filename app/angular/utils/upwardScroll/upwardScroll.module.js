"use strict";

const angular  = require('angular');
const bulk     = require('bulk-require');

module.exports = angular.module('utils.upwardScroll', []);

bulk(__dirname, ['./**/!(*.module|*.spec).js']);
