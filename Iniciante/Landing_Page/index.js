/* Função menu hamburguer */
const toggler = document.querySelector(".toggler");
const navMenu = document.querySelector("#navMenu");

toggler.addEventListener('click', function () {
    navMenu.classList.toggle("active")
});

/* Função scroll do inicio */
const scroll = document.getElementById("scroll");

scroll.addEventListener('click', () => {
    document.querySelector(".get-started").scrollIntoView({ behavior: 'smooth' });
});

/* Contador de corações*/
const heart = document.querySelector('.bx.bxs-heart');
 
let countLiked = parseInt(document.querySelector('.icon-box p').textContent);
 
heart.addEventListener('click', function(){
    countLiked++;
 
    document.querySelector('.icon-box p').textContent = countLiked;
});
