'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

//-----------------------------------------------------------------

// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v2/name/${country}`);

//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.response);

//     const html = `
//   <article class="country">
//   <img class="country__img" src="${data.flags.svg}" />
//   <div class="country__data">
//     <h3 class="country__name">${data.name}</h3>
//     <h4 class="country__region">${data.region}</h4>
//     <p class="country__row"><span>👫</span>${(
//       +data.population / 1000000
//     ).toFixed(1)}</p>
//     <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//     <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
//   </div>
// </article>
// `;

//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// };

// getCountryData('azerbaijan');
// getCountryData('uk');

const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
  <img class="country__img" src="${data.flags.svg}" />
  <div class="country__data">
    <h3 class="country__name">${data.name}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)}</p>
    <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
    <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
  </div>
</article>
`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

/*

const getCountryAndNeighbour = function (country) {
  const request = new XMLHttpRequest();

  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    // console.log(this.response);
    const [data] = JSON.parse(this.response);
    // console.log(data);

    // Render country 1
    renderCountry(data);

    // Get neighbour country (2)
    const neighbour = data.borders?.[0];

    if (!neighbour) return;

    // AJAX call country 2
    const request2 = new XMLHttpRequest();

    request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.response);

      renderCountry(data2, 'neighbour');
    });
  });
};

getCountryAndNeighbour('portugal');

*/

// const getCountryData = function (country) {
//   // Country 1
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(response => {
//       console.log(response);

//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);

//       return response.json();
//     })

//     .then(data => {
//       renderCountry(data[0]);

//       // const neighbour = data[0].borders?.[0];
//       const neighbour = 'ssdsds';

//       if (!neighbour) return;

//       // Country 2
//       return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Neighbour not found (${response.status})`);

//       return response.json();
//     })
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       console.error(`${err} 🔥🔥🔥`);
//       renderError(`Something went wrong 🔥🔥 ${err.message}. Try Again!`);
//     })

//     .finally((countriesContainer.style.opacity = 1));
// };

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    console.log(response);

    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

const getCountryData = function (country) {
  // Country 1
  getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found')
    .then(data => {
      console.log(data);
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0];

      if (!neighbour) throw new Error('No neighbour found');

      // Country 2
      return getJSON(
        `https://restcountries.com/v2/alpha/${neighbour}`,
        'Neighbour not found'
      );
    })
    .then(data => {
      renderCountry(data, 'neighbour');
    })

    .catch(err => {
      console.error(`${err} 🔥🔥🔥`);
      renderError(`Something went wrong 🔥🔥 ${err.message}. Try Again!`);
    })
    .finally((countriesContainer.style.opacity = 1));
};

btn.addEventListener('click', function () {
  getCountryData('canada');
});

//--------------------------------------------------

//#region Coding Challenge #1

/*

const getCountryData2 = function (country) {
  return fetch(`https://restcountries.com/v2/name/${country}`)
    .then(response => {
      if (!response.ok)
        throw new Error(`Country not found, (${response.status})`);
      return response.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => renderError(err.message));
};

const whereAmI = function (lat, lng) {
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then(response => {
      if (!response.ok)
        throw new Error(`Problem with geocoding (${response.status})!`);

      return response.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);
      getCountryData2(data.country);
    })
    .catch(err => console.error(`${err.message} 🔥`));
};

whereAmI(52.508, 13.381); // Germany
whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474); // South Africa

*/

//#endregion

//--------------------------------------------------

//#region  Promisifying setTimeout

/*

const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lotter draw is happening 🤟');
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('You WIN 💰');
    } else {
      reject(new Error('You lost your money 💩'));
    }
  }, 1000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// Promisifying setTimeout

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(2)
  .then(() => {
    console.log('I waited for 2 seconds');
    return wait(1);
  })
  .then(() => {
    console.log('I waited for 3 seconds');
    return wait(1);
  })
  .then(() => {
    console.log('I waited for 4 seconds');
    return wait(1);
  })
  .then(() => console.log('I waited for 5 seconds'));

Promise.resolve('abc').then(res => console.log(res));
Promise.reject(new Error('Problem happen!')).catch(err => console.error(err));

*/

//#endregion

//-----------------------------------------------------

//#region Consuming Promises with Async/Await

/*

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function (country) {
  try {
    // Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    // Reverse geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);

    if (!resGeo.ok) throw new Error('Problem getting location data 🔥');
    const dataGeo = await resGeo.json();

    const res = await fetch(
      `https://restcountries.com/v2/name/${dataGeo.country}`
    );
    if (!res.ok) throw new Error('Problem getting data 🔥');

    const [data] = await res.json();
    renderCountry(data);

    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (error) {
    console.error(`${error.message} ⚡`);
    renderError(`${error.message} ⚡`);
  }
};

console.log('1: Will get location');

(async function () {
  try {
    const city = await whereAmI();
    console.log(`2: ${city}`);
  } catch (err) {
    console.log(`3: ${err.message} 🔥`);
  }

  console.log('Finished getting location');
})();

*/

//#endregion

//----------------------------------------------------

//#region  Promisifying the Geolocation API

/*

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

getPosition()
  .then(pos => console.log(pos))
  .catch(err => console.error(err));

const whereAmI = function () {
  getPosition()
    .then(pos => {
      console.log(pos.coords);

      const { latitude: lat, longitude: lng } = pos.coords;
      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`Problem with geocoding (${response.status})!`);

      return response.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);
      return fetch(`https://restcountries.com/v2/name/${data.country}`);
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`Country not found, (${response.status})`);
      return response.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.error(`${err.message} 🔥`));
};

btn.addEventListener('click', whereAmI);

*/

//#endregion

//-----------------------------------------------------

//#region Coging Challenge #2

/*

const images = document.querySelector('.images');

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

let img;

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', () => {
      images.append(img);
      resolve(img);
    });

    img.addEventListener('error', () => {
      reject(new Error('There is an error loading the image'));
    });
  });
};

let currentImg;

// // Wrote myself
// createImage('/img/img-1.jpg')
//   .then(img => {
//     console.log(img);
//     return wait(2);
//   })
//   .then(() => {
//     img.style.display = 'none';
//     return wait(2);
//   })
//   .then(() => {
//     createImage('/img/img-2.jpg');
//     return wait(2);
//   })
//   .then(() => {
//     img.style.display = 'none';
//     return wait(2);
//   })
//   .catch(err => console.error(err));








// Wrote Jonas
// createImage('/img/img-1.jpg')
//   .then(img => {
//     console.log(img);
//     currentImg = img;
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     return createImage('/img/img-2.jpg');
//   })
//   .then(img => {
//     currentImg = img;
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     return wait(2);
//   })
//   .catch(err => console.error(err));


*/

//#endregion

//-----------------------------------------------------

//#region Running Promises in Parallel

const get3Countries = async function (c1, c2, c3) {
  try {
    // const [data1] = await getJSON(`https://restcountries.com/v2/name/${c1}`);
    // const [data2] = await getJSON(`https://restcountries.com/v2/name/${c2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v2/name/${c3}`);
    // console.log([data1.capital, data2.capital, data3.capital]);

    const data = await Promise.all([
      getJSON(`https://restcountries.com/v2/name/${c1}`),
      getJSON(`https://restcountries.com/v2/name/${c2}`),
      getJSON(`https://restcountries.com/v2/name/${c3}`),
    ]);

    console.log(data.map(d => d[0].capital));
  } catch (error) {
    console.log(error);
  }
};

// get3Countries('portugal', 'azerbaijan', 'turkey');

//#endregion

//---------------------------------------------------

//#region Other Promise Combinators: race, allSettled and any

/*

// Promise.race
(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v2/name/germany`),
    getJSON(`https://restcountries.com/v2/name/portugal`),
    getJSON(`https://restcountries.com/v2/name/mexico`),
  ]);

  console.log(res);
})();

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(() => {
      reject(new Error('Request took too long'));
    }, sec * 1000);
  });
};

Promise.race([
  getJSON(`https://restcountries.com/v2/name/germany`),
  timeout(0.1),
])
  .then(res => console.log(res[0]))
  .catch(err => console.error(err));

// Promise.allSettled
Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another Success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

Promise.all([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another Success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

// Promise.any [2021]
Promise.race([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another Success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

  */

//#endregion

//---------------------------------------------------

//#region Coding Challenge #3

/*

const images = document.querySelector('.images');

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

// let img;

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    let img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', () => {
      images.append(img);
      resolve(img);
    });

    img.addEventListener('error', () => {
      reject(new Error('There is an error loading the image'));
    });
  });
};

// let currentImg;

// const loadNPause = async function () {
//   try {
//     const img1 = await createImage('/img/img-1.jpg');
//     currentImg = img1;
//     await wait(2);
//     currentImg.style.display = 'none';

//     const img2 = await createImage('/img/img-2.jpg');
//     currentImg = img2;
//     await wait(2);
//     currentImg.style.display = 'none';
//   } catch (error) {
//     console.error(error);
//   }
// };

// loadNPause();

const imgs = ['/img/img-1.jpg', '/img/img-2.jpg', '/img/img-3.jpg'];

const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async img => await createImage(img));
    const imgEl = await Promise.all(imgs);
    imgEl.forEach(img => img.classList.add('parallel'));
  } catch (error) {
    console.log(error);
  }
};

loadAll(imgs);

*/

//#endregion

//------------------------------------------------------
