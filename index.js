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
    const phonesToShow = showAll ? phones : phones.slice(0, 8);
    phonesToShow.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('shadow-md', 'rounded-lg', 'p-6', 'bg-white')
        div.innerHTML = `
                <img src="${phone.image}" alt="Product 1" class="w-[50%] md:w-[70%] mx-auto h-40 md:h-44  rounded-md mb-4">
                <h3 class="text-lg mb-2 font-bold">${phone.phone_name}</h3>
                <p class="text-gray-600 mb-2">Compact size with the same performance.</p>
                <p class="text-black font-bold ">$99</p>
                <div class="divider my-2"></div>
                <div class="flex justify-evenly">
                    <button class="bg-blue-500 text-white rounded-lg hover:bg-blue-600 btn md:btn-sm">Buy
                    Now</button>
                    <button onclick="modalApiFetch('${phone.slug}')" class="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 btn md:btn-sm">Details</button>
                </div>
        `;
        phoneContainer.append(div);
    });

    if (phones.length > 8) {
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

//modal api fetch
const modalApiFetch = async (slug) => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/phone/${slug}`)
        const data = await res.json()
        modal(data.data)
    }
    catch (err) {
        console.log('error:', err)
    }
};

// show modal
const modal = (id) => {
    document.getElementById('detailsModal').showModal();
    const ModalContainer = document.getElementById('modal-content');
    ModalContainer.innerHTML = '';
    const div = document.createElement('div');
    div.innerHTML =` 
        <div class="p-2">
            <img src="${id.image}" alt="${id.name}" class="md:w-[40%] w-[60%] mx-auto">
            <p class="font-bold text-2xl my-4 text-center">${id.name}</p>
            <p class="text-sm mt-1"><span class="font-semibold text-[16px]">Storage:</span> ${id.mainFeatures.storage}</p>
            <p class="text-sm mt-1"><span class="font-semibold text-[16px]">display Size:</span> ${id.mainFeatures.displaySize}</p>
            <p class="text-sm mt-1"><span class="font-semibold text-[16px]">Chipset:</span> ${id.mainFeatures.chipSet}</p>
            <p class="text-sm mt-1"><span class="font-semibold text-[16px]">Memory:</span> ${id.mainFeatures.memory}</p>
            <p class="text-sm mt-1"><span class="font-semibold text-[16px]">Release Date:</span> ${id.releaseDate}</p>
            <p class="text-sm mt-1"><span class="font-semibold text-[16px]">Brand:</span> ${id.brand}</p>
            <p class="text-sm mt-1"><span class="font-semibold text-[16px]">GPS:</span> ${id.others.GPS}</p>
        </div>
        <div class="modal-action">
            <form method="dialog" class="relative w-full">
                <button class="btn bg-red-500  w-full text-white font-bold">Close</button>
            </form>
        </div>
    `;
    ModalContainer.append(div)
}

showPhones([], '');