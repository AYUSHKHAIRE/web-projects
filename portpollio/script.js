var typed = new Typed('#element', {
    strings: ['Web developer', 'Graphic designer', 'Data scientist', 'Database speciallist', 'C porammer', 'Python programmer'],
    typeSpeed: 50,
});
function toggleNavbar() {
    var navbarList = document.getElementById("navlist");
    if (navbarList.style.display === "none") {
        navbarList.style.display = "block";
    } else {
        navbarList.style.display = "none";
    }
}
