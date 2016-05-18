if (Posts.find().count() === 0) {
	Posts.insert({	
  	firstName: 	"Floren", 		
  	lastName: 	"CLAPIE", 	
	  address: 		"43 Rue Adrien, Lemoine", 			
	  city: 			"Lemoine",    		
		skills: 		["tondre",	"peindre",	"arroser",	"monter"]
  });

  Posts.insert({	
		firstName: 	"Zhaojun", 		
		lastName: 	"HAO", 	
		address: 		"La Croix Saint-Sylvère, Cergy", 			
		city: 			"Cergy",    		
		skills: 		["arroser", "langage", 	"code", 	"maths"]
  });

 	Posts.insert({	
		firstName: 	"Rui", 		
		lastName: 	"LI", 	
		address: 		"7 Les Chenes d'Or, Cergy", 			
		city: 			"Cergy",    		
		skills: 		["cafe",	 "peindre", "code", 	"tondre"]
 	});

 	Posts.insert({	
		firstName: 	"Huai", 		
		lastName: 	"YANG", 	
		address: 		"La Croix Saint-Sylvère, Cergy", 			
		city: 			"Cergy",    		
		skills: 		["monter", 	"arroser", 	"maths",	"peindre"]
	});
}
/*if (Posts.find().count() === 0) {
  Posts.insert({
    title: 'Introducing Telescope',
    url: 'http://sachagreif.com/introducing-telescope/'
  });

  Posts.insert({
    title: 'Meteor',
    url: 'http://meteor.com'
  });

  Posts.insert({
    title: 'The Meteor Book',
    url: 'http://themeteorbook.com'
  });
}*/