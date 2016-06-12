import Ember from 'ember';
import FrameWindowFrameMixin from 'ember-cli-smart-tv/mixins/frame/window-frame';
import { module, test } from 'qunit';

module('Unit | Mixin | frame/window frame');

// Replace this with your real tests.
test('it works', function(assert) {
  let FrameWindowFrameObject = Ember.Object.extend(FrameWindowFrameMixin);
  let subject = FrameWindowFrameObject.create();
  assert.ok(subject);
});
