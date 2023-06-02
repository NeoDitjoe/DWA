//@ts-check

/**
 * @typedef {Object} Person 
 * @property {string} name - The name of the person.
 * @property {string} surname - The surname of the person.
 * @property {number} age - The age of the person.
 * @property {string} gender - The gender of the person.
 * @property {string} race - The race of the person.
 */

/**
 * @type {Person[]}
 */
    var people = [
        {
           name: "Neo",
            surname: "Millions",
            age: 25,
            gender: "Male",
            race: "Caucasian"
        },
        {
            name: "john",
            surname: "Smith",
            age: 32,
            gender: "Female",
            race: "African American"
        },
        {
            name: "Dave",
            surname: "gotta",
            age: 45,
            gender: "Male",
            race: "Hispanic"
        },
           
        ];

        /**
         * Searches for people based on the entered search value.
         * @returns {object[]} An array of people matching the search value.
         */
function searchPeople() {
    var searchValue = document.getElementById("searchInput").value.toLowerCase();
    var results = [];

    for (var i = 0; i < people.length; i++) 
        var person = people[i];
        var isMatched = Object.values(person).some(function(value) {
            return String(value).toLowerCase().includes(searchValue);
        });

        if (isMatched) {
            results.push(person);
        }
    

    return results;
}

        /**
         * Displays the search results on the page.
         * @param {Event} event - The form submission event.
         */

        function displaySearchResults(event) {
            event.preventDefault(); // Prevent form submission

            var searchResults = searchPeople();
            var resultsContainer = document.getElementById("resultsContainer");

            // Clear previous results
            resultsContainer.innerHTML = "";

            if (searchResults.length === 0) {
                resultsContainer.innerHTML = "No results found.";
            } else {
                for (var i = 0; i < searchResults.length; i++) {
                    var person = searchResults[i];
                    var personInfo = document.createElement("div");
                    personInfo.innerHTML =
                        "<strong>Name:</strong> " + person.name +
                        "<br><strong>Surname:</strong> " + person.surname +
                        "<br><strong>Age:</strong> " + person.age +
                        "<br><strong>Gender:</strong> " + person.gender +
                        "<br><strong>Race:</strong> " + person.race +
                        "<br><hr>";
                    resultsContainer.appendChild(personInfo);
                }
            }
        }