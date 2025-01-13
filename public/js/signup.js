
 function handleSignup(event) {
    event.preventDefault();  
    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('/api/v1/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Sign up failed');
      }
      return response.json();
    })
    .then(data => {
      console.log('Sign up successful:', data);
      if(data.user){
        alert("User created successfylly please login")
      }else{
        alert("cannot create User already exists with this email")
      }
    })
    .catch(error => {
      console.error('Sign up failed:', error);
      alert('Sign up failed. Please try again.');
    });
  }

  function handleLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    fetch('/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Login failed');
      }
      return response.json();
    })
    .then(data => {
      console.log('Login successful:', data);
      window.location.href = "/dashboard";  
    })
    .catch(error => {
      console.error('Login failed:', error);
      alert('Login failed. Please try again.');
    });
  }

  document.getElementById('signupForm').addEventListener('submit', handleSignup);