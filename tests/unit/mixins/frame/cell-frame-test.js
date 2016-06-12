import Ember from 'ember';
import FrameCellFrameMixin from 'ember-cli-smart-tv/mixins/frame/cell-frame';
import { module, test } from 'qunit';

module('Unit | Mixin | frame/cell frame');

// Replace this with your real tests.
test('it works', function(assert) {
  let FrameCellFrameObject = Ember.Object.extend(FrameCellFrameMixin);
  let subject = FrameCellFrameObject.create();
  assert.ok(subject);
});
