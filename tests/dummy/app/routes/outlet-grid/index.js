import Ember from 'ember';

const { inject } = Ember;

export default Ember.Route.extend({
  frame: inject.service(),

  activate() {
    this.get('frame').activateWindowByName('simple-grid');
  }
});
