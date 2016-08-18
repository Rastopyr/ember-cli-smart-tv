import Ember from 'ember';
import layout from '../templates/components/grid-action';

export default Ember.Component.extend({
  layout,


  actions: {
    alertHello(name) {
      alert(`Hello, ${name}`);
    }
  }

});
