import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // here we have created a database named Profils storing the information of each person
	/*server	=	"I'm the server.";
  Profils	=	new Mongo.Collection('profildata');
  if (Profils.find().count() == 0) {
  	Profils.insert({	
  		firstName: 	"Floren", 		
  		lastName: 	"CLAPIE", 	
	  	address: 		"43 Rue Adrien, Lemoine", 			
	  	city: 			"Lemoine",    		
			skills: 		["tondre",	"peindre",	"arroser",	"monter"]
  	});

  	Profils.insert({	
			firstName: 	"Zhaojun", 		
			lastName: 	"HAO", 	
			address: 		"La Croix Saint-Sylvère, Cergy", 			
			city: 			"Cergy",    		
			skills: 		["arroser", "langage", 	"code", 	"maths"]
  	});

  	Profils.insert({	
			firstName: 	"Rui", 		
			lastName: 	"LI", 	
			address: 		"7 Les Chenes d'Or, Cergy", 			
			city: 			"Cergy",    		
			skills: 		["cafe",	 "peindre", "code", 	"tondre"]
  	});

  	Profils.insert({	
			firstName: 	"Huai", 		
			lastName: 	"YANG", 	
			address: 		"La Croix Saint-Sylvère, Cergy", 			
			city: 			"Cergy",    		
			skills: 		["monter", 	"arroser", 	"maths",	"peindre"]
 		});
	}

	profiFind		= 	[];
	profiFind 	= 	Profils.find({city:"Cergy"}).pretty();
	console.log(profiFind);
	//for (var i in profiFind) {
		
  	//console.log("Hello  "+i);
  	//console.log(profiFind[i].lastName);
	//} */
});
