const resultado = document.getElementById('resultado')
const numeros = document.querySelectorAll('[id*=tecla]')
const operadores = document.querySelectorAll('[id*=operador]')

let novoNumero = true
let operador
let numeroGuardado

const operacaoPendente = () => operador !== undefined

const calcular = () => {
    if(operacaoPendente()){
        const numeroAtual = parseFloat(resultado.textContent)
        novoNumero = true
        if(operador === '+'){
            atualizarDisplay(numeroGuardado + numeroAtual)
        } else if(operador === '-') {
            atualizarDisplay(numeroGuardado - numeroAtual)
        } else if(operador === '*') {
            atualizarDisplay(numeroGuardado * numeroAtual)
        } else if(operador === '/') {
            atualizarDisplay(numeroGuardado / numeroAtual)
        }
    }
}

const atualizarDisplay = (texto) => {
    if(novoNumero){
        resultado.textContent = texto
        novoNumero = false
    } else {
        resultado.textContent += texto
    }
}

const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent)

const selecionarOperador = (evento) => {
    if (!existeValor() && evento.target.textContent === '-'){
       atualizarDisplay('-')
    } else if(!novoNumero){
        calcular()
        novoNumero = true
        operador = evento.target.textContent
        numeroGuardado = parseFloat(resultado.textContent)
        resultado.textContent = ''
    }
}

const mostrarResultado = () => {
    calcular()
    operador = undefined
    numeroGuardado = resultado.textContent

}

const limpaConta = () => {
    resultado.textContent = ''
    operador = undefined
    numeroGuardado = undefined
    novoNumero = true
}

const removerUltimoInput = () => resultado.textContent = resultado.textContent.slice(0, -1)

const existeDecimal = () => resultado.textContent.indexOf('.') !== -1

const existeValor = () => resultado.textContent.length > 0

const inserirPonto = () => {
    if(!existeDecimal()){
        existeValor() ? atualizarDisplay('.') : atualizarDisplay('0.')
    }
}


numeros.forEach(numero => numero.addEventListener('click', inserirNumero))
operadores.forEach(operador => operador.addEventListener('click', selecionarOperador))
document.getElementById('backspace').addEventListener('click', removerUltimoInput)
document.getElementById('clear').addEventListener('click', limpaConta)
document.getElementById('igual').addEventListener('click', mostrarResultado)
document.getElementById('decimal').addEventListener('click', inserirPonto)


const mapaTeclado = {
    '0'             : 'tecla0',
    '1'             : 'tecla1',
    '2'             : 'tecla2',
    '3'             : 'tecla3',
    '4'             : 'tecla4',
    '5'             : 'tecla5',
    '6'             : 'tecla6',
    '7'             : 'tecla7',
    '8'             : 'tecla8',
    '9'             : 'tecla9',
    '/'             : 'operadorDividir',
    '*'             : 'operadorMultiplicar',
    '-'             : 'operadorSubtrair',
    '+'             : 'operadorSomar',
    '='             : 'igual',
    'Enter'         : 'igual',
    'Backspace'     : 'backspace',
    'c'             : 'clear',
    '.'             : 'decimal',
}

const mapearTeclado = (evento) => {
    const tecla = evento.key

    const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) !== -1
    if(teclaPermitida()) document.getElementById(mapaTeclado[tecla]).click()   
}
document.addEventListener('keydown', mapearTeclado)