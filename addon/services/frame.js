
import Ember from 'ember';

export default Ember.Service.extend(Ember.Evented, {
  activeWindow: null,

  activeRow: Ember.computed.equal('activeWindow.activeRow'),

  activeCell: Ember.computed.equal('activeRow.activeCell'),

  regitserWindow: Ember.on('registerWindow', function(wind) {
    this.set('activeWindow', wind);
  }),
});
