document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Fetch the XML data from a separate file
    fetch('users.xml')
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, "text/xml");

            const users = xmlDoc.getElementsByTagName("users");
            let isValid = false;

            for (let i = 0; i < users.length; i++) {
                const storedUsername = users[i].getElementsByTagName("username")[0].textContent;
                const storedPassword = users[i].getElementsByTagName("password")[0].textContent;

                if (username === storedUsername && password === storedPassword) {
                    isValid = true;
                    break;
                }
            }

            if (isValid) {
                //
                document.getElementById("message").innerHTML = "Login successful!";
                
                // Display the username
                // document.getElementById("loggedInUsername").textContent = username;
                
                // Redirect to the home page upon successful login
                // window.location.href = "..\index.html"; // Replace with your home page URL
            } else {
                document.getElementById("message").innerHTML = "Invalid username or password. Please try again.";
            }
        })
        .catch(error => {
            console.error("Error fetching XML data:", error);
        });
});
