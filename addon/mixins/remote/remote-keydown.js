
import Ember from 'ember';
import ControlEvent from './control-event';

const { Promise } = Ember.RSVP;

export default Ember.Mixin.create(ControlEvent, {
  bindKeys: [],

  initializeEvents: Ember.on('init', function() {
    const keys = this.get('bindKeys');

    keys.forEach((key) => {
      const defPredicates = [()=> true];

      const predicates = (
        (key.predicate ?
          [key.predicate] : key.predicates) || defPredicates
      ).map(p => {
        if ('string' === typeof p) {
          return this[p];
        }

        return p;
      });

      const predicate = ()=> {
        return Ember.A(
          predicates
        ).reduce((seq, predicate) => {
          return seq.then(()=> predicate.call(this));
        }, Promise.resolve());
      };

      const handlers = (key.handler ?
        [key.handler] : key.handlers.filter((h) => h)) || [];

      const handler = () => {
        return Ember.A(
          handlers
        ).reduce((seq, hName) => {
          const handler = this[hName];

          return seq.then(() => handler.call(this));
        }, Promise.resolve());
      };

      this.bindRemoteEvent(key, predicate, handler);
    });
  }),

  bindRemoteEvent(key, predicate, handler) {
    this.on('keydown', (e) => {
      if (key.code !== e.code) {
        return;
      }

      predicate().then((allow) => {
        if (!allow) {
          return false;
        }

        handler(this);
      });
    });
  }
});
