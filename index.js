// 0. Import the required packages

const fs = require('node:fs');
const cliProgress = require('cli-progress');
const colors = require('colors');
const fetch = require('node-fetch');

// 1. Configure Progress Bar

const progessBar = new cliProgress.SingleBar(
  {
    format:
      'Downloading... |' +
      colors.red('{bar}') +
      '| {percentage}% || {value}/{total} Memes',
    fps: 5,
    clearOnComplete: false,
  },
  cliProgress.Presets.shades_classic,
);

// 2. Download  memes and put them in the required directory

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
  // Download memes and put them in the direcotry
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
    progessBar.increment(1);
  }

  progessBar.stop();
}

// 3. Fetch all memes and put them in an array

async function createMemeList() {
  // Start Progress Bar
  progessBar.start(10, 0);
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

// 4. Create Custom Meme

function createCustomMeme() {
  // Start Progress Bar
  progessBar.start(1, 0);

  const template = process.argv[2];
  const text1 = process.argv[3];
  const text2 = process.argv[4];

  const customMemeUrl = [
    `https://api.memegen.link/images/${template}/${text1}/%20${text2}.jpg`,
  ];

  progessBar.increment(20);

  downloadMemes(customMemeUrl);
}

// 5. Check Which Function to Run

// If no additional input
if (!process.argv[2]) {
  createMemeList();
}
// If additional input
else {
  createCustomMeme();
}
