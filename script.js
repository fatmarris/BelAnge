document.addEventListener("DOMContentLoaded", () => {
    // Menu hamburger sur les ecrans mobiles
    const menuHamburger = document.querySelector(".menu-hamburger");
      const navLinks = document.querySelector(".nav-links");
    
      menuHamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
      });
    
    // Dark mode toggle 
    let darkmode = localStorage.getItem('darkmode')
    const themeSwitch = document.getElementById('theme-switch')
    const enableDarkmode = () => {
        document.body.classList.add('darkmode')
        localStorage.setItem('darkmode', 'active')
        }
    const disableDarkmode = () =>  {
        document.body.classList.remove('darkmode')
        localStorage.setItem('darkmode', null)
        }
        if(darkmode === "active") enableDarkmode()
            themeSwitch.addEventListener('click', () => {
                darkmode = localStorage.getItem('darkmode')
                darkmode !== "active" ? enableDarkmode() : disableDarkmode()
        })
});