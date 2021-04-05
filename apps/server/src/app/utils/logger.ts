import { Service } from 'typedi';
import { log as tmpLogger } from './helper';

@Service()
export class Logger {
  log(...args: any[]) {
    tmpLogger('');

    console.log(...args);

    tmpLogger('');
  }
}
