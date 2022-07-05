const container = document.getElementById('container');

const size = 100
var htmlCells = []
var cells = []
const dead = 0;
const alive = 1;
const clock = 100
const cellSize = window.innerHeight < window.innerWidth ? window.innerHeight * 0.8 / size : window.innerWidth * 0.9 / size


function createGrid() {
    for (var i = 0; i < size; i++) {
        var htmlEl = []
        var row = document.createElement('div');
        row.setAttribute('class', 'row')
        row.style.height = `${cellSize}px`
        cells.push(new Array(size).fill(dead))
        htmlCells.push(htmlEl)
        container.appendChild(row);
        for (var j = 0; j < size; j++) {
            var col = document.createElement('div')
            col.setAttribute('class', 'cell')
            col.style.width = `${cellSize}px`
            row.appendChild(col)
            htmlEl.push(col);
        }
    }
}


function draw() {
    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            htmlCells[i][j].setAttribute('class', 'cell ' + (cells[i][j] === alive ? 'alive' : 'dead'));
        }
    }
}

function countNeighbour(x, y) {
    var count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            else {
                count += cells[(x + i + size) % size][(y + j + size) % size]
            }

        }
    }
    return count
}

function newGeneration() {
    var newCells = []
    for (var i = 0; i < size; i++) {
        newCells.push(new Array(size).fill(dead));
    }
    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            var c = countNeighbour(i, j)
            if (cells[i][j] === alive && (c === 2 || c === 3)) newCells[i][j] = alive
            else if (cells[i][j] === dead && c === 3) newCells[i][j] = alive
        }
    }
    cells = newCells;
    draw()
}

function init() {
    createGrid()

    for (var i = 0; i < Math.floor(size * size * 0.5); i++) {
        var x, y
        while (true) {
            x = Math.floor(Math.random() * size)
            y = Math.floor(Math.random() * size)
            if (cells[x][y] === dead) {
                cells[x][y] = alive
                break
            }
        }
    }
    draw()
    setInterval(newGeneration, clock)
}

init()

console.log(container)
console.log(htmlCells)
console.log(cells)

