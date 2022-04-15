//use it to stop getJson when network is too
import { TIME } from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const ajaxCall = async function (url, recipe) {
  try {
    const req = recipe
      ? await fetch(url, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(recipe),
        })
      : await fetch(url);
    const data = await Promise.race([req.json(), timeout(TIME)]);

    if (!req.ok) {
      console.log(data);
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    // console.log(error);
    throw error.message;
  }
};
