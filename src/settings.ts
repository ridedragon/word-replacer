import { saveSettingsDebounced } from '@sillytavern/script';
import { extension_settings } from '@sillytavern/scripts/extensions';

import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import * as z from 'zod';

type Settings = z.infer<typeof Settings>;
const Settings = z.object({
  button_selected: z.boolean().default(false),
});

export const use_settings_store = defineStore('settings', () => {
  const settings = ref(Settings.parse(_.get(extension_settings, 'tavern_extension_template', {})));

  watch(
    settings,
    new_settings => {
      _.set(extension_settings, 'tavern_extension_template', _.cloneDeep(new_settings)); // 用 structuredClone 去除 proxy 层
      saveSettingsDebounced();
    },
    { immediate: true, deep: true },
  );
  return {
    settings,
  };
});
