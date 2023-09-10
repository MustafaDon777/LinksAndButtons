document.addEventListener("DOMContentLoaded", function () {
    // Fetch the JSON data
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            // Function to update the JSON data with a new entry
            function addNewEntry(title, url, password) {
                const newEntry = {
                    title,
                    url,
                    password
                };
                data.push(newEntry);

                // Update the JSON file
                fetch("data.json", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                .then(() => {
                    // Clear the form fields
                    document.getElementById("newTitle").value = "";
                    document.getElementById("newURL").value = "";
                    document.getElementById("newPassword").value = "";
                    
                    // Reload the page to display the updated data
                    location.reload();
                })
                .catch(error => {
                    console.error("Error updating JSON data:", error);
                });
            }

            // Iterate through the JSON data and create links with divs
            const linksContainer = document.getElementById("links-container");

            data.forEach(item => {
                const linkDiv = document.createElement("div");
                const link = document.createElement("a");
                link.textContent = item.title;
                link.href = item.url;
                link.target = "_blank"; // Open links in a new tab
                
                // Add a click event listener to the <a> element to copy the password and open the link
                link.addEventListener("click", function (event) {
                    event.preventDefault();
                    copyPasswordToClipboard(item.password);
                    window.open(item.url, "_blank"); // Open the link in a new tab
                });

                linkDiv.appendChild(link);
                linksContainer.appendChild(linkDiv);
            });

            // Form submission handling
            const addEntryForm = document.getElementById("add-entry-form");
            addEntryForm.addEventListener("submit", function (event) {
                event.preventDefault();
                const newTitle = document.getElementById("newTitle").value;
                const newURL = document.getElementById("newURL").value;
                const newPassword = document.getElementById("newPassword").value;

                addNewEntry(newTitle, newURL, newPassword);
            });
        })
        .catch(error => {
            console.error("Error loading JSON data:", error);
        });

    // Function to copy password to clipboard
    function copyPasswordToClipboard(password) {
        const dummyInput = document.createElement("input");
        dummyInput.value = password;
        document.body.appendChild(dummyInput);
        dummyInput.select();
        document.execCommand("copy");
        document.body.removeChild(dummyInput);
        //alert("Password copied to clipboard: " + password);
    }
});