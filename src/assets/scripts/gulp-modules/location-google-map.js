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
    filterMarkers = function(category, categoriesArray) {
        // for (i = 0; i < gmarkers1.length; i++) {
        //     marker = gmarkers1[i];
        //     var markerMain = gmarkers1.find(item => item.category === 'main');

        //     if (marker.category == category || category == 'all') {
        //         marker.setMap(map);
        //         markerMain.setMap(map);
        //     } else {
        //         marker.setMap(null);
        //         markerMain.setMap(map);
        //     }
        // }

        gmarkers1.forEach(el => {
            if (categoriesArray.has(el.category)) {
                el.setMap(map);
                el.setAnimation(google.maps.Animation.DROP);
            } else {
                el.setMap(null);
            }
        })
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

    /** Кастомизированые попап (на будущее) */
    // customizedPopup(map)


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

    // var baseFolder = '/wp-content/themes/rusaniv/assets/images/markers/';
    var baseFolder = './assets/images/markers/';
    var defaultMarkerSize = new google.maps.Size(94, 75),
        buildLogoSize = new google.maps.Size(94, 75);
    var markersAdresses = {
        main: `${baseFolder}marker-main.svg`,
        sport: `${baseFolder}marker-sport-complex.svg`,
        school: `${baseFolder}marker-school.svg`,
        bank: `${baseFolder}marker-bank.svg`,
        kindergarden: `${baseFolder}marker-kindergarden.svg`,
        park: `${baseFolder}marker-park.svg`,
        meal: `${baseFolder}marker-meal.svg`,
        dentist: `${baseFolder}marker-dentist.svg`,
        medicine: `${baseFolder}marker-medicine.svg`,
        metro: `${baseFolder}marker-metro.svg`,
        post: `${baseFolder}marker-post.svg`,
        shop: `${baseFolder}marker-shop.svg`,
        supermarkets: `${baseFolder}marker-supermarkets.svg`,
    };
    let markerPopupStyle = `
        style="
        background: #1798D5;
        padding:5px 10px;
        font-weight: 500;
        font-size: 14px;
        line-height: 22px;"
        `;
    /**Елементы, при клике на который будет происходить фильтрация */
    let filterItems = document.querySelectorAll('.legend-js li');
    /**Массив, куда записываются выбраные категории*/
    let choosedCategories = new Set();
    choosedCategories.add('main');
    filterItems.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('active');
            item.classList.contains('active') ?
                choosedCategories.add(item.dataset.category) :
                choosedCategories.delete(item.dataset.category);
            filterMarkers('main', choosedCategories);
        });
    })





    /* beautify preserve:start */
    var markersData = [
        {
            content: `<img style="background:white" src="${markersAdresses.main}">`,
            position: { lat: 50.476303,lng: 30.516779},
            type: 'main',
            icon: { url: markersAdresses.main,scaledSize: buildLogoSize,}
        },
        {
            content: `<div ${markerPopupStyle}>PARK</div>`,
            position: { lat: 50.478303,lng: 30.516779},
            type: 'park',
            icon: { url: markersAdresses.park,scaledSize: buildLogoSize,}
        },
        {
            content: `<div ${markerPopupStyle}>Shop</div>`,
            position: { lat: 50.480303,lng: 30.516779},
            type: 'shop',
            icon: { url: markersAdresses.shop,scaledSize: buildLogoSize,}
        },
        {
            content: `<div ${markerPopupStyle}>Post</div>`,
            position: { lat: 50.482303,lng: 30.516779},
            type: 'post',
            icon: { url: markersAdresses.post,scaledSize: buildLogoSize,}
        },
        {
            content: `<div ${markerPopupStyle}>Bank</div>`,
            position: { lat: 50.484303,lng: 30.516779},
            type: 'bank',
            icon: { url: markersAdresses.bank,scaledSize: buildLogoSize,}
        },
    ]
/* beautify preserve:end */
    var infowindow = new google.maps.InfoWindow({
        content: '',
        maxWidth: 200
    });
    var activeInfoBubble;



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
            map.panTo(this.getPosition());
        });
        mapMarker.name = marker.type;
        gmarkers1.push(mapMarker);
    });
};
let legendButton = document.querySelector('.legend-button-js'),
    legend = document.querySelector('.legend-js'),
    buttonTextEl = legendButton.querySelector('span');
let legendButtonTitles = (function() {
    if (!legendButton.dataset.opened || !legendButton.dataset.close) {
        return [buttonTextEl.innerText, buttonTextEl.innerText];
    }
    return [legendButton.dataset.opened, legendButton.dataset.close];
})();

legendButton.addEventListener('click', function(evt) {
    legend.classList.toggle('closed');
    if (!legend.classList.contains('closed')) animateLegendIcons();
    legend.classList.contains('closed') ?
        buttonTextEl.innerText = legendButtonTitles[0] :
        buttonTextEl.innerText = legendButtonTitles[1];

});

function animateLegendIcons() {
    gsap.from(legend.querySelectorAll('li'), { clearProps: 'all', autoAlpha: 0, y: 15, stagger: 0.01 });
    // gsap.to(legend, { height: '500px' });
}

// function customizedPopup(map) {


//     /**
//      * A customized popup on the map.
//      */
//     class Popup extends google.maps.OverlayView {
//         constructor(position, content) {
//                 super();
//                 this.position = position;
//                 content.classList.add("popup-bubble");
//                 // This zero-height div is positioned at the bottom of the bubble.
//                 const bubbleAnchor = document.createElement("div");
//                 bubbleAnchor.classList.add("popup-bubble-anchor");
//                 bubbleAnchor.appendChild(content);
//                 // This zero-height div is positioned at the bottom of the tip.
//                 this.containerDiv = document.createElement("div");
//                 this.containerDiv.classList.add("popup-container");
//                 this.containerDiv.appendChild(bubbleAnchor);
//                 // Optionally stop clicks, etc., from bubbling up to the map.
//                 Popup.preventMapHitsAndGesturesFrom(this.containerDiv);
//             }
//             /** Called when the popup is added to the map. */
//         onAdd() {

//                 this.getPanes().floatPane.appendChild(this.containerDiv);
//             }
//             /** Called when the popup is removed from the map. */
//         onRemove() {
//                 if (this.containerDiv.parentElement) {
//                     this.containerDiv.parentElement.removeChild(this.containerDiv);
//                 }
//             }
//             /** Called each frame when the popup needs to draw itself. */
//         draw() {
//             const divPosition = this.getProjection().fromLatLngToDivPixel(
//                 this.position
//             );
//             // Hide the popup when it is far out of view.
//             const display =
//                 Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000 ?
//                 "block" :
//                 "none";

//             if (display === "block") {
//                 this.containerDiv.style.left = divPosition.x + "px";
//                 this.containerDiv.style.top = divPosition.y + "px";
//             }

//             if (this.containerDiv.style.display !== display) {
//                 this.containerDiv.style.display = display;
//             }
//         }
//     }
//     popup = new Popup(
//         new google.maps.LatLng(50.478303, 30.516779),
//         document.getElementById("content")
//     );
//     popup.setMap(map);
// }
// Google map end