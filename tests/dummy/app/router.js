import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('without');
  this.route('simple-grid');
  this.route('outlet-grid', function() {
    this.route('outlet');
  });
  this.route('scroll-grid');
});

export default Router;
