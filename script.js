let data, coordinates = []
let flightPath

async function getData() {
    await fetch("https://randomuser.me/api/?results=20")
      .then((response) => response.json())
      .then((response) => {
        data = response.results
      });
}


async function initMap(){
    await getData()

    let map = new google.maps.Map(document.getElementById("map"), {
        mapId: "f11705a4009bcfcd",
        center: { lat: 25, lng: 0 },
        zoom: 3,
    });

    data.forEach(person => {
        let latLong = { lat: JSON.parse(person.location.coordinates.latitude), lng: JSON.parse(person.location.coordinates.longitude) }
        coordinates.push(latLong)
        new google.maps.Marker({
            position: latLong,
            icon: person.picture.thumbnail,
            map
        })
    })

    const button = document.getElementById("draw")
    button.addEventListener('click', () => {
        if(flightPath) {
            flightPath.setMap(null)
        }
        flightPathCoordinates = [
            coordinates[Math.floor(Math.random() * 20)],
            coordinates[Math.floor(Math.random() * 20)]
            ]
        flightPath = new google.maps.Polyline({
        path: flightPathCoordinates,
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 4,
        });
        flightPath.setMap(map)
    })
}

