//use it to stop fetcher when network is too
import { TIME } from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const fetcher = async function (url) {
  const req = await fetch(url);
  //   const data = await req.json();
  const data = await Promise.race([req.json(), timeout(TIME)]);

  if (!req.ok) {
    throw new Error(`Error from helper`);
  }
  return data;
};
