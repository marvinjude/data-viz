import dictionary from "../data/dictionary.json";
/**
 * Genetate a key value pair from dictionry [{new_key: old_key}, ...]
 * @param {*} dictionary
 */
function generateDictionaryKeyValue(dictionary) {
  const dictionaryKeyValue = {};
  for (const { old_key, new_key } of dictionary) {
    dictionaryKeyValue[new_key] = old_key;
  }

  return dictionaryKeyValue;
}

export default () => generateDictionaryKeyValue(dictionary);
