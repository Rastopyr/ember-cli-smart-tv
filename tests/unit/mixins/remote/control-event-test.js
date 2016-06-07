import Ember from 'ember';
import RemoteControlEventMixin from 'ember-cli-smart-tv/mixins/remote/control-event';
import { module, test } from 'qunit';

module('Unit | Mixin | remote/control event', {
  needs: ['service:env/keydown']
});

// Replace this with your real tests.
test('it works', function(assert) {
  let RemoteControlEventObject = Ember.Object.extend(
    RemoteControlEventMixin, {
      envService: Ember.Service.extend(Ember.Evented).create()
    }
  );
  let subject = RemoteControlEventObject.create();
  assert.ok(subject);
});
