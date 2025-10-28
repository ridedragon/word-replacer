import { setting_field, Settings } from '@/type/settings';
import { validateInplace } from '@/util/zod';
import { saveSettingsDebounced } from '@sillytavern/script';
import { extension_settings } from '@sillytavern/scripts/extensions';

export const useSettingsStore = defineStore('settings', () => {
  const settings = ref(validateInplace(Settings, _.get(extension_settings, setting_field)));

  watch(
    settings,
    new_settings => {
<<<<<<< HEAD
      _.set(extension_settings, setting_field, toRaw(new_settings)); // 用 toRaw 去除 proxy 层
=======
      _.set(extension_settings, setting_field, klona(new_settings)); // 用 klona 克隆对象从而去除 proxy 层
>>>>>>> a43a11fc32059f8004772b87bc37b14f41d7b576
      saveSettingsDebounced();
    },
    { deep: true },
  );
  return {
    settings,
  };
});
