import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './main.html';

//-------------- this variable is for using in the fonction or methodes
var needs 			= 	[];
var profilDeal  =   [];
var option			=		[];
var count 			= 	0;
var addr 				=		[];
var Rskills 		=		[];
// the skills name of the search part
var butSkills   =   [
	"langage", "tondre", "peindre", "cafe", "arroser", "maths", "monter", "code"
];
// the skills name of the register part
var butSkillsR	=   [
	"Rlangage", "Rtondre", "Rpeindre", "Rcafe", "Rarroser", "Rmaths", "Rmonter", "Rcode"
];
// function of adding the skills chosen in the register
function addButtonSkills (x) {
	var y = -1;
	for (var skill in Rskills) {
		if (Rskills[skill] === x) {
			y = skill;
		}
	}
	if (y < 0) {
		var add = x;
		Rskills.push(add);
		return true;
	} else {
		delete Rskills[y];
	}
	return false;
}

Template.register.events ({
	"click .ui.positive.button": function (event, template) {
		var a = document.getElementById(event.target.id);
		var judge = addButtonSkills(event.target.value);
		if (judge === false) {
			a.className	=	"ui positive button";
		}else {
			a.className	=	"ui negative button";
		}
	},
	"click .ui.negative.button": function (event, template) {
		var a = document.getElementById(event.target.id);
		var judge = addButtonSkills(event.target.value);
		if (judge === false) {
			a.className	=	"ui positive button";
		}else {
			a.className	=	"ui negative button";
		}
	},
	// clicking the button to add the informations
	"click .ui.inverted.blue.button": function (event, template) {
		var storeSkills	=	[];
		// storing the skills you want to add
		for (var i in Rskills) {
			if (Rskills[i] != null) {
				var add = Rskills[i];
				storeSkills.push(add);
				delete Rskills[i];
			}
		}
		// get the informations input
		var fN = document.getElementById("FN").value;
		var lN = document.getElementById("LN").value;
		var cT = document.getElementById("CT").value;
		var aD = document.getElementById("AD").value;
		var p  = ", ";
		// the element address contains the city
		aD 	=aD + p + cT;
		// set a variable of the information of a person
		var addPerson = {
			firstName: 		fN,
			lastName: 		lN,
			address: 			aD,
			city: 				cT,
			skills: 			storeSkills
		}
		// add the person into the MongoDB
		if (Posts.findOne(addPerson)) {
			alert("You have registered before!!!");
		} else {
			Posts.insert(addPerson);
		}
		// reset all the buttons in the default state
		for (var i in butSkillsR) {
			var id 			=	butSkillsR[i];
			var a 			= document.getElementById(id);
			a.className = "ui positive button";
		}
		// all the texts are need to be void
		document.getElementById("FN").value = null;
		document.getElementById("LN").value = null;
		document.getElementById("CT").value = null;
		document.getElementById("AD").value = null;
	},
});

// function of change the color of the button, if color changed the skills will be chosen or not
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
	"click .ui.basic.button": function (event, template) {
		var a = document.getElementById(event.target.id);
		var judge = changeButton(event.target.id);
		if (judge === false) {
			a.className	=	"ui basic button";
		}else {
			a.className	=	"ui primary button";
		}
	},
	"click .ui.primary.button": function (event, template) {
		var a = document.getElementById(event.target.id);
		var judge = changeButton(event.target.id);
		if (judge === false) {
			a.className	=	"ui basic button";
		}else {
			a.className	=	"ui primary button";
		}
	}
});

//------------ Google Map and the marker fonctions -------------------

/****************** some parametres *******************/

var marker;					//	variable of marker which will be in the maps
var m  =  [];				//	store the markers have been marked and then we will use it to make the operation delete
var citylatlng;			//	store the Lat and Lng of a city input

/****************** some functions ********************/

//  function of filtration
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
// function of searching the city and the address of each person chosen
function searchAddr (addr, city) {
 	number 	=	1;			//	store the number of the persons
 	var geocoder = new google.maps.Geocoder();
 	// search the city
 	var geocoderRequest	=	{address:city};
  geocoder.geocode (geocoderRequest, function(results, status) {
   	if (status == google.maps.GeocoderStatus.OK) {
       citylatlng = results[0].geometry.location;
       // reload the map and display the city input
       if  (GoogleMaps.loaded()) {
       	GoogleMaps.create({
  				name: 'exampleMap',
  				element: document.getElementById('exampleMap'),
  				options: {
   					center: citylatlng,
   					zoom: 12
  				}
				});
     	}
   	} else {
   		alert(interGeoAnalysisFailed);
    }
   });
 	// search the address and mark them in the map
 	for (var i in addr) {
 		var a 				=	addr[i];
 		var geocoderRequest	=	{address:a};
 		geocoder.geocode (geocoderRequest, function(results, status) {
        	if (status == google.maps.GeocoderStatus.OK) {
            	var latlng = results[0].geometry.location;
            	addMarkerAll(latlng, number);
        	} else {
            	alert(interGeoAnalysisFailed);
        	}
    	});
    	number ++;
    }
}

// function of marking
function addMarkerAll (latlng, number) {
  marker = new google.maps.Marker({
		position: 	latlng,
   	//map: 		GoogleMaps.maps.exampleMap.instance,
   	draggable: 	true,
   	title: 			number
  });
  marker.setMap(GoogleMaps.maps.exampleMap.instance);
  m.push(marker);
}

// function of deleting the markers in the map before
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

// start-up the Google Map
Meteor.startup(function() {
   	GoogleMaps.load();
});

/**************** the templates *******************/

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

/**********************************************/
Template.infoprofil.events ({
	// event of clicking the button 'Remove' for removing the markers in the map
	// event of clicking the button 'Confirm' for searching and marking
	"click .ui.teal.button": function (event, template) {

		var city 		=	document.getElementById("city").value;
		var byCity	=	city;

		profilDeal	=	Posts.find({city:byCity}).fetch();	// get the data from the database named posts
		needs				=	profilDeal;

		// removing the markers marked
		removeMarkerAll(marker);
		var choose 	= 	[];

		if (city) {			// if the city input, begin to search
			// choose is an array storing the skills chosen
			for (var i in option) {
				if (option[i] != null) {
					var add = option[i];
					choose.push(add);
					delete option[i]; // we can't use option array because is contains the sign ','
				}
			}
			var len  			=	choose.length;
			var textSkill	=	"";							// storing all the skills by type String
			for (var i=0; i < len; i++) {
				var space = "  ";
				textSkill = textSkill +space+choose[i];
			}
			// filtering by the skills and storing the data in the needs
			for (var i in choose) {
				count 			=		0;
				profilDeal 	=		[];
				profilDeal 	= 	needs;
				needs 			=   [];
				var x = choose[i];
				var a = filtration(x);
			}
			// storing the addresses into the array addr
			for (var i=0;i < count;i++) {
				var a 	=	needs[i].address;
				addr.push(a);
			}
			// here storing the informations to display
			var display = [];
			var text1	= "The persons who has the skill(s)  ";
			var text2   = " is/are:<br>";
			var display = text1 + textSkill + text2;
			for (var i=0; i < count; i++) {
				n 				= 	i + 1;
				var t1		=		"<div class = \"ui message\">Number ";
				var t2		=		" who matches the options is：<br>";
				var t3		=		" ";
				var t4		=		"<br>The address of this person is：<br>";
				var t5		=		"<br></div>";
				var text 	= 	t1+n+t2+needs[i].firstName+t3+needs[i].lastName+t4+needs[i].address+t5+t5;
				display 	= 	display + text;
			}
			// display in the web pages by inserting the informations into the fichier html
			if (count != 0) {
				document.getElementById("text").innerHTML	= display;
			} else {
				document.getElementById("text").innerHTML	= "Soory.\nWe can't find the person you need!";
			}
			// searching by addresses and city
			searchAddr(addr, city);
			// if a search is finished, reste all the buttons and variables in the default coditions
			for (var i in butSkills) {
				var id 	=		butSkills[i];
				var a 	= 	document.getElementById(id);
				a.className = "ui basic button";
			}
			addr 				=	[];
			count 			= 0;
			profilDeal	= [];
			needs				=	[]
			choose			=	[];
		} else {								// if no city input
			alert("Please enter the city!!!!!!!");
		}
	}
});
