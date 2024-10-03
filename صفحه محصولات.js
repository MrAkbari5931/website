const $ = document
const header = $.querySelector('header')
const upperHedder = $.querySelector('.upperHedder')
const communicationBtn = $.querySelector('.communication')
const mainPageBtn = $.querySelector('.mainPage')
const potBtn = $.querySelector('.pot')
const productsContainer = $.querySelector('#productsContainer')
const footer = $.querySelector('footer')
const searchBox = $.querySelector('.searchBox')
const bgImgFixed = $.querySelector('.bg-Img')

const productsList = [
    {id: 1, name: "اردو خوری بلور نقلی", price: 35000, image: "اردو خوری بلور نقلی.jpg", status: "موجود", material: "بلورین", size1: "35000", size2: "", size3: ""},
    {id: 2, name: "پیاله گل‌سرخی درجه یک", price: 100000, image: "پیاله گل سرخی درجه یک .jpg", status: "ناموجود", material: "سرامیکی", size1: "34000", size2: "234000", size3: ""},
    {id: 3, name: "تی بگ ام دی اف", price: 45000, image: "تی بگ ام دی اف.jpg", status: "موجود", material: "شیشه‌ای", size1: "234500", size2: "23000", size3: "233000"},
    {id: 4, name: "سرخ کن تفال", price: 120000, image: "سرخ کن تفال.jpg", status: "موجود", material: "چینی", size1: "", size2: "", size3: ""},
    {id: 5, name: "کاسه دربدار لیمون طرح دار", price: 150000, image: "کاسه دربدار لیمون  طرح دار.jpg", status: "ناموجود", material: "چینی", size1: "", size2: "", size3: ""},
    {id: 6, name: "کره‌خوری زیره چوبی", price: 130000, image: "کره خوری زیره چوبی .jpg", status: "موجود", material: "چوبی", size1: "", size2: "", size3: ""}
]

const colors = ["red", "purple", "blue", "brown", "blueviolet", "darkred", "darkgreen"]; // آرایه رنگ‌ها


//کدهای صفحه اصلی
function mainPageSources() {

    const customeScrollbar = document.querySelector('.customeScroll')

    function getScrollPercentage() {
        const documentHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;
        
        // مقدار اسکرول فعلی
        const scrollTop = window.scrollY || window.pageYOffset;

        // محاسبه درصد اسکرول
        const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;

        return scrollPercentage;
    }

    window.addEventListener('scroll', () => {
        const percentage = getScrollPercentage();

        customeScrollbar.style.width = `${percentage.toFixed(2)}%`
    });

    let currentIndex = 0
    setInterval(function(){
        upperHedder.style.color = colors[currentIndex]; // تغییر رنگ
        currentIndex = (currentIndex + 1) % colors.length; // به رنگ بعدی بروید
    }, 2000)

    //کدهای قسمت سرچ‌باکس
    const searchInput = $.querySelector('input');
    const resultsDiv = $.querySelector('.productResults');

    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        resultsDiv.innerHTML = ''; // پاک کردن نتایج قبلی
        

        if(searchInput.value.length === 0) {
            searchInput.style.borderBottomLeftRadius = '1rem'
            searchInput.style.borderBottomRightRadius = '1rem'
        } else {
            searchInput.style.borderBottomLeftRadius = '0px'
            searchInput.style.borderBottomRightRadius = '0px'
        }
        if (query) {
            const filteredProducts = productsList.filter(product => 
                product.name.toLowerCase().includes(query)
                
                ).slice(0, 5);
    
            filteredProducts.forEach(product => {
                const newDiv = $.createElement('div');
                newDiv.className = 'result-item';
                newDiv.textContent = product.name;
                resultsDiv.appendChild(newDiv);
                newDiv.addEventListener('click', function() {
                    let productInformation = {
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        status: product.status,
                        material: product.material,
                        size1: product.size1,
                        size2: product.size2,
                        size3: product.size3
                    }

                    sessionStorage.setItem('productArray', JSON.stringify(productInformation))
                    window.open('جزئیات محصول.html')
                })
            });
        }
    });


    function scrollHandler1() {
        if($.documentElement.scrollTop > 220) {
            header.style.position = 'fixed'
            header.style.top = '0px'
            searchBox.style.marginTop = '15rem'
        } else if(!($.documentElement.scrollTop > 220)) {
            header.style.position = 'static'
            searchBox.style.marginTop = '7.5rem'
        }
    }
    function communicationBtnClickHandler() {
        window.scrollTo(0, $.body.scrollHeight)
    }
    function mainPageBtnClickHandler() {
        window.scrollTo(0, 0)
    }
    function potBtnClickHandler() {
        window.open('بازسازی ظروف.html', "_blank")
    }

    mainPageBtn.addEventListener('click', mainPageBtnClickHandler)
    communicationBtn.addEventListener('click', communicationBtnClickHandler)
    potBtn.addEventListener('click', potBtnClickHandler)
    $.addEventListener('scroll', scrollHandler1)


    let footerBottom = $.body.scrollHeight - footer.scrollHeight
    footer.style.top = footerBottom + 'px'

    productsList.forEach(function(product) {
        const productBox = $.createElement('div')
        const borderRightBold = $.createElement('div')
        const productName = $.createElement('span')
        const nameContainer = $.createElement('div')
        const productStatus = $.createElement('span')
        const productImage = $.createElement('img')
        const productPrice = $.createElement('p')
        const price_status = $.createElement('div')
        const imageBox = $.createElement('div')
        productImage.setAttribute('src', product.image)
        productPrice.className = 'price'
        nameContainer.className = 'nameContainer'
        borderRightBold.className = 'borderRightBold'
        price_status.className = 'price_status'
        productName.className = 'name'
        productStatus.className = 'status'
        imageBox.className = 'imageBox'
        productName.innerText = product.name
        productStatus.innerText = product.status
        productPrice.innerText = product.price + " تومان"
        productBox.className = 'productBox'
        productsContainer.appendChild(productBox)
        productBox.appendChild(imageBox)
        imageBox.appendChild(productImage)
        productBox.appendChild(nameContainer)
        nameContainer.appendChild(borderRightBold)
        nameContainer.appendChild(productName)
        productBox.appendChild(price_status)
        price_status.appendChild(productPrice)
        if(product.status === 'موجود') {
            productStatus.style.color = 'green'
        } else if(product.status === 'ناموجود') {
            productStatus.style.color = 'red'
        }
        price_status.appendChild(productStatus)
        
        productBox.addEventListener('click', function() {
            let productInformation = {
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                status: product.status,
                material: product.material,
                size1: product.size1,
                size2: product.size2,
                size3: product.size3
            }

            sessionStorage.setItem('productArray', JSON.stringify(productInformation))
            window.open('جزئیات محصول.html')
        })
        
    })
}


//کدهای صفحه مشخصات محصول
function detailPageSources() {
    let backUpObject = sessionStorage.getItem('productArray')
    let productInfoObject = JSON.parse(backUpObject)
        // اطلاعات محصول موردنظر، از صفحه اصلی با موفقیت دریافت شد

        const imageBox = $.createElement('div')
        const detailBox = $.createElement('div')
        const nameContainer = $.createElement('div')
        const borderRightBold = $.createElement('div')
        const price_status = $.createElement('div')
        const price_icon = $.createElement('div')
        const image = $.createElement('img')
        const icon = $.createElement('img')
        const productName = $.createElement('span')
        const sizesContainer = $.createElement('ul')
        const sizesTitle = $.createElement('span')
        const productMaterial = $.createElement('span')
        const productPrice = $.createElement('span')
        const status = $.createElement('span')
        const titleName = $.querySelector('title')
        productName.innerText = productInfoObject.name
        productMaterial.innerText = "جنس: " + productInfoObject.material
        sizesTitle.innerText = 'سایزها: '
        titleName.innerText = "مشخصات " + productInfoObject.name
        productPrice.innerText = productInfoObject.price
        status.innerText = productInfoObject.status
        imageBox.setAttribute('id', 'imageBox')
        productName.className = 'productName'
        price_status.className = 'price_status'
        sizesContainer.className = 'sizesContainer'
        nameContainer.className = 'nameContainer'
        borderRightBold.className = 'borderRightBold'
        productMaterial.className = 'productMaterial'
        sizesTitle.className = 'sizesTitle'
        price_icon.className = 'price_icon'
        productPrice.className = 'productPrice'
        status.className = 'status'
        detailBox.setAttribute('id', 'detailBox')
        image.setAttribute('src', productInfoObject.image)
        icon.setAttribute('src', './photo1724922999.jpeg')
        $.body.appendChild(imageBox)
        imageBox.appendChild(image)
        $.body.appendChild(detailBox)
        detailBox.appendChild(nameContainer)
        nameContainer.appendChild(borderRightBold)
        nameContainer.appendChild(productName)
        price_icon.appendChild(productPrice)
        price_icon.appendChild(icon)
        price_status.appendChild(price_icon)
        price_status.appendChild(status)
        detailBox.appendChild(price_status)
        detailBox.appendChild(productMaterial)
        detailBox.appendChild(sizesTitle)
        
        if(productInfoObject.status === 'موجود') {
            status.style.color = 'green'
        } else if(productInfoObject.status === 'ناموجود') {
            status.style.color = 'red'
        }

        let sizesListReseve = []
        sizesListReseve.push(productInfoObject.size1, productInfoObject.size2, productInfoObject.size3)
        
        let sizesListSend = []

        sizesListReseve.forEach(function(size) {

            if(!(size === "")) {
                sizesListSend.push(size)
            }

        })
        sizesListSend.forEach(function(size, index) {
            const productSize_price = $.createElement('li'); // اصلاح: از $.createElement به document.createElement تغییر دادم
            productSize_price.className = 'productSize_price';
            
            // بررسی ایندکس و تغییر رنگ
            if (index == 0) {
                productSize_price.innerText = "سایز کوچک: " + size + " تومان";
            } else if (index == 1) {
                productSize_price.innerText = "سایز متوسط: " + size + " تومان";
            } else if (index == 2) {
                productSize_price.innerText = "سایز بزرگ: " + size + " تومان";
            }
        
            sizesContainer.appendChild(productSize_price);
        });

        console.log(sizesListSend);
        
        // const productSize2_price = $.createElement('li')
        // productSize2_price.innerText = productInfoObject.size2
        // productSize2_price.className = 'productSize2_price'
        // sizesContainer.appendChild(productSize2_price)
        // const productSize3_price = $.createElement('li')
        // productSize3_price.innerText = productInfoObject.size3
        // productSize3_price.className = 'productSize3_price'
        // sizesContainer.appendChild(productSize3_price)
        detailBox.appendChild(sizesContainer)

        
    }
    
    


    //کدهای صفحه بازسازی ظروف
    function reconstructionSources() {

        //لیست رنگ‌بندی های ظروف
        const colorsList = [
            {colorCodeName: '#0000FF', color: 'blue', picture: 'https://bolurmarket.com/files/1/PanServises/pan107/1564255528_ServisePan107-3.jpg'},
            {colorCodeName: '#FF0000'+'', color: 'red', picture: 'https://www.bazarshoosh.com/wp-content/uploads/2020/06/%D8%B3%D8%B1%D9%88%DB%8C%D8%B3-%D9%82%D8%A7%D8%A8%D9%84%D9%85%D9%87-10-%D9%BE%D8%A7%D8%B1%DA%86%D9%87-%DA%A9%D8%A7%D9%86%D8%AF%DB%8C%D8%AF-%D9%85%D8%AF%D9%84-%D8%A7%D8%B3%DA%A9%D8%A7%D8%B1-%D8%B1%D9%86%DA%AF-%D8%B4%DB%8C%D9%84%D8%AF-%D9%82%D8%B1%D9%85%D8%B2-8.jpg'},
            {colorCodeName: '#008000', color: 'green', picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPuMxGngIayzQ8EdIbcWCwRrTiyf9fOgapKQ&s'},
            {colorCodeName: '#000000', color: 'black', picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFZBjNvdet7YU5hZFOSaKsGwv6q3OuGUYfxw&s'}
        ]

        
        const boxContainer = document.querySelector('section');

        colorsList.forEach((colorBox) => {
        const flipBox = document.createElement('div');
        flipBox.className = 'flip-box';
        flipBox.style.backgroundColor = colorBox.color;
        flipBox.innerHTML = `
        <div class="flip-box-inner" onclick="this.parentElement.classList.toggle('flipped')">
        <div class="flip-box-front">
        <span>${colorBox.colorCodeName}</span>
        </div>
        <div class="flip-box-back">
        <img src="${colorBox.picture}" alt="##" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        </div>
        `;
        
        boxContainer.appendChild(flipBox);
        });

    }


    
if(window.location.pathname === '/%D8%B5%D9%81%D8%AD%D9%87%20%D9%85%D8%AD%D8%B5%D9%88%D9%84%D8%A7%D8%AA.html') {
    mainPageSources()
    
} else if(window.location.pathname === '/%D8%AC%D8%B2%D8%A6%DB%8C%D8%A7%D8%AA%20%D9%85%D8%AD%D8%B5%D9%88%D9%84.html') {
    detailPageSources()
    
} else if(window.location.pathname === '/%D8%A8%D8%A7%D8%B2%D8%B3%D8%A7%D8%B2%DB%8C%20%D8%B8%D8%B1%D9%88%D9%81.html'){
    reconstructionSources()
}