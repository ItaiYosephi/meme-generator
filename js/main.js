'use strict'
var elCanvas;
var ctx;
var gFilter = {};
var gFilterListMap;
var FILTER_LIST = 'filter_list';


function init() {
    elCanvas = document.querySelector('canvas');
    gFilter = '';
    gFilterListMap = loadFromStorage(FILTER_LIST);
    if (!gFilterListMap) gFilterListMap = { 'happy': 20, 'qute': 2, 'ball': 7, 'man': 15, 'usa': 10 };
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

function renderFilterList() {
    var sortedList = sortAssocObject(gFilterListMap);
    var cuttedList = cutObjectbyLenght(sortedList, 5);
    var elFilter = document.querySelector('.head-filter');
    var strHTMLs = [];
    var i = 1;
    for (let key in cuttedList) {
        var filter = key;
        var currStrHTML = `<li class="filter-word font-size${i++} ${key}" onclick="onFilterClick(this.innerHTML)">${key}</li>`
        strHTMLs.push(currStrHTML);

    }
    var shuffleStrHTMLs = shuffleStaticArray(strHTMLs)
    elFilter.innerHTML = shuffleStrHTMLs.join('');
}


function onImgClick(id) {
    resetTxts()
    updateTxtBox();
    updateCurrImg(id)
    toggleView()
    renderCanvas()
}

function toggleView() {

    var elEditor = document.querySelector('.editor');
    elEditor.classList.toggle('show');
    document.querySelector('main').classList.toggle('hide');
    document.querySelector('.filters-container').classList.toggle('hide');

}

function renderCanvas() {

    ctx = elCanvas.getContext("2d");
    var img = new Image()
    img.onload = function () {
        elCanvas.width = img.naturalWidth
        elCanvas.height = img.naturalHeight
        ctx.drawImage(img, 0, 0);
        renderTxts()

    }

    img.src = getImgById(gMeme.selectedImgId).url;
    // ctx.drawImage(img, 0, 0, elCanvas.width, elCanvas.height)
}

function onTxtTyped(txt) {

    updateGMeme(txt)
    renderCanvas()

}
function renderTxts() {
    if (gMeme.txts.length === 0) {
        gMeme.txts.push(makeTxt());

    }

    for (var i = 0; i < gMeme.txts.length; i++) {
        var currTxt = gMeme.txts[i];
        ctx.fillStyle = currTxt.color;
        ctx.font = `${gMeme.txts[i].weight} ${gMeme.txts[i].size}px ${gMeme.txts[i].font}`;
        ctx.textAlign = gMeme.txts[i].align;
        // ctx.font = `${gMeme.txts[gCurrTxtIdx].weight} ${gMeme.txts[gCurrTxtIdx].size}px ${gMeme.txts[gCurrTxtIdx].font}`;
        // ctx.textAlign = gMeme.txts[gCurrTxtIdx].align;
        var x = currTxt.pos.x;
        var y = currTxt.pos.y;
        ctx.fillText(currTxt.line, x, y)
        // ctx.strokeText(currTxt.line, 150, 150)

    }

}
 

function onFilterTyped(value) {
    gFilter = value;
    renderGallery();
    // renderFilterList()

}
function onFilterClick(value) {
    console.log('filter value = ', value);
    gFilter = value;
    if (gFilterListMap[value]) gFilterListMap[value]++;
    else gFilterListMap[value] = 1;
    console.log(gFilterListMap[value]);
    renderGallery();
    renderFilterList()
    saveToStorage(FILTER_LIST, gFilterListMap);

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

function onOpenChangeAlign(){
    openChangeTxtAlign();
    renderCanvas();
}
function onChangeAlign(elAlign){
    console.log(elAlign);
    changeTxtAlign(elAlign);
}

function onChangePos(strDir) {
    changePos(strDir)
    renderCanvas();

}

function onNextLineTxt(){
    moveNextTxtIdx();
}

function onPrevLineTxt(){
    movePrevTxtIdx();
}

function onChangeFont(elFont){
    changeFont(elFont);
    renderCanvas();
}



function canvasClicked(ev) {
    console.log(ev);
    var MousePos = getMousePos(elCanvas, ev) ;
    gMeme.txts[gCurrTxtIdx].pos.x = MousePos.x;
    gMeme.txts[gCurrTxtIdx].pos.y = MousePos.y;
    renderCanvas();

}

function  getMousePos(canvas, ev) {
    var rect = canvas.getBoundingClientRect(), // abs. size of element
        scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for X
        scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for Y
  
    return {
      x: (ev.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
      y: (ev.clientY - rect.top) * scaleY     // been adjusted to be relative to element
    }
  }
function onAddLine() {
    console.log('clicked');
    addTxtLine();
    renderCanvas();
   // debugger;
   // document.querySelector('.btn-add').disabled = true;
    
}

function onRemoveLine(){
    removeTxtLine();
    renderCanvas();
}

function downloadImg(elLink) {
    console.log(elCanvas)
    console.log(event)
    var imgContent = elCanvas.toDataURL('image/jpeg');
    elLink.href = imgContent
}

function toggleMenu() {
    var elBurger = document.querySelector('.burger')
    var isOpen = document.querySelector('.main-menu').classList.toggle('menu-open');
    var elHeader = document.querySelector('header').classList.toggle('menu-open');
    if (isOpen) {
        elBurger.innerHTML = `&times;`

    } else {
        elBurger.innerText = '☰';
    }

}