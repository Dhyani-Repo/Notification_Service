 // Function to handle login
 function handleLogin(event) {
    event.preventDefault();  // Prevent form from submitting normally
    
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
      document.cookie = `token=${data.access_token}; path=/; max-age=3600`;
      window.location.href = '/home'; 
    })
    .catch(error => {
      console.error('Login failed:', error);
      alert('Login failed. Please try again.');
    });
  }

  // Function to handle sign-up redirection
  function handleSignup() {
    window.location.href = "./signup.html"; // Redirect to sign-up page
  }

  // Add event listeners
  document.getElementById('loginForm').addEventListener('submit', handleLogin);
  document.getElementById('signupbtn').addEventListener('click', handleSignup);
