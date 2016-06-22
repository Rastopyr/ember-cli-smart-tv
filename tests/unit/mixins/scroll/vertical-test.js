import Ember from 'ember';
import ScrollVerticalMixin from 'ember-cli-smart-tv/mixins/scroll/vertical';
import { module, test } from 'qunit';

module('Unit | Mixin | scroll/vertical');

// Replace this with your real tests.
test('it works', function(assert) {
  let ScrollVerticalObject = Ember.Object.extend(ScrollVerticalMixin);
  let subject = ScrollVerticalObject.create();
  assert.ok(subject);
});
