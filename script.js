let contacts = JSON.parse(localStorage.getItem("contacts")) || [
    { id: 1, nom: "samiya", tel: "1234" },
    { id: 2, nom: "marwa", tel: "1432" }
];

const form = document.querySelector("#form")
const nom = document.querySelector("#nom")
const tel = document.querySelector("#tel")
const submit = document.querySelector("#submit")
const search = document.querySelector("#search")
const liste = document.querySelector("#liste")
const count = document.querySelector("#count")
let toUpdate = null;

function afficher(tableau) {
    liste.innerHTML = '';
    tableau.forEach(cnt => {
        const li = document.createElement("li")
        li.textContent = `id: ${cnt.id} - nom:${cnt.nom} - telephone:${cnt.tel}`

        const delete_btn = document.createElement("button")
        delete_btn.textContent = "Supprimer"
        delete_btn.classList.add("supprimer");
        delete_btn.dataset.id = cnt.id;

        const update_btn = document.createElement("button")
        update_btn.textContent = "Modifier"
        update_btn.classList.add("modifier");
        update_btn.dataset.id = cnt.id;

        li.append(update_btn, delete_btn)
        liste.append(li)
    })
    count.textContent = tableau.length;
}
afficher(contacts)

form.addEventListener("submit", e => {
    e.preventDefault();
    if (nom.value.trim() === '') {
        alert("veuillez saisir le nom")
        return;         //sort de toute la fonction
    }

    if (toUpdate === null) {
        const NewContact = {
            id: Date.now(),
            nom: nom.value,
            tel: tel.value
        }

        contacts.push(NewContact)
    } else {
        const contact = contacts.find(c => c.id === toUpdate)
        contact.nom = nom.value;
        contact.tel = tel.value;
        toUpdate = null;
        submit.textContent = "Ajouter"
    }

    form.reset()
    rechercher()
})

liste.addEventListener('click', e => {
    const id =Number (e.target.dataset.id)
    if (e.target.matches(".supprimer")) {
        contacts = contacts.filter(c => c.id != id);

        rechercher();
    }
    if (e.target.matches(".modifier")) {
        const contact = contacts.find(c => c.id === id);

        nom.value = contact.nom;
        tel.value = contact.tel;

        toUpdate = id;
        submit.textContent = "Modifier";
    }
})
function rechercher() {
    const recherche = search.value.toLowerCase().trim();

    const resultats = contacts.filter(c =>
        c.nom.toLowerCase().includes(recherche)
    );

    afficher(resultats);
}

search.addEventListener("input", rechercher);

function sauvegarder() {
    localStorage.setItem("contacts", JSON.stringify(contacts));
}