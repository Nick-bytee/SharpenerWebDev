var table = document.getElementById('table')
const form = document.getElementById('form');
form.addEventListener('submit', saveDetails);

//saving data in crudcrud
function saveDetails(event) {
  // Prevent the form from submitting and reloading the page
  event.preventDefault();
  var username = document.getElementById('name').value;
  var useremail = document.getElementById('email').value;
  var phone = document.getElementById('phone').value;
  let my_obj = {
    name: username,
    email: useremail,
    phone: phone
  }
  my_objSerialised = JSON.stringify(arr);
  axios.post('https://crudcrud.com/api/2ded9151aff94996aaaa1ab58e60cffd/userDetails',my_obj)
  .then(data => {
    console.log(data)
  })
  .catch(err => {
    console.log(err)
  })
}