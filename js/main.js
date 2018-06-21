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
    if (!gFilterListMap) gFilterListMap = { 'happy': 20, 'sunday': 2, 'ball': 7, 'game': 15, 'life': 10 };
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
    var cuttedList = cutObjectbyLenght(sortedList,5);
    var elFilter = document.querySelector('.head-filter');
    var strHTMLs = [];
    var i = 1;
    for (let key in cuttedList) {
        var filter = key;
        var currStrHTML =`<li class="filter-word font-size${i++} ${key}" onclick="onFilterClick(this.innerHTML)">${key}</li>`
        strHTMLs.push(currStrHTML);

    }
    var shuffleStrHTMLs = shuffleArray (strHTMLs)
    elFilter.innerHTML = shuffleStrHTMLs.join('');
}


function onImgClick(id) {
    updateCurrImg(id)
    toggleView()
    renderCanvas()
}

function toggleView() {

    var elEditor = document.querySelector('.editor');
    elEditor.classList.toggle('show');
    document.querySelector('main').classList.toggle('hide');

}

// function hideEditor(){
//     var elEditor = document.querySelector('.editor');
//     elEditor.classList.remove('show');     
// }

function renderCanvas() {
    ctx = elCanvas.getContext("2d");
    var img = new Image()
    img.src = getImgById(gMeme.selectedImgId).url;
    ctx.drawImage(img, 0, 0, elCanvas.width, elCanvas.height)
    renderTxts()
}

function onTxtTyped(txt) {

    updateGMeme(txt)
    renderCanvas()

}
function renderTxts() {
    if (gMeme.txts.length === 0) {
        gMeme.txts.push(makeTxt());
        gMeme.txts[0].pos.x = elCanvas.width / 2
        gMeme.txts[0].pos.y = elCanvas.width / 2
    }

    for (var i = 0; i < gMeme.txts.length; i++) {
        var currTxt = gMeme.txts[i];
        ctx.fillStyle = currTxt.color;
        ctx.font = `${gMeme.txts[gCurrTxtIdx].weight} ${gMeme.txts[gCurrTxtIdx].size}px ${gMeme.txts[gCurrTxtIdx].font}`;
        ctx.textAlign = gMeme.txts[gCurrTxtIdx].align;
        var x = currTxt.pos.x;
        var y = currTxt.pos.y;
        ctx.fillText(currTxt.line, x, y)
        // ctx.strokeText(currTxt.line, 150, 150)

    }

}



function onFilterTyped(value) {
    gFilter = value;
    renderGallery();
    renderFilterList()

}
function onFilterClick(value) {
    console.log('filter value = ', value);
    gFilter = value;
    if(gFilterListMap[value]) gFilterListMap[value]++;
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

function onChangePos(strDir) {
  changePos(strDir)
  renderCanvas();


}

function canvasClicked(ev) {
    console.log(ev);
    gMeme.txts[gCurrTxtIdx].pos.x = ev.offsetX;
    gMeme.txts[gCurrTxtIdx].pos.y = ev.offsetY;
    renderCanvas();
    
}

function onAddLine() {
    console.log('clicked');
    debugger;
    document.querySelector('.btn-add').disabled = true;
    
}

function downloadImg(elLink) {
    var imgContent = elCanvas.toDataURL('image/jpeg');
    elLink.href = imgContent
}