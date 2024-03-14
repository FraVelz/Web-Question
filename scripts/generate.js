let $$remove = (array, index=0) => {
    return array.slice(0,index).concat(array.concat(null).slice(index+1, -1));
}

let $$nums_generate = (long=4,  menor=0, mayor=10, correct=1) => {
    let nums = new Set([correct]);
    let return_ = [];

    do {
        nums.add($$randInt(menor, mayor));
    } while (nums.size < long);

    nums.forEach( v => { return_ = return_.concat(v) } )
    return return_;
}

let $$randInt = (min_=1, max_=9) => Math.floor( Math.random() * ((max_+1)-min_) + min_);
    
let $$range_ = (inicio=0, final=10, inc=1) => { let return_ = [];
    for (let i=inicio; i<=final; i+=inc) { return_ = return_.concat(i); }
    return return_;
}
    
let $$choice_ = array_c => array_c[$$randInt(0, array_c.length-1)];
    
let $$shuffle = array => { 
    for (let i = array.length-1; i > 0; i--) {
        let j = $$randInt(0, i); [array[i], array[j]] = [array[j], array[i]]
    }
    return array; 
}

let $info = (type_, preguntas_) => {
    // type_ = type_ == null ? 'math' : type_
    preguntas_ = preguntas_ ?? 3
    type_ = type_ ?? 'math'

    let new_ = [], return_ = {};

    for (let i = 1; i <= preguntas_; i++) {
        let pr_ = '¿ Pregunta ?';
        let opcs_ = [1, 2, 3, 4];
        let opc_o_ = '3';

        if (type_ == 'math') {
            let nivel_ = 3;
            [pr_, opcs_, opc_o_] = $$Operaciones(nivel_, 4);
        }

        new_ = new_.concat( [[
            `campo${i}`,  [
                ['pregunta', pr_], 
                ['opciones', opcs_], 
                ['OpcionCorrecta', opc_o_]
            ]
        ]] );
    }

    new_.map( campo => {
        return_ = {
            ...return_, [campo[0]]: {
                [ campo[1][0][0] ]: campo[1][0][1],
                [ campo[1][1][0] ]: campo[1][1][1],
                [ campo[1][2][0] ]: campo[1][2][1],
            }
        }
    });

    return return_;
}
