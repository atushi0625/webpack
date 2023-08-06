export default () => {
    const obj = { a: 1, b: 2, c: 3, d: 4 };
    const newObj = { ...obj, e: 5 };
    console.log('this is module', newObj);
}
