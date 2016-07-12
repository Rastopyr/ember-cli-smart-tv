
import Ember from 'ember';
import RowMixin from 'ember-cli-smart-tv/mixins/frame/row-frame';
import KeyCodes from 'ember-cli-smart-tv/services/env/keycodes';
import RemoteKeydownMixin from 'ember-cli-smart-tv/mixins/remote/remote-keydown';

const { LinkComponent, $ } = Ember;

export default LinkComponent.extend(RowMixin, RemoteKeydownMixin, {
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
