import { print_icon as pi } from '@massimo-cassandro/js-utilities';
import {version} from '../../package.json' assert { type: 'json' };

export function print_icon(opts) {

  return pi({...opts, ...{icon_file: './icons.svg?v=' + version}});
}
