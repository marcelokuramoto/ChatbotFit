const Youtube = require('youtube-node');
const config = require('./yt-config.json');

const youtube = new Youtube();
youtube.setKey(config.key);

// youtube.search('exercicio em casa para biceps',2,function(error,result){
//     console.log(JSON.stringify(result,null,2));

// })

function searchVideoURL(message,queryText){
    return new Promise((resolve, reject) => {
        youtube.search(`Exercicio em casa para ${queryText}`, 2 ,function(error,result){ //Retorna a busca pelo termo, a quantidade de video e a funçao que retorna com abusca
   
            if (!error){
                //console.log(JSON.stringify(result,null,2));

                const videosIds = result.items.map((item) => item.id.videoId).filter(item => item);                
                const youtubeLinks = videosIds.map(videoId => `https://www.youtube.com/watch?v=${videoId}`);

                resolve(`${message} ${youtubeLinks.join(', ')}`)
            } 
            else {
                reject('Deu erro');
                
                //console.log('Deu erro');
            }
        })
    });
}

    module.exports.searchVideoURL = searchVideoURL;