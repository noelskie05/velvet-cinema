// Global variables
let selectedMovie = '';
let selectedTime = '';
let selectedSeats = [];
let selectedPaymentMethod = '';
let currentStep = 1;
const TICKET_PRICE = 250;

// Define constants for seat layout
const SEAT_ROWS = ['A', 'B', 'C', 'D', 'E'];
const SEATS_PER_ROW = 5;

// Movie data - UPDATED TRAILER LINKS
const movies = [
    // NOW SHOWING (with 'carouselBg' for distinct carousel backgrounds)
    {
        title: "Mission: Impossible - The Final Reckoning",
        img: "images/mission_impossible.jpg", // This is the movie tile image
        carouselBg: "images/carousel1.jpg", // Separate image for carousel background
        trailer: "https://www.youtube.com/embed/fsQgc9pCyDU?si=5uI27kHFT49tYPOB",
        status: "now",
        description: "Ethan Hunt and his IMF team must track down a terrifying new weapon that threatens all of humanity if it falls into the wrong hands."
    },
    {
        title: "Final Destination: Bloodlines",
        img: "images/final_destination.jpg",
        carouselBg: "images/carousel2.jpg", // NEW
        trailer: "https://www.youtube.com/embed/UWMzKXsY9A4?si=bFx7H2Iu-gGcouOo",
        status: "now",
        description: "Death returns with a vengeance as a new group of unwitting victims must find a way to cheat their grisly demise."
    },
    {
        title: "Thunderbolts",
        img: "images/thunderbolts.png",
        carouselBg: "images/carousel3.jpg", // NEW
        trailer: "https://www.youtube.com/embed/-sAOWhvheK8?si=azOPsnSIfp4xgRfo",
        status: "now",
        description: "A group of anti-heroes and reformed villains are brought together by the government for black ops missions."
    },
    {
        title: "Sinners",
        img: "images/sinners.jpg",
        carouselBg: "images/carousel4.jpg", // NEW
        trailer: "https://www.youtube.com/embed/7joulECTx_U?si=xZTJGb-MwpR5qSLw",
        status: "now",
        description: "Dive into the dark underworld where moral lines blur and every choice has a deadly consequence."
    },
    {
        title: "Ateez World Tour (Towards the Light: Will to Power)",
        img: "images/ateez.jpg",
        carouselBg: "images/carousel5.jpeg", // NEW
        trailer: "https://www.youtube.com/embed/UZO1ZQg14cI?si=SHu-bHj5IqLy6xnM",
        status: "now",
        description: "Experience the electrifying live performance of K-Pop sensation Ateez on their 'Will to Power' World Tour."
    },

    // COMING SOON - NOW with carouselBg and description for the carousel
    {
        title: "DanDaDan: Evil Eye",
        img: "images/dandadan.jpg",
        carouselBg: "images/carousel6.jpg", // NEW for Coming Soon
        trailer: "https://www.youtube.com/embed/kuKKaLw5-_U?si=Gb0xIyDMZveiV5j6",
        status: "soon",
        description: "A thrilling journey into the supernatural world of evil spirits and psychic powers."
    },
    {
        title: "ConMom",
        img: "images/conmom.jpg",
        carouselBg: "images/carousel7.jpg", // NEW for Coming Soon
        trailer: "https://www.youtube.com/embed/placeholder_conmom",
        status: "soon",
        description: "A hilarious comedy about a mother who will stop at nothing to get what she wants, even if it means bending the rules."
    },
    {
        title: "Lilo & Stitch",
        img: "images/stitch.jpg",
        carouselBg: "images/carousel8.jpg", // NEW for Coming Soon
        trailer: "https://www.youtube.com/embed/VWqJifMMgZE?si=WrpP46w_BIKMV6JF",
        status: "soon",
        description: "A heartwarming tale of a young Hawaiian girl who adopts an alien creature disguised as a dog."
    },
    {
        title: "Isang Komedya sa Langit",
        img: "images/isang.jpg",
        carouselBg: "images/carousel9.jpg", // NEW for Coming Soon
        trailer: "https://www.youtube.com/embed/pxFZIICtivDA?si=98RNPWn6d8tihnz4",
        status: "soon",
        description: "A Filipino comedy that explores the humorous side of life and relationships in a heavenly setting."
    },
    {
        title: "Karate Kid: Legends",
        img: "images/karate.jpg",
        carouselBg: "images/carousel10.jpg", // NEW for Coming Soon
        trailer: "https://www.youtube.com/embed/LhRXf-yEQqA?si=40NYbteHzy8AffQN",
        status: "soon",
        description: "The legacy continues as new students discover the art of Karate and the true meaning of discipline."
    },
    {
        title: "The Surfer",
        img: "images/surfer.jpg",
        carouselBg: "images/carousel11.jpg", // NEW for Coming Soon
        trailer: "https://www.youtube.com/embed/KBLSsR3eiaY?si=wFCsRPq_KWo1hteb",
        status: "soon",
        description: "A captivating drama about a surfer's journey to overcome personal struggles and conquer the waves."
    },
    {
        title: "j-hope 'HOPE ON THE STAGE': LIVE VIEWING",
        img: "images/hope.jpg",
        carouselBg: "images/carousel12.jpg", // NEW for Coming Soon
        trailer: "https://www.youtube.com/embed/QwF91GStquo?si=fS5YYCxKladmUG9u",
        status: "soon",
        description: "A special live viewing event of j-hope's electrifying performance, bringing the stage to the big screen."
    },
    {
        title: "Holy Night: Demon Hunters",
        img: "images/night.jpg",
        carouselBg: "images/carousel13.jpg", // NEW for Coming Soon
        trailer: "https://www.youtube.com/embed/424dG6N-DOM?si=ct7dmwuSmb8Mgcb5",
        status: "soon",
        description: "On a holy night, ancient hunters rise to battle demonic forces threatening to engulf the world."
    }
];


const showtimes = ["10:00 AM", "01:00 PM", "04:00 PM", "07:00 PM", "10:00 PM"];

const movieGrid = document.getElementById('movies');
const tabs = document.querySelectorAll(".tab");

const heroCarousel = document.getElementById('heroCarousel');
// Filter for movies that have a carousel background and description, regardless of status
const carouselMovies = movies.filter(m => m.carouselBg && m.description);
let currentHeroIndex = 0;
let carouselInterval;

function startCarouselAutoAdvance() {
    clearInterval(carouselInterval);
    if (carouselMovies.length > 1) {
        carouselInterval = setInterval(showNextSlide, 7000);
    }
}

function renderHeroCarousel() {
    heroCarousel.innerHTML = '';

    if (carouselMovies.length === 0) {
        heroCarousel.style.display = 'none';
        return;
    } else {
        heroCarousel.style.display = 'block';
    }

    carouselMovies.forEach((movie, index) => {
        const carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel-item');
        carouselItem.style.backgroundImage = `url(${movie.carouselBg})`;
        if (index === currentHeroIndex) {
            carouselItem.classList.add('active');
        }

        const content = document.createElement('div');
        content.classList.add('content');
        content.innerHTML = `
            <h1>${movie.title}</h1>
            <p>${movie.description}</p>
            <button class="watch-trailer-btn" data-trailer-id="${movie.trailer}" data-movie-title="${movie.title}">Watch Trailer</button>
        `;
        carouselItem.appendChild(content);
        heroCarousel.appendChild(carouselItem);
    });

    startCarouselAutoAdvance();

    const carouselWatchTrailerButtons = document.querySelectorAll('.carousel-item .watch-trailer-btn');
    carouselWatchTrailerButtons.forEach(button => {
        button.addEventListener('click', function() {
            const trailerId = this.dataset.trailerId;
            const movieTitle = this.dataset.movieTitle;
            if (trailerId) {
                openTrailer(trailerId, movieTitle);
            } else {
                console.error('No trailer ID found for this movie in carousel.', movieTitle);
            }
        });
    });
}

function showNextSlide() {
    currentHeroIndex = (currentHeroIndex + 1) % carouselMovies.length;
    updateCarousel();
}

function showPrevSlide() {
    currentHeroIndex = (currentHeroIndex - 1 + carouselMovies.length) % carouselMovies.length;
    updateCarousel();
}

function updateCarousel() {
    const items = document.querySelectorAll('.carousel-item');
    items.forEach((item, index) => {
        if (index === currentHeroIndex) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    startCarouselAutoAdvance();
}

const carouselPrevButton = document.getElementById('carouselPrev');
const carouselNextButton = document.getElementById('carouselNext');

if (carouselPrevButton) {
    carouselPrevButton.addEventListener('click', showPrevSlide);
}
if (carouselNextButton) {
    carouselNextButton.addEventListener('click', showNextSlide);
}


function renderMovies(status, shouldScroll = false) {
    movieGrid.innerHTML = '';

    tabs.forEach(tab => tab.classList.remove('active'));
    const activeTabButton = document.querySelector(`.tab[onclick="filterMovies('${status}')"]`);
    if (activeTabButton) {
        activeTabButton.classList.add('active');
    }

    const filteredMovies = movies.filter(movie => movie.status === status);

    if (filteredMovies.length === 0) {
        movieGrid.innerHTML = '<p style="text-align: center; width: 100%; margin-top: 50px; font-size: 1.2em; color: #aaa;">No movies found for this category.</p>';
        return;
    }

    filteredMovies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        movieCard.innerHTML = `
            <div class="movie-image-container">
                <img src="${movie.img}" alt="${movie.title}">
                <div class="movie-card-overlay" data-trailer-id="${movie.trailer}" data-movie-title="${movie.title}">
                    <span class="play-icon">▶</span>
                </div>
            </div>
            <h3>${movie.title}</h3>
            <button onclick="openBooking('${movie.title}')">Book Now</button>
        `;
        movieGrid.appendChild(movieCard);
    });

    document.querySelectorAll('.movie-card-overlay').forEach(overlay => {
        overlay.addEventListener('click', function() {
            const trailerId = this.dataset.trailerId;
            const movieTitle = this.dataset.movieTitle;
            if (trailerId) {
                openTrailer(trailerId, movieTitle);
            } else {
                console.error('No trailer ID found for this movie card:', movieTitle);
            }
        });
    });

    if (shouldScroll) {
        const moviesSection = document.getElementById('movies');
        if (moviesSection) {
            moviesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
}

function filterMovies(status) {
    renderMovies(status, true);
}

// TRAILER MODAL FUNCTIONS
const trailerModal = document.getElementById('trailerModal');
const trailerFrame = document.getElementById('trailerFrame');
let currentTrailerMovieTitle = "";

function openTrailer(trailerId, movieTitle) {
    // The `trailerId` here is actually the full URL now.
    // We just need to make sure `autoplay=1` is appended if it's not already.
    let embedUrl = trailerId;
    if (!embedUrl.includes('autoplay=1')) {
        embedUrl += '?autoplay=1';
    }
    trailerFrame.src = embedUrl;
    trailerModal.style.display = 'flex';
    currentTrailerMovieTitle = movieTitle;
}

function closeTrailer() {
    trailerFrame.src = '';
    trailerModal.style.display = 'none';
}

function bookFromTrailerModal() {
    closeTrailer();
    openBooking(currentTrailerMovieTitle);
}

// BOOKING MODAL FUNCTIONS
const bookingModal = document.getElementById('bookingModal');
const movieTitlePlaceholder = document.getElementById('movieTitlePlaceholder');

function openBooking(movieTitle) {
    selectedMovie = movieTitle;
    movieTitlePlaceholder.textContent = movieTitle;
    bookingModal.style.display = 'flex';
    document.getElementById('bookingStep1').style.display = 'block';
    document.getElementById('bookingStep2').style.display = 'none';
    document.getElementById('receipt').style.display = 'none';
    currentStep = 1;

    document.getElementById('bookingDate').value = '';
    document.getElementById('ticketCount').value = '1';
    document.getElementById('personalName').value = '';
    document.getElementById('personalEmail').value = '';
    document.getElementById('personalPhone').value = '';
    document.getElementById('pickupComments').value = '';
    document.getElementById('termsConsent').checked = false;
    document.getElementById('sendConfirmation').checked = false;

    document.querySelectorAll('.payment-option-label').forEach(label => label.classList.remove('selected'));
    document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => radio.checked = false);
    selectedPaymentMethod = '';
    const firstPaymentMethodRadio = document.querySelector('input[name="paymentMethod"]');
    if (firstPaymentMethodRadio) {
        firstPaymentMethodRadio.checked = true;
        firstPaymentMethodRadio.closest('.payment-option-label').classList.add('selected');
        selectedPaymentMethod = firstPaymentMethodRadio.value;
    }

    selectedTime = '';
    selectedSeats = [];
    document.querySelectorAll('.time-slot-btn').forEach(btn => btn.classList.remove('selected'));

    renderSeats();
}

function closeBooking() {
    bookingModal.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    }

    const timeSlotsContainer = document.getElementById('timeSlotsContainer');
    if (timeSlotsContainer) {
        if (timeSlotsContainer.children.length === 0 || !timeSlotsContainer.querySelector('.time-slot-btn')) {
            showtimes.forEach(time => {
                const button = document.createElement('button');
                button.classList.add('time-slot-btn');
                button.dataset.time = time;
                button.textContent = time;
                timeSlotsContainer.appendChild(button);
            });
        }

        timeSlotsContainer.addEventListener('click', (event) => {
            if (event.target.classList.contains('time-slot-btn')) {
                document.querySelectorAll('.time-slot-btn').forEach(btn => {
                    btn.classList.remove('selected');
                });
                event.target.classList.add('selected');
                selectedTime = event.target.dataset.time;
            }
        });
    }

    document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
        radio.addEventListener('change', (event) => {
            document.querySelectorAll('.payment-option-label').forEach(label => {
                label.classList.remove('selected');
            });

            if (event.target.checked) {
                event.target.closest('.payment-option-label').classList.add('selected');
                selectedPaymentMethod = event.target.value;
                console.log('Selected Payment Method:', selectedPaymentMethod);
            }
        });
    });

    renderHeroCarousel();
    renderMovies('now', false);
});

function renderSeats() {
    const seatsContainer = document.getElementById('seatsContainer');
    seatsContainer.innerHTML = '';

    seatsContainer.style.gridTemplateColumns = `repeat(${SEATS_PER_ROW}, 1fr)`;

    selectedSeats = [];

    SEAT_ROWS.forEach(rowLetter => {
        for (let colNum = 1; colNum <= SEATS_PER_ROW; colNum++) {
            const seatLabel = `${rowLetter}${colNum}`;
            const seatElement = document.createElement('div');
            seatElement.classList.add('seat');
            seatElement.textContent = seatLabel;
            seatElement.dataset.seatLabel = seatLabel;

            seatElement.onclick = () => toggleSeatSelection(seatElement);

            seatsContainer.appendChild(seatElement);
        }
    });
}

function toggleSeatSelection(seat) {
    const seatLabel = seat.dataset.seatLabel;
    const ticketCount = parseInt(document.getElementById('ticketCount').value);

    if (seat.classList.contains('selected')) {
        seat.classList.remove('selected');
        selectedSeats = selectedSeats.filter(s => s !== seatLabel);
    } else {
        if (selectedSeats.length < ticketCount) {
            seat.classList.add('selected');
            selectedSeats.push(seatLabel);
        } else {
            alert(`You can only select ${ticketCount} seats.`);
        }
    }
}

function goToNextStep() {
    const bookingDate = document.getElementById('bookingDate').value;
    const ticketCount = parseInt(document.getElementById('ticketCount').value);

    if (!bookingDate) {
        alert("Please select a date.");
        return;
    }
    if (!selectedTime) {
        alert("Please select a showtime.");
        return;
    }
    if (selectedSeats.length === 0) {
        alert("Please select your seats.");
        return;
    }
    if (selectedSeats.length !== ticketCount) {
        alert(`Please select exactly ${ticketCount} seats.`);
        return;
    }

    document.getElementById('summaryMovie').textContent = selectedMovie;
    document.getElementById('summaryDate').textContent = bookingDate;
    document.getElementById('summaryTime').textContent = selectedTime;
    document.getElementById('summaryTickets').textContent = ticketCount;
    document.getElementById('summarySeats').textContent = selectedSeats.sort((a, b) => {
        const rowA = a.charAt(0);
        const rowB = b.charAt(0);
        const numA = parseInt(a.substring(1));
        const numB = parseInt(b.substring(1));

        if (rowA === rowB) {
            return numA - numB;
        }
        return rowA.localeCompare(rowB);
    }).join(', ');
    document.getElementById('summaryTotal').textContent = `₱${(ticketCount * TICKET_PRICE).toFixed(2)}`;

    document.getElementById('bookingStep1').style.display = 'none';
    document.getElementById('bookingStep2').style.display = 'block';
    currentStep = 2;
}

function goToPreviousStep() {
    document.getElementById('bookingStep1').style.display = 'block';
    document.getElementById('bookingStep2').style.display = 'none';
    currentStep = 1;
}

function confirmPayment() {
    const personalName = document.getElementById('personalName').value;
    const personalEmail = document.getElementById('personalEmail').value;
    const termsConsent = document.getElementById('termsConsent').checked;

    if (!personalName || !personalEmail) {
        alert("Please fill in your Name and Email.");
        return;
    }
    if (!termsConsent) {
        alert("You must agree to the Terms and Conditions and Privacy Policy.");
        return;
    }

    if (!selectedPaymentMethod) {
        alert("Please select a payment method.");
        return;
    }

    const totalAmount = (parseInt(document.getElementById('ticketCount').value) * TICKET_PRICE).toFixed(2);

    const receiptContent = `
        <h3>Booking Confirmed!</h3>
        <p>Thank you for your booking, <strong>${personalName}</strong>!</p>
        <p>Your e-tickets will be sent to <strong>${personalEmail}</strong> shortly.</p>
        <p>---</p>
        <p><strong>Movie:</strong> ${selectedMovie}</p>
        <p><strong>Date:</strong> ${document.getElementById('bookingDate').value}</p>
        <p><strong>Time:</strong> ${selectedTime}</p>
        <p><strong>Tickets:</strong> ${document.getElementById('ticketCount').value}</p>
        <p><strong>Seats:</strong> ${selectedSeats.sort((a, b) => {
            const rowA = a.charAt(0);
            const rowB = b.charAt(0);
            const numA = parseInt(a.substring(1));
            const numB = parseInt(b.substring(1));
            if (rowA === rowB) return numA - numB;
            return rowA.localeCompare(rowB);
        }).join(', ')}</p>
        <p><strong>Payment Method:</strong> ${selectedPaymentMethod.replace('_', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</p>
        <p><strong>Total Paid:</strong> ₱${totalAmount}</p>
        <p>---</p>
        <p style="font-size: 0.9em; color: #888;">Please present this receipt or your e-ticket at the cinema entrance.</p>
    `;

    document.getElementById('bookingStep2').style.display = 'none';
    document.getElementById('receipt').innerHTML = receiptContent;
    document.getElementById('receipt').style.display = 'block';
}

document.getElementById('ticketCount').addEventListener('change', () => {
    const newTicketCount = parseInt(document.getElementById('ticketCount').value);
    if (selectedSeats.length > newTicketCount) {
        while(selectedSeats.length > newTicketCount) {
            const lastSelectedSeatLabel = selectedSeats.pop();
            const seatElement = document.querySelector(`.seat[data-seat-label="${lastSelectedSeatLabel}"]`);
            if(seatElement) {
                seatElement.classList.remove('selected');
            }
        }
    }
});