const update = document.querySelector("#update-button")
const deleteButton = document.querySelector("#delete-button")
const messageDiv = document.querySelector('#message')
update.addEventListener("click",_ =>{
  fetch("/quotes", {
    method:"put",
    headers:{"content-Type":"application/json"},
    body:JSON.stringify({
      name:"African",
      quote:"A stranger does not skin a sheep that is paid as a fine at a chief's court."
    })
  })
  .then(res =>{
     if(res.ok)return res.json()
  })
  .then(response =>{
    window.location.reload(true)
  })
})
 deleteButton.addEventListener("click",_ =>{
  fetch("/quotes",{
    method:"delete",
    headers:{"content-Type":"application/json"},
    body:JSON.stringify({
      name:"African"
    })
  })
  .then(res =>{
    if(res.ok)return res.json()
 })
 .then(response =>{
        if (response === 'No quote to delete') {
          messageDiv.textContent = 'No African quote to delete'
        } else {
          window.location.reload(true)
        }
    })
 })


