// idb.js

const idb = {
  db: null,

  openCostsDB: async function(databaseName, version) {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(databaseName, version);

      request.onupgradeneeded = function(event) {
        const db = event.target.result;
        db.createObjectStore("costs", { keyPath: "id", autoIncrement: true });
      };

      request.onsuccess = function(event) {
        this.db = event.target.result;
        resolve(this.db);
      }.bind(this);

      request.onerror = function(event) {
        reject("Could not open the database.");
      };
    });
  },

  addCost: async function(costObject) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(["costs"], "readwrite");
      const objectStore = transaction.objectStore("costs");
      const request = objectStore.add({
        ...costObject,
        date: new Date().toISOString(),
      });

      request.onsuccess = function(event) {
        resolve(event.target.result);
      };

      request.onerror = function(event) {
        reject("Could not add the cost item.");
      };
    });
  },

  getCostsByMonthAndYear: async function(month, year) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(["costs"], "readonly");
      const objectStore = transaction.objectStore("costs");
      const request = objectStore.getAll();

      request.onsuccess = function(event) {
        const allCosts = event.target.result;
        const filteredCosts = allCosts.filter(cost => {
          const date = new Date(cost.date);
          return date.getMonth() === month && date.getFullYear() === year;
        });
        resolve(filteredCosts);
      };

      request.onerror = function(event) {
        reject("Could not retrieve the costs.");
      };
    });
  },

  deleteCost: async function(id) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(["costs"], "readwrite");
      const objectStore = transaction.objectStore("costs");
      const request = objectStore.delete(id);

      request.onsuccess = function(event) {
        resolve(true);
      };

      request.onerror = function(event) {
        reject("Could not delete the cost item.");
      };
    });
  },

  updateCost: async function(id, updatedCostObject) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(["costs"], "readwrite");
      const objectStore = transaction.objectStore("costs");
      const request = objectStore.put({ ...updatedCostObject, id });

      request.onsuccess = function(event) {
        resolve(true);
      };

      request.onerror = function(event) {
        reject("Could not update the cost item.");
      };
    });
  },
};
export { idb };