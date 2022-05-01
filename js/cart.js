let buttonCart = document.getElementById("carrito");
let list = document.getElementById("cartList");


//# Construir menu Carrito

const cartView = () => {

    cart.map(product => {

        let newItem = document.createElement("div")
        newItem.className = "d-flex w-100"
        newItem.setAttribute("id", `${product.name}`)
        newItem.innerHTML = `
        <div class="w-65">${product.name}</div>
        <div class="w-25">$${product.price}</div>
        <div id='${product.name}-price'>${product.cant} U.</div>`

        list.append(newItem)
    })
}

//# Almacenamiento

let cart
const testStorage = JSON.parse(localStorage.getItem('itemsInCart'))

if (testStorage) {
    cart = testStorage
    cartView()
} else {
    cart = []
}

//# Agregar producto
function addtocart(item) {
    let exist = cart.find(n => n.id === productos[item].id)

    if (exist === undefined) {
        cart.push({
            ...productos[item],
            cant: 1
        })

        let newItem = document.createElement("div")
        newItem.className = "d-flex w-100"
        newItem.setAttribute("id", `${productos[item].name}`)
        newItem.innerHTML = `
        <div class="w-65">${productos[item].name}</div>
        <div class="w-25">$${productos[item].price}</div>
        <div id='${productos[item].name}-price'>${cart[cart.length - 1].cant} U.</div>`
        list.append(newItem)
    } else {
        let findout = cart.find(n => n.id === productos[item].id)
        findout.cant++
        let price = document.getElementById(`${productos[item].name}-price`)
        price.innerHTML = `${findout.cant} U.`
    }
}

//# Acciones sobre el boton Carrito

buttonCart.onmouseover = () => {

    if (cart.length === 0) {
        buttonCart.title = 'no agregaste productos'
    } else {
        buttonCart.title = ''
        list.className = "cartList"
    }
}

buttonCart.onmouseout = () => {
    list.className = "cartempty"
}

buttonCart.onclick = (e) => {

    e.stopPropagation()

    if (cart.length === 0) {
        Swal.fire({
            title: 'Todavia no tienes productos en tu carrito',
            showConfirmButton: false,
            showCancelButton: true,
            showDenyButton: false,
            cancelButtonText: 'Ok',
            customClass: {
                title: 'bg-white',
                cancelButton: 'violeta'
            }
        })
    } else {

        Swal.fire({
            title: '¿Estas seguro que quieres finalizar la compra?',
            imageUrl: './../css/src/img/logo.png',
            imageWidth: 200,
            imageHeight: 200,
            showConfirmButton: true,
            showCancelButton: true,
            showDenyButton: true,
            confirmButtonText: 'Sí',
            denyButtonText: 'Vaciar Carrito',
            cancelButtonText: 'No',
            customClass: {
                confirmButton: 'violeta text-white',
                denyButton: 'bg-white text-black border',
                cancelButton: 'bg-secondary text-white border',
                title: 'bg-white'
            }
        }).then((res) => {
            if (res.isConfirmed) {
                localStorage.setItem('itemsInCart', JSON.stringify(cart))
                location.href = './purchase.html'
            } else if (res.isDenied) {
                emptyCart()
            }
        })

    }
}

const emptyCart = () => {
    cart = []
    list.innerHTML = ''
}