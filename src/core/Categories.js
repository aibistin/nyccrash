/* 
 *  Categories
 *  Keep track of data based on "Categories" for NycCrach Data
 * 
 */
const catNames = ["persons", "pedestrians", "cyclists", "motorists"];

class Categories {
  constructor(names = catNames) {
    this.names = names;
    this.categories = this._toCategories();
  }

  clone() {
    return JSON.parse(JSON.stringify(this.categories));
  }

  getCat(catName) {
    return this.categories.find(cat => cat.name === catName);
  }

  getTotals() {
    return this.categories.map(cat => cat.total);
  }

  getLabels(categories){
    return categories ? categories.map(cat => cat.label) : this.categories.map(cat => cat.label);
  }

  toLabel(catName) {
    if (!catName) return;
    return catName.charAt(0).toUpperCase() + catName.slice(1).toLowerCase();
  }

  _toCategories() {
    return this.names.map(name => {
      return {
        name,
        label: this.toLabel(name),
        total: 0,
        avg: 0,
        maxOneTime: 0
      };
    });
  }
}

export default Categories;