import Ember from 'ember';

export default Ember.Route.extend({
  renderTemplate() {
    this.render('outlet-grid/index');
    this.render('outlet-grid/outlet', {
      into: 'outlet-grid/index',
      outlet: 'second-grid',
    });
  }
});
