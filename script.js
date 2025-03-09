const launchesContainer = document.getElementById('launches');

// Fetch upcoming SpaceX launches
async function fetchLaunches() {
    try {
        const response = await fetch('https://api.spacexdata.com/v4/launches/upcoming');
        const launches = await response.json();
        displayLaunches(launches);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Display the launches in the HTML
function displayLaunches(launches) {
    launchesContainer.innerHTML = ''; // Clear any existing launches
    launches.forEach(launch => {
        const launchDate = new Date(launch.date_utc).toLocaleString();
        const status = launch.success === null
            ? 'Pending'
            : launch.success
            ? 'Success'
            : 'Failure';
        const statusClass = launch.success === null
            ? 'status'
            : launch.success
            ? 'status success'
            : 'status failure';

        const launchItem = `
            <div class="launch-item">
                <h2>${launch.name}</h2>
                <p>${launch.details || 'No details available.'}</p>
                <p class="date">Launch Date: ${launchDate}</p>
                <div class="${statusClass}">${status}</div>
            </div>
        `;
        launchesContainer.innerHTML += launchItem;
    });
}

// Call the function to fetch the launches
fetchLaunches();
