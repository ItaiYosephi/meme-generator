
function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}

//sort object function

function sortAssocObject(list) {
    var sortable = [];
    for (var key in list) {
        sortable.push([key, list[key]]);
    }

    sortable.sort(function(a, b) {
        return (a[1] < b[1] ? 1 : (a[1] > b[1] ? -1 : 0));
    });

    var orderedList = {};
    for (var i = 0; i < sortable.length; i++) {
        orderedList[sortable[i][0]] = sortable[i][1];
    }

    return orderedList;
}

//cut object by lenght function
function cutObjectbyLenght(list,length){
    if(length < list.length) length =list.length;
    var cutTable = [];
    for (var key in list) {
        cutTable.push([key, list[key]]); 
    }

    var cuttedList = {};
    for (var i = 0; i < length; i++) {
        cuttedList[cutTable[i][0]] = cutTable[i][1];
    }

    return cuttedList;
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function shuffleStaticArray(array) {
    var length = array.length
    var temp = array[length -2];
    array[length -2] = array[1];
    array[1] = temp;
    temp = array[length -1];
    array[length -1] = array[length -2];
    array[length -2] = temp;
    
    return array;
}


