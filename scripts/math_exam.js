const $$suma = (menor=0, mayor=10, num_ques=4) => {
    let num1 = $$randInt(menor, mayor);
    let num2 = $$randInt(menor, mayor);
    let res = num1 + num2;

    return [
        res, `${num1} + ${num2} = `, 
        $$shuffle( $$nums_generate(
            num_ques,  res-(res >= 10 ? 10 : res), res+10, res
        ))
    ];
}

const $$resta = (menor=0, mayor=10, num_ques=4, num_neg=false) => {
    let num1 = $$randInt(menor, mayor);
    let num2 = $$randInt(menor, mayor);
    
    if (num2 > num1 && !(num_neg) ) {
        n3 = num1; num1 = num2;
        num2 = n3;
    }

    let res = num1 - num2;

    return [
        res, `${num1} - ${num2} = `, 
        $$shuffle( $$nums_generate(
            num_ques,  res-(res >= 10 ? 10 : res), res+10, res
        ))
    ];
}

const $$multiplicacion = (menor=0, mayor=10, num_ques=4) => {
    let num1 = $$randInt(menor, mayor);
    let num2 = $$randInt(menor, mayor);
    
    let format_mult = (n1, n2) => {
        return $$choice_([
            `${n1} x ${n2} = `, `${n1} (${n2}) = `,
            `${n1} * ${n2} = `, `(${n1}) ${n2} = `
        ]);
    }

    let res = num1 * num2;

    return [
        res, format_mult(num1, num2), 
        $$shuffle( $$nums_generate(
            num_ques,  res-(res >= 10 ? 10 : res), res+10, res
        ))
    ];
}

const $$divicion = (menor=0, mayor=10, num_ques=4) => {
    let num1 = $$randInt(menor, mayor);
    let res = $$randInt(menor, mayor);
    let num2 = num1 * res;

    return [
        res, `${num2} / ${num1} = `, 
        $$shuffle( $$nums_generate(
            num_ques,  res-(res >= 10 ? 10 : res), res+10, res
        ))
    ];
}

const chars_ = 'abcdefghijklmnñopqrstuvwxz';

const $$sum_algebraica = () => {
    let num1 = $$randInt(menor, mayor);
    let num2 = $$randInt(menor, mayor);
    let res = num1 + num2;

    return [
        res, `Cuanto vale {} ${num1} + ${num2} = `, 
        $$shuffle( $$nums_generate(
            num_ques,  res-(res >= 10 ? 10 : res), res+10, res
        ))
    ];
} 


const $$crear_fracciones = (num, den) => {
    return `<table class=\\"dibujar fr\\"> <th>${num}</th> <td>${den}</td> </table>`
}


const $$Operaciones = (nivel, num_ques=4) => { // local opcion = lopc
    let lopc_='', lops_=[], lopc_o_='';
    let operacion = 'aritmetica';
    nivel = nivel ?? 0;
    let op = [];
    
    //* Suma y resta de un digito
    if (nivel === 0) { 
        op = $$choice_([$$suma(0, 9), $$resta(0, 9)]);

    //* Suma y resta del 10 al 49
    } else if (nivel === 1) { 
        op = $$choice_([$$suma(10, 49), $$resta(10, 49)]);
    
    /* Suma y resta de dos digitos, 
    y mutiplicacion de un digito */ 
    } else if (nivel === 2) { 
        op = $$choice_([
            $$suma(0, 99, num_ques), $$resta(0, 99, num_ques), 
            $$multiplicacion(0, 10, num_ques)
        ]);

    /* mutiplicacion de un digito, y por 10, 15,
    y divicion de un digito, por y 10 */ 
    } else if (nivel === 3) {
        let mult = $$multiplicacion(0, 10, num_ques-1);
        mult[2] = $$shuffle( mult[2].concat(15) );

        op = $$choice_([
            mult, $$divicion(0, 10, num_ques)
        ]);
    
    } else if (nivel === 4) { 

    }


    if (operacion === 'aritmetica') {
        lopc_o_ = `Resolver: ${op[1]}`;
        lops_  = op[2];
        lopc_ = op[0];
    }

    return [lopc_o_, lops_, lopc_];
}

//* De: Francisco Velez
