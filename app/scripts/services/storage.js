'use strict';

/**
 * The type for the Storage
 * @type {{Session: number, Local: number}}
 */
export const Type = {
  Session: 0,
  Local: 1
};

/**
 * Time constant to use within the Storage
 * @type {{TEN_MIN: number}}
 */
export const Time = {
  TEN_MIN: (10 * 60 * 1000)
};


class Storage {
	constructor($window) {
    if (this.isStoragePresent()) {
      this.localStorage = $window.localStorage;
      this.sessionStorage = $window.sessionStorage;
    } else {
      this.localStorage = null;
      this.sessionStorage = null;
    }
  }

  isStoragePresent() {
    try {
      this.localStorage.setItem(null, null);
      this.sessionStorage.setItem(null, null);
      return true;
    } catch (exception) {
      return false;
    }
  }


    /**
   * Set item in the given type of storage
   * @param id
   * @param data
   * @param type
   */
  save(id, data, type) {
    if (this.isStoragePresent()) {
      if (type === Type.Session) {
        this.sessionStorage.setItem(id, angular.toJson(data));
      } else if (type === Type.Local) {
        let obj = {data: data, timestamp: new Date().getTime()};
        this.localStorage.setItem(id, angular.toJson(obj));
      }
    }
  }

  /**
   * Removes an item in the session storage
   * @param id
   */
  remove(id) {
    if (this.isStoragePresent()) {
      this.sessionStorage.removeItem(id);
    }
  }

  /**
   * Get's data from the given storage
   * @param id
   * @param type
   * @returns {*}
   */
  get(id, type) {
    if (this.isStoragePresent()) {
      let data;
      if (type === Type.Session) {
        try {
          data = angular.fromJson(this.sessionStorage.getItem(id));
        } catch (e) {
          return;
        }
      } else if (type === Type.Local) {
        data = angular.fromJson(this.localStorage.getItem(id));
      }
      return data;
    }
  }
}

export default angular.module('storage', [])
	.service('storage', Storage );
