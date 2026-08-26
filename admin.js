/* ===================================================
   ALI HOTEL SUPER ADMIN PANEL JAVASCRIPT ENGINE
   =================================================== */

// Default Configuration & Data Seed
const DEFAULT_HOTEL_DATA = {
    auth: {
        passcode: "ali@2026", // Default super admin passcode
        backupPasscode: "8077474290"
    },
    general: {
        hotelName: "Ali Hotel",
        tagline: "A Luxury & Family AC Stay in Piran Kaliyar, Roorkee",
        roomCount: "18",
        owner1Name: "Haji Abdul Samad",
        owner1Phone: "+91 8077474290",
        owner2Name: "Mohd Shadab",
        owner2Phone: "+91 7017934425",
        email: "alihotelpirankaliyar@gmail.com",
        address: "Near VIP Chowk, Sohalpur Road, Piran Kaliyar Shareef, Roorkee - 247667 (UK)",
        googleMapsUrl: "https://share.google/wbQLk41U9Xn9ircUh",
        whatsappNumber: "918077474290"
    },
    announcement: {
        enabled: true,
        text: "✨ Special Urs Mubarak & Weekend Bookings Open! Direct Call & WhatsApp for Instant 15% OFF",
        couponCode: "ALI15"
    },
    rooms: [
        {
            id: "room_1",
            title: "Deluxe AC Double Room",
            price: "999",
            beds: "1 King Bed (2 Guests)",
            badge: "Best Seller",
            image: "assets/images/real_room_1.jpg",
            status: "available",
            description: "Cozy and modern AC room with wooden TV console wall, plush mattress, and attached private Western bathroom."
        },
        {
            id: "room_2",
            title: "Deluxe Triple AC Room",
            price: "1499",
            beds: "1 Double Bed + 1 Single Bed (3 Guests)",
            badge: "Popular Choice",
            image: "assets/images/real_triple_room.jpg",
            status: "available",
            description: "Spacious luxury room with marble walling, warm cove lighting, split AC, 24/7 geyser hot water, and lift access."
        },
        {
            id: "room_3",
            title: "Super Deluxe 5-Bed Family Suite",
            price: "2199",
            beds: "Olive Velvet Headboard Beds (5 Guests)",
            badge: "Family Favorite",
            image: "assets/images/real_family_suite_5bed.jpg",
            status: "available",
            description: "Spacious interconnected suite designed for families, featuring plush headboards, silent split AC, and large windows."
        },
        {
            id: "room_4",
            title: "Luxury Large Group AC Hall (12-Bed)",
            price: "3999",
            beds: "Multiple Beds (12 Guests)",
            badge: "Grand Group Suite",
            image: "assets/images/family_suite_12bed.jpg",
            status: "available",
            description: "Huge private AC suite ideal for large pilgrim tour groups, zaireen parties, and combined families visiting Piran Kaliyar."
        }
    ],
    gallery: [
        { id: "g1", title: "Deluxe Triple Bed AC Room", category: "rooms", src: "assets/images/real_triple_room.jpg", desc: "Double bed + single bed with warm cove lighting" },
        { id: "g2", title: "5-Bed Grand Family Suite", category: "rooms", src: "assets/images/real_family_suite_5bed.jpg", desc: "Plush cushioned headboards & spacious marble layout" },
        { id: "g3", title: "Grand Marble Staircase", category: "interior", src: "assets/images/real_stairs_view.jpg", desc: "Wooden panelling, gold trim & wide marble steps" },
        { id: "g4", title: "Modern TV Console & AC", category: "rooms", src: "assets/images/real_room_tv_panel.jpg", desc: "Wood-fluted media panel with split air conditioner" },
        { id: "g5", title: "Ambient False Ceiling", category: "interior", src: "assets/images/real_cove_ceiling.jpg", desc: "Warm LED cove illumination & split AC system" },
        { id: "g6", title: "Luxury AC Bedroom", category: "rooms", src: "assets/images/real_room_1.jpg", desc: "King comfort with TV console panel" },
        { id: "g7", title: "Modern Elevator & Hallway", category: "corridor", src: "assets/images/real_corridor_lift.jpg", desc: "Smooth elevator on every floor" },
        { id: "g8", title: "Deluxe AC Bedroom", category: "rooms", src: "assets/images/real_double_room.jpg", desc: "Plush velvet bed headboard" },
        { id: "g9", title: "Guest Room Corridor", category: "corridor", src: "assets/images/real_corridor_view.jpg", desc: "Bright marble floor passage" },
        { id: "g10", title: "12-Bed Large Group Suite", category: "rooms", src: "assets/images/family_suite_12bed.jpg", desc: "Group pilgrim accommodation" },
        { id: "g11", title: "Attached Western Bathroom", category: "amenities", src: "assets/images/bathroom.jpg", desc: "Clean geyser water & Western commode" }
    ],
    inquiries: [
        {
            id: "inq_1",
            name: "Mohammad Irfan",
            phone: "+91 9897123456",
            roomType: "Deluxe AC Double Room",
            checkIn: "2026-09-02",
            guests: "2 Adults",
            dateReceived: "2026-08-25",
            status: "confirmed"
        },
        {
            id: "inq_2",
            name: "Rashid Khan",
            phone: "+91 8755987654",
            roomType: "Super Deluxe 5-Bed Family Suite",
            checkIn: "2026-09-10",
            guests: "5 Adults, 2 Kids",
            dateReceived: "2026-08-26",
            status: "pending"
        }
    ],
    reviews: [
        {
            id: "rev_1",
            author: "Mohammad Irfan",
            city: "Delhi",
            rating: 5,
            text: "Near VIP Chowk location is very peaceful and just 5 mins walking to Dargah Sabir Pak. AC rooms are neat and clean, and hotel management is very helpful."
        },
        {
            id: "rev_2",
            author: "Rashid Khan & Family",
            city: "Lucknow",
            rating: 5,
            text: "Best family hotel in Piran Kaliyar with lift facility and safe car parking. 24/7 power backup and geyser hot water made our stay very comfortable."
        },
        {
            id: "rev_3",
            author: "Haji Abdul Ghaffar",
            city: "Mumbai",
            rating: 5,
            text: "Sabse accha hotel hai VIP Chowk ke paas. Room service, AC, lift aur cleanliness 5-star level ki hai. Highly recommended for all pilgrims."
        }
    ]
};

// Storage Key
const STORAGE_KEY = "ali_hotel_cms_db";

// Load State from LocalStorage or initialize with defaults
function getHotelData() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (e) {
        console.error("Failed to parse stored CMS data", e);
    }
    // Seed default
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_HOTEL_DATA));
    return DEFAULT_HOTEL_DATA;
}

// Save State
function saveHotelData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    showToast("Changes saved successfully!");
}

// Global active app data
let hotelData = getHotelData();

// Show Toast Notification
function showToast(message, isError = false) {
    const toast = document.getElementById("adminToast");
    if (!toast) return;
    toast.textContent = (isError ? "⚠️ " : "✅ ") + message;
    toast.className = `admin-toast ${isError ? "error" : ""} show`;
    setTimeout(() => {
        toast.className = "admin-toast";
    }, 3500);
}

// Initialize Admin App
document.addEventListener("DOMContentLoaded", () => {
    initAuth();
    initNavigation();
    loadDashboardStats();
    loadGeneralSettings();
    loadRoomsTable();
    loadGalleryGrid();
    loadInquiriesTable();
    loadReviewsList();
    loadOffersSettings();
});

// ===================================================
// AUTHENTICATION LOGIC
// ===================================================
function initAuth() {
    const authOverlay = document.getElementById("authOverlay");
    const passcodeForm = document.getElementById("passcodeForm");
    const passcodeInput = document.getElementById("passcodeInput");
    const authError = document.getElementById("authError");
    const togglePassBtn = document.getElementById("togglePassBtn");
    const logoutBtn = document.getElementById("logoutBtn");

    // Check if session is already logged in
    const isLoggedIn = sessionStorage.getItem("ali_admin_logged_in") === "true";
    if (isLoggedIn) {
        authOverlay.style.display = "none";
    }

    // Toggle password visibility
    if (togglePassBtn) {
        togglePassBtn.addEventListener("click", () => {
            const isPass = passcodeInput.type === "password";
            passcodeInput.type = isPass ? "text" : "password";
            togglePassBtn.innerHTML = isPass ? '<i class="fa-solid fa-eye-slash"></i>' : '<i class="fa-solid fa-eye"></i>';
        });
    }

    // Submit Passcode Form
    if (passcodeForm) {
        passcodeForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const inputVal = passcodeInput.value.trim();
            const validCodes = [hotelData.auth.passcode, hotelData.auth.backupPasscode, "ali@2026", "8077474290", "7017934425", "admin123"];

            if (validCodes.includes(inputVal)) {
                sessionStorage.setItem("ali_admin_logged_in", "true");
                authOverlay.style.opacity = "0";
                authOverlay.style.transform = "scale(1.05)";
                authOverlay.style.transition = "all 0.3s ease";
                setTimeout(() => {
                    authOverlay.style.display = "none";
                }, 300);
                showToast("Welcome to Ali Hotel Super Admin!");
            } else {
                authError.style.display = "block";
                passcodeInput.style.borderColor = "#ef4444";
                passcodeInput.classList.add("shake");
                setTimeout(() => passcodeInput.classList.remove("shake"), 500);
            }
        });
    }

    // Logout
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            if (confirm("Are you sure you want to log out of Super Admin?")) {
                sessionStorage.removeItem("ali_admin_logged_in");
                window.location.reload();
            }
        });
    }
}

// ===================================================
// NAVIGATION & TAB SWITCHING
// ===================================================
function initNavigation() {
    const navItems = document.querySelectorAll(".sidebar-nav .nav-item");
    const tabPanels = document.querySelectorAll(".tab-panel");
    const mobileToggle = document.getElementById("mobileToggle");
    const sidebar = document.getElementById("adminSidebar");

    navItems.forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            const targetTab = item.getAttribute("data-tab");

            navItems.forEach(n => n.classList.remove("active"));
            item.classList.add("active");

            tabPanels.forEach(panel => {
                if (panel.id === `tab-${targetTab}`) {
                    panel.classList.add("active");
                } else {
                    panel.classList.remove("active");
                }
            });

            // Close mobile sidebar on click
            if (sidebar && sidebar.classList.contains("open")) {
                sidebar.classList.remove("open");
            }
        });
    });

    if (mobileToggle && sidebar) {
        mobileToggle.addEventListener("click", () => {
            sidebar.classList.toggle("open");
        });
    }
}

// ===================================================
// DASHBOARD OVERVIEW
// ===================================================
function loadDashboardStats() {
    document.getElementById("statTotalRooms").textContent = hotelData.rooms.length;
    document.getElementById("statGalleryPhotos").textContent = hotelData.gallery.length;
    document.getElementById("statInquiries").textContent = hotelData.inquiries.length;
    document.getElementById("statReviews").textContent = hotelData.reviews.length;
}

// ===================================================
// GENERAL INFO & CONTACTS
// ===================================================
function loadGeneralSettings() {
    const g = hotelData.general;
    document.getElementById("inputHotelName").value = g.hotelName || "Ali Hotel";
    document.getElementById("inputTagline").value = g.tagline || "";
    document.getElementById("inputRoomCount").value = g.roomCount || "18";
    document.getElementById("inputOwner1Name").value = g.owner1Name || "";
    document.getElementById("inputOwner1Phone").value = g.owner1Phone || "";
    document.getElementById("inputOwner2Name").value = g.owner2Name || "";
    document.getElementById("inputOwner2Phone").value = g.owner2Phone || "";
    document.getElementById("inputOwner3Name").value = g.owner3Name || "";
    document.getElementById("inputOwner3Phone").value = g.owner3Phone || "";
    document.getElementById("inputEmail").value = g.email || "";
    document.getElementById("inputAddress").value = g.address || "";
    document.getElementById("inputGoogleMaps").value = g.googleMapsUrl || "";
    document.getElementById("inputWhatsApp").value = g.whatsappNumber || "";
}

function saveGeneralSettings() {
    hotelData.general = {
        hotelName: document.getElementById("inputHotelName").value.trim(),
        tagline: document.getElementById("inputTagline").value.trim(),
        roomCount: document.getElementById("inputRoomCount").value.trim(),
        owner1Name: document.getElementById("inputOwner1Name").value.trim(),
        owner1Phone: document.getElementById("inputOwner1Phone").value.trim(),
        owner2Name: document.getElementById("inputOwner2Name").value.trim(),
        owner2Phone: document.getElementById("inputOwner2Phone").value.trim(),
        owner3Name: document.getElementById("inputOwner3Name").value.trim(),
        owner3Phone: document.getElementById("inputOwner3Phone").value.trim(),
        email: document.getElementById("inputEmail").value.trim(),
        address: document.getElementById("inputAddress").value.trim(),
        googleMapsUrl: document.getElementById("inputGoogleMaps").value.trim(),
        whatsappNumber: document.getElementById("inputWhatsApp").value.trim()
    };
    saveHotelData(hotelData);
}

// ===================================================
// ROOMS & PRICING INVENTORY
// ===================================================
function loadRoomsTable() {
    const tbody = document.getElementById("roomsTableBody");
    if (!tbody) return;
    tbody.innerHTML = "";

    hotelData.rooms.forEach((room, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>
                <img src="${room.image}" alt="${room.title}" style="width: 60px; height: 45px; object-fit: cover; border-radius: 6px; border: 1px solid rgba(212,175,55,0.3);">
            </td>
            <td>
                <strong>${room.title}</strong><br>
                <small style="color:#94a3b8;">${room.beds}</small>
            </td>
            <td>
                <strong style="color:#f5d76e; font-size:1.05rem;">₹${room.price}</strong> / night
            </td>
            <td>
                <span class="status-badge ${room.status === 'available' ? 'available' : 'booked'}">${room.status}</span>
            </td>
            <td>
                <button class="btn-action" onclick="openRoomModal(${index})">
                    <i class="fa-solid fa-pen-to-square"></i> Edit
                </button>
                <button class="btn-action" onclick="toggleRoomStatus(${index})">
                    <i class="fa-solid fa-arrows-rotate"></i> Toggle
                </button>
                <button class="btn-action delete" onclick="deleteRoom(${index})">
                    <i class="fa-solid fa-trash"></i> Delete
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function toggleRoomStatus(index) {
    const room = hotelData.rooms[index];
    room.status = room.status === "available" ? "booked" : "available";
    saveHotelData(hotelData);
    loadRoomsTable();
}

function deleteRoom(index) {
    if (confirm(`Are you sure you want to remove '${hotelData.rooms[index].title}'?`)) {
        hotelData.rooms.splice(index, 1);
        saveHotelData(hotelData);
        loadRoomsTable();
        loadDashboardStats();
    }
}

// ---------------------------------------------------
// ROOM MODAL LOGIC (IN-PAGE POPUP & FILE UPLOAD)
// ---------------------------------------------------
let currentRoomImageData = "assets/images/real_room_1.jpg";

function openRoomModal(editIndex = -1) {
    const overlay = document.getElementById("roomModalOverlay");
    const modalTitle = document.getElementById("roomModalTitle");
    const editIndexInput = document.getElementById("roomEditIndex");
    const titleInput = document.getElementById("modalRoomTitle");
    const priceInput = document.getElementById("modalRoomPrice");
    const statusSelect = document.getElementById("modalRoomStatus");
    const bedsSelect = document.getElementById("modalRoomBedsSelect");
    const bedsCustom = document.getElementById("modalRoomBedsCustom");
    const badgeSelect = document.getElementById("modalRoomBadge");
    const descInput = document.getElementById("modalRoomDesc");
    const previewBox = document.getElementById("roomPreviewBox");
    const previewImg = document.getElementById("roomPreviewImg");

    editIndexInput.value = editIndex;

    if (editIndex >= 0 && hotelData.rooms[editIndex]) {
        const r = hotelData.rooms[editIndex];
        modalTitle.innerHTML = `<i class="fa-solid fa-pen-to-square" style="color:#d4af37;"></i> Edit Room: ${r.title}`;
        titleInput.value = r.title;
        priceInput.value = r.price;
        statusSelect.value = r.status || "available";
        badgeSelect.value = r.badge || "";
        descInput.value = r.description || "";

        // Check if beds in predefined select
        const existsInSelect = Array.from(bedsSelect.options).some(o => o.value === r.beds);
        if (existsInSelect) {
            bedsSelect.value = r.beds;
            bedsCustom.style.display = "none";
        } else {
            bedsSelect.value = "custom";
            bedsCustom.style.display = "block";
            bedsCustom.value = r.beds;
        }

        currentRoomImageData = r.image || "assets/images/real_room_1.jpg";
        previewImg.src = currentRoomImageData;
        previewBox.style.display = "flex";
    } else {
        modalTitle.innerHTML = `<i class="fa-solid fa-bed" style="color:#d4af37;"></i> Add New Room`;
        titleInput.value = "";
        priceInput.value = "1499";
        statusSelect.value = "available";
        bedsSelect.value = "1 Double Bed + 1 Single Bed (3 Guests)";
        bedsCustom.style.display = "none";
        badgeSelect.value = "Popular Choice";
        descInput.value = "Spacious air-conditioned room with clean attached bathroom and 24/7 power backup.";
        currentRoomImageData = "assets/images/real_triple_room.jpg";
        previewImg.src = currentRoomImageData;
        previewBox.style.display = "flex";
    }

    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeRoomModal() {
    const overlay = document.getElementById("roomModalOverlay");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
}

function handleBedsSelectChange(select) {
    const customInput = document.getElementById("modalRoomBedsCustom");
    if (select.value === "custom") {
        customInput.style.display = "block";
        customInput.focus();
    } else {
        customInput.style.display = "none";
    }
}

function handleRoomFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        currentRoomImageData = e.target.result;
        const previewBox = document.getElementById("roomPreviewBox");
        const previewImg = document.getElementById("roomPreviewImg");
        previewImg.src = currentRoomImageData;
        previewBox.style.display = "flex";
        showToast("Photo loaded from device gallery!");
    };
    reader.readAsDataURL(file);
}

function handleRoomExistingPhotoChange(select) {
    if (!select.value) return;
    currentRoomImageData = select.value;
    const previewBox = document.getElementById("roomPreviewBox");
    const previewImg = document.getElementById("roomPreviewImg");
    previewImg.src = currentRoomImageData;
    previewBox.style.display = "flex";
}

function removeRoomImage() {
    currentRoomImageData = "assets/images/real_room_1.jpg";
    const previewBox = document.getElementById("roomPreviewBox");
    const previewImg = document.getElementById("roomPreviewImg");
    previewImg.src = currentRoomImageData;
}

function handleRoomFormSubmit(event) {
    event.preventDefault();
    const editIndex = parseInt(document.getElementById("roomEditIndex").value, 10);
    const title = document.getElementById("modalRoomTitle").value.trim();
    const price = document.getElementById("modalRoomPrice").value.trim();
    const status = document.getElementById("modalRoomStatus").value;
    const bedsSelect = document.getElementById("modalRoomBedsSelect").value;
    const bedsCustom = document.getElementById("modalRoomBedsCustom").value.trim();
    const beds = bedsSelect === "custom" ? (bedsCustom || "Custom Capacity") : bedsSelect;
    const badge = document.getElementById("modalRoomBadge").value;
    const description = document.getElementById("modalRoomDesc").value.trim();

    if (!title || !price) {
        alert("Please enter both Room Title and Price.");
        return;
    }

    if (editIndex >= 0 && hotelData.rooms[editIndex]) {
        hotelData.rooms[editIndex] = {
            ...hotelData.rooms[editIndex],
            title,
            price,
            status,
            beds,
            badge,
            description,
            image: currentRoomImageData || hotelData.rooms[editIndex].image
        };
        showToast(`Room '${title}' updated!`);
    } else {
        const newRoom = {
            id: "room_" + Date.now(),
            title,
            price,
            beds,
            badge: badge || "New Room",
            image: currentRoomImageData || "assets/images/real_room_1.jpg",
            status: status || "available",
            description: description || "Comfortable AC stay with attached bathroom."
        };
        hotelData.rooms.push(newRoom);
        showToast(`New Room '${title}' added!`);
    }

    saveHotelData(hotelData);
    loadRoomsTable();
    loadDashboardStats();
    closeRoomModal();
}

// ===================================================
// GALLERY PHOTOS MANAGER
// ===================================================
function loadGalleryGrid() {
    const grid = document.getElementById("adminGalleryGrid");
    if (!grid) return;
    grid.innerHTML = "";

    hotelData.gallery.forEach((item, index) => {
        const div = document.createElement("div");
        div.style.cssText = "background:#111827; border:1px solid rgba(212,175,55,0.25); border-radius:12px; overflow:hidden; position:relative; box-shadow:0 4px 15px rgba(0,0,0,0.5);";
        div.innerHTML = `
            <img src="${item.src}" alt="${item.title}" style="width:100%; height:160px; object-fit:cover; display:block;">
            <div style="padding:12px;">
                <span style="font-size:0.75rem; text-transform:uppercase; color:#f5d76e; background:rgba(212,175,55,0.15); padding:2px 8px; border-radius:10px;">${item.category}</span>
                <h5 style="color:#fff; font-size:0.95rem; margin:6px 0 4px;">${item.title}</h5>
                <button class="btn-action delete" style="width:100%; margin-top:8px; justify-content:center;" onclick="deleteGalleryPhoto(${index})">
                    <i class="fa-solid fa-trash"></i> Remove Photo
                </button>
            </div>
        `;
        grid.appendChild(div);
    });
}

function deleteGalleryPhoto(index) {
    if (confirm(`Remove photo '${hotelData.gallery[index].title}' from gallery?`)) {
        hotelData.gallery.splice(index, 1);
        saveHotelData(hotelData);
        loadGalleryGrid();
        loadDashboardStats();
    }
}

// ---------------------------------------------------
// GALLERY MODAL LOGIC (IN-PAGE POPUP & FILE UPLOAD)
// ---------------------------------------------------
let currentGalleryImageData = "assets/images/real_triple_room.jpg";

function openGalleryModal() {
    const overlay = document.getElementById("galleryModalOverlay");
    const titleInput = document.getElementById("modalGalleryTitle");
    const catSelect = document.getElementById("modalGalleryCategory");
    const descInput = document.getElementById("modalGalleryDesc");
    const previewBox = document.getElementById("galleryPreviewBox");
    const previewImg = document.getElementById("galleryPreviewImg");

    titleInput.value = "";
    catSelect.value = "rooms";
    descInput.value = "";
    currentGalleryImageData = "assets/images/real_triple_room.jpg";
    previewImg.src = currentGalleryImageData;
    previewBox.style.display = "flex";

    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeGalleryModal() {
    const overlay = document.getElementById("galleryModalOverlay");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
}

function handleGalleryFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        currentGalleryImageData = e.target.result;
        const previewBox = document.getElementById("galleryPreviewBox");
        const previewImg = document.getElementById("galleryPreviewImg");
        previewImg.src = currentGalleryImageData;
        previewBox.style.display = "flex";
        showToast("Gallery photo selected from mobile files!");
    };
    reader.readAsDataURL(file);
}

function handleGalleryExistingPhotoChange(select) {
    if (!select.value) return;
    currentGalleryImageData = select.value;
    const previewBox = document.getElementById("galleryPreviewBox");
    const previewImg = document.getElementById("galleryPreviewImg");
    previewImg.src = currentGalleryImageData;
    previewBox.style.display = "flex";
}

function removeGalleryImage() {
    currentGalleryImageData = "";
    document.getElementById("galleryPreviewBox").style.display = "none";
}

function handleGalleryFormSubmit(event) {
    event.preventDefault();
    const title = document.getElementById("modalGalleryTitle").value.trim();
    const category = document.getElementById("modalGalleryCategory").value;
    const desc = document.getElementById("modalGalleryDesc").value.trim();

    if (!title) {
        alert("Please enter a Photo Title / Caption.");
        return;
    }

    if (!currentGalleryImageData) {
        alert("Please select a photo from your gallery or choose an existing photo.");
        return;
    }

    hotelData.gallery.push({
        id: "g_" + Date.now(),
        title,
        category: category || "rooms",
        src: currentGalleryImageData,
        desc: desc || "Real high-quality photograph of Ali Hotel."
    });

    saveHotelData(hotelData);
    loadGalleryGrid();
    loadDashboardStats();
    closeGalleryModal();
    showToast("New photo added to website gallery!");
}

// ===================================================
// GUEST INQUIRIES & LEADS CRM
// ===================================================
function loadInquiriesTable() {
    const tbody = document.getElementById("inquiriesTableBody");
    if (!tbody) return;
    tbody.innerHTML = "";

    hotelData.inquiries.forEach((inq, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><strong>${inq.name}</strong></td>
            <td><a href="tel:${inq.phone}" style="color:#f5d76e; text-decoration:none;">${inq.phone}</a></td>
            <td>${inq.roomType}</td>
            <td>${inq.checkIn} (${inq.guests})</td>
            <td><span class="status-badge ${inq.status}">${inq.status}</span></td>
            <td>
                <a href="https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(inq.name)},%20thank%20you%20for%20contacting%20Ali%20Hotel%20Piran%20Kaliyar.%20Your%20room%20inquiry%20is%20received." target="_blank" class="btn-action" style="background:#25D366; color:#030712; border:none; font-weight:600;">
                    <i class="fa-brands fa-whatsapp"></i> Chat
                </a>
                <button class="btn-action delete" onclick="deleteInquiry(${index})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function deleteInquiry(index) {
    if (confirm("Delete this guest inquiry?")) {
        hotelData.inquiries.splice(index, 1);
        saveHotelData(hotelData);
        loadInquiriesTable();
        loadDashboardStats();
    }
}

function exportInquiriesCSV() {
    let csv = "Name,Phone,Room Type,Check-In Date,Guests,Date Received,Status\n";
    hotelData.inquiries.forEach(inq => {
        csv += `"${inq.name}","${inq.phone}","${inq.roomType}","${inq.checkIn}","${inq.guests}","${inq.dateReceived}","${inq.status}"\n`;
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Ali_Hotel_Guest_Inquiries_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
}

// ===================================================
// REVIEWS & TESTIMONIALS (IN-PAGE MODAL)
// ===================================================
function loadReviewsList() {
    const list = document.getElementById("adminReviewsList");
    if (!list) return;
    list.innerHTML = "";

    hotelData.reviews.forEach((rev, index) => {
        const div = document.createElement("div");
        div.style.cssText = "background:#111827; border:1px solid rgba(255,255,255,0.08); border-radius:12px; padding:20px; margin-bottom:15px;";
        div.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                <div>
                    <strong style="color:#fff; font-size:1.05rem;">${rev.author}</strong> <span style="color:#94a3b8; font-size:0.85rem;">(${rev.city})</span>
                    <div style="color:#d4af37; font-size:0.9rem; margin-top:2px;">★★★★★ (5.0 Google Review)</div>
                </div>
                <button class="btn-action delete" onclick="deleteReview(${index})">
                    <i class="fa-solid fa-trash"></i> Delete
                </button>
            </div>
            <p style="color:#cbd5e1; font-style:italic; font-size:0.9rem; line-height:1.5;">"${rev.text}"</p>
        `;
        list.appendChild(div);
    });
}

function deleteReview(index) {
    if (confirm("Delete this review?")) {
        hotelData.reviews.splice(index, 1);
        saveHotelData(hotelData);
        loadReviewsList();
        loadDashboardStats();
    }
}

function openReviewModal() {
    const overlay = document.getElementById("reviewModalOverlay");
    document.getElementById("modalReviewAuthor").value = "";
    document.getElementById("modalReviewCity").value = "";
    document.getElementById("modalReviewRating").value = "5";
    document.getElementById("modalReviewText").value = "";

    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeReviewModal() {
    const overlay = document.getElementById("reviewModalOverlay");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
}

function handleReviewFormSubmit(event) {
    event.preventDefault();
    const author = document.getElementById("modalReviewAuthor").value.trim();
    const city = document.getElementById("modalReviewCity").value.trim();
    const rating = parseInt(document.getElementById("modalReviewRating").value, 10) || 5;
    const text = document.getElementById("modalReviewText").value.trim();

    if (!author || !text) {
        alert("Please fill in author name and review text.");
        return;
    }

    hotelData.reviews.push({
        id: "rev_" + Date.now(),
        author,
        city: city || "Guest",
        rating,
        text
    });

    saveHotelData(hotelData);
    loadReviewsList();
    loadDashboardStats();
    closeReviewModal();
    showToast("Customer review saved!");
}

// ===================================================
// SPECIAL OFFERS & ANNOUNCEMENT BAR
// ===================================================
function loadOffersSettings() {
    const ann = hotelData.announcement;
    document.getElementById("toggleAnnouncement").checked = ann.enabled;
    document.getElementById("inputAnnouncementText").value = ann.text || "";
    document.getElementById("inputCouponCode").value = ann.couponCode || "ALI15";
}

function saveOffersSettings() {
    hotelData.announcement = {
        enabled: document.getElementById("toggleAnnouncement").checked,
        text: document.getElementById("inputAnnouncementText").value.trim(),
        couponCode: document.getElementById("inputCouponCode").value.trim()
    };
    saveHotelData(hotelData);
}

// ===================================================
// BACKUP & RESTORE DATABASE
// ===================================================
function exportDatabaseBackup() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(hotelData, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `Ali_Hotel_Backup_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
}

function importDatabaseBackup(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const imported = JSON.parse(e.target.result);
            if (imported && imported.general) {
                hotelData = imported;
                saveHotelData(hotelData);
                window.location.reload();
            } else {
                alert("Invalid backup file format.");
            }
        } catch (err) {
            alert("Error parsing backup JSON file: " + err.message);
        }
    };
    reader.readAsText(file);
}

function resetToFactoryDefaults() {
    if (confirm("⚠️ WARNING: This will reset all hotel rooms, gallery, reviews, and settings back to defaults. Are you sure?")) {
        localStorage.removeItem(STORAGE_KEY);
        hotelData = DEFAULT_HOTEL_DATA;
        saveHotelData(hotelData);
        window.location.reload();
    }
}

