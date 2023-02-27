// Seek: https://editor.p5js.org/codingtrain/sketches/AxuChwlgb
// Seek with Sliders: https://editor.p5js.org/codingtrain/sketches/DROTtSI7J
// Arrive: https://editor.p5js.org/codingtrain/sketches/dQx9oOfTN
// Pursue: https://editor.p5js.org/codingtrain/sketches/XbsgoU_of

class Vehicle {
    constructor(x, y, vel) {
        
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.maxSpeed = 4;
        this.maxForce = 0.25;
        this.r = 16;
    }

    seek(target) {
        let posY = Math.floor(this.pos.y);
        let posX = Math.floor(this.pos.x);
        let tarX = Math.floor(target.x);
        let tarY = Math.floor(target.y);

        let force = p5.Vector.sub(target, this.pos);
        force.setMag(this.maxSpeed);
        force.sub(this.vel);
        force.limit(this.maxForce);
        this.applyForce(force);
        if ((posY >= tarY - 4 && posY <= tarY + 4) && (posX >= tarX - 4 && posX <= tarX + 4)) {
            target.x = Math.random() * 500;
            target.y = Math.random() * 500;
            circle(target.x, target.y, 10);
            this.count += 1;
            console.log("Comidas coletadas: " + this.count);
        }


    }

    applyForce(force) {
        this.acc.add(force);
    }

    update() {
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);
        this.acc.set(0, 0);
        this.edges();
    }

    show() {
        stroke('#d1a162');
        strokeWeight(3);
        fill(255);
        circle(this.pos.x, this.pos.y, 25);
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading() + PI/2);
        beginShape();
        endShape(CLOSE);
        //triangle(-this.r, -this.r / 2, -this.r, this.r / 2, this.r, 0);

        pop();
    }

    edges() {
        if (this.pos.x > width + this.r) {
            this.pos.x = -this.r;
        } else if (this.pos.x < -this.r) {
            this.pos.x = width + this.r;
        }
        if (this.pos.y > height + this.r) {
            this.pos.y = -this.r;
        } else if (this.pos.y < -this.r) {
            this.pos.y = height + this.r;
        }
    }

    //Djikstra
    minDistance(D, matrix) {
        let min = Number.MAX_VALUE;
        let indexX = -1;
        let indexY = -1;
        for (let v = 0; v < BOARD_TILES; v++) {
            for (let u = 0; u < BOARD_TILES; u++) {
                if (matrix[v][u] != -1 && dist[v][u] <= min) {
                    min = dist[v][u];
                    indexX = v;
                    indexY = u;
                }
            }
        }
        return [indexX, indexY];
    }

    djikstraAux(matrix) {
        let D = matrix;
        for (var i = 0; i < BOARD_TILES; i++) {
            for (var j = 0; j < BOARD_TILES; j++) {
                D[i][j] = Number.MAX_VALUE;
            }
        }
        let discreteX = (this.pos.x - TILE_SIZE / 2) / TILE_SIZE;
        let discreteY = (this.pos.y - TILE_SIZE / 2) / TILE_SIZE;
        console.log(discreteX, discreteY);
        D[discreteX][discreteY] = 0;
        matrix[discreteX][discreteY] = 5;
        setTimeout(() => {
            stroke(0);
            strokeWeight(1);
            fill(50);
            rect(discreteX * TILE_SIZE, discreteY * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            this.show();
            this.djikstra(D, matrix);
        }, 500);

    }

    djikstra(D, matrix) {
        let index = minDistance(D, matrix);

        let Terreno = matrix[index[0]][index[1]]

        matrix[index[0]][index[1]] = 5;
        stroke(0);
        strokeWeight(1);
        fill(50);
        rect(discreteX * TILE_SIZE, discreteY * TILE_SIZE, TILE_SIZE, TILE_SIZE);

        //atualizar a distância dos vértices adjacentes ( [x+1,y], [x,y+1], [x-1,y], [x,y-1]) com o valor do terreno atual
        D[index[0] + 1][index[1]] = Terreno;
        D[index[0]][index[1] + 1] = Terreno;
        D[index[0] - 1][index[1]] = Terreno;
        D[index[0]][index[1] - 1] = Terreno;

    }

    //Prim (Algorimo Guloso)
    /* 
    Começa selecionando um vértice inicial e adicionando todos os seus vizinhos
    à uma lista de possíveis conexões. Em seguida, seleciona a conexão com menor peso, 
    adicionando o vértice correspondente à árvore geradora e seus vizinhos à lista de 
    conexões.
    */
    minWeightEdge(D, matrix, visited) {
        let min = Number.MAX_VALUE;
        let indexX = -1;
        let indexY = -1;
        for (let v = 0; v < BOARD_TILES; v++) {
            for (let u = 0; u < BOARD_TILES; u++) {
                if (matrix[v][u] != -1 && !visited[v][u] && D[v][u] < min) {
                    min = D[v][u];
                    indexX = v;
                    indexY = u;
                }
            }
        }
        return [indexX, indexY];
    }

    primAux(matrix) {
        let D = matrix;
        let visited = [];
        for (var i = 0; i < BOARD_TILES; i++) {
            visited.push([]);
            for (var j = 0; j < BOARD_TILES; j++) {
                visited[i].push(false);
                D[i][j] = Number.MAX_VALUE;
            }
        }
        let discreteX = (this.pos.x - TILE_SIZE / 2) / TILE_SIZE;
        let discreteY = (this.pos.y - TILE_SIZE / 2) / TILE_SIZE;
        console.log(discreteX, discreteY);
        D[discreteX][discreteY] = 0;
        visited[discreteX][discreteY] = true;
        matrix[discreteX][discreteY] = 5;
        setTimeout(() => {
            stroke(0);
            strokeWeight(1);
            fill(50);
            rect(discreteX * TILE_SIZE, discreteY * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            this.show();
            this.prim(D, matrix, visited);
        }, 500);

    }

    prim(D, matrix, visited) {
        let index = minWeightEdge(D, matrix, visited);
        visited[index[0]][index[1]] = true;
        let Terreno = matrix[index[0]][index[1]]
        matrix[index[0]][index[1]] = 5;
        stroke(0);
        strokeWeight(1);
        fill(50);
        rect(index[0] * TILE_SIZE, index[1] * TILE_SIZE, TILE_SIZE, TILE_SIZE);

        //atualizar a distância dos vértices adjacentes ( [x+1,y], [x,y+1], [x-1,y], [x,y-1]) com o valor do terreno atual
        if (index[0] + 1 < BOARD_TILES && !visited[index[0] + 1][index[1]]) {
            let newDistance = matrix[index[0] + 1][index[1]];
            if (newDistance < D[index[0] + 1][index[1]]) {
                D[index[0] + 1][index[1]] = newDistance;
            }
        }
        if (index[1] + 1 < BOARD_TILES && !visited[index[0]][index[1] + 1]) {
            let newDistance = matrix[index[0]][index[1] + 1];
            if (newDistance < D[index[0]][index[1] + 1]) {
                [index[0]][index[1] + 1] = newDistance;
            }
        }    
        if (index[0] - 1 >= 0 && !visited[index[0] - 1][index[1]]) {
            let newDistance = matrix[index[0] - 1][index[1]];
            if (newDistance < D[index[0] - 1][index[1]]) {
                D[index[0] - 1][index[1]] = newDistance;
            }
        }
        if (index[1] - 1 >= 0 && !visited[index[0]][index[1] - 1]) {
            let newDistance = matrix[index[0]][index[1] - 1];
            if (newDistance < D[index[0]][index[1] - 1]) {
                D[index[0]][index[1] - 1] = newDistance;
            }
        }
        //chamada recursiva do algoritmo de Prim
        if (!allVisited(visited)) {
            setTimeout(() => {
                this.prim(D, matrix, visited);
            }, 500);
        }


    }


}