import { notice, error } from '@pnotify/core';
import { defaults } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/Material.css';
import 'material-design-icons/iconfont/material-icons.css';
defaults.styling = 'material';
defaults.icons = 'material';

function myNotice() {
 notice({
  text: 'Enter something!',
  delay: 2500,
 });
}

function myError() {
 error({
  text: 'Nothing found for your query',
  delay: 2500,
 });
}
export { myNotice, myError };
