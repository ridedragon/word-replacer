import panel from './panel.vue';

import { createPinia } from 'pinia';
import { createApp } from 'vue';

const app = createApp(panel);
const $app = $('<div>').attr('id', 'extension_example');

$(() => {
  $('#extensions_settings2').append($app);
  app.use(createPinia()).mount($app[0]);
});

$(window).on('pagehide', () => {
  app.unmount();
  $app.remove();
});
