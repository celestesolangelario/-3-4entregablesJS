import {
    v4 as uuidv4
} from 'https://jspm.dev/uuid';

// Creación del Checkout =================================================

const items = JSON.parse(localStorage.getItem('itemsInCart'))
let itemsContainer = document.getElementById('cartList')

const list = items.map(prod => `<div class='purchase-item-container {'>
                                    <img src=${prod.img} class='purchase-product-img'>
                                    <div class='purchase-details-container'>
                                        <div>Producto: ${prod.name}</div>
                                        <div>Precio por unidad: ${prod.price}</div>
                                        <div>Cantidad: ${prod.cant}</div>
                                        <div>Total: ${prod.price * prod.cant}</div>
                                    </div>
                                </div>`).join('')
itemsContainer.innerHTML = list

// Totales ==============================================================

let totalContainer = document.getElementById('totalList')

class Carrito {

    constructor(products) {

        this.id = uuidv4()

        this.subtotal = products.reduce((total, prod) => total = total + (prod.price * prod.cant), 0)
        this.iva = this.subtotal * 0.21
        this.total = this.subtotal + this.iva
    }
}
const myCart = new Carrito(items)

const totalValues = `<div>Subtotal: $${myCart.subtotal.toFixed(2)}</div>
                    <div>Impuestos (IVA 21%): $${myCart.iva.toFixed(2)}</div>
                    <div class='fw-bold'>TOTAL: $${myCart.total.toFixed(2)}</div>`
totalContainer.innerHTML = totalValues

// Precio Dolar API ====================================================

let totalUsd = document.getElementById('totalUsd')

let dolarblue = 0

fetch('https://api.bluelytics.com.ar/v2/latest')
    .then((response) => response.json())
    .then((a) => {
        dolarblue = parseFloat(a['blue'].value_sell)
    })
    .catch(() => console.log('no se puede obtener el valor en USD'))

setTimeout(() => {

    totalUsd.innerHTML = `<div><i>Total Dólar (1USD = $${dolarblue}): ${(myCart.total / dolarblue).toFixed(2)} USD</i></div>`

}, 1000)

// Buy Button ========================================================

let buyButton = document.getElementById('buyButton')

const okButton = () => {
    localStorage.removeItem('itemsInCart')
    location.href = './index.html'
}

buyButton.onclick = () => {
    Swal.fire({
        title: `<div class="buyButton rounded">Gracias por tu compra!</div>`,
        footer: `<div class="idContainer rounded">tu id de compra es: ${myCart.id}</div>`,
        showConfirmButton: false,
        showCancelButton: true,
        showDenyButton: false,
        cancelButtonText: 'Ok',
        customClass: {
            title: 'bg-white',
            cancelButton: 'violeta'
        }
    }).then((res) => {
        console.log(res)
        if (res.isDismissed) {
            okButton()
        }
    })
}