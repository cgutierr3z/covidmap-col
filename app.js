var map = new Datamap({
    element: document.getElementById('peru-departments'),
    scope: 'peru-departments',
    responsive: true, //if true, call `resize()` on the map object when it should adjust it's size
    done: function() {}, //callback when the map is done drawing

    //dataType: 'csv', //for use with dataUrl, currently 'json' or 'csv'. CSV should have an `id` column
    //dataUrl: '', //if not null, datamaps will attempt to fetch this based on dataType ( default: json )
    dataType: 'csv',
    dataUrl: 'col-data.csv',
    data: {},

    fills: {
        'def': '#dddddd',
        'C1': '#ffa4a9',
        'C2': '#cc6674',
        'C3': '#993341',
        'C4': '#66000e',
        defaultFill: '#dddddd'
    },

    geographyConfig: {
      dataUrl: 'peru-departments.json',
      //dataJson: topoJsonData
      hideAntarctica: true,
      borderWidth: 1,
      borderOpacity: 1,
      borderColor: '#FDFDFD',
      popupTemplate: function(geography, data) { //this function should just return a string
        //return '<div class="hoverinfo"><strong>' + geography.properties.name + '</strong></div>';

        return ['<div class="card" style="padding:0">',
        '<h5 class="card-header bg-info">' +  geography.properties.NOMBDEP + '</h5>',
        '<div class="card-body"><table class="table text-left"><tbody>',
        '<tr><td class="text-secondary">Diagnosticados</td><td class="text-danger">' +  data.infectados + '</td></tr>',
        '<tr><td class="text-secondary">Muertes: </td><td class="text-dark">' +  data.muertos + '</td></tr>',
        '<tr><td class="text-secondary">Curados: </td><td class="text-success">' +  data.curados + '</td></tr>',
        '</tbody></table></div></div>'].join('');
      },

      popupOnHover: true, //disable the popup while hovering
      highlightOnHover: true,
      highlightFillColor: '#ff7d03',
      highlightBorderColor: 'rgba(0, 0, 0, 0.6)',
      highlightBorderWidth: 1,
      highlightBorderOpacity: 1
    },

    setProjection: function (element) {

        var projection = d3.geo.mercator()
            .center([-74,3]) // always in [East Latitude, North Longitude]
            //.center([4.570868,-74.2973328]) // always in [East Latitude, North Longitude]
            .scale(element.offsetWidth*4)
            .translate([element.offsetWidth / 2, element.offsetHeight / 2]);
        var path = d3.geo.path().projection(projection);
        return { path: path, projection: projection };
    }
});

window.addEventListener('resize', function(event){
    map.resize();
});

$(document).ready(function() {
	setTimeout(function(){
		$('body').addClass('loaded');
		$('h1').css('color','#222222');
	}, 1000);
  //$('#exampleModalCenter').modal('show');
});
