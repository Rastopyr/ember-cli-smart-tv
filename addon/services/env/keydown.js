
import Ember from 'ember';
// import Config from 'ember-cli-smart-tv/config/environment';

export default Ember.Service.extend(Ember.Evented, {
  // envService: Ember.inject.service(`env/${Config.platform || 'tizen'}/keydown`),
  envService: Ember.inject.service('env/tizen/keydown'),

  triggerKeyDown: Ember.on('init', function () {
    this.get('envService').on('keydown', e => this.trigger('keydown', e));
  }),
});
