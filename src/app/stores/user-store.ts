import { writable } from 'svelte/store';
import type { UserRecord } from 'firebase-admin/auth';

function createPersistentStore(key: string, startValue: UserRecord | null) {
  const storedValue = typeof window !== 'undefined' ? localStorage.getItem(key) : null;
  const initial = storedValue ? JSON.parse(storedValue) : startValue;

  const { subscribe, set, update } = writable<UserRecord | null>(initial);

  return {
    subscribe,
    set: (value: UserRecord | null) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value));
      }
      set(value);
    },
    update,
  };
}

export const user = createPersistentStore('user', null);