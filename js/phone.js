const loadPhone = async (searchText, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );

  const data = await res.json();
  // console.log(data.data);
  const phones = data.data;
  displayPhones(phones, isShowAll);
};

const displayPhones = (phones, isShowAll) => {
  // console.log(phones);
  const phoneContainer = document.getElementById("phone-container");

  // CLear card container before adding new
  phoneContainer.textContent = "";

  // Display show all button if there are more that 12 card
  const showAllCard = document.getElementById("show-all-card");
  if (phones.length > 12 && !isShowAll) {
    showAllCard.classList.remove("hidden");
  } else {
    showAllCard.classList.add("hidden");
  }
  // First 12 Phone
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }
  phones.forEach((phone) => {
    console.log(phone);
    // create a div

    const phoneCard = document.createElement("div");
    phoneCard.classList = `card p-4 bg-base-100 shadow-xl`;
    // Set inner HTML
    phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-center">
            <button onclick="handleShowDetails('${phone.slug}')
            " class="btn btn-primary">Show Details</button>
            </div>
        </div>
        `;
    // Append CHild

    phoneContainer.appendChild(phoneCard);
  });

  // Stop and remove loading spinner

  toggleLoadingSpinner(false);
};

const handleShowDetails = async (id) => {
  // Load Single Phone Data

  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
//   console.log(data);
  const phone = data.data;

  showPhoneDetails(phone);
};

//  For details Modal of Phone
const showPhoneDetails = (phone) => {
  // Show Modal
  console.log(phone);
  const phoneName = document.getElementById('show-details-phone-name');
  phoneName.innerText = phone.name;
  const showDetailContainer = document.getElementById('show-details-container');
  showDetailContainer.innerHTML = `

  <img src="${phone.image}"/>
  <p> Storage : <span>${phone?.mainFeatures?.storage}</span></p>
  <p> GPS : <span>${phone?.others?.GPS || 'NO GPS'}</span></p>
  `
  show_details_modal.showModal();
};

// Handle Search
const handleSearch = (isShowAll) => {
  //  console.log("search clicked");

  toggleLoadingSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
//   console.log(searchText);
  loadPhone(searchText, isShowAll);
};

const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

const handleShowAll = () => {
  handleSearch(true);
};

loadPhone();
