// Drum Arrays
let kicks = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]; 
let snares = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]; 
let hiHats = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]; 
let rideCymbals = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];

function getDrumArray(drumName) {
    if (drumName == 'kicks') return kicks;
    else if (drumName == 'snares') return snares;
    else if (drumName == 'hiHats') return hiHats;
    else if (drumName == 'rideCymbals') return rideCymbals;
    else return null;
}

function toggleDrum(drum, index) {
    let drumArr = getDrumArray(drum);
    
    if (drumArr != null && index >= 0 && index < 16) {
        drumArr[index] = !drumArr[index];
    }
}

function clear(drum) {
    let drumArr = getDrumArray(drum);
    if (drumArr != null) {
        drumArr.fill(false);
    }
}

function invert(drum) {
    for(let i = 0; i < 16; i++) {
        toggleDrum(drum, i);
    }
}

function getNeighborPads(x, y, size) {
    const neighborPads = [];
    
    if (x >= size || y >= size || x < 0 || y < 0 || size < 1) return neighborPads;
    
    neighborPads.push([x-1, y]);
    neighborPads.push([x, y-1]);
    neighborPads.push([x+1, y]);
    neighborPads.push([x, y+1]);
    return neighborPads.filter(function(neighbor) {
        return neighbor.every(function(val) {
            return (val >= 0 && val < size);
        });
    });
}