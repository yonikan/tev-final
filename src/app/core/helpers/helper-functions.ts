import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';

export function enumToString(enumType, enumNumber) {
    const enumValuesArr = Object.keys(enumType).filter((type) => isNaN(<any>type));
    return enumValuesArr[enumNumber].replace(/([A-Z]+)*([A-Z][a-z])/g, '$1 $2')
}

export function arrayToObj(array, keyName) {
  return array.reduce((acc, item)=>{
    acc[item[keyName]] = item;
    return acc;
  }, {});
}

export function objToArray(obj, keyName) {
  const array = [];
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      array.push({...obj[key], [keyName]: key});
    }
  }

  return array;
}

export function sortFunction(a, b, keyNamePath = ['date']) {
  let answer: number;

  let sortBy = keyNamePath[keyNamePath.length - 1];

  keyNamePath.forEach(keyName => {
    if (a) a = a[keyName];
    if (b) b = b[keyName];
  });

  if (!a && b) return 1;
  if (a && !b) return -1;


  if (a && b) {

    switch (sortBy) {

      case 'date': {

        answer = new Date(b).getTime() - new Date(a).getTime();

        break;
      }

      default: {
        answer = b - a;
        break;
      }
    }
  }
  [{
    path: String,
    fieldType: String,
    direction: String
  }, {
    path: String,
    fieldType: String,
    direction: String
  }]
  if (!answer && sortBy !== 'date') {
    answer = this.sortFunction(a, b);
  }

  return answer;
}
