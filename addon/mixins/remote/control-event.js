import Ember from 'ember';

export default Ember.Mixin.create(Ember.Evented, {
  envService: Ember.inject.service('env/keydown'),

  envKeys: [],

  triggerEvent: function(e) {
    this.trigger('keydown', e);
  },

  activateHandler: Ember.on('init', function() {
    this.get('envService').on('keydown', this, this.triggerEvent);
  }),

  willDestroy() {
    this.get('envService').off('keydown', this, this.triggerEvent);
  },
});
