export function enumToString(enumType, enumNumber) {
    const enumValuesArr = Object.keys(enumType).filter((type) => isNaN(<any>type));
    return enumValuesArr[enumNumber-1].replace(/([A-Z]+)*([A-Z][a-z])/g, '$1 $2')
}