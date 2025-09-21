import { Settings } from '@/type/settings';
import { validateInplace } from '@/util/zod';
import { saveSettingsDebounced } from '@sillytavern/script';
import { extension_settings } from '@sillytavern/scripts/extensions';

const setting_field = 'tavern_extension_example';

export const useSettingsStore = defineStore('settings', () => {
  const settings = ref(validateInplace(Settings, _.get(extension_settings, setting_field)));

  watch(
    settings,
    new_settings => {
      _.set(extension_settings, setting_field, toRaw(new_settings)); // 用 toRaw 去除 proxy 层
      saveSettingsDebounced();
    },
    { deep: true },
  );
  return {
    settings,
  };
});
