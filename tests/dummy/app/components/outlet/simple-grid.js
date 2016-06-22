import Ember from 'ember';
import layout from '../../templates/components/outlet/simple-grid';

import WindowFrame from 'ember-cli-smart-tv/components/frame/window-frame';

const { on } = Ember;

export default WindowFrame.extend({
  layout,

  name: 'simple-grid',

  initWindow: on('didRegisterWindow', function() {
    this.get('frameService').activateWindow(this);
  })
});
