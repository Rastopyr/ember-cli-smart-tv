import Ember from 'ember';
import FrameParentMixin from 'ember-cli-smart-tv/mixins/frame/parent';
import { module, test } from 'qunit';

module('Integration | Mixin | frame/parent', {
  integration: true,
  needs: [
    'component:frame/cell-frame',
    'component:frame/row-frame',
    'component:frame/window-frame'
  ]
});

// Replace this with your real tests.
test('it works', function(assert) {
  let FrameParentObject = Ember.Object.extend(FrameParentMixin);
  let subject = FrameParentObject.create();

  assert.ok(subject);
});
