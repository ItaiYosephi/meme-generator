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
    },
    {
        id: 8,
        url: 'img/8.jpg',
        keywords: ['happy']
    },
    {
        id: 9,
        url: 'img/9.jpg',
        keywords: ['happy']
    },
    {
        id: 10,
        url: 'img/10.jpg',
        keywords: ['happy']
    },
    {
        id: 11,
        url: 'img/11.jpg',
        keywords: ['happy']
    },
    {
        id: 12,
        url: 'img/12.jpg',
        keywords: ['happy']
    },
    {
        id: 13,
        url: 'img/13.jpg',
        keywords: ['happy']
    },
    {
        id: 14,
        url: 'img/14.jpg',
        keywords: ['happy']
    },
    {
        id: 15,
        url: 'img/15.jpg',
        keywords: ['happy']
    },
    {
        id: 16,
        url: 'img/16.jpg',
        keywords: ['happy']
    },
    {
        id: 17,
        url: 'img/17.jpg',
        keywords: ['happy']
    },
    {
        id: 18,
        url: 'img/18.jpg',
        keywords: ['happy']
    },
    {
        id: 19,
        url: 'img/19.jpg',
        keywords: ['happy']
    },
    {
        id: 20,
        url: 'img/20.jpg',
        keywords: ['happy']
    },
    {
        id: 21,
        url: 'img/21.jpg',
        keywords: ['happy']
    },
    {
        id: 22,
        url: 'img/22.jpg',
        keywords: ['happy']
    },
    {
        id: 23,
        url: 'img/23.jpg',
        keywords: ['happy']
    },
    {
        id: 24,
        url: 'img/24.jpg',
        keywords: ['happy']
    },
    {
        id: 25,
        url: 'img/25.jpg',
        keywords: ['happy']
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


function makeTxt() {
    return {
        line: '',
        size: 40,
        align: 'center',
        color: '#000000',
        font: 'Impact',
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