// ************ ************ Button Modo (Oscuro/Claro) ************ ************ //

let btn_m1 = document.querySelector('#cap1');
let btn_m2 = document.querySelector('#cap2');

let colors = {
    claros:  { fondo: 'linear-gradient( to top, rgba(0, 0, 255, 1), rgba(0, 255, 255, 1))' }, // body
    oscuros: { fondo: 'background-color: transparent' }, // body
    
    colors_f(modo='claros') {
        let s = `background: ${this[modo].fondo}; background-attachment: fixed; background-repeat: no-repeat;`
        document.querySelector('body').style = s;
    }
}

let isPress = false, num = 3;

let apricarModo = () => { 
    let ver = true; if (!isPress) { // * Modo Claro
        let n1 = setInterval( () => {

            if (num <= 30) {
                (ver) ? colors.colors_f('claros') : ver = false;
                btn_m2.style = `left: ${num++}px;`;

            } else {
                clearInterval(n1); isPress = !false; ver = true;
            }
        }, 10);

    } else { ver = true; // * Modo Oscuro

        let n2 = setInterval( () => {
            if (num > 3) {
                (ver) ? colors.colors_f('oscuros') : ver = false;
                btn_m2.style = `left: ${num--}px;`;
                
            } else {
                clearInterval(n2); isPress = !true;
            }
        }, 10);
    }
}

btn_m1.addEventListener('click', apricarModo);

// ************ ************ Presentar preguntas ************ ************ //

const entender = (file_json, strToJSON=true) => {
    let preguntas = [], opciones = [], opc_correcta = [];

    if (strToJSON) {
        file_json = JSON.parse(file_json);
    }

    len_ = file_json.length;

    for (let campo in file_json) {
        preguntas.push(file_json[campo].pregunta);
        opciones.push(file_json[campo].opciones);
        opc_correcta.push(file_json[campo].OpcionCorrecta);
    }

    return [preguntas, opciones, opc_correcta]
} 

// ************ ************ Crear Elementos ************ ************ //

let info = $info('math', 3);
let infor = entender(info, false);

const generate_ = () => {
    for (let a in infor[0]) { 
        const article_ = document.createElement("article");
        article_.classList.add('form', `f${a}`);
        document.querySelector(".container").appendChild(article_);

        const question = document.createElement("div");
        question.classList.add("question"); question.innerHTML = infor[0][a];
        article_.appendChild(question);

        for (let b in infor[1][a]) { // Crear div > (input[checkbox], label)
            const opc = document.createElement("div"); opc.classList.add(`opc`);
            opc.classList.add(`num${a}-${b}`); article_.appendChild(opc)

            const opcs = document.createElement("input"); opcs.classList.add("opcs");
            opcs.type = 'checkbox'; opcs.id = `num${a}-${b}`;  opc.appendChild(opcs);

            const lbl = document.createElement('label'); lbl.htmlFor = `num${a}-${b}`;
            lbl.textContent = infor[1][a][b]; lbl.id = `lbl${a}-${b}`; opc.appendChild(lbl);
        }
    }
}

generate_()

// ************ ************ Comprobar Respuestas ************ ************ //

let campos_len = infor[0].length;
let campos_num = [1, 2];

let enlaces_ = (num, txt) => {
    let href_ = (num === 1) ? '#cap1' : `#num${num-2}-3`
    return `<a href="${href_}">${txt}</a>`
}

let sum_points_t = (pos, neg) => {
    pos = (pos == undefined) ? 0 : pos
    neg = (neg == undefined) ? 0 : neg
    return pos - neg
}

let add_points_t = (total, campo_) => {
    total.set( 
        campo_, sum_points_t( points_positivos.get(campo_), points_negativos.get(campo_) )
    );
}

let config_points = (num=1) => {
    add_points_t(points_total, `campo${num}`)
    agregar_val(points_positivos.get(`campo${num}`), num, '+' )
    agregar_val(points_negativos.get(`campo${num}`), num, '-' )
    agregar_val(points_total.get(`campo${num}`), num, '=')            
}

document.querySelector('.siguiente .r').addEventListener('click', () => {
    document.querySelectorAll('.title_A').forEach( (e, index) => {
        if (campos_num[index]+1 <= campos_len) { 
            campos_num[index] += 2; 
            config_points(campos_num[index]);
            e.innerHTML = enlaces_(campos_num[index], `Campo${campos_num[index]}`)
        }
    });
});

document.querySelector('.siguiente .l').addEventListener('click', () => {
    document.querySelectorAll('.title_A a').forEach( (e, index) => {
        if (campos_num[index]-2 >= 1) {
            campos_num[index] -= 2; 
            config_points(campos_num[index]);
            e.innerHTML = enlaces_(campos_num[index], `Campo${campos_num[index]}`)    
        }
    });
});

document.querySelectorAll('.title_A a').forEach((e) => {
    e.addEventListener('click', () => {
    });
});

let opc_ = document.querySelectorAll('.opc');

let verificar = (inf=[], form_=0) => {
    return inf.map( v => ( v.trim().replace('-', '') === infor[2][form_] ) ? true : false );
}

let points_total = new Map(), _num_t = 0;
let points_positivos = new Map(), _num_p = 0;
let points_negativos = new Map(), _num_n = 0;

let vr_opciones = {num : 0, dactos: []}, verify = false, c_ = [];
let btn_cerrar = document.querySelector('.cerrar');
let msg = document.querySelector('.message');

let reset_vlr = () => {
    points_total = new Map(), _num_t = 0;
    points_positivos = new Map(), _num_p = 0;
    points_negativos = new Map(), _num_n = 0;
}

btn_cerrar.addEventListener('click', () => {
    msg.classList.remove('open');
    msg.classList.add('close');
    reset_vlr()

    setTimeout( () => {
        msg.classList.remove('close');
        msg.style = 'display: none;';
    }, 2000);
});

let agregar_val = (points, num, sym='+') => {
    sym = (sym === '+') ? 'pos' : (
        sym === '-') ? 'neg' : 'l';
    
    points = (points == undefined) ? 0 : points
    num = (num % 2 == 0) ? 2 : 1

    document.querySelector(`.n.${sym}${num}`).innerHTML = points;
}

let sumPoints = (points_, camp_) => {
    let n = ( points_.has(camp_) ) ? points_.get(camp_)+10 : 10
    points_.set(camp_, n);
}

let func_verify = () => {
    let checkbox_ = document.querySelectorAll('.opcs');
    reset_vlr()

    checkbox_.forEach( v => {
        let _label_ = document.querySelector('#' + v.id.replace('num', 'lbl')); // label del boton selecionado
        let form = v.id.replace('num', '').split('-')[0].trim(); // Numero de formulario
        
        if (v.checked) {
            let form = v.id.replace('num', '').split('-')[0].trim(); // Numero de formulario
            _label_ = document.querySelector('#' + v.id.replace('num', 'lbl')); // label del boton selecionado

            if (_label_.innerHTML == infor[2][form]) {
                _label_.style = 'color: rgba(0, 255, 0, .7);';
                sumPoints(points_positivos, `campo${+(form) + +(1)}`);

            } else if (typeof infor[2][form] == 'object' && infor[2][form].length >= 2) {

                if (infor[2][form].filter( v => _label_.innerHTML.trim() == v ).length >= 1) {
                    _label_.style = 'color: rgba(0, 255, 0, .7);';
                    sumPoints(points_positivos, `campo${+(form) + +(1)}`);

                } else {
                    _label_.style = 'color: rgba(255, 0, 0, .7);';
                    sumPoints(points_negativos, `campo${+(form) + +(1)}`);
                }

            } else {
                _label_.style = 'color: rgba(255, 0, 0, .7);';
                sumPoints(points_negativos, `campo${+(form) + +(1)}`);
            }

        } else {
            _label_.style = 'color: rgb(218, 220, 236);';
        }

        if (_label_.innerHTML == infor[2][form]) {
            document.querySelector(`.opc.${v.id}`).style = 'background-color: rgba(255, 255, 255, .2); border-radius: 15px;';

        } else if (typeof infor[2][form] == 'object' && infor[2][form].length >= 2) {

            if (infor[2][form].filter( v => _label_.innerHTML.trim() == v ).length >= 1) {
                document.querySelector(`.opc.${v.id}`).style = 'background-color: rgba(255, 255, 255, .2); border-radius: 15px;';
            }
        }
    });
    
    config_points(1);
    config_points(2);

    let msg_txt = [
        'Felicitaciones, has Ganado con <_> puntos :)', 
        'Has Perdido con <_> puntos :('
    ];

    let t = 0, n_ = 0, p_ = 0;

    points_negativos.forEach(v => { n_ += v });
    points_positivos.forEach(v => { p_ += v });
    t = p_ - n_;

    let message = document.querySelector('.f_');

    if (t >= 10) {
        message.innerHTML = msg_txt[0].replace('<_>', t);
        message.style = 'color: rgba(150, 255, 209, .85);'

    } else {
        message.innerHTML = msg_txt[1].replace('<_>', t);
        message.style = 'color: rgba(255, 0, 0, .85);'
    }

    msg.classList.add('open');
    msg.style = 'display: block;';
}

let siguiente = () => {
    info = $info('math', 3);
    infor = entender(info, false);

    document.querySelector('.container').remove()
    
    setTimeout( () => {
        document.querySelector('.header').insertAdjacentHTML(
            "afterend", '<section class="container"></section>'
        );

        setTimeout( () => generate_(), 50);
    }, 10);
}

document.querySelector('.verificar').addEventListener('click', func_verify);
document.querySelector('.new').addEventListener('click', siguiente);

//* De: Francisco Velez
