
import Ember from 'ember';
import Codes from './keycodes';

export default Ember.Service.extend(Ember.Evented, {
  bindKeyDown: function() {
    document.addEventListener('keydown', (e) => {
      if (!Codes[e.keyCode]) { return; }

      this.trigger('keydown', {
        code: Codes[e.keyCode],
      });
    });
  }.on('init'),
});
