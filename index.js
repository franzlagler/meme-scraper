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
  // Download 10 memes and put them in the direcotry
  for (let i = 0; i <= 9; i++) {
    const folderName = './memes';
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

// 2. Fetch all memes and put them in an array

async function createMemeList() {
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

// 3. Create Custom Meme

async function createCustomMeme() {
  const template = process.argv[2];
  const text1 = process.argv[3];
  const text2 = process.argv[4];

  const customMeme = await fetch(
    `https://api.memegen.link/images/${template}/${text1}/%20${text2}.jpg`,
    (err) => {
      if (err) {
        console.log(err);
      }
    },
  );

  const folderName = './memes';

  // Check if directory exists

  if (!fs.existsSync(folderName)) {
    fs.mkdir(folderName, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }

  const file = fs.createWriteStream(`${folderName}/custom-meme.jpg`);

  customMeme.body.pipe(file, (err) => {
    if (err) {
      console.log(err);
    }
  });
}

// 4. Check Which Function to Run

// If no additional input
if (!process.argv[2]) {
  createMemeList();
}
// If additional input
else {
  createCustomMeme();
}
