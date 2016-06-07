import Ember from 'ember';
import RemoteRemoteKeydownMixin from 'ember-cli-smart-tv/mixins/remote/remote-keydown';
import { module, test } from 'qunit';

module('Unit | Mixin | remote/remote keydown', {
  needs: ['service:env/keydown']
});

// Replace this with your real tests.
test('it works', function(assert) {
  let RemoteRemoteKeydownObject = Ember.Object.extend(
    RemoteRemoteKeydownMixin, {
      envService: Ember.Service.extend(Ember.Evented).create()
    }
  );
  let subject = RemoteRemoteKeydownObject.create();
  assert.ok(subject);
});
