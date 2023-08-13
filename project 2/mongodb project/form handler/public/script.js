document.getElementById('enrollment-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

  // Retrieve form values
  var name = document.getElementById('name').value;
  var age = document.getElementById('age').value;
  var email = document.getElementById('email').value;

  // Create student object
  var student = {
    name: name,
    age: age,
    email: email
  };

  // Send student data to the server
  fetch('/enroll', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(student)
  })
  .then(function(response) {
    if (response.ok) {
      document.getElementById('enrollment-form').reset(); // Reset form
      document.getElementById('success-message').style.display = 'block';
      document.getElementById('error-message').style.display = 'none';
      document.getElementById('success-message').textContent = 'Enrollment successful!';
    } else {
      throw new Error('Error: ' + response.status);
    }
  })
  .catch(function(error) {
    console.log(error);
    document.getElementById('success-message').style.display = 'none';
    document.getElementById('error-message').style.display = 'block';
    document.getElementById('error-message').textContent = 'Enrollment failed. Please try again later.';
  });
});