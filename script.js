document.addEventListener("DOMContentLoaded", function () {
    // Fetch the JSON data
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            // Iterate through the JSON data and create links with divs
            const linksContainer = document.getElementById("links-container");

            data.forEach(item => {
                const linkDiv = document.createElement("div");
                linkDiv.classList = "lnButton";
                const link = document.createElement("a");
                link.textContent = item.title;
                link.href = item.url;
                link.target = "_blank"; // Open links in a new tab
                
                // Add a click event listener to the <a> element to copy the password
                link.addEventListener("click", function (event) {
                    event.preventDefault();
                    copyPasswordToClipboard(item.password);
                  window.open(item.url, "_blank");
                });

                linkDiv.appendChild(link);
                linksContainer.appendChild(linkDiv);
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
