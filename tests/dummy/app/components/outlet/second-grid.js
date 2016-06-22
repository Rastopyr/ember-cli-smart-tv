import Ember from 'ember';
import layout from '../../templates/components/outlet/second-grid';

import WindowFrame from 'ember-cli-smart-tv/components/frame/window-frame';

const { on } = Ember;

export default WindowFrame.extend({
  layout,

  classNames: ['outlet-window'],

  name: 'second-grid',

  initWindow: on('didRegisterWindow', function() {
    this.get('frameService').activateWindow(this);
  })
});
