export function setStorageItem(key: string, item: string) {
  localStorage.setItem(key, JSON.stringify(item));
}

export function getStorageItem(key: string): string {
  return JSON.parse(localStorage.getItem(key) ?? 'null');
}

export function removeStorageItem(key: string) {
  localStorage.removeItem(key);
}
