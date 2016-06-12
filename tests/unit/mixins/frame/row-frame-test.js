import Ember from 'ember';
import FrameRowFrameMixin from 'ember-cli-smart-tv/mixins/frame/row-frame';
import { module, test } from 'qunit';

module('Unit | Mixin | frame/row frame');

// Replace this with your real tests.
test('it works', function(assert) {
  let FrameRowFrameObject = Ember.Object.extend(FrameRowFrameMixin);
  let subject = FrameRowFrameObject.create();
  assert.ok(subject);
});
