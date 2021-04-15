var geocoder;
var addressInner=document.getElementById('address');
function loadJSON(callback) {
  var xobj = new XMLHttpRequest();
      xobj.overrideMimeType("application/json");
  xobj.open('GET', 'data.json', true);
  xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
          callback(xobj.responseText);
        }
  };
  xobj.send(null);
}


//
function init() {
  loadJSON( (response)=> {
   // Parsing JSON string into object
      var actual_JSON = JSON.parse(response);
      console.log(actual_JSON) ;
      actual_JSON.forEach(e => {
        codeAddress(e.lng,e.lat);
        console.log(e.Name);
      });
     });
 }


var map;
let result=[null,null];
var i;
function initialize(){
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(52.192001,-2.220000);
  var mapOptions = {
    zoom:10,
    center:latlng,
  }
  map = new google.maps.Map(document.getElementById('map'),mapOptions);
}
  function codeAddress(){
    var addressValue=document.getElementById('address').value;
    geocoder.geocode({'address':addressValue},function(results,status){
      if(status=="OK"){
        map.setCenter(results[0].geometry.location);
        console.log(results[0].geometry.location.lng())
        console.log(results[0].geometry.location.lat())
        i+=1;
        var marker=new google.maps.Marker({
          map:map,
          position:results[0].geometry.location,
        });
      }
        else{
          alert("you done fucked up")
        }
    });
  }
init();
