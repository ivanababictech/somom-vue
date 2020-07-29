import { http } from '@/plugins/http/index';
import { getData } from '@/utils/get';

/**
 * Get reference-letters
 */
export const get = () => http.get('settings/reference-letters')
    .then(getData);

/**
 * Create new reference-letter
 */
export const save = (form) => http.post('settings/reference-letters', form);