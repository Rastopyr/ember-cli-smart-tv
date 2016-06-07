
import Ember from 'ember';
import Codes from './keycodes';

export default Ember.Service.extend(Ember.Evented, {
  bindKeyDown: Ember.on('init', function() {
    document.addEventListener('keydown', (e) => {
      if (!Codes[e.keyCode]) { return; }

      e.preventDefault();

      this.trigger('keydown', {
        code: Codes[e.keyCode],
      });
    });
  }),
});
