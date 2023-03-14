const product = {
    crazy: {
        name: 'Crazy',
        price: 31000,
        img: 'images/products/burger-1.png',
        amount: 0,
        get totalSumm() {
            return this.price * this.amount
        }
    },

    light: {
        name: 'Light',
        price: 26000,
        img: 'images/products/burger-1.png',
        amount: 0,
        get totalSumm() {
            return this.price * this.amount
        }
    },

    cheeseburger: {
        name: 'CheeseBurger',
        price: 29000,
        img: 'images/products/burger-3.png',
        amount: 0,
        get totalSumm() {
            return this.price * this.amount
        }
    },

    dburger: {
        name: 'dBurger',
        price: 24000,
        img: 'images/products/burger-4.png',
        amount: 0,
        get totalSumm() {
            return this.price * this.amount
        }
    },

}


const productBtns = document.querySelectorAll('.wrapper__list-btn'),
    basketModal = document.querySelector('.wrapper__navbar-basket'),
    basketBtn = document.querySelector('.wrapper__navbar-btn'),
    closeBasketModal = document.querySelector('.wrapper__navbar-close'),
    basketCheklist = document.querySelector('.wrapper__navbar-checklist'),
    totalPriceBasket = document.querySelector('.wrapper__navbar-totalprice'),
    basketBtnCount = document.querySelector('.wrapper__navbar-count'),
    btnCard = document.querySelector('.wrapper__navbar-bottom'),
    printBody = document.querySelector('.print__body'),
    printFooter = document.querySelector('.print__footer')

productBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        plusOrMinus(this)
    })
})

function plusOrMinus(btn) {
    let parent = btn.closest('.wrapper__list-card'),
        parentId = parent.getAttribute('id')


    product[parentId].amount++
    basket()
}


function basket() {
    const productArray = []
    for (const key in product) {
        let totalCount = 0
        const po = product[key]
        const productCard = document.querySelector(`#${po.name.toLowerCase()}`),
            parentIndecator = productCard.querySelector('.wrapper__list-count')
        if (po.amount) {
            productArray.push(po)
            basketBtnCount.classList.add('active')
            totalCount += po.amount
            parentIndecator.classList.add('active')
            parentIndecator.innerHTML = po.amount
        } else{
            parentIndecator.classList.remove('active')
            parentIndecator.innerHTML = 0
        }
        
        basketBtnCount.innerHTML = totalCount
    }
    
    basketCheklist.innerHTML = ''
    for (let i = 0; i < productArray.length; i++) {
       
        
        basketCheklist.innerHTML += cardItemBurger(productArray[i])
    }
const allCount = totalCountProduct()  
if (allCount) {
    basketBtnCount.classList.add('active')
}else{
    basketBtnCount.classList.remove('active')
}

basketBtnCount.innerHTML = allCount
basketBtnCount.style.width = 18 + 'px'
basketBtnCount.style.height = 18 + 'px'
totalPriceBasket.innerHTML = totalSumProduct()
}

function totalSumProduct() {
    let total = 0
    for (const key in product) {
       total += product[key].totalSumm
    }
    return total
}
function totalCountProduct() {
    let total = 0 
    for (const key in product) {
        total += product[key].amount
    }
    return total
}



function cardItemBurger(productData) {
    const {name, totalSumm: price, amount, img} = productData
    
return `<div class="wrapper__navbar-product">
                          
<div class="wrapper__navbar-info">
                              <img src="${img}" alt="" class="wrapper__navbar-productImage"> 
                              
                                  <div class="wrapper__navbar-infoSub">
                                      <p class="wrapper__navbar-infoName">${name}</p>
                                      <p class="wrapper__navbar-infoPrice">
                                          <span>${price}</span>
                                          сум
                                      </p>
                                  </div>
                                 
                                  
                             
                          
                      </div> 
                      <div class="wrapper__navbar-option" id ="${name.toLowerCase()}_card">
                          <button class="wrapper__navbar-symbol fa-minus" data-symbol="+">- </button>
                          <output class="wrapper__navbar-counts">${amount}</output>
                          <button class="wrapper__navbar-symbol fa-plus" data-symbol="-">+</button>
                          
                      </div>
                              
                  </div>`
}



basketBtn.addEventListener('click',function(){
    basketModal.classList.add('active')
})


closeBasketModal.addEventListener('click',function(){
    basketModal.classList.remove('active')
})



window.addEventListener('click', e => {
    const btn = e.target
    if (btn.classList.contains('wrapper__navbar-symbol')) {
        const attr = btn.getAttribute('data-symbol')
        const parent = btn.closest('.wrapper__navbar-option')
        if (parent) {
            const idProduct = parent.getAttribute('id').split('_')[0]
            if (attr == '-') product[idProduct].amount++
            else if(attr == '+') product[idProduct].amount--
            basket()
        }
    }
})

btnCard.addEventListener('click', () => {
    printBody.innerHTML = ''
    for (const key in product) {
        const {name,totalSumm,amount} = product[key]
    if (amount) {
        printBody.innerHTML += ` 
        <div class="print__body-item">
        <p class="print__body-name">
            <span class="name">${name}</span>
            <span class="count">${amount}</span>
        </p>
        <p class="print__body-summ">${totalSumm}</p>
    </div>
    `
    }
    }
    printFooter.innerHTML = totalSumProduct()
    window.print()
})