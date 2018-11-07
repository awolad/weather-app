console.log('Starting up');

setTimeout(() => {
  console.log('First async function');
}, 2000);

setTimeout(() => {
  console.log('Second async function');
}, 0);

console.log('finishing up');