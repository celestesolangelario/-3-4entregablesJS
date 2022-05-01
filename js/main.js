let carrito = []
let agregarAlCarrito = (idProductos) => {
    carrito.push(idProduct)

}

productos.forEach(product => {
    console.log(product)
})

function cards(verProdutos) {
    let acumuladorDecards = ``;
    verProdutos.forEach((elementoDelArray) => {
        acumuladorDecards += `<div class = "card w-75 justify-content-center" >
        <div class = "imagenes-produc00 imagenes">${productos.img}</div> <div class = "card-body" >
        <div class = "d-flex " >
        <h5 class = "card-title w-75" >${productos.img}< /h5>
        <button id = "product"
    type = "button"
    class = "rounded bot-color" > Comprar < /button> < /
        div > <p class ="card-text">${productos.description}</p> </div> 
        </div>`
    })
    verCards(acumuladorDecards);
}
cards(productos);

function verCards(cards) {

    document.write(grilla);

};