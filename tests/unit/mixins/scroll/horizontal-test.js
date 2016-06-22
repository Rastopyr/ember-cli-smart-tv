import Ember from 'ember';
import ScrollHorizontalMixin from 'ember-cli-smart-tv/mixins/scroll/horizontal';
import { module, test } from 'qunit';

module('Unit | Mixin | scroll/horizontal');

// Replace this with your real tests.
test('it works', function(assert) {
  let ScrollHorizontalObject = Ember.Object.extend(ScrollHorizontalMixin);
  let subject = ScrollHorizontalObject.create();
  assert.ok(subject);
});
