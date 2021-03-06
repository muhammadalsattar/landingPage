/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
// Defining section elements
const sections = document.getElementsByTagName("section");

// Defining variable to represent nav list
const navList = document.getElementById("navbar__list");


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
const DOMFragment = new DocumentFragment();
for (let i = 0; i < sections.length; i++)
{
    // creating list item for every nav item
    const menuItem = document.createElement("li");
    menuItem.classList.add(`${sections[i].id}`);
    
    const menuLink = document.createElement("a");
    menuLink.textContent = sections[i].getAttribute("data-nav");
    menuLink.classList.add("menu__link");
    menuLink.setAttribute('href', `#${sections[i].id}`);
    menuItem.appendChild(menuLink);
    DOMFragment.appendChild(menuItem);
}
navList.appendChild(DOMFragment);

// Add class 'active' to section when near top of viewport
const setActive = sections => {

    // defining variable to hold the id of the active section
    let activeSection;

    // Getting the current active section
    const activeSectionNow = document.querySelector("section.your-active-class");

    for (let i = 0; i < sections.length; i++)
    {
        if (Math.abs(sections[i].getBoundingClientRect().top)  < Math.abs(activeSectionNow.getBoundingClientRect().top))
        {
            activeSection = sections[i].id;

            // Getting current active section and deactivating it
            activeSectionNow.classList.remove("your-active-class");

            // setting the new active section
            document.getElementById(activeSection).classList.add("your-active-class");
        }

    }
}

// Setting active nav item
const activeNav = ()=> {
    // getting current active navigation item
    const currentlyActiveItem = document.querySelector("li.your-active-class");

    // deactivating current active item if exist
    if (currentlyActiveItem !== null)
    {
        currentlyActiveItem.classList.remove("your-active-class");
    }

    // setting new active nav item
    const activeNavItem = document.querySelector(`li.${document.querySelector("section.your-active-class").id}`);
    activeNavItem.classList.add("your-active-class");

}

// Scroll to anchor ID using scrollTO event

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click
navList.addEventListener("click", e => {

    // preventing the default jumping
    e.preventDefault();

    // getting the vertical distance between top of the page and the clicked section link
    const section = document.getElementById(e.target.getAttribute('href').slice(1));
    const sectionY = section.getBoundingClientRect().top;

    // scrolling to the clicked section
    window.scrollTo({
        top: window.scrollY + sectionY,
        left: 100,
        behavior: "smooth"
    })
})

// Set sections and nav items as active
setTimeout(window.addEventListener("scroll", ()=> {
    setActive(sections);
    activeNav();
}),
0)