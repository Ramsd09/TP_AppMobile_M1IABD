// @author : Amara Diallo / M1IABD-ESP

document.addEventListener("deviceready", loadContacts, false);

let contacts = [];
let currentContactIndex = null;

function loadContacts() {
    const storedContacts = localStorage.getItem('contacts');
    contacts = storedContacts ? JSON.parse(storedContacts) : [];
    displayContacts();
}

function displayContacts() {
    let htmlCode = '';
    for (const [index, contact] of contacts.entries()) {
        htmlCode += `
            <li>
                <a href="#" onclick="showContactDetails(${index})">
                    <img src="img/contact1.jpg" alt="">
                    <h2>${contact.prenom} ${contact.nom}</h2>
                    <p>${contact.telephone}</p>
                </a>
            </li>`;
    }
    const contactList = document.getElementById('contactList');
    contactList.innerHTML = htmlCode;
    $(contactList).listview('refresh');
}

function addContact() {
    const prenom = document.getElementById('prenom').value;
    const nom = document.getElementById('nom').value;
    const telephone = document.getElementById('telephone').value;
    const email = document.getElementById('email').value;

    const newContact = { prenom, nom, telephone, email };
    contacts.push(newContact);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    displayContacts();

    document.getElementById('prenom').value = '';
    document.getElementById('nom').value = '';
    document.getElementById('telephone').value = '';
    document.getElementById('email').value = '';
    
    $.mobile.changePage("#homePage");
}


function showContactDetails(index) {
    currentContactIndex = index;
    const contact = contacts[index];
    document.getElementById('contactImage').src = "img/contact1.jpg";
    document.getElementById('contactName').textContent = `${contact.prenom} ${contact.nom}`;
    document.getElementById('contactPhoneNumber').textContent = contact.telephone;
    document.getElementById('contactEmailAddress').textContent = contact.email;
    document.getElementById('editContactBtn').setAttribute('href', '#editContactPage'); 
    document.getElementById('deleteContactBtn').setAttribute('onclick', `deleteContact(${index})`);
    document.getElementById('callContactBtn').setAttribute('href', `tel:${contact.telephone}`);
    document.getElementById('messageContactBtn').setAttribute('href', `sms:${contact.telephone}`);
    $.mobile.changePage("#contactDetailsPage");
}



function updateContact() {
    const prenom = document.getElementById('editPrenom').value;
    const nom = document.getElementById('editNom').value;
    const telephone = document.getElementById('editTelephone').value;
    const email = document.getElementById('editEmail').value;

    if (prenom) contacts[currentContactIndex].prenom = prenom;
    if (nom) contacts[currentContactIndex].nom = nom;
    if (telephone) contacts[currentContactIndex].telephone = telephone;
    if (email) contacts[currentContactIndex].email = email;

    localStorage.setItem('contacts', JSON.stringify(contacts));
    displayContacts();
    showContactDetails(currentContactIndex);
}

function deleteContact(index) {
    contacts.splice(index, 1);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    displayContacts();
    $.mobile.changePage("#homePage");
}

function cancelEdit() {
    $.mobile.changePage("#contactDetailsPage");
}

$(document).on("pagebeforechange", function(event, data) {
    if (data.toPage && data.toPage[0] && data.toPage[0].id === "editContactPage") {
        const contact = contacts[currentContactIndex];
        document.getElementById('editPrenom').value = contact.prenom;
        document.getElementById('editNom').value = contact.nom;
        document.getElementById('editTelephone').value = contact.telephone;
        document.getElementById('editEmail').value = contact.email;
    }
});

