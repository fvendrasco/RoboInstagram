const puppeteer = require('puppeteer');
const { error } = require('console');
const fs = require ('fs');
 
(async () => {
  const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();
  await page.goto('https://www.instagram.com/felipevendrasco/');
 
 
  const imgList = await page.evaluate(() => {
    //Toda a funcao sera executada no browser


    //Pegar todas as imagens do perfil
        const nodeList = document.querySelectorAll ("article img")

    //Transformar o NodeList em Array
        const imgArray = [...nodeList]

    //Transformar os Node (elementos HTML) em  objetos JS
        const imgList = imgArray.map(({src})=> ({
            src
        }))

    //Colocar fora da funcao.
        return imgList

  });

  //Escrever os dados nos arquivos local
    fs.writeFile('instagram.json', JSON.stringify(imgList, null, 2),err =>{
        if(err) throw new Error('Alguma coisa está errada =[ ')

    })

  await browser.close();
})();



