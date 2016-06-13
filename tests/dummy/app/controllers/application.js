import Ember from 'ember';

function * myGen() {
  yield 1;
  yield 2;
  yield 3;
}

export default Ember.Controller.extend({
  foo: Ember.computed(function() {
    let str = "";
    let iter = myGen();
    str += iter.next().value;
    str += iter.next().value;
    str += iter.next().value;
    return str;
  })
});

