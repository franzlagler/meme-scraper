# Meme-Scraper

### A tool to fetch memes from https://memegen-link-examples-upleveled.netlify.app/
![Saved Memes](https://github.com/franzlagler/meme-scraper/blob/main/screenshots/saved-meme.png)

The general idea behind the programm is as follows:

- When you enter `nodex index.js` in the console, the programm will fetch the first 10 memes from https://memegen-link-examples-upleveled.netlify.app/. 
- After that, it will create a folder **meme** located in the same directory as all the other files and then download all the memes into the folder in question. 
- If the folder with the respective name already exists, the program will directly put the files in the folder. 

![Fetch Meme List](https://github.com/franzlagler/meme-scraper/blob/main/screenshots/fetch-memes.png)

There is also another function that you can use:

- If you add additional information to the command in the console, the program will create a customized meme for you.
- In order to do that, stick to the following pattern as shown in the example: `node index.js topText bottomText template`
- Make sure to write to look for templates on the actual website before and write the template argument in lowercase!
- After the custom meme has been created, the program will save the file in the memes directory.

![Fetch Meme List](https://github.com/franzlagler/meme-scraper/blob/main/screenshots/fetch-custom-meme.png)

