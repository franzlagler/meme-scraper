import fs from 'node:fs';
import fetch from 'node-fetch';

async function fetchAndUploadImages() {
  const response = await fetch(
    'https://memegen-link-examples-upleveled.netlify.app/',
  );
  const body = await response.text();
  const foundUrls = body.match(/https:\/\/api\.memegen\.link\/images.*\.jpg/g);
  const filteredFoundUrls = foundUrls.filter((el, index) => {
    return foundUrls.indexOf(el) === index;
  });

  const folderName = './memes';

  if (!fs.existsSync(folderName)) {
    fs.mkdir(folderName, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }

  for (let i = 0; i <= 9; i++) {
    const file = fs.createWriteStream(`${folderName}/memes${i + 1}.jpg`);
    const fetchedImg = await fetch(filteredFoundUrls[i], (err) => {
      if (err) {
        console.log(err);
      }
    });
    fetchedImg.body.pipe(file, (err) => {
      console.log(err);
    });
  }
}

fetchAndUploadImages();
