// Google map start
function func() {
    var script = document.createElement('script');
    // const key = 'AIzaSyACEKUzegoxX0LUNPoGhD6WQdN4ogXmsFo';
    const key = '';
    script.src = `https://maps.googleapis.com/maps/api/js?&callback=initMap&key=${key}`;
    document.getElementsByTagName('head')[0].appendChild(script);

}
setTimeout(func, 1000);


function initMap() {
    var gmarkers1 = [];
    filterMarkers = function(category) {
        for (i = 0; i < gmarkers1.length; i++) {
            marker = gmarkers1[i];

            var markerMain = gmarkers1.find(item => item.category === 'main');

            if (marker.category == category || category == 'all') {
                marker.setMap(map);
                markerMain.setMap(map);
            } else {
                marker.setMap(null);
                markerMain.setMap(map);
            }
        }
    };

    let resButton = document.querySelector('.legend-reset-js');
    let infraList = document.querySelectorAll('.legend-list li'),
        showAllButton = document.querySelector('.legend-button__active');
    if (showAllButton != null) {
        showAllButton.onclick = () => {
            resButton.style.opacity = 0;
            gmarkers1.forEach(mark => {
                mark.setVisible(true);

                infraList.forEach(li => {
                    li.classList.remove('checked-infra-item');
                })
            });
        }
    }
    activeNames = [];
    if (resButton != null) {
        resButton.onclick = () => {
            gmarkers1.forEach(mark => {
                mark.setVisible(false);
            });
            infraList.forEach(li => {
                li.classList.remove('checked-infra-item');
            })
            return activeNames = [];
        };
    }

    infraList.forEach(item => {
        item.addEventListener('click', (e) => {
            resButton.style.opacity = 1;
            item.classList.toggle('checked-infra-item');
            let infraCheckedList = document.querySelectorAll('.checked-infra-item');
            infraCheckedList.forEach(checkItem => {
                activeNames.push(checkItem.dataset.name);
            });

            gmarkers1.forEach(mark => {
                if (activeNames.includes(mark.name)) {
                    mark.setVisible(true);
                } else {
                    mark.setVisible(false);
                }
            });
            activeNames = [];
        })
    })
    var center = {
        lat: 50.442098,
        lng: 30.544152

    };

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: center,
        scrollwheel: false,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
        draggable: true,
        language: 'en',
        styles: [{
                "featureType": "all",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#ffffff"
                }]
            },
            {
                "featureType": "all",
                "elementType": "geometry.fill",
                "stylers": [{
                        "visibility": "on"
                    },
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": "0"
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "geometry.stroke",
                "stylers": [{
                        "visibility": "on"
                    },
                    {
                        "color": "#dddddd"
                    },
                    {
                        "saturation": "-100"
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.text",
                "stylers": [{
                        "visibility": "on"
                    },
                    {
                        "color": "#000000"
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "visibility": "on"
                }]
            },
            {
                "featureType": "all",
                "elementType": "labels.text.stroke",
                "stylers": [{
                        "saturation": -31
                    },
                    {
                        "lightness": -33
                    },
                    {
                        "weight": 2
                    },
                    {
                        "gamma": 0.8
                    },
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.icon",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "administrative.country",
                "elementType": "all",
                "stylers": [{
                    "visibility": "on"
                }]
            },
            {
                "featureType": "administrative.country",
                "elementType": "geometry.stroke",
                "stylers": [{
                        "visibility": "on"
                    },
                    {
                        "color": "#000000"
                    },
                    {
                        "weight": "1.93"
                    }
                ]
            },
            {
                "featureType": "administrative.country",
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "administrative.province",
                "elementType": "geometry.stroke",
                "stylers": [{
                        "visibility": "on"
                    },
                    {
                        "color": "#000000"
                    },
                    {
                        "weight": "1.26"
                    }
                ]
            },
            {
                "featureType": "administrative.province",
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [{
                        "lightness": 30
                    },
                    {
                        "saturation": 30
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [{
                    "saturation": 20
                }]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [{
                        "lightness": 20
                    },
                    {
                        "saturation": -20
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [{
                        "lightness": 10
                    },
                    {
                        "saturation": -30
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry.stroke",
                "stylers": [{
                        "saturation": 25
                    },
                    {
                        "lightness": 25
                    },
                    {
                        "color": "#e0e0e0"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [{
                    "visibility": "on"
                }]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [{
                        "visibility": "on"
                    },
                    {
                        "color": "#dfdfdf"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [{
                        "visibility": "on"
                    },
                    {
                        "color": "#d1d1d1"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.icon",
                "stylers": [{
                        "visibility": "off"
                    },
                    {
                        "saturation": "-100"
                    },
                    {
                        "lightness": "1"
                    },
                    {
                        "gamma": "1.80"
                    },
                    {
                        "weight": "0.01"
                    }
                ]
            },
            {
                "featureType": "road.highway.controlled_access",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#514444"
                }]
            },
            {
                "featureType": "road.highway.controlled_access",
                "elementType": "labels.icon",
                "stylers": [{
                        "visibility": "on"
                    },
                    {
                        "saturation": "-100"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "all",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry.fill",
                "stylers": [{
                        "color": "#dbdbdb"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry.stroke",
                "stylers": [{
                        "visibility": "on"
                    },
                    {
                        "color": "#cfcfcf"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "visibility": "on"
                }]
            },
            {
                "featureType": "road.local",
                "elementType": "all",
                "stylers": [{
                    "visibility": "on"
                }]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry.fill",
                "stylers": [{
                        "color": "#f1f1f1"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [{
                        "lightness": "-17"
                    },
                    {
                        "gamma": "2.09"
                    }
                ]
            }
        ]

    });

    var polygonCoords = [
        new google.maps.LatLng(50.44165, 30.54246),
        new google.maps.LatLng(50.44166, 30.5443),
        new google.maps.LatLng(50.44211, 30.54431),
        new google.maps.LatLng(50.44212, 30.5446),
        new google.maps.LatLng(50.4436, 30.54469),
        new google.maps.LatLng(50.44337, 30.54394),
        new google.maps.LatLng(50.44295, 30.54414),
        new google.maps.LatLng(50.44197, 30.54315),
        new google.maps.LatLng(50.44197, 30.54248),
        new google.maps.LatLng(50.44165, 30.54246),

    ];

    // Настройки для полигона
    var polygon = new google.maps.Polygon({
        path: polygonCoords, // Координаты
        strokeColor: '#111010;',
        strokeOpacity: 1,
        strokeWeight: 1.5,
        fillColor: '#111010;',
        fillOpacity: 1
    });

    //Добавляем на карту
    polygon.setMap(map);


    var markers_spritesheet;

    if (document.location.pathname === '/') {
        markers_spritesheet = 'img/main_page_map_markers_spritesheet.png';
    } else {
        markers_spritesheet = '../img/main_page_map_markers_spritesheet.png';
    }

    var baseFolder = 'assets/images/map/';
    var defaultMarkerSize = new google.maps.Size(44, 62);
    var markersAdresses = {
        main: `${baseFolder}marker-a-station.svg`,
        park: `${baseFolder}marker-park.svg`,
        metro: `${baseFolder}marker-metro.svg`,


    }

    var markersData = [];
    /** Маркеры для карты 28,01,2020 */
    /* beautify preserve:start */
    var markersData = [
        {
            content: 'A-station',
            position: {  lat: 50.442098,                lng: 30.544152 },
            type: 'main',
            icon: { url: markersAdresses.main,scaledSize: defaultMarkerSize,}
        },
        {
            content: 'Park',
            position: {  lat: 50.443120,                lng: 30.544152 },
            type: 'park',
            icon: { url: markersAdresses.park,scaledSize: defaultMarkerSize,}
        },
        {
            content: 'Metro',
            position: {  lat: 50.444068,                lng: 30.544152 },
            type: 'metro',
            icon: { url: markersAdresses.metro,scaledSize: defaultMarkerSize,}
        },
    ]
/* beautify preserve:end */
    var activeInfoBubble;





    markersData.forEach(function(marker) {
        var markerSettings = {};
        var category = marker.type;
        // console.log(marker.icon);

        var mapMarker = new google.maps.Marker({
            map: map,
            category: category,
            icon: marker.icon,
            position: new google.maps.LatLng(marker.position.lat, marker.position.lng),
        });
        var infowindow = new google.maps.InfoWindow();
        mapMarker.infowindow = infowindow;
        google.maps.event.addListener(mapMarker, 'click', function() {
            infowindow.setContent(marker.content);
            gmarkers1.forEach(marker => marker.infowindow.close());
            infowindow.open(map, mapMarker);
        });
        mapMarker.name = marker.type;
        // console.log(gmarkers1);
        gmarkers1.push(mapMarker);
        // console.log(category);
        // console.log(gmarkers1);
    });

};


// Google map end