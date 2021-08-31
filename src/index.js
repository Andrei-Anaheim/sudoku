module.exports = function solveSudoku(matrix) {
  let guessing=false;
  let guesstime=0;
  solve(matrix, guessing, guesstime);
  return matrix;
}

function solve(matrix, guessing, guesstime){
  let matrixcopy = Array.from(matrix);
  
  let summatrixcopy = matrixcopy.reduce((a,b) => a + b.reduce((c,d) => c + d) ,0)


  for (let i=0; i<9; i+=1) {
    for (let j=0; j<9; j+=1) {
      if (matrix[i][j]!== 0 && typeof matrix[i][j] === 'number') {
      } else {
        checkBasic(i,j,matrix,guessing)
      }
    }
  }
  checkReverse(matrix)
  let summatrix = matrix.reduce((a,b) => a + b.reduce((c,d) => c + d) ,0)
  
  if (summatrixcopy !== summatrix) {
    guessing=false;
    matrixcopy = matrix
    // console.log(matrix)
    solve(matrix, guessing, guesstime)
  } else {
    // console.log('guess'+guesstime);
    if(guesstime<3){
      guessing = true;
      guesstime+=1;
      matrixcopy = matrix
      // console.log(matrix)
      console.log('guesstime:'+guesstime)
      solve(matrix, guessing, guesstime)
    } else {
      console.log(matrix);
      return matrix;
    }
  }
  // console.log(matrix);
  return matrix;
}


function checkBasic(i,j,matrix,guessing) {
  // Проверка по строке - итогом либо записываем число, либо массив возможных данных
  let matrixnew = matrix[i].filter(el => el!==0 && typeof el === 'number') // записали массивом значения уже записанные в строке i
  let resultij =[]
  let resultji =[]
  let resultblock =[]
  // console.log('matrix do guess:');
  // console.log(matrix);
  if (guessing===true) {
    // console.log('matrix'+i+j + '=' + matrix[i][j][0])
    matrix[i][j] = matrix[i][j][0];
    guessing=false;
    // console.log('matrix posle guess:');
    // console.log(matrix);
    return matrix;
  }

  for (let k=1; k<=9; k+=1) {
    if (matrixnew.includes(k)) {
    } else {
      resultij.push(k);
    }
  }
  if (resultij.length === 1) {
    matrix[i][j]=Number(resultij);
    return matrix;
  } else {
    matrix[i][j]=resultij;
    // Проверка по столбцу
    const transpose = array => array.reduce((r, a) => a.map((v, i) => [...(r[i] || []), v]), []);
    let transposematrix = transpose(Array.from(matrix)); 
    // console.log(transposematrix)
    let matrixnew2 = transposematrix[j].filter(el => el!==0 && typeof el === 'number') // записали массивом значения уже записанные в столбце j
    for (let l=0; l<matrix[i][j].length; l+=1) {
      if (matrixnew2.includes(matrix[i][j][l])) {
      } else {
        resultji.push(matrix[i][j][l]);
      }
    }
  }
  if (resultji.length === 1) {
    matrix[i][j]=Number(resultji);
    return matrix;
  } else {
    matrix[i][j]=resultji;
    // Проверка по блоку 3*3
    let block = [];
    if (i%3===0 && j%3===0) {
      block.push(matrix[i][j+1], matrix[i][j+2], matrix[i+1][j], matrix[i+1][j+1], matrix[i+1][j+2], matrix[i+2][j], matrix[i+2][j+1], matrix[i+2][j+2])
      block = block.filter(el => el !== 0)
    } else if (i%3===0 && j%3===1) {
      block.push(matrix[i][j-1], matrix[i][j+1], matrix[i+1][j-1], matrix[i+1][j], matrix[i+1][j+1], matrix[i+2][j-1], matrix[i+2][j], matrix[i+2][j+1])
      block = block.filter(el => el !== 0)
    } else if (i%3===0 && j%3===2) {
      block.push(matrix[i][j-2], matrix[i][j-1], matrix[i+1][j-2], matrix[i+1][j-1], matrix[i+1][j], matrix[i+2][j-2], matrix[i+2][j-1], matrix[i+2][j])
      block = block.filter(el => el !== 0)
    } else if (i%3===1 && j%3===0) {
      block.push(matrix[i-1][j], matrix[i-1][j+1], matrix[i-1][j+2], matrix[i][j+1], matrix[i][j+2], matrix[i+1][j], matrix[i+1][j+1], matrix[i+1][j+2])
      block = block.filter(el => el !== 0)
    } else if (i%3===1 && j%3===1) {
      block.push(matrix[i-1][j-1], matrix[i-1][j], matrix[i-1][j+1], matrix[i][j-1], matrix[i][j+1], matrix[i+1][j-1], matrix[i+1][j], matrix[i+1][j+1])
      block = block.filter(el => el !== 0)
    } else if (i%3===1 && j%3===2) {
      block.push(matrix[i-1][j-2], matrix[i-1][j-1], matrix[i-1][j], matrix[i][j-2], matrix[i][j-1], matrix[i+1][j-2], matrix[i+1][j-1], matrix[i+1][j])
      block = block.filter(el => el !== 0)
    } else if (i%3===2 && j%3===0) {
      block.push(matrix[i-2][j], matrix[i-2][j+1], matrix[i-2][j+2], matrix[i-1][j], matrix[i-1][j+1], matrix[i-1][j+2], matrix[i][j+1], matrix[i][j+2])
      block = block.filter(el => el !== 0)
    } else if (i%3===2 && j%3===1) {
      block.push(matrix[i-2][j-1], matrix[i-2][j], matrix[i-2][j+1], matrix[i-1][j-1], matrix[i-1][j], matrix[i-1][j+1], matrix[i][j-1], matrix[i][j+1])
      block = block.filter(el => el !== 0)
    } else if (i%3===2 && j%3===2) {
      block.push(matrix[i-2][j-2], matrix[i-2][j-1], matrix[i-2][j], matrix[i-1][j-2], matrix[i-1][j-1], matrix[i-1][j], matrix[i][j-2], matrix[i][j-1])
      block = block.filter(el => el !== 0)
    }
    for (let m=0; m<matrix[i][j].length; m+=1) {
      if (block.includes(matrix[i][j][m])) {
      } else {
        resultblock.push(matrix[i][j][m]);
      }
    }
  }
  if (resultblock.length === 1) {
    matrix[i][j]=Number(resultblock);
    return matrix
  } else {
    matrix[i][j]=resultblock; // проведены базовые проверки по ячейкам
  }    
}    

function checkReverse (matrix) {
  // Проверка от обратного по строкам
  for (let i=0; i<9; i+=1) {
    let rowquiz = matrix[i].filter(el => typeof el !=='number').toString().split(''); //[[1,4],[1,5],[1,5]]
    let rownonquiz = matrix[i].filter(el => typeof el ==='number').toString().split(''); // [2,3,6,7,8,9]
    let unique = rowquiz.filter((v,i) => rowquiz.indexOf(v)===rowquiz.lastIndexOf(v)); //[4]
    // console.log ('uniq:' + unique)   
    if (unique.length>0) {
      for (let n=0; n<unique.length; n+=1) {
        for (let j=0; j<9; j+=1) {
          if (matrix[i][j].toString().split('').includes(unique[n]) && !rownonquiz.some(el => el===unique[n])) {
            matrix[i][j]=Number(unique[n]);
          }
        }
      }
    }
  }
  // Проверка от обратного по столбцам
  for (let j=0; j<9; j+=1) {
    const transpose2 = array => array.reduce((r, a) => a.map((v, i) => [...(r[i] || []), v]), []);
    let transposematrix2 = transpose2(Array.from(matrix))
    let columnquiz = transposematrix2[j].filter(el => typeof el !=='number').toString().split(''); //[[1,4],[1,5],[1,5]]
    let columnnonquiz = transposematrix2[j].filter(el => typeof el ==='number').toString().split(''); // [2,3,6,7,8,9]
    let unique2 = columnquiz.filter((v,i) => columnquiz.indexOf(v)===columnquiz.lastIndexOf(v)); //[4]
    // console.log ('uniq2:' + unique2)   
    if (unique2.length>0) {
      for (let p=0; p<unique2.length; p+=1) {
        for (let i=0; i<9; i+=1) {
          if (matrix[i][j].toString().split('').includes(unique2[p]) && !columnnonquiz.some(el => el===unique2[p])) {
            matrix[i][j]=Number(unique2[p]);
          }
        }
      }
    }
  }
    // Проверка от обратного по блокам
  let sbloc=[[matrix[0][0],matrix[0][1],matrix[0][2],matrix[1][0],matrix[1][1],matrix[1][2],matrix[2][0],matrix[2][1],matrix[2][2]],
             [matrix[0][3],matrix[0][4],matrix[0][5],matrix[1][3],matrix[1][4],matrix[1][5],matrix[2][3],matrix[2][4],matrix[2][5]],
             [matrix[0][6],matrix[0][7],matrix[0][8],matrix[1][6],matrix[1][7],matrix[1][8],matrix[2][6],matrix[2][7],matrix[2][8]],
             [matrix[3][0],matrix[3][1],matrix[3][2],matrix[4][0],matrix[4][1],matrix[4][2],matrix[5][0],matrix[5][1],matrix[5][2]],
             [matrix[3][3],matrix[3][4],matrix[3][5],matrix[4][3],matrix[4][4],matrix[4][5],matrix[5][3],matrix[5][4],matrix[5][5]],
             [matrix[3][6],matrix[3][7],matrix[3][8],matrix[4][6],matrix[4][7],matrix[4][8],matrix[5][6],matrix[5][7],matrix[5][8]],
             [matrix[6][0],matrix[6][1],matrix[6][2],matrix[7][0],matrix[7][1],matrix[7][2],matrix[8][0],matrix[8][1],matrix[8][2]],
             [matrix[6][3],matrix[6][4],matrix[6][5],matrix[7][3],matrix[7][4],matrix[7][5],matrix[8][3],matrix[8][4],matrix[8][5]],
             [matrix[6][6],matrix[6][7],matrix[6][8],matrix[7][6],matrix[7][7],matrix[7][8],matrix[8][6],matrix[8][7],matrix[8][8]]]
  for (let o=0;o<9;o+=1) {
    let blockquiz = sbloc[o].filter(el => typeof el !=='number').toString().split(''); //[[1,4],[1,5],[1,5]]
    let blocknonquiz = sbloc[o].filter(el => typeof el ==='number').toString().split(''); // [2,3,6,7,8,9]
    let unique3 = blockquiz.filter((v,i) => blockquiz.indexOf(v)===blockquiz.lastIndexOf(v)); //[4]
    if (unique3.length>0) {
      for (let c=0; c<unique3.length; c+=1) {
        for (let u=0; u<9; u+=1) {
          if (sbloc[o][u].toString().split('').includes(unique3[c]) && !blocknonquiz.some(el => el===unique3[c])) {
            matrix[Math.floor(o/3)*3+Math.floor(u/3)][(o%3)*3+(u%3)]=Number(unique3[c]); // неверные коды перевода в этой строчке
          }
        }
      }
    }
  }
}