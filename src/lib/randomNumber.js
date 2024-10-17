// src/lib/randomNumber.js
export function generateRandomNumber() {
  return Math.floor(Math.random() * 300) + 1;
}

export function startRandomNumberGenerator(callback) {
  let randomNumber = generateRandomNumber();
  callback(randomNumber);
  const interval = setInterval(() => {
    randomNumber = generateRandomNumber();
    callback(randomNumber);
  }, 5000);

  return () => clearInterval(interval);
}
