
import Ember from 'ember';
import Codes, { keyNames } from './keycodes';

export default Ember.Service.extend(Ember.Evented, {
  bindKeyDown: Ember.on('init', function() {
    if (window.tizen) {
      keyNames.forEach(function(keyCode) {
        window.tizen.tvinputdevice.registerKey(keyCode);
      });
    }

    document.addEventListener('keydown', (e) => {
      if (!Codes[e.keyCode]) { return; }

      e.preventDefault();

      this.trigger('keydown', {
        code: Codes[e.keyCode],
      });
    });
  }),
});
