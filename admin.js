/* ===================================================
   ALI HOTEL SUPER ADMIN PANEL JAVASCRIPT ENGINE
   =================================================== */

// Default Configuration & Data Seed
const DEFAULT_HOTEL_DATA = {
    auth: {
        passcode: "ali@2026", // Default super admin passcode
        backupPasscode: "7017430059"
    },
    general: {
        hotelName: "Ali Hotel",
        tagline: "A Luxury & Family AC Stay in Piran Kaliyar, Roorkee",
        roomCount: "18",
        owner1Name: "Haji Azad Ali",
        owner1Phone: "+91 7017430059",
        owner2Name: "Mohd Shadab",
        owner2Phone: "+91 7017934425",
        owner3Name: "Haji Abdul Samad",
        owner3Phone: "+91 8077474290",
        email: "alihotelpirankaliyar@gmail.com",
        address: "Near VIP Chowk, Sohalpur Road, Piran Kaliyar Shareef, Roorkee - 247667 (UK)",
        googleMapsUrl: "https://share.google/wbQLk41U9Xn9ircUh",
        whatsappNumber: "917017430059"
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
            title: "Executive Triple AC Room",
            price: "1499",
            beds: "1 King Bed + 1 Single Bed (3 Guests)",
            badge: "Popular Choice",
            image: "assets/images/real_double_room.jpg",
            status: "available",
            description: "Spacious luxury room with velvet headboard styling, telephone intercom, 24/7 geyser hot water, and lift access."
        },
        {
            id: "room_3",
            title: "Super Deluxe 5-Bed Family Suite",
            price: "2199",
            beds: "Double Beds + Single Beds (5-6 Guests)",
            badge: "Family Favorite",
            image: "assets/images/real_family_room.jpg",
            status: "available",
            description: "Spacious interconnected suite designed for families, featuring modern cove ceiling lighting, dual AC, and large windows."
        },
        {
            id: "room_4",
            title: "Luxury Large Group AC Hall (12-Bed)",
            price: "3999",
            beds: "Multiple King & Single Beds (12 Guests)",
            badge: "Grand Group Suite",
            image: "assets/images/family_suite_12bed.jpg",
            status: "available",
            description: "Huge private AC suite ideal for large pilgrim tour groups, zaireen parties, and combined families visiting Piran Kaliyar."
        }
    ],
    gallery: [
        { id: "g1", title: "Luxury AC Bedroom", category: "rooms", src: "assets/images/real_room_1.jpg", desc: "King comfort with TV console panel" },
        { id: "g2", title: "Spacious Family AC Suite", category: "rooms", src: "assets/images/real_family_room.jpg", desc: "Cove ceiling lighting & family beds" },
        { id: "g3", title: "Modern Elevator & Corridor", category: "corridor", src: "assets/images/real_corridor_lift.jpg", desc: "Smooth elevator on every floor" },
        { id: "g4", title: "Deluxe AC Bedroom", category: "rooms", src: "assets/images/real_double_room.jpg", desc: "Plush velvet bed headboard" },
        { id: "g5", title: "Guest Room Corridor", category: "corridor", src: "assets/images/real_corridor_view.jpg", desc: "Bright marble floor passage" },
        { id: "g6", title: "12-Bed Large Group Suite", category: "rooms", src: "assets/images/family_suite_12bed.jpg", desc: "Group pilgrim accommodation" },
        { id: "g7", title: "Hazrat Sabir Pak Dargah", category: "dargah", src: "assets/images/dargah1.jpg", desc: "Holy green dome 500m away" },
        { id: "g8", title: "Sacred Green Dome", category: "dargah", src: "assets/images/dargah2.jpg", desc: "Spiritual beauty under clear skies" },
        { id: "g9", title: "Sacred Courtyard Facade", category: "dargah", src: "assets/images/dargah3.jpg", desc: "Sanctum gates and marble reflections" },
        { id: "g10", title: "Ziyarat Gate & Pilgrims", category: "dargah", src: "assets/images/dargah4.jpg", desc: "Devotees receiving blessings" },
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
            text: "Near VIP Chowk location is very peaceful and just 5 mins walking to Dargah Sabir Pak. AC rooms are neat and clean, and Haji Azad Ali is very helpful."
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
            const validCodes = [hotelData.auth.passcode, hotelData.auth.backupPasscode, "ali@2026", "7017430059", "admin123"];

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

function addNewRoom() {
    const title = prompt("Enter Room Title (e.g. Premium 4-Bed AC Room):");
    if (!title) return;
    const price = prompt("Enter Room Price per night (e.g. 1799):", "1799");
    const beds = prompt("Enter Bed Capacity (e.g. 2 Double Beds - 4 Guests):", "2 Double Beds");
    const image = prompt("Enter Image path or URL (e.g. assets/images/real_room_1.jpg):", "assets/images/real_room_1.jpg");

    const newRoom = {
        id: "room_" + Date.now(),
        title,
        price: price || "999",
        beds: beds || "1 King Bed",
        badge: "New Room",
        image: image || "assets/images/real_room_1.jpg",
        status: "available",
        description: "Comfortable air-conditioned stay with clean attached bathroom and 24/7 service."
    };

    hotelData.rooms.push(newRoom);
    saveHotelData(hotelData);
    loadRoomsTable();
    loadDashboardStats();
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

function addGalleryPhoto() {
    const title = prompt("Enter Photo Title (e.g. VIP Room View):");
    if (!title) return;
    const src = prompt("Enter Photo URL or path (e.g. assets/images/real_room_1.jpg):", "assets/images/real_room_1.jpg");
    if (!src) return;
    const category = prompt("Enter Category ('rooms', 'corridor', 'dargah', 'amenities'):", "rooms");

    hotelData.gallery.push({
        id: "g_" + Date.now(),
        title,
        category: category || "rooms",
        src,
        desc: "High quality authentic view at Ali Hotel."
    });

    saveHotelData(hotelData);
    loadGalleryGrid();
    loadDashboardStats();
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
// REVIEWS & TESTIMONIALS
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

function addNewReview() {
    const author = prompt("Enter Guest Name:");
    if (!author) return;
    const city = prompt("Enter Guest City (e.g. Delhi):", "Delhi");
    const text = prompt("Enter Review text:");
    if (!text) return;

    hotelData.reviews.push({
        id: "rev_" + Date.now(),
        author,
        city: city || "Guest",
        rating: 5,
        text
    });

    saveHotelData(hotelData);
    loadReviewsList();
    loadDashboardStats();
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
