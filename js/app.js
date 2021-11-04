var markers = [];
var map;
var infoMarker;

function myMap() {
    var myCenter = new google.maps.LatLng(locations[0].lat, locations[0].lng);
    var myCanvas = document.getElementById("googleMap");
    var mapProp = {
        center: myCenter,
        zoom: 8
    };

    map = new google.maps.Map(myCanvas, mapProp);
    for (var i = 0; i < locations.length; i++) {
        markers[i] = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i].lat, locations[i].lng),
            map: map,
            animation: google.maps.Animation.DROP,
            title: locations[i].title
        });
        infoMarker = new google.maps.InfoWindow();
        markers[i].addListener('click', open);
    }
}

function whatClicked(evt) {

    open(evt.target.id);
}

function open(value) {

    for (var j = 0; j < locations.length; j++) {

        if (value == locations[j].title || this.title == locations[j].title) {

            info(locations[j].title,
                locations[j].streetAddress,
                locations[j].city,
                locations[j].locID,
                markers[j]
            );
            break;
        }
    }
}

function info(title, streetAdress, city, locId, marker) {
    var urlAPI = 'https://api.foursquare.com/v2/venues/' + locId + '/tips?v=20131016&sort=recent&limit=10&client_id=FKB1CVH4USQGZG5JGCENOTGDQYJGH1BCYLDCMSSMDCGJDVYP&client_secret=B332K3I0EDXOAFFVGOSLW5PLDUYFEXUSFBHPWAE1ZDHJ05TS';
    var topTips = [];
    $.getJSON(urlAPI).done(function(data) {
        $.each(data.response.tips.items, function(i, tips) {
            topTips.push('<li>' + tips.text + '</li>');
        });
        infoMarker.setContent('<h1>' + title + '</h1>' + '<b>Street Adress : </b>' + streetAdress + '<br> <b>City : </b>' + city + '<br> <h2>The last visitor\'s comments </h2> <b> <ol class="tips">' + topTips.join('') + '</ol>');

    }).fail(function() {
        infoMarker.setContent('<h1>' + title + '</h1>' + '<b>Street Adress : </b>' + streetAdress + '<br> <b>City : </b>' + city + '<br> <h2>The last visitor\'s comments </h2>');
        alert('some error occure with API');
    });
    marker.setAnimation(google.maps.Animation.BOUNCE);

    infoMarker.open(map, marker);

    window.setTimeout(function() {
        marker.setAnimation(null);
    }, 700);
}

function error() {
    alert("an Error is occured with load map pls check your internet connection");
}

function setMapOnAll(map) {

    for (var i = 0; i < markers.length; i++) {

        markers[i].setMap(map);
    }
}
$(function() {

    var viewModel = {

        locations: ko.observableArray(locations),
        query: ko.observable(''),
        search: function(value) {

            viewModel.locations.removeAll();
            setMapOnAll(null);

            for (var x in locations) {
                if (locations[x].title.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
                    viewModel.locations.push(locations[x]);
                    markers[x].setMap(map);
                }
            }
        }
    };

    viewModel.query.subscribe(viewModel.search);

    ko.applyBindings(viewModel);
});

//array of all Locations
var locations = [{
        title: " Costa Coffee",
        lat: 30.174403,
        lng: 31.475702,
        streetAddress: " 125 Hassan El-Maamoun ",
        city: "Nasr city",
        locID: "56e3232bcd1044008992e42c"
    },
    {
        title: "Katameya Heights Golf Resort",
        lat: 29.991639,
        lng: 31.407078,
        streetAddress: "Ring Road",
        city: "New Cairo",
        locID: "4bed877b3372c92876c41114"
    },
    {
        title: "Cairo Opera House",
        lat: 31.223978,
        lng: 30.042761,
        streetAddress: "Mahmoud Mokhtar",
        city: "Zamalek",
        locID: "4c963c5303413704fd8982ef"
    },
    {
        title: "El Abd",
        lat: 30.049529,
        lng: 31.239881,
        streetAddress: "Talaat Harb",
        city: "cairo",
        locID: "4c65b5c09cb82d7f01a38ed2"
    },
    {
        title: "Faculty of Engineering - Cairo University",
        lat: 30.026296,
        lng: 31.211703,
        streetAddress: "Gamaa St",
        city: "Giza",
        locID: "4d134aad957fa1cd2210749f"
    },
    {
        title: "NOLA Cupcakes",
        lat: 30.061984,
        lng: 31.222915,
        streetAddress: "12 Brazil St",
        city: "Zamalek",
        locID: "4ce57672bf4e6a314e5bddd7"
    },
    {
        title: "Alexandria City Centre",
        lat: 31.168988,
        lng: 29.932291,
        streetAddress: "Alex-Cairo Desert Rd",
        city: "Alexandria",
        locID: "4b4b88f8f964a520769f26e3"
    },
    {
        title: "Pizza Pino",
        lat: 31.266692,
        lng: 32.313697,
        streetAddress: "Gomhorya St",
        city: "Portsaid",
        locID: "4c0809a1ffb8c9b6a29f6761"
    },
    {
        title: "El Gaser",
        lat: 29.964242,
        lng: 32.557599,
        streetAddress: "Corniche of Suez",
        city: "Suez",
        locID: "519fd04a498e7c1f21e0bd7b"
    },
    {
        title: "Bremer",
        lat: 31.044290,
        lng: 31.365402,
        streetAddress: "Abou El Saedi St",
        city: "Mansoura",
        locID: "4dbaa8ce0cb65435c530a5b2"
    },

];
