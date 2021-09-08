// 0. Import the require packages

import fs from 'node:fs';
import fetch from 'node-fetch';

// 1. Download  memes and put them in the required directory

async function downloadMemes(urlList) {
  const folderName = './memes';
  // Check if directory exists
  if (!fs.existsSync(folderName)) {
    fs.mkdir(folderName, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
  // Download 10 memes and put them into the direcotry
  for (let i = 0; i <= 9; i++) {
    const file = fs.createWriteStream(`${folderName}/memes${i + 1}.jpg`);
    const fetchedImg = await fetch(urlList[i], (err) => {
      if (err) {
        console.log(err);
      }
    });
    fetchedImg.body.pipe(file, (err) => {
      console.log(err);
    });
  }
}

// 2. Fetches all the memes and puts them into an array

async function fetchMemes() {
  const response = await fetch(
    'https://memegen-link-examples-upleveled.netlify.app/',
  );
  const body = await response.text();
  // Extract Image Urls from HTML string
  const foundUrls = body.match(/https:\/\/api\.memegen\.link\/images.*\.jpg/g);
  // Filter out Urls that exist twice
  const filteredFoundUrls = foundUrls.filter((el, index) => {
    return foundUrls.indexOf(el) === index;
  });

  downloadMemes(filteredFoundUrls);
}

// 3. Run Function that completes task

fetchMemes();
