'use strict';

const angular  = require('angular');
const bulk     = require('bulk-require');

module.exports = angular.module('utils.notification', []);

bulk(__dirname, ['./**/!(*.module|*.spec).js']);
