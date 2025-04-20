const cityAttractions = {
    "andhra pradesh": ["Tirupati", "Visakhapatnam Beach", "Araku Valley", "Chilika Lake", "Sri Kalahasti Temple"],
    "arunachal pradesh": ["Tawang Monastery", "Sela Pass", "Bomdila", "Namdapha National Park", "Ziro Valley"],
    "assam": ["Kaziranga National Park", "Majuli", "Kamakhya Temple", "Sivasagar", "Tea Gardens"],
    "bihar": ["Nalanda", "Bodh Gaya", "Patna Sahib", "Rajgir", "Vaishali"],
    "chhattisgarh": ["Chitrakoot Falls", "Kanger Valley National Park", "Bhoramdeo Temple", "Sirpur", "Raman Temple"],
    "goa": ["Baga Beach", "Fort Aguada", "Basilica of Bom Jesus", "Dudhsagar Falls", "Anjuna Market"],
    "gujarat": ["Statue of Unity", "Gir National Park", "Somnath Temple", "Rann of Kutch", "Dwarkadhish Temple"],
    "haryana": ["Kurukshetra", "Sultanpur Bird Sanctuary", "Pinjore Gardens", "Baba Farid's Tomb", "Rani Ki Vav"],
    "himachal pradesh": ["Shimla", "Manali", "Dharamshala", "Spiti Valley", "Kullu"],
    "jharkhand": ["Ranchi", "Betla National Park", "Dassam Falls", "Hazaribagh", "Jagannath Temple"],
    "karnataka": ["Mysore Palace", "Hampi", "Coorg", "Lalbagh", "Bannerghatta National Park"],
    "kerala": ["Backwaters of Alleppey", "Munnar Hills", "Kochi Fort", "Periyar Wildlife Sanctuary", "Varkala Beach"],
    "madhya pradesh": ["Khajuraho Temples", "Sanchi Stupa", "Kanha National Park", "Orchha", "Gwalior Fort"],
    "maharashtra": ["Gateway of India", "Ajanta Caves", "Shaniwar Wada", "Marine Drive", "Elephanta Caves"],
    "manipur": ["Loktak Lake", "Imphal", "Kangla Fort", "Keibul Lamjao National Park", "Shree Shree Govindajee Temple"],
    "meghalaya": ["Shillong", "Elephant Falls", "Cherrapunji", "Nohkalikai Falls", "Mawlynnong Village"],
    "mizoram": ["Aizawl", "Lunglei", "Dampa Tiger Reserve", "Reiek", "Vantawng Falls"],
    "nagaland": ["Kohima", "Kohima War Cemetery", "Kaziranga", "Zunheboto", "Mokokchung"],
    "odisha": ["Konark Sun Temple", "Puri Beach", "Jagannath Temple", "Chilika Lake", "Bhubaneswar"],
    "punjab": ["Golden Temple", "Jallianwala Bagh", "Wagah Border", "Durgiana Temple", "Rock Garden of Chandigarh"],
    "rajasthan": ["Hawa Mahal", "City Palace", "Jaisalmer Fort", "Lake Pichola", "Mehrangarh Fort"],
    "sikkim": ["Tsomgo Lake", "Nathula Pass", "Rumtek Monastery", "Gangtok", "Yumthang Valley"],
    "tamil nadu": ["Meenakshi Temple", "Marina Beach", "Ooty", "Brihadeeswara Temple", "Mahabalipuram"],
    "telangana": ["Charminar", "Golconda Fort", "Hussain Sagar", "Ramoji Film City", "Salar Jung Museum"],
    "tripura": ["Ujjayanta Palace", "Neermahal", "Sepahijala Wildlife Sanctuary", "Tripura Sundari Temple", "Debtamura"],
    "uttar pradesh": ["Taj Mahal", "Varanasi Ghats", "Agra Fort", "Fatehpur Sikri", "Sarnath"],
    "uttarakhand": ["Nainital", "Mussoorie", "Haridwar", "Rishikesh", "Jim Corbett National Park"],
    "west bengal": ["Victoria Memorial", "Howrah Bridge", "Sundarbans", "Darjeeling", "Kalighat Temple"],
    "andaman and nicobar islands": ["Radhanagar Beach", "Cellular Jail", "Havelock Island", "Neil Island", "Viper Island"],
    "chandigarh": ["Rock Garden", "Sukhna Lake", "Rose Garden", "Elante Mall", "Chandigarh Haat"],
    "lakshadweep": ["Bangaram Island", "Agatti Island", "Kavaratti", "Kalapathar Beach", "Minicoy Island"],
    "delhi": ["Red Fort", "India Gate", "Qutub Minar", "Lotus Temple", "Akshardham Temple"],
  };
  
  // Global variables
  let currentStep = 1;
  let budgetChart = null;
  let carouselInterval = null;
  let currentSlide = 0;
  
  // Default tasks
  const defaultTasks = [
    "Book Flights ✈️",
    "Find Accommodations 🏨",
    "Plan Activities 🧭",
    "Manage Food 🍽️",
    "Transport Arrangements 🚗"
  ];
  
  // Helper function to format text (capitalize first letter of each word)
  function formatText(text) {
    return text
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  
  // Initialize the application
  document.addEventListener('DOMContentLoaded', () => {
    // Custom cursor
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
      
      // Delayed follower effect
      setTimeout(() => {
        cursorFollower.style.left = `${e.clientX}px`;
        cursorFollower.style.top = `${e.clientY}px`;
      }, 80);
    });
    
    // Cursor interaction
    const interactiveElements = document.querySelectorAll('button, input, select, .carousel-indicator, .tab-header, .task-checkbox');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('active'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
    });
  
    // Set initial dates
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    const startDateInput = document.getElementById('start-date');
    const endDateInput = document.getElementById('end-date');
    
    if (startDateInput && endDateInput) {
      const todayStr = today.toISOString().split('T')[0];
      const tomorrowStr = tomorrow.toISOString().split('T')[0];
      
      startDateInput.min = todayStr;
      endDateInput.min = todayStr;
      
      startDateInput.value = todayStr;
      endDateInput.value = tomorrowStr;
      
      // Initialize trip duration display
      updateTripDuration();
      
      // Add event listeners
      startDateInput.addEventListener('change', function() {
        if (endDateInput.value < this.value) {
          endDateInput.value = this.value;
        }
        updateTripDuration();
      });
      
      endDateInput.addEventListener('change', function() {
        if (this.value < startDateInput.value) {
          this.value = startDateInput.value;
        }
        updateTripDuration();
      });
    }
    
    // Initialize budget display
    const budgetInput = document.getElementById('budget');
    const budgetValueDisplay = document.getElementById('budgetValue');
    
    if (budgetInput && budgetValueDisplay) {
      updateBudgetDisplay();
      
      budgetInput.addEventListener('input', updateBudgetDisplay);
    }
    
    // Initialize members input
    const membersInput = document.getElementById('members');
    
    if (membersInput) {
      membersInput.addEventListener('input', updateMemberTags);
    }
    
    // Initialize destination selection
    const destinationSelect = document.getElementById('destination');
    
    if (destinationSelect) {
      destinationSelect.addEventListener('change', handleDestinationChange);
    }
    
    // Initialize generate button
    const generateBtn = document.getElementById('generate-blueprint');
    
    if (generateBtn) {
      generateBtn.addEventListener('click', generateBlueprint);
    }
    
    // Initialize tab navigation
    document.querySelectorAll('.tab-header').forEach(tab => {
      tab.addEventListener('click', function() {
        const tabId = this.getAttribute('data-tab');
        switchTab(tabId);
      });
    });
    
    // Update member tags and budget per person on init
    updateMemberTags();
    updateBudgetPerPerson();
  });
  
  // Update trip duration display
  function updateTripDuration() {
    const startDateInput = document.getElementById('start-date');
    const endDateInput = document.getElementById('end-date');
    const tripDuration = document.getElementById('tripDuration');
    const durationDaysDisplay = document.getElementById('durationDays');
    
    if (!startDateInput || !endDateInput || !tripDuration || !durationDaysDisplay) return;
    
    if (startDateInput.value && endDateInput.value) {
      const startDate = new Date(startDateInput.value);
      const endDate = new Date(endDateInput.value);
      const diffTime = Math.abs(endDate - startDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      
      durationDaysDisplay.textContent = diffDays.toString();
      tripDuration.style.display = 'block';
    } else {
      tripDuration.style.display = 'none';
    }
  }
  
  // Update budget display
  function updateBudgetDisplay() {
    const budgetInput = document.getElementById('budget');
    const budgetValueDisplay = document.getElementById('budgetValue');
    
    if (!budgetInput || !budgetValueDisplay) return;
    
    const value = parseInt(budgetInput.value);
    budgetValueDisplay.textContent = `₹${value.toLocaleString()}`;
    
    updateBudgetPerPerson();
  }
  
  // Update member tags
  function updateMemberTags() {
    const membersInput = document.getElementById('members');
    const membersTags = document.getElementById('membersTags');
    
    if (!membersInput || !membersTags) return;
    
    membersTags.innerHTML = '';
    
    const members = membersInput.value.split(',').filter(member => member.trim());
    
    members.forEach(member => {
      if (member.trim()) {
        const tag = document.createElement('div');
        tag.className = 'member-tag';
        tag.textContent = member.trim();
        membersTags.appendChild(tag);
      }
    });
    
    updateBudgetPerPerson();
  }
  
  // Update per person budget
  function updateBudgetPerPerson() {
    const budgetInput = document.getElementById('budget');
    const membersInput = document.getElementById('members');
    const perPersonValueDisplay = document.getElementById('perPersonValue');
    const budgetPerPerson = document.getElementById('budgetPerPerson');
    
    if (!budgetInput || !membersInput || !perPersonValueDisplay || !budgetPerPerson) return;
    
    const budget = parseInt(budgetInput.value);
    const members = membersInput.value.split(',').filter(member => member.trim());
    
    if (members.length > 0) {
      const perPersonBudget = Math.round(budget / members.length);
      perPersonValueDisplay.textContent = `₹${perPersonBudget.toLocaleString()}`;
      budgetPerPerson.style.display = 'block';
    } else {
      budgetPerPerson.style.display = 'none';
    }
  }
  
  // Handle destination change
  function handleDestinationChange() {
    const destinationSelect = document.getElementById('destination');
    const destinationCarousel = document.getElementById('destinationCarousel');
    
    if (!destinationSelect || !destinationCarousel) return;
    
    const destination = destinationSelect.value;
    
    if (destination) {
      createDestinationCarousel(destination);
      destinationCarousel.style.display = 'block';
    } else {
      destinationCarousel.style.display = 'none';
    }
  }
  
  // Create destination carousel
  function createDestinationCarousel(destination) {
    const destinationCarousel = document.getElementById('destinationCarousel');
    if (!destinationCarousel) return;
    
    const slidesContainer = destinationCarousel.querySelector('.carousel-slides');
    const indicatorsContainer = destinationCarousel.querySelector('.carousel-indicators');
    
    if (!slidesContainer || !indicatorsContainer) return;
    
    // Clear existing slides and indicators
    slidesContainer.innerHTML = '';
    indicatorsContainer.innerHTML = '';
    
    // Clear any existing interval
    if (carouselInterval) {
      clearInterval(carouselInterval);
    }
    
    // Get attractions for the destination
    const attractions = cityAttractions[destination.toLowerCase()] || [];
    
    // Create slides based on attractions
    attractions.forEach((attraction, index) => {
      // Create slide
      const slide = document.createElement('div');
      slide.className = `carousel-slide ${index === 0 ? 'active' : ''}`;
      slide.style.backgroundImage = `url('https://source.unsplash.com/800x600/?${encodeURIComponent(destination + ' ' + attraction)}')`;
      
      // Create slide content
      const slideContent = document.createElement('div');
      slideContent.className = 'carousel-slide-content';
      slideContent.innerHTML = `
        <h3>${formatText(destination)}</h3>
        <p>${attraction}</p>
      `;
      
      slide.appendChild(slideContent);
      slidesContainer.appendChild(slide);
      
      // Create indicator
      const indicator = document.createElement('div');
      indicator.className = `carousel-indicator ${index === 0 ? 'active' : ''}`;
      indicator.addEventListener('click', () => goToSlide(index));
      indicatorsContainer.appendChild(indicator);
    });
    
    // If no attractions found, create a default slide
    if (attractions.length === 0) {
      const slide = document.createElement('div');
      slide.className = 'carousel-slide active';
      slide.style.backgroundImage = `url('https://source.unsplash.com/800x600/?${encodeURIComponent(destination + ' tourism')}')`;
      
      const slideContent = document.createElement('div');
      slideContent.className = 'carousel-slide-content';
      slideContent.innerHTML = `
        <h3>${formatText(destination)}</h3>
        <p>Discover amazing attractions</p>
      `;
      
      slide.appendChild(slideContent);
      slidesContainer.appendChild(slide);
      
      const indicator = document.createElement('div');
      indicator.className = 'carousel-indicator active';
      indicatorsContainer.appendChild(indicator);
    }
    
    // Add event listeners to carousel controls
    const prevButton = destinationCarousel.querySelector('.carousel-control.prev');
    const nextButton = destinationCarousel.querySelector('.carousel-control.next');
    
    if (prevButton && nextButton) {
      prevButton.addEventListener('click', prevSlide);
      nextButton.addEventListener('click', nextSlide);
    }
    
    // Start auto-rotation
    currentSlide = 0;
    carouselInterval = setInterval(nextSlide, 5000);
  }
  
  // Go to specific slide
  function goToSlide(index) {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.carousel-indicator');
    
    if (slides.length === 0) return;
    
    if (index >= slides.length) index = 0;
    if (index < 0) index = slides.length - 1;
    
    // Update current slide index
    currentSlide = index;
    
    // Update slides
    slides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });
    
    // Update indicators
    indicators.forEach((indicator, i) => {
      if (i === index) {
        indicator.classList.add('active');
      } else {
        indicator.classList.remove('active');
      }
    });
  }
  
  // Go to next slide
  function nextSlide() {
    const slides = document.querySelectorAll('.carousel-slide');
    if (slides.length === 0) return;
    
    goToSlide(currentSlide + 1);
  }
  
  // Go to previous slide
  function prevSlide() {
    const slides = document.querySelectorAll('.carousel-slide');
    if (slides.length === 0) return;
    
    goToSlide(currentSlide - 1);
  }
  
  // Switch tabs
  function switchTab(tabId) {
    // Update tab headers
    document.querySelectorAll('.tab-header').forEach(tab => {
      if (tab.getAttribute('data-tab') === tabId) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });
    
    // Update tab content
    document.querySelectorAll('.tab-pane').forEach(pane => {
      if (pane.id === `${tabId}Tab`) {
        pane.classList.add('active');
      } else {
        pane.classList.remove('active');
      }
    });
  }
  
  // Generate travel blueprint
  function generateBlueprint() {
    const destinationSelect = document.getElementById('destination');
    const startDateInput = document.getElementById('start-date');
    const endDateInput = document.getElementById('end-date');
    const membersInput = document.getElementById('members');
    const budgetInput = document.getElementById('budget');
    
    if (!destinationSelect || !startDateInput || !endDateInput || !membersInput || !budgetInput) {
      alert('Something went wrong. Please try again.');
      return;
    }
    
    // Validate inputs
    const destination = destinationSelect.value;
    const startDate = startDateInput.value;
    const endDate = endDateInput.value;
    const members = membersInput.value.split(',').filter(member => member.trim());
    const budget = parseInt(budgetInput.value);
    
    if (!destination) {
      alert('Please select a destination.');
      return;
    }
    
    if (!startDate || !endDate) {
      alert('Please select start and end dates.');
      return;
    }
    
    if (members.length === 0) {
      alert('Please enter at least one traveler name.');
      return;
    }
    
    // Show loading overlay
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
      loadingOverlay.classList.remove('hidden');
    }
    
    // Generate blueprint with a simulated delay for better user experience
    setTimeout(() => {
      // Generate itinerary data
      const itineraryData = generateItineraryData(destination, startDate, endDate, members, budget);
      
      // Update UI with generated data
      updateItineraryUI(itineraryData);
      
      // Hide loading overlay
      if (loadingOverlay) {
        loadingOverlay.classList.add('hidden');
      }
      
      // Show confetti
      showConfetti();
      
      // Scroll to result
      const itineraryResult = document.getElementById('itineraryResult');
      if (itineraryResult) {
        setTimeout(() => {
          itineraryResult.scrollIntoView({ behavior: 'smooth' });
        }, 200);
      }
    }, 1500);
  }
  
  // Generate itinerary data
  function generateItineraryData(destination, startDate, endDate, members, budget) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    
    // Get attractions for the destination
    const attractions = cityAttractions[destination.toLowerCase()] || [`Explore popular spots in ${formatText(destination)}`];
    
    // Generate daily plan
    const dailyPlan = [];
    for (let i = 0; i < days; i++) {
      const place = attractions[i % attractions.length];
      dailyPlan.push({
        day: i + 1,
        activity: `Visit ${place}`,
        image: `https://source.unsplash.com/800x600/?${encodeURIComponent(destination + ' ' + place)}`
      });
    }
    
    // Calculate budget per person
    const budgetPerPerson = Math.round(budget / members.length);
    
    // Generate task assignments
    const taskAssignments = defaultTasks.map((task, idx) => {
      return {
        task,
        assignee: members[idx % members.length].trim(),
        completed: false
      };
    });
    
    // Return itinerary data
    return {
      destination,
      startDate: start,
      endDate: end,
      days,
      dailyPlan,
      budget,
      budgetPerPerson,
      members,
      taskAssignments
    };
  }
  
  // Update UI with generated itinerary
  function updateItineraryUI(itinerary) {
    const itineraryResult = document.getElementById('itineraryResult');
    if (!itineraryResult) return;
    
    // Show itinerary result
    itineraryResult.classList.remove('hidden');
    
    // Update destination title
    const destinationTitle = document.getElementById('destinationTitle');
    if (destinationTitle) {
      destinationTitle.textContent = formatText(itinerary.destination);
    }
    
    // Update trip summary
    updateTripSummary(itinerary);
    
    // Create itinerary timeline
    createItineraryTimeline(itinerary);
    
    // Create budget visualization
    createBudgetVisualization(itinerary);
    
    // Create tasks list
    createTasksList(itinerary);
  }
  
  // Update trip summary
  function updateTripSummary(itinerary) {
    const tripSummary = document.getElementById('tripSummary');
    const tripSummaryContent = document.getElementById('tripSummaryContent');
    
    if (!tripSummary || !tripSummaryContent) return;
    
    tripSummary.classList.add('hidden');
    tripSummaryContent.classList.remove('hidden');
    
    // Format dates
    const startDateFormatted = itinerary.startDate.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
    
    const endDateFormatted = itinerary.endDate.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
    
    tripSummaryContent.innerHTML = `
      <div class="summary-detail">
        <div class="summary-detail-icon" style="background-color: rgba(234, 56, 76, 0.1);">
          <i class="fas fa-map-marker-alt" style="color: var(--accent-red);"></i>
        </div>
        <div class="summary-detail-text">
          <p>Destination</p>
          <p>${formatText(itinerary.destination)}</p>
        </div>
      </div>
      
      <div class="summary-detail">
        <div class="summary-detail-icon" style="background-color: rgba(234, 56, 76, 0.1);">
          <i class="fas fa-calendar-alt" style="color: var(--accent-red);"></i>
        </div>
        <div class="summary-detail-text">
          <p>Dates</p>
          <p>${startDateFormatted} - ${endDateFormatted}</p>
        </div>
      </div>
      
      <div class="summary-detail">
        <div class="summary-detail-icon" style="background-color: rgba(234, 56, 76, 0.1);">
          <i class="fas fa-clock" style="color: var(--accent-red);"></i>
        </div>
        <div class="summary-detail-text">
          <p>Duration</p>
          <p>${itinerary.days} days</p>
        </div>
      </div>
      
      <div class="summary-detail">
        <div class="summary-detail-icon" style="background-color: rgba(234, 56, 76, 0.1);">
          <i class="fas fa-users" style="color: var(--accent-red);"></i>
        </div>
        <div class="summary-detail-text">
          <p>Group Size</p>
          <p>${itinerary.members.length} ${itinerary.members.length > 1 ? 'people' : 'person'}</p>
        </div>
      </div>
      
      <div class="summary-detail">
        <div class="summary-detail-icon" style="background-color: rgba(234, 56, 76, 0.1);">
          <i class="fas fa-wallet" style="color: var(--accent-red);"></i>
        </div>
        <div class="summary-detail-text">
          <p>Budget</p>
          <p>₹${itinerary.budget.toLocaleString()} (₹${itinerary.budgetPerPerson.toLocaleString()}/person)</p>
        </div>
      </div>
      
      <div class="summary-detail" style="grid-column: 1 / -1;">
        <div class="summary-detail-icon" style="background-color: rgba(234, 56, 76, 0.1);">
          <i class="fas fa-user-friends" style="color: var(--accent-red);"></i>
        </div>
        <div class="summary-detail-text">
          <p>Travelers</p>
          <p>${itinerary.members.join(', ')}</p>
        </div>
      </div>
      
      <button class="generate-btn" style="grid-column: 1 / -1; margin-top: 1rem;">
        <i class="fas fa-download"></i> Save Blueprint
      </button>
    `;
  }
  
  // Create itinerary timeline
  function createItineraryTimeline(itinerary) {
    const itineraryTimeline = document.getElementById('itineraryTimeline');
    if (!itineraryTimeline) return;
    
    itineraryTimeline.innerHTML = '';
    
    itinerary.dailyPlan.forEach((day, index) => {
      const timelineItem = document.createElement('div');
      timelineItem.className = 'timeline-item';
      timelineItem.style.animationDelay = `${index * 0.1}s`;
      
      const isLastItem = index === itinerary.dailyPlan.length - 1;
      
      timelineItem.innerHTML = `
        <div class="timeline-marker">
          <div class="timeline-day">${day.day}</div>
          ${!isLastItem ? '<div class="timeline-line"></div>' : ''}
        </div>
        
        <div class="timeline-card">
          <div class="timeline-card-grid">
            <div class="timeline-image" style="background-image: url('${day.image}')"></div>
            <div class="timeline-content">
              <div class="timeline-day-label">
                <i class="fas fa-calendar-day"></i>
                <span>Day ${day.day}</span>
              </div>
              <h3 class="timeline-activity">${day.activity}</h3>
              <div class="timeline-location">
                <i class="fas fa-map-marker-alt"></i>
                <span>${formatText(itinerary.destination)}</span>
              </div>
            </div>
          </div>
        </div>
      `;
      
      itineraryTimeline.appendChild(timelineItem);
    });
  }
  
  // Create budget visualization
  function createBudgetVisualization(itinerary) {
    const totalBudgetDisplay = document.getElementById('totalBudgetDisplay');
    const perPersonBudgetDisplay = document.getElementById('perPersonBudgetDisplay');
    const allocationSliders = document.querySelector('.allocation-sliders');
    
    if (!totalBudgetDisplay || !perPersonBudgetDisplay || !allocationSliders) return;
    
    // Update budget displays
    totalBudgetDisplay.textContent = `₹${itinerary.budget.toLocaleString()}`;
    perPersonBudgetDisplay.textContent = `₹${itinerary.budgetPerPerson.toLocaleString()}`;
    
    // Create budget allocation sliders
    allocationSliders.innerHTML = '';
    
    // Default budget allocations
    const allocations = [
      { category: 'Accommodation', percentage: 30, color: '#ea384c' },
      { category: 'Transportation', percentage: 25, color: '#ff6b6b' },
      { category: 'Food & Drinks', percentage: 20, color: '#c91c2e' },
      { category: 'Activities', percentage: 15, color: '#f27f7f' },
      { category: 'Shopping', percentage: 10, color: '#940f1c' }
    ];
    
    allocations.forEach((allocation, index) => {
      const amount = Math.round((allocation.percentage / 100) * itinerary.budget);
      const perPerson = Math.round(amount / itinerary.members.length);
      
      const allocationItem = document.createElement('div');
      allocationItem.className = 'allocation-item';
      allocationItem.style.animationDelay = `${index * 0.1}s`;
      
      allocationItem.innerHTML = `
        <div class="allocation-header">
          <div class="allocation-label">
            <div class="allocation-color" style="background-color: ${allocation.color}"></div>
            <span>${allocation.category}</span>
          </div>
          <div class="allocation-values">
            <span class="allocation-percentage">${allocation.percentage}%</span>
            <span class="allocation-amount">₹${amount.toLocaleString()} (₹${perPerson.toLocaleString()}/person)</span>
          </div>
        </div>
        <input type="range" class="allocation-range" 
               min="0" max="100" step="5" value="${allocation.percentage}"
               data-category="${allocation.category}" data-color="${allocation.color}">
      `;
      
      allocationSliders.appendChild(allocationItem);
    });
    
    // Add event listeners to allocation sliders
    document.querySelectorAll('.allocation-range').forEach(slider => {
      slider.addEventListener('input', () => updateBudgetChart(itinerary.budget, itinerary.members.length));
    });
    
    // Create budget chart
    createBudgetChart(allocations);
  }
  
  // Create budget chart
  function createBudgetChart(allocations) {
    const ctx = document.getElementById('budgetChart');
    if (!ctx) return;
    
    // Destroy existing chart
    if (budgetChart) {
      budgetChart.destroy();
    }
    
    // Create new chart
    budgetChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: allocations.map(a => a.category),
        datasets: [{
          data: allocations.map(a => a.percentage),
          backgroundColor: allocations.map(a => a.color),
          borderWidth: 0,
          hoverOffset: 10
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '65%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: 'white',
              font: {
                size: 12
              },
              padding: 15
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const value = context.raw;
                return `${context.label}: ${value}%`;
              }
            }
          }
        },
        animation: {
          animateScale: true,
          animateRotate: true,
          duration: 1000
        }
      }
    });
  }
  
  // Update budget chart when sliders change
  function updateBudgetChart(totalBudget, membersCount) {
    const sliders = document.querySelectorAll('.allocation-range');
    const allocations = [];
    
    let total = 0;
    
    sliders.forEach(slider => {
      const category = slider.getAttribute('data-category');
      const color = slider.getAttribute('data-color');
      const percentage = parseInt(slider.value);
      
      if (!category || !color) return;
      
      total += percentage;
      
      allocations.push({
        category,
        percentage,
        color
      });
      
      // Update percentage display
      const percentageDisplay = slider.previousElementSibling.querySelector('.allocation-percentage');
      if (percentageDisplay) {
        percentageDisplay.textContent = `${percentage}%`;
      }
      
      // Update amount display
      const amount = Math.round((percentage / 100) * totalBudget);
      const perPerson = Math.round(amount / membersCount);
      
      const amountDisplay = slider.previousElementSibling.querySelector('.allocation-amount');
      if (amountDisplay) {
        amountDisplay.textContent = `₹${amount.toLocaleString()} (₹${perPerson.toLocaleString()}/person)`;
      }
    });
    
    // Warn if total is not 100%
    if (total !== 100) {
      console.warn(`Total allocation is ${total}%, should be 100%`);
    }
    
    // Update chart
    createBudgetChart(allocations);
  }
  
  // Create tasks list
  function createTasksList(itinerary) {
    const tasksList = document.getElementById('tasksList');
    const taskProgressBar = document.getElementById('taskProgressBar');
    const taskProgressCount = document.getElementById('taskProgressCount');
    
    if (!tasksList || !taskProgressBar || !taskProgressCount) return;
    
    tasksList.innerHTML = '';
    
    itinerary.taskAssignments.forEach((task, index) => {
      const taskItem = document.createElement('div');
      taskItem.className = 'task-item';
      taskItem.setAttribute('data-index', index.toString());
      taskItem.style.animationDelay = `${index * 0.1}s`;
      
      taskItem.innerHTML = `
        <div class="task-checkbox">
          <i class="far fa-circle"></i>
        </div>
        <div class="task-text">${task.task}</div>
        <div class="task-assignee">
          <i class="fas fa-user"></i>
          <span>${task.assignee}</span>
        </div>
      `;
      
      tasksList.appendChild(taskItem);
      
      // Add click event to checkbox
      const checkbox = taskItem.querySelector('.task-checkbox');
      if (checkbox) {
        checkbox.addEventListener('click', () => toggleTaskCompletion(taskItem));
      }
    });
    
    // Initialize task progress
    updateTaskProgress();
  }
  
  // Toggle task completion
  function toggleTaskCompletion(taskItem) {
    const icon = taskItem.querySelector('.task-checkbox i');
    
    if (taskItem.classList.contains('completed')) {
      taskItem.classList.remove('completed');
      icon.className = 'far fa-circle';
    } else {
      taskItem.classList.add('completed');
      icon.className = 'fas fa-check-circle';
    }
    
    updateTaskProgress();
  }
  
  // Update task progress
  function updateTaskProgress() {
    const taskItems = document.querySelectorAll('.task-item');
    const completedTasks = document.querySelectorAll('.task-item.completed');
    const taskProgressBar = document.getElementById('taskProgressBar');
    const taskProgressCount = document.getElementById('taskProgressCount');
    
    if (!taskItems.length || !taskProgressBar || !taskProgressCount) return;
    
    const completedCount = completedTasks.length;
    const totalCount = taskItems.length;
    const progressPercentage = (completedCount / totalCount) * 100;
    
    taskProgressBar.style.width = `${progressPercentage}%`;
    taskProgressCount.textContent = `${completedCount}/${totalCount} completed`;
  }
  
  // Show confetti animation
  function showConfetti() {
    if (typeof confetti !== 'function') {
      console.warn('Confetti library not loaded');
      return;
    }
    
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };
    
    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }
    
    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
      
      const particleCount = 50 * (timeLeft / duration);
      
      // Confetti from left and right sides
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#ea384c', '#ff6b6b', '#c91c2e', '#ffffff', '#000000'],
      });
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#ea384c', '#ff6b6b', '#c91c2e', '#ffffff', '#000000'],
      });
    }, 250);
  }