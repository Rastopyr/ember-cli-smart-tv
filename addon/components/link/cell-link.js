
import Ember from 'ember';
import CellMixin from 'ember-cli-smart-tv/mixins/frame/cell-frame';
import KeyCodes from 'ember-cli-smart-tv/services/env/keycodes';
import RemoteKeydownMixin from 'ember-cli-smart-tv/mixins/remote/remote-keydown';

const { LinkComponent, $ } = Ember;

export default LinkComponent.extend(CellMixin, RemoteKeydownMixin, {
  tagName: 'a',

  bindKeys: [
    {
      code: KeyCodes.KEY_ENTER,
      predicates: ['isInHover'],
      handlers: ['linkTransition'],
    },
  ],

  linkTransition() {
    $(this.element).click();
  }
});
