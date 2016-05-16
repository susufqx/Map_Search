import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './main.html';

//-------------- here is the data of profiles of each person
var profil = [
	{"firstName": "Floren", 		"lastName": "CLAPIE", 	"address": "43 Rue Adrien, Lemoine", 			"city": "Lemoine",    	"skills": ["tondre", "peindre", "code"]},
	{"firstName": "Zhaojun", 		"lastName": "HAO", 		"address": "La Croix Saint-Sylvère, Cergy", 	"city": "Cergy"	,		"skills": ["sleeping", "dota", "code", "maths"]},
	{"firstName": "Rui",			"lastName": "LI",		"address": "7 Les Chenes d'Or, Cergy",			"city": "Cergy"	,		"skills": ["dota", "cafe", "peindre", "code", "tondre"]},
	{"firstName": "Huaiyu",			"lastName": "YANG",		"address": "La Croix Saint-Sylvère, Cergy",		"city": "Cergy"	,		"skills": ["sleeping", "LOL", "maths"]},
	{"firstName": "Bernard",		"lastName": "GLONNEAU",	"address": "1 Avenue du Parc, Cergy",			"city": "Cergy"	,		"skills": ["code", "peindre", "cafe"]},
	{"firstName": "Jean-Paul",		"lastName": "FOREST",   "address": "1 Avenue du Parc, Cergy",			"city": "Cergy"	,		"skills": ["cafe", "maths", "LOL"]}
];

var test = ["aa", "ss", "ssds"];

//-------------- this variable is for using in the fonction or methodes
var needs 		= 	profil;
var profilDeal  =   profil;
var option		=	[];
var count 		= 	0;
var addr 		=	[];
var workmap 	=	false;
//-------------- fonction of filtration

function filtration(x) {

	var skill  =  x;

	for (var person in profilDeal) {
		for (var sk in profilDeal[person].skills) {
			if (profilDeal[person].skills[sk] === skill) {	
				var add = profilDeal[person];
				needs.push(add);
				count ++ ;
			} 
		}
	}
	return 0;
}

function changeButton(x) {
	var y = -1;
	for (var skill in option) {
		if (option[skill] === x) {
			y = skill;
		}
	}
	if (y < 0) {
		var add = x;
		option.push(add);
		return true;
	} else {
		delete option[y];
	}
	return false;
}

Template.infoprofil.events({

	"click .yes": function (event, template) {
		var a = document.getElementById(event.target.id);
		var judge = changeButton(event.target.id);
		if (judge === false) {
			a.className	=	"yes";
		}else {
			a.className	=	"no";
		}
	},

	"click .no": function (event, template) {
		var a = document.getElementById(event.target.id);
		var judge = changeButton(event.target.id);
		if (judge === false) {
			a.className	=	"yes";
		}else {
			a.className	=	"no";
		}
	}
});

//------------ Google Map -------------------

Meteor.startup(function() {
   	GoogleMaps.load();
});

Template.exampleMap.helpers({
    exampleMapOptions: function() {
      	// Make sure the maps API has loaded
      	if (GoogleMaps.loaded()) {
        // Map initialization options
        	return {
        		center: new google.maps.LatLng(49.035, 2.075),
         		zoom: 14
        	};
      	}
    }
});	 

		//

var marker;
var m  =  [];
var citylatlng;
var begin	=	false;

function searchAddr (addr, city) {
 	number 	=	1;
 	var geocoder = new google.maps.Geocoder();
  	geocoder.geocode (geocoderRequest, function(results, status) {  
    	if (status == google.maps.GeocoderStatus.OK) {  
           	citylatlng = results[0].geometry.location; 

         	if  (GoogleMaps.loaded()) {
           		GoogleMaps.create({
  					name: 'exampleMap',
  					element: document.getElementById('exampleMap'),
  					options: {
   						center: citylatlng,
   						zoom: 12
  					}
				});
				alert("jsjs");
				begin 	=	true;
       		}
     	} else {  
            alert(interGeoAnalysisFailed);  
        }  
    });	

 	
 	for (var i in addr) {
 		var a 				=	addr[i];
 		var geocoderRequest	=	{address:a};
 		geocoder.geocode (geocoderRequest, function(results, status) {  

        	if (status == google.maps.GeocoderStatus.OK) {  
            	var latlng = results[0].geometry.location; 
            	addMarkerAll(latlng, number);
            	//alert("lallalalalaal");
        	} else {  
            	alert(interGeoAnalysisFailed);  
        	}  
    	}); 
    	number ++;
    }
} 
		
function addMarkerAll (latlng, number) {	 	
   	//alert("Hello");
    marker = new google.maps.Marker({
		position: 	latlng,
		// here, GoogleMaps.maps.exampleMap.instance is the map we have created and can be used by us
   		//map: 		GoogleMaps.maps.exampleMap.instance,
   		draggable: 	true,
   		title: 		number
    });
    marker.setMap(GoogleMaps.maps.exampleMap.instance);
    m.push(marker);
}

function removeMarkerAll (marker) {
	if (m) {
		//marker =	null;
		for (var i in m) {
			m[i].setMap(null);
		}
		var l = m.length;
		m.splice(1, l-1);
	}
} 


		

Template.exampleMap.events ({

	"click .remove-button": function (event, template) {
		removeMarkerAll(marker);
	},

	"click .confirm-button": function (event, template) {

		removeMarkerAll(marker);

		var city 	=		document.getElementById("city").value;
		begin = true;
		var choose = [];

		if (city) {

		for (var i in option) {
			if (option[i] != null) {
				var add = option[i];
				choose.push(add);
			}
		}
		
		var len  =	choose.length;
		var textSkill="";

		for (var i=0; i < len; i++) {
			var space = "  ";
			textSkill = textSkill +space+choose[i];
		}
		
		for (var i in choose) {
			count 		=	0;
			profilDeal 	=	[];
			profilDeal 	= 	needs;
			needs 		=   [];
			var x = choose[i];
			var a = filtration(x);
		}

		for (var i=0;i < count;i++) {
			var a 	=	needs[i].address;
			addr.push(a);
		}

		var display = [];
		var text1	= "The persons who has the skill(s)\n ";
		var text2   = " is/are:\n\n_________________________________________________\n";
		var display = text1 + textSkill + text2;
		for (var i=0; i < count; i++) {
			n = i + 1;
			var t1	=	"Number ";
			var t2	=	" who matches the options is：";
			var t3	=	" ";
			var t4	=	"\nThe adress of this person is：";
			var t5	=	"\n";
			var t6	=	"_________________________________________________";
			var text = t1+n+t2+needs[i].firstName+t3+needs[i].lastName+t4+needs[i].address+t5+t6+t5;
			display = display + text;
		}

		
		if (count != 0) {
			document.getElementById("text").innerHTML	= display;
			
		} else {
			document.getElementById("text").innerHTML	= "Soory.\nWe can't find the person you need!";
		}
		
		//
		searchAddr(addr, city);

		addr 			=	[];
		count 			= 	0;
		profilDeal 		= 	profil;
		needs			=	profil;
		choose			=	[];
	} else {
		alert("Please enter the city!!!!!!!");
	}
	}
});








