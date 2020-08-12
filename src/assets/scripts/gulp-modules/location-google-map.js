// Google map start
function func() {
    var script = document.createElement('script');
    let key = '';
    if (window.location.href.match(/localhost/)) key = '';
    // const key = '';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap`;
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


    var center = {
        // lat: 50.445007,
        // lng: 30.610436
        lat: 50.476303,
        lng: 30.516779
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
            "stylers": [{
                "saturation": 0
            }, {
                "hue": "#e7ecf0"
            }]
        }, {
            "featureType": "road",
            "stylers": [{
                "saturation": -70
            }]
        }, {
            "featureType": "transit",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "poi",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "water",
            "stylers": [{
                "visibility": "simplified"
            }, {
                "saturation": -60
            }]
        }],

    });



    var polygonCoords = [
        new google.maps.LatLng(50.55601, 30.27695),
        new google.maps.LatLng(50.55743, 30.27686),
        new google.maps.LatLng(50.55764, 30.27883),
        new google.maps.LatLng(50.5567, 30.27858),
        new google.maps.LatLng(50.55633, 30.27846),
        new google.maps.LatLng(50.55527, 30.27739),
        new google.maps.LatLng(50.55601, 30.27695),

    ];

    // Настройки для полигона
    var polygon = new google.maps.Polygon({
        path: polygonCoords, // Координаты
        strokeColor: '#F8B400',
        strokeOpacity: 1,
        strokeWeight: 1.5,
        fillColor: '#F8B400',
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

    // var baseFolder = '/wp-content/themes/rusaniv/assets/images/markers/';
    var baseFolder = './assets/images/markers/';
    var defaultMarkerSize = new google.maps.Size(94, 75),
        buildLogoSize = new google.maps.Size(94, 75);
    var markersAdresses = {
            main: `${baseFolder}marker-main.svg`,
            sport: `${baseFolder}sport-complex.svg`,
            // kinder: `${baseFolder}marker-bear.svg`,
            // meal: `${baseFolder}marker-meal.svg`,
            // park: `${baseFolder}marker-park.svg`,
            // shop: `${baseFolder}marker-shop.svg`,
            // work: `${baseFolder}marker-work.svg`,
            // school: `${baseFolder}marker-school.svg`,
            // sale: `${baseFolder}marker-sale.svg`,



        }
        /* beautify preserve:start */
    var markersData = [
        {
            content: `<img style="background:white" src="${markersAdresses.main}">`,
            position: { lat: 50.476303,lng: 30.516779},
            type: 'main',
            icon: { url: markersAdresses.main,scaledSize: buildLogoSize,}
        },

    ]
/* beautify preserve:end */
    var infowindow = new google.maps.InfoWindow({
        content: '',
        maxWidth: 200
    });
    var activeInfoBubble;



    /**Вывод карты со всеми маркерами на странице Инфраструктуры и С одним маркером на остальных страницах */
    markersData.forEach(function(marker) {
        var markerSettings = {};
        var category = marker.type;
        var mapMarker = new google.maps.Marker({
            map: map,
            category: category,
            icon: marker.icon,
            position: new google.maps.LatLng(marker.position.lat, marker.position.lng),
        });

        google.maps.event.addListener(mapMarker, 'click', function() {
            infowindow.setContent(marker.content);
            infowindow.open(map, mapMarker);
            console.log(mapMarker);
            map.panTo(this.getPosition());
        });
        mapMarker.name = marker.type;
        gmarkers1.push(mapMarker);

    });

};
// Google map end