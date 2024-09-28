// Add event listener to back to top button
document.querySelector('.back-to-top').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Add event listener to nav links
document.querySelectorAll('.top-nav a').forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.getAttribute('href').replace('#', '');
        const section = document.querySelector(`#${sectionId}`);
        section.scrollIntoView({ behavior: 'smooth' });
    });
});

// Get the home section
const homeSection = document.getElementById('home');

// Get the title, text, and profile picture elements
const title = homeSection.querySelector('h1');
const text = homeSection.querySelector('.home-text');
const profilePicture = homeSection.querySelector('.profile-picture');

// Get the height of the home section
const homeSectionHeight = homeSection.offsetHeight;

// Add event listener to the window to trigger the hide effect when scrolling down
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const homeSectionTop = homeSection.offsetTop;
    const homeSectionMiddle = homeSectionTop + (homeSectionHeight / 2);
    if (scrollPosition > homeSectionMiddle) {
        title.style.display = 'none';
        text.style.display = 'none';
        profilePicture.style.display = 'none';
    } else {
        title.style.display = 'block';
        text.style.display = 'block';
        profilePicture.style.display = 'block';
    }
});

// Add event listener to modal window 1
var modal1 = document.getElementById("education-modal");
var btn1 = document.getElementsByClassName("learn-more-btn")[0];
var span1 = document.getElementsByClassName("close")[0];

btn1.onclick = function() {
    modal1.style.display = "block";
}

span1.onclick = function() {
    modal1.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal1) {
        modal1.style.display = "none";
    }
}

// Add event listener to modal window 1
var modal1 = document.getElementById("education-modal");
var btn1 = document.getElementsByClassName("learn-more-btn")[0];
var span1 = document.getElementsByClassName("close")[0];

btn1.onclick = function() {
    modal1.style.display = "block";
    modal1.style.width = "100%";
    modal1.style.height = "100%";
}

span1.onclick = function() {
    modal1.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal1) {
        modal1.style.display = "none";
    }
}

// Add event listener to modal window 2
var modal2 = document.getElementById("education-modal-2");
var btn2 = document.getElementsByClassName("learn-more-btn")[1];
var span2 = document.getElementsByClassName("close")[1];

btn2.onclick = function() {
    modal2.style.display = "block";
    modal2.style.width = "100%";
    modal2.style.height = "100%";
}

span2.onclick = function() {
    modal2.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal2) {
        modal2.style.display = "none";
    }
}