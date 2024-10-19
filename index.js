// fetch phones api
const allPhoneFetch = async (search) => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${search}`)
        const data = await (res.json())
        showPhones(data.data)
    }
    catch (err) {
        console.log('error: ', err)
    }
};

// show phones
let showAll = false;
let currenPhones = [];

const showPhones = (phones, searchtext) => {
    const phoneContainer = document.getElementById('products-container');
    phoneContainer.innerHTML = '';

    if (searchtext === '') {
        phoneContainer.innerHTML = `<p class="text-blue-500 text-center text-3xl font-bold col-span-4">Please Search A Product!</p>`;
        return;
    };

    if (phones.length === 0) {
        phoneContainer.innerHTML = `
            <div class="flex justify-center items-center col-span-full">
                <img src="img/no-product.png" class="h-52" alt="No product found"/>
            </div>`;
        document.getElementById('showAll').classList.add('hidden');
        return;
    };

    currenPhones = phones;
    const phonesToShow = showAll ? phones : phones.slice(0,8);
    phonesToShow.forEach(phone => {
        const div = document.createElement('div');
        div.innerHTML = `
            <div class=" shadow-md rounded-lg p-6">
                <img src="${phone.image}" alt="Product 1" class="w-[80%] mx-auto h-40 object-fill rounded-md mb-4">
                <h3 class="text-lg mb-2 font-bold">${phone.phone_name}</h3>
                <p class="text-gray-600 mb-4">Compact size with the same performance.</p>
                <p class="text-black font-bold mb-4">$99</p>
                <button class="bg-blue-500 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-600">Buy
                    Now</button>
            </div>
        `;
        phoneContainer.append(div);
    });

    if(phones.length > 8){
        setTimeout(function () {
            document.getElementById('showAll').classList.remove('hidden')
        }, 2000);
    } else {
        document.getElementById('showAll').classList.add('hidden')
    }
};

// show all button functionallity
const showBtn = document.getElementById('showAll');
showBtn.addEventListener('click', () => {
    showAll = !showAll;
    showPhones(currenPhones, document.getElementById('search-box').value);
    showBtn.disabled = true;
    // showBtn.classList.add('hidden');
});

// Handle the search button click
const searchBtn = document.getElementById('searchBtn').addEventListener('click', () => {
    const searchBox = document.getElementById('search-box').value;
    allPhoneFetch(searchBox);
    showBtn.disabled = false;
});

//  Dynamic search using keyup event
document.getElementById('search-box').addEventListener('keyup', (event) => {
    const searchBox = event.target.value;
    // Fetch and display phones based on the search query
    showBtn.disabled = false;
    allPhoneFetch(searchBox);
    loader()
});

// loader
const loader = () => {
    const loader = document.getElementById('loader');
    const productContainer = document.getElementById('products-container');

    loader.classList.remove('hidden');
    productContainer.classList.add('hidden');
    
    setTimeout(function () {
        loader.classList.add('hidden');
        productContainer.classList.remove('hidden');
    }, 2000);
    // document.getElementById('searchBtn').addEventListener('click', loader)
};

showPhones([], '');