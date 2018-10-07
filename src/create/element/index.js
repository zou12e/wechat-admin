import button from './button';
import cascader from './cascader';
import checkbox from './checkbox';
import dateRange from './date-range';
import time from './time';
import input from './input';
import number from './number';
import radio from './radio';
import select from './select';
import cswitch from './switch';
import upload from './upload';
import text from './text';
import actionList from './action-list';
import tag from './tag';
import tinymce from './tinymce';
import img from './img';
import imgs from './imgs';

const elementMap = {};

export function use (name, createFunc) {
  elementMap[name] = createFunc;
}

use('button', button);
use('cascader', cascader);
use('checkbox', checkbox);
use('date-range', dateRange);
use('time', time);
use('input', input);
use('number', number);
use('radio', radio);
use('select', select);
use('switch', cswitch);
use('upload-image', upload);
use('text', text);
use('action-list', actionList);
use('tag', tag);
use('tinymce', tinymce);
use('img', img);
use('imgs', imgs);

export default function (h, item, model) {
  if (typeof item.render === 'function') return item.render.call(this, h, item, model);
  const name = item.type || 'input';
  if (!elementMap[name]) return;
  return elementMap[name].call(this, h, item, model);
};
