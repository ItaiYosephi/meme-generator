'use strict'

console.log('meme');

var gImgs = [
    {
        id: 1,
        url: 'img/1.jpg',
        keywords: ['happy']
    },
    {
        id: 2,
        url: 'img/2.jpg',
        keywords: ['happy']
    },
    {
        id: 3,
        url: 'img/3.jpg',
        keywords: ['happy']
    },
    {
        id: 4,
        url: 'img/4.jpg',
        keywords: ['happy']
    },
    {
        id: 5,
        url: 'img/5.jpg',
        keywords: ['happy']
    },
    {
        id: 6,
        url: 'img/6.jpg',
        keywords: ['happy', 'sad']
    },
    {
        id: 7,
        url: 'img/7.jpg',
        keywords: ['happy']
    }
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


function makeTxt() {
    return {
        line: '',
        size: 40,
        align: 'center',
        color: '#000000',
        font: 'ariel',
        weight: 400,
        pos: {
            x: '',
            y: '',
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