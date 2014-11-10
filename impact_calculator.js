/* impact_calculator.js
*  
*  Contains the function displayImpact which takes a charity id and donation amount 
*  from an html form and displays a list of possible impacts produced by the charity
*  in an html element
*/


// structure of price point objects (see charities.json)
function pricePoint(price, action, item, exclusive)
{
	this.price = price;
	this.action = action;
	this.item = item;
}

// structure of the charity object (see charities.json)
function charity(id, name, overhead, pricePoints)
{
	this.id = id;
	this.name = name;
	this.overhead = overhead;  // The operating cost of the charity
	this.pricePoints = pricePoints;  // An array of pricePoint objects
	
}

function impact(number, action, item, exclusive)
{
	this.number = number;
	this.action = action;
	this.item = item;
	this.exclusive = exclusive;
}

// Load charity info from charities.json
var charities = []
$(document).ready(function() {
	var jqXHR = $.getJSON('charities.json', function( data ) {
		//alert("Loading charities");
        charities = data.charities;
	})
  .fail(function(data, textStatus, error) {
        console.error("Could not load charities.json, status: " + textStatus + ", error: " + error);
  })
    
});


//  Returns an array of impact objects, which have a number an item property
//  only returns a certain impact in the list if the donation is large enough to cover at least one
function calculateImpact(charityId, donation) {
	var selectedCharity = charities[charityId];
	var impacts = [];
	for (i = 0; i < selectedCharity.pricePoints.length; i++) {
		var pp = selectedCharity.pricePoints[i];
		var overheadMultiplier = 1.0 - selectedCharity.overhead;
		var usableDonation = overheadMultiplier*donation;
		if (usableDonation >= pp.price) {
			impacts.push(new impact(Math.floor(usableDonation/pp.price), pp.action, pp.item, pp.exclusive));
		}
	}
	return impacts;
};

// function to display impact in an html element with id="impact"
// see test.html for form
function displayImpact() {
    //alert("Submitted");
    var charityId =  document.getElementById("charitySelector").selectedIndex;
    var donation = document.getElementById("donation").value;
    
    var text = "With your donation of $";
    text += donation.toString();
    text += ", "
    text += charities[charityId].name;
    text += " can:<br/><br/>";

    impacts = calculateImpact(charityId, donation);
    for (i = 0; i < impacts.length; i++) {
    	if (i > 0) {
    		if (impacts[i].exclusive) {
    			text += "OR<br/>"
    		}
    		else {
    			text += "<br/>"
    		}
    	}
        text += impacts[i].action;
        text += " "
        text += impacts[i].number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
        text += " ";
        text += impacts[i].item;
        text += "<br/>";
    }
    
    document.getElementById("impact").innerHTML = text;
}

// jquery validate.js form validation
$("#impactCalculator").validate({submitHandler: function(form) {
    form.submit();}});


// function to test the calculator using a command-line javascript shell (such as node.js - http://nodejs.org/)
/*
function test() {
	var testDonation = 5000;
	for (id = 0; id < charities.length; id++) {
		var charity = charities[id];
		console.log("Donating",testDonation,"dollars to",charity.name,"could provide:");
		var impacts = calculateImpact(id, testDonation);
		for (i = 0; i < impacts.length; i++) {
			console.log("-",impacts[i].number, impacts[i].item);
		}
		console.log();
	}
};

test();
*/	