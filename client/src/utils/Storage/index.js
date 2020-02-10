const { localStorage } = window;

const inMemoryService = {
  storage: {},
  getItem: function getItem(key) {
    return this.storage[key];
  },
  setItem: function setItem(key, value) {
    this.storage[key] = value;
    return true;
  },
  clear: function clear() {
    this.storage = {};
  },
  removeItem: function removeItem(key) {
    delete this.storage[key];
    return true;
  },
};

const localStorageService = storage => ({
  getItem: key => storage.getItem(key),
  clear: () => storage.clear(),
  removeItem: key => storage.removeItem(key),
  setItem: (key, value) => storage.setItem(key, value),
});

const Storage = localStorage ? localStorageService(localStorage) : localStorageService(inMemoryService);

export default Storage;