var asyncAdd = (a, b) => {
  return new Promise((reslove, reject) => {
    setTimeout(() => {
      if (typeof a === 'number' && typeof b === 'number') {
        reslove(a + b);
      } else {
        reject('Both parameter should be number');
      }
    }, 3000);
  });
}

asyncAdd(3, 9).then((res) => {
  console.log(res);
  return asyncAdd(res, 33);
}).then((res) => {
  console.log('Result from 2nd then: ', res);
}).catch((errorMessage) => {
  console.log(errorMessage);
});

// var somePromise = new Promise((reslove, reject) => {
//   setTimeout(() => {
//     reslove('Hey, it works!');
//     reject('Unable to fullfil the promise');
//   }, 3000);
// });
//
// somePromise.then((message) => {
//   console.log('Success: ', message);
// }, (errorMessage) => {
//   console.log(errorMessage);
// });