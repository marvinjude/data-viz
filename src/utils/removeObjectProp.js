/**
 *Remove property from object
 * @param {*} object object
 * @param {Array} keys array of keys to remove
 */
function removeKeyFromObject(object, keys) {
  return Object.keys(object).reduce((acc, key) => {
    if (!keys.includes(key)) {
      acc[key] = object[key];
    }
    return acc;
  }, {});
}

export default removeKeyFromObject;

console.log(removeKeyFromObject({name: 'jue'}, ['name']))