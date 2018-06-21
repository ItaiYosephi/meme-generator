'use strict'
var elCanvas;
var ctx;
var gFilter = {};
var gFilterListMap;
var FILTER_LIST ='filter_list';


function init() {
    gFilter = '';
    gFilterListMap = loadFromStorage(FILTER_LIST);
    if (!gFilterListMap) gFilterListMap =  {'happy' :20,'sunday':2,'ball':7,'game':15,'life':10};
    renderFilterList();
    renderGallery();
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

function renderFilterList(){
    var sortedList = sortAssocObject(gFilterListMap);
    var elFilter = document.querySelector('.head-filter');
    var strHTMLs = [];
    for (let key in sortedList) {
        var filter = key;
        var currStrHTML =`<li class="filter-word ${key}" onclick="onFilterClick(this.innerHTML)">${key}</li>`
        strHTMLs.push(currStrHTML);
         
    }
    elFilter.innerHTML = strHTMLs.join('');
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
        ctx.fillStyle = currTxt.color;
        ctx.font = `${gMeme.txts[gCurrTxtIdx].weight} ${gMeme.txts[gCurrTxtIdx].size}px ${gMeme.txts[gCurrTxtIdx].font}`;
        ctx.textAlign = gMeme.txts[gCurrTxtIdx].align;
        var x = elCanvas.width / 2;
        // var y = elCanvas.height / 2;

        ctx.fillText(currTxt.line, x, 50)
        // ctx.strokeText(currTxt.line, 150, 150)

    }
}



function onFilterTyped(value){
    gFilter = value;
    renderGallery();
    renderFilterList()

}
function onFilterClick(value){
    console.log('filter value = ', value);
    gFilter = value;
    renderGallery();
    renderFilterList()

}

function onChangeColor(colorStr) {
    updateColor(colorStr)
    renderCanvas();

    
}

function onChangeSize(opStr) {
    var diff = 3;
    if (opStr === '-') {
        diff *= -1;
    }
    changeSize(diff);
    renderCanvas();
}

function onChangeWeight() {
    changeWeight()
    renderCanvas();

}