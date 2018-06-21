'use strict'
var elCanvas;
var ctx;
var gFilter;
var gFilterList;
var FILTER_LIST ='filter_list';


function init() {
    gFilter = '';
    gFilterList = loadFromStorage(FILTER_LIST);
    if (!gFilterList) gFilterList =  [
        {name:'happy',count :20},
        {name:'sunday',count :2},
        {name:'ball',count :7},
        {name:'game',count :15},
        {name:'life',count :10}];
    renderGallery()
}



function renderGallery() {
    var images = getImagesForDisplay();
    var elGallery = document.querySelector('.gallery')
    var strHtml = '';

    for (var i = 0; i < images.length; i++) {
        var currImg = images[i]
        strHtml += `
        <li class="hex" >
        <div class="hexIn">
          <a class="hexLink" href="#" onClick="onImgClick(${currImg.id})">
            <img src="${currImg.url}" alt="" />


          </a>
        </div>
      </li>`

    }
    elGallery.innerHTML = strHtml;

}


function onImgClick(id) {
    updateCurrImg(id)
    renderEditor()
}

function renderEditor() {

    var elEditor = document.querySelector('.editor');
    elEditor.classList.add('show');
    renderCanvas()
}

function renderCanvas() {
    elCanvas = document.querySelector('canvas');
    ctx = elCanvas.getContext("2d");
    var img = new Image()
    img.src = getImgById(gMeme.selectedImgId).url;
    ctx.drawImage(img, 0, 0, elCanvas.width, elCanvas.height)
    renderTxts()

}

function onTxtTyped(txt, txtIdx) {
    updateGMeme(txt, txtIdx)
    renderCanvas()

}
function renderTxts() {
    for (var i = 0; i < gMeme.txts.length; i++) {
        var currTxt = gMeme.txts[i];
        ctx.fillStyle = 'red'
        ctx.font = '50px arial'
        ctx.textAlign = 'center';
        var x = elCanvas.width / 2;
        // var y = elCanvas.height / 2;

        ctx.fillText(currTxt.line, x, 50)
        // ctx.strokeText(currTxt.line, 150, 150)

    }
}


function drawText(txt) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = 'red'
    ctx.font = '50px arial'
    ctx.fillText(txt, 50, 50)
    ctx.strokeText(txt, 150, 150)
}

function onFilterTyped(value){
    console.log('filter value = ',value);
    gFilter = value;
    renderGallery();

}
function onFilterClick(value){
    console.log('filter value = ', value);
    gFilter = value;
    renderGallery();

}