class LocalStorage {
  saveToLS(key, value) {
    if (global.localStorage) {
      global.localStorage.setItem('rgl-8', JSON.stringify({
        [key]: value
      }));
    }
  }

  getFromLS(key) {
    let ls = {};
    if (global.localStorage) {
      try {
        ls = JSON.parse(global.localStorage.getItem('rgl-8')) || {};
      } catch(e) {/*Ignore*/}
    }
    return ls[key];
  }
}

const localStorage = new LocalStorage();
export default localStorage;
