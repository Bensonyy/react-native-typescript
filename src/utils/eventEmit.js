import smokesignals from './smokesignals';
class EventEmit {
  constructor() {
    smokesignals.convert(this);
  }
}
const EE = new EventEmit();

export default EE;
