document.addEventListener('DOMContentLoaded', () => {
  const footerText = document.getElementById('footer-text');
  if (footerText) {
    footerText.textContent = `@${new Date().getFullYear()} Bryan's Café`;
  }

  function loadMenu() {
    fetch('menu.xml')
      .then(response => response.text())
      .then(data => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(data, 'application/xml');
        const menuContainer = document.getElementById('menu-container');

        if (menuContainer) {
          const meals = xml.getElementsByTagName('meal');
          Array.from(meals).forEach(meal => {
            const name = meal.getElementsByTagName('name')[0]?.textContent || "Unnamed Meal";
            const price = meal.getElementsByTagName('price')[0]?.textContent || "0.00";
            const description = meal.getElementsByTagName('description')[0]?.textContent || "No description available";
            const imageSrc = meal.getElementsByTagName('image')[0]?.textContent || "Images/default.jpg";

            const mealElement = document.createElement('div');
            mealElement.className = "menu-item";
            mealElement.innerHTML = `
              <img src="${imageSrc}" alt="${name}" class="menu-item-image">
              <h3>${name} - $${price}</h3>
              <p>${description}</p>
            `;
            menuContainer.appendChild(mealElement);
          });

          const coffeeVariations = xml.getElementsByTagName('coffeeAndHotChocolates')[0]?.getElementsByTagName('variation');
          if (coffeeVariations) {
            const coffeeContainer = document.createElement('div');
            coffeeContainer.className = "menu-section";
            coffeeContainer.innerHTML = `<h2>Coffee and Hot Chocolates</h2>`;
            Array.from(coffeeVariations).forEach(variation => {
              const size = variation.getElementsByTagName('size')[0]?.textContent || "Unknown Size";
              const price = variation.getElementsByTagName('price')[0]?.textContent || "0.00";
              const description = variation.getElementsByTagName('description')[0]?.textContent || "No description available";

              const variationElement = document.createElement('div');
              variationElement.className = "menu-item";
              variationElement.innerHTML = `
                <h3>${size} - $${price}</h3>
                <p>${description}</p>
              `;
              coffeeContainer.appendChild(variationElement);
            });
            menuContainer.appendChild(coffeeContainer);
          }

          const otherBeverages = xml.getElementsByTagName('otherBeverages')[0]?.getElementsByTagName('drink');
          if (otherBeverages) {
            const otherBeveragesContainer = document.createElement('div');
            otherBeveragesContainer.className = "menu-section";
            otherBeveragesContainer.innerHTML = `<h2>Other Beverages</h2>`;
            Array.from(otherBeverages).forEach(drink => {
              const name = drink.getElementsByTagName('name')[0]?.textContent || "Unnamed Drink";
              const price = drink.getElementsByTagName('price')[0]?.textContent || "0.00";

              const drinkElement = document.createElement('div');
              drinkElement.className = "menu-item";
              drinkElement.innerHTML = `
                <h3>${name} - $${price}</h3>
              `;
              otherBeveragesContainer.appendChild(drinkElement);
            });
            menuContainer.appendChild(otherBeveragesContainer);
          }
        }
      })
      .catch(error => console.error('Error loading menu:', error));
  }

  function loadBranches() {
    fetch('branches.xml')
      .then(response => response.text())
      .then(data => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(data, 'application/xml');
        const branches = xml.getElementsByTagName('branch');
        const branchesContainer = document.getElementById('branches-container');

        if (branchesContainer) {
          Array.from(branches).forEach(branch => {
            const address = branch.getElementsByTagName('address')[0]?.textContent || "No address available";
            const contact = branch.getElementsByTagName('contact')[0]?.textContent || "No contact information";
            const hours = branch.getElementsByTagName('hours')[0]?.textContent || "No hours available";
            const mapLink = branch.getElementsByTagName('map')[0]?.textContent || "#";

            const branchElement = document.createElement('div');
            branchElement.innerHTML = `
              <h3>${address}</h3>
              <p>Contact: ${contact}</p>
              <p>Opening Hours: ${hours}</p>
              <a href="${mapLink}" target="_blank" class="location-link">Location</a>
            `;
            branchesContainer.appendChild(branchElement);
          });
        }
      })
      .catch(error => console.error('Error loading branches:', error));
  }

  if (document.getElementById('menu-container')) {
    loadMenu();
  }

  if (document.getElementById('branches-container')) {
    loadBranches();
  }

  const enquiryForm = document.getElementById('enquiryForm');
  if (enquiryForm) {
    enquiryForm.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Your message has been sent successfully!');
    });
  }
});
