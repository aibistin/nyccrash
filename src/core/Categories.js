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

  getCat(catName) {
    return this.categories.find(cat => cat.name === catName);
  }

  updateCatTotal(catName, qty) {
    let cat = this.getCat(catName);
    if (!cat) throw `Error: No cateory with name ${catName}`;
    cat.total += Number(qty);
  }

  updateMaxOneTime(catName, qty) {
    let cat = this.getCat(catName);
    qty = Number(qty);
    if (!cat) throw `Error: No cateory with name ${catName}`;
    cat.maxOnetime = qty > cat.maxOneTime ? qty : thisCat.maxOneTime;
  }

  getTotals() {
    return this.categories.map(cat => cat.total);
  }

  getLabels(categories) {
    return categories
      ? categories.map(cat => cat.label)
      : this.categories.map(cat => cat.label);
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
