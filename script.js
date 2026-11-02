let contacts = [{
    id:1,
    nom:"samiya",
    tel:1234},
{
    id:2,
    nom:"marwa",
    tel:1432
}
]

const form=document.querySelector("#form")
const nom=document.querySelector("#nom")
const tel=document.querySelector("#tel")
const submit=document.querySelector("#submit")
const search=document.querySelector("#search")
const liste=document.querySelector("#liste")
const count=document.querySelector("#count")


function afficher(tableau){
    liste.innerHTML='';
    tableau.forEach(cnt =>{
        const li=document.createElement("li")
        li.textContent=`id: ${cnt.id} - nom:${cnt.nom} - telephone:${cnt.tel}`
        const delete_btn=document.createElement("button")
        delete_btn.textContent="Supprimer"
        delete_btn.style.backgroundColor="red"
        delete_btn.setAttribute("id", "dlt")

        const update_btn=document.createElement("button")
        update_btn.textContent="Modifier"
        update_btn.style.backgroundColor="green"
        update_btn.setAttribute("id","mod")

        li.append(update_btn,delete_btn)
        liste.append(li)
    })
}
afficher(contacts)

form.addEventListener("submit", e =>{
    e.preventDefault();
    if (nom.value.trim()=== ''){
        alert("veuillez saisir le nom")
        return;         //sort de toute la fonction
    }

    const NewContact={
        id:Date.now(),
        nom:nom.value,
        tel:tel.value
    }

    contacts.push(NewContact)

    form.reset()
    afficher(contacts)
})

liste.addEventListener('click',e =>{
    if(e.target.matches("#dlt")){
        e.target.closest("li").remove()
    }
})