import smokesignals from './smokesignals';

class EventEmit {
  on: (type: string, handler: (args?: any) => any) => any;
  once: (type: string, handler: (args?: any) => any) => any;
  off: (type: string, handler: (args?: any) => any) => any;
  emit: (type: string, args?: any) => any;

  constructor() {
    smokesignals.convert(this);
  }
}
const EE = new EventEmit();

export default EE;
