'use strict'

console.log('meme');

var gImgs = [
    {
        id: 1,
        url: 'img/1.jpg',
        keywords: ['happy','flower','girl','mount']
    },
    {
        id: 2,
        url: 'img/2.jpg',
        keywords: ['usa','ungry','flag','president','tramp']
    },
    {
        id: 3,
        url: 'img/3.jpg',
        keywords: ['happy','dog','puppy','kiss','qute']
    },
    {
        id: 4,
        url: 'img/4.jpg',
        keywords: ['happy','dog','baby','qute','sleep']
    },
    {
        id: 5,
        url: 'img/5.jpg',
        keywords: ['baby','boy','angry','sea','beach']
    },
    {
        id: 6,
        url: 'img/6.jpg',
        keywords: ['cat', 'qute','laptop','sleep']
    },
    {
        id: 7,
        url: 'img/7.jpg',
        keywords: ['happy','toystory','movie','animate']
    },
    {
        id: 8,
        url: 'img/8.jpg',
        keywords: ['happy']
    },
    {
        id: 9,
        url: 'img/9.jpg',
        keywords: ['happy','boy','qute','green']
    },
    {
        id: 10,
        url: 'img/10.jpg',
        keywords: ['happy','Haim','יצאתצצדיק','tv','israel','man']
    },
    {
        id: 11,
        url: 'img/11.jpg',
        keywords: ['what','eyes','shout','man']
    },
    {
        id: 12,
        url: 'img/12.jpg',
        keywords: ['man','hair','history']
    },
    {
        id: 13,
        url: 'img/13.jpg',
        keywords: ['man','hands','movie','baldness']
    },
    {
        id: 14,
        url: 'img/14.jpg',
        keywords: ['happy','boys','children','black','afrika','dancing']
    },
    {
        id: 15,
        url: 'img/15.jpg',
        keywords: ['usa','ungry','finger','president','tramp','man']
    },
    {
        id: 16,
        url: 'img/16.jpg',
        keywords: ['happy','black','boy','qute','eyes']
    },
    {
        id: 17,
        url: 'img/17.jpg',
        keywords: ['dog','qute','flor','animal']
    },
    {
        id: 18,
        url: 'img/18.jpg',
        keywords: ['happy','black','man','obama','usa','president','democrat']
    },
    {
        id: 19,
        url: 'img/19.jpg',
        keywords: ['nba','basketball','fight','celtics','pirse','lackers','worldpeasce']
    },
    {
        id: 20,
        url: 'img/20.jpg',
        keywords: ['happy','movie','decaprio','glass','whine']
    },
    {
        id: 21,
        url: 'img/21.jpg',
        keywords: ['movie','man','matrix','black','glasses']
    },
    {
        id: 22,
        url: 'img/22.jpg',
        keywords: ['man','movie']
    },
    {
        id: 23,
        url: 'img/23.jpg',
        keywords: ['singer','shouting','red','woman']
    },
    {
        id: 24,
        url: 'img/24.jpg',
        keywords: ['happy']
    },
    {
        id: 25,
        url: 'img/25.jpg',
        keywords: ['movie','man','starts']
    },
];
var gCurrTxtIdx = 0;
var gMeme = {
    selectedImgId: 5,

    txts: []
}


function updateCurrImg(id) {
    gMeme.selectedImgId = id;

}
function getImagesForDisplay() {
    var imgs = [];
    if (gFilter === '') return gImgs;
    gImgs.forEach(function (image) {
        var isExist = false;
        for (let i = 0; i < image.keywords.length; i++) {
            if (ifSubstrExist(image.keywords[i], gFilter)) isExist = true;
        }
        if (isExist) imgs.push(image);
    });
    return imgs;
}


function getImgById(id) {
    for (var i = 0; i < gImgs.length; i++) {
        var img = gImgs[i];
        if (img.id === id) return img;
    }
    return null;
}

function updateGMeme(txt) {
    gMeme.txts[gCurrTxtIdx].line = txt;
}

function ifSubstrExist(str, substr) {
    return str.includes(substr);
}

function updateColor(colorStr) {
    gMeme.txts[gCurrTxtIdx].color = colorStr;

}
function changeSize(diff) {
    gMeme.txts[gCurrTxtIdx].size += diff;
}

function changeWeight() {

    gMeme.txts[gCurrTxtIdx].weight = (gMeme.txts[gCurrTxtIdx].weight === 400) ? 700 : 400;

}

function changeCurrTxtIdx(txtID){
    gCurrTxtIdx = txtID;
}

function getNumOfTxt(){
    return gMeme.txts.length;
}

function moveNextTxtIdx(){
    if(gCurrTxtIdx < getNumOfTxt() -1){
        gCurrTxtIdx ++
        updateTxtBox(gMeme.txts[gCurrTxtIdx].line)
    }
}

function movePrevTxtIdx(){
    if(gCurrTxtIdx){
        gCurrTxtIdx --
        updateTxtBox(gMeme.txts[gCurrTxtIdx].line)
    } 
}

function updateTxtBox(txt){
    var text = (txt)? txt:'';
    var txt = document.querySelector('.txt');
    txt.value = text;
}

function addTxtLine(){
    gMeme.txts.push(makeTxt());
    moveNextTxtIdx();
    //gMeme.txts[gCurrTxtIdx].pos.x = elCanvas.width / 2;
   // gMeme.txts[gCurrTxtIdx].pos.y = elCanvas.height / 2;
    gMeme.txts[gCurrTxtIdx].pos.x = gMeme.txts[gCurrTxtIdx - 1].pos.x;
    gMeme.txts[gCurrTxtIdx].pos.y = gMeme.txts[gCurrTxtIdx - 1].pos.y +10;
    updateTxtBox();
}



function makeTxt() {
    return {
        line: '',
        size: 40,
        align: 'center',
        color: '#000000',
        font: 'Impact',
        weight: 400,
        pos: {
            x: elCanvas.width / 2,
            y:  elCanvas.height / 2,
        }
    }
}


function changePos(strDir) {
    var diff = 5;
    switch (strDir) {
        case 'up':
            gMeme.txts[gCurrTxtIdx].pos.y += -diff;
            break;
        case 'down':
            gMeme.txts[gCurrTxtIdx].pos.y += diff;
            break;
        case 'right':
            gMeme.txts[gCurrTxtIdx].pos.x += diff;
            break;

        case 'left':
            gMeme.txts[gCurrTxtIdx].pos.x += -diff;
            break;


    }
}