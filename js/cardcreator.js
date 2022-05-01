let cardContainer = document.getElementById("itemcontainer")

productos.forEach((item) => {


    let card = document.createElement("div")
    card.className = "d-flex h-card h-card-container justify-content-center"

    card.innerHTML =
        `<div class = "card d-flex justify-content-center" >
            <div class = "imagenes-produc${productos.indexOf(item)} imagenes">
            </div> 
            <div class = "card-body">
                <div class = "d-flex ">
                    <h5 class = "card-title w-75">${item.name}</h5>
                    <button id = "product" type = "button" class = "rounded bot-color" onclick="addtocart(${productos.indexOf(item)})"> Comprar </button>
                </div>
            <p class ="card-text">${item.description}</p>
            </div>
        </div>`
    cardContainer.append(card)


})