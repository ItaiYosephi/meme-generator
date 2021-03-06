'use strict'

console.log('meme');
var gImg;
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
var gColor ='#ffffff';
var gFont = 'Impact';
var gShadow = 0;


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
    gColor = colorStr;
    gMeme.txts[gCurrTxtIdx].color = gColor;

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
function updateColorBox(color){
    var elColor = document.querySelector('.color');
    elColor.value = color;
}

function moveNextTxtIdx(){
    if(gCurrTxtIdx < getNumOfTxt() -1){
        gCurrTxtIdx ++;
        updateTxtBox(gMeme.txts[gCurrTxtIdx].line);
        updateColorBox(gMeme.txts[gCurrTxtIdx].color);  
    }
}

function movePrevTxtIdx(){
    if(gCurrTxtIdx){
        gCurrTxtIdx --;
        updateTxtBox(gMeme.txts[gCurrTxtIdx].line);
        updateColorBox(gMeme.txts[gCurrTxtIdx].color);     
    } 
}

function updateTxtBox(txt){
    var text = (txt)? txt:'';
    var txt = document.querySelector('.txt');
    txt.value = text;
}

function addTxtLine(){
    if (gMeme.txts[gCurrTxtIdx].line === 'Enter Your Text Here') return;
    console.log(gMeme.txts[gCurrTxtIdx].line);
    gMeme.txts.push(makeTxt());
    changeCurrTxtIdx(getNumOfTxt() -1);
    //gMeme.txts[gCurrTxtIdx].pos.x = elCanvas.width / 2;
   // gMeme.txts[gCurrTxtIdx].pos.y = elCanvas.width / 2;
    gMeme.txts[gCurrTxtIdx].pos.x = gMeme.txts[gCurrTxtIdx - 1].pos.x;
    gMeme.txts[gCurrTxtIdx].pos.y = gMeme.txts[gCurrTxtIdx - 1].pos.y +40;
    updateTxtBox();
}
function removeTxtLine(){
    debugger;
   if (!getNumOfTxt()) return;
    gMeme.txts.splice(gCurrTxtIdx,1);
    if (getNumOfTxt() === gCurrTxtIdx && gCurrTxtIdx > 0) gCurrTxtIdx --;
    if(getNumOfTxt()){
        console.log('txt = ',gMeme.txts[gCurrTxtIdx].line)
        updateTxtBox(gMeme.txts[gCurrTxtIdx].line);
        updateColorBox(gMeme.txts[gCurrTxtIdx].color);
    } else{
        updateTxtBox();
        updateColorBox('#000000');
    }
    console.log('numOfTxt: ',getNumOfTxt())

    renderCanvas();
}



function makeTxt() {
    return {
        line: 'Enter Your Text Here',
        size: 40,
        align: 'center',
        color: gColor,
        font: 'Impact',
        weight: 400,
        shadow: gShadow,
        pos: {
            x: elCanvas.width / 2,
            y:  elCanvas.height / 2,
        }
    }
}
function openChangeTxtAlign(){
    var elChangeAlign = document.querySelector('.align');
    elChangeAlign.classList.toggle('hide');

}

function changeTxtAlign(align){
    switch (align) {
        case 'center':
            gMeme.txts[gCurrTxtIdx].pos.x = elCanvas.width / 2;
            gMeme.txts[gCurrTxtIdx].align = 'center';
            break;
            case 'left':
            gMeme.txts[gCurrTxtIdx].pos.x = 0;
            gMeme.txts[gCurrTxtIdx].align = 'left';
            //gMeme.txts[gCurrTxtIdx].
            break;
            case 'right':
            gMeme.txts[gCurrTxtIdx].pos.x = elCanvas.width;
            gMeme.txts[gCurrTxtIdx].align = 'right';
            break;
    }

}

function changeFont(font){
    gFont = font;
   gMeme.txts[gCurrTxtIdx].font = gFont;
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

function toggleShadow(elVar){
    console.log(elVar.className)
    if(elVar.className === "btn shadow-off col-12") {
        elVar.className = "btn shadow-on col-12";
        elVar.innerHTML = 'Shadow Off';
        gShadow = 10;

     } else {
        elVar.className = "btn shadow-off col-12";
        elVar.innerHTML = 'Shadow On';
        gShadow = 0;
     }
     gMeme.txts[gCurrTxtIdx].shadow = gShadow;
}

function resetTxts() {
    gMeme.txts = [];
}
