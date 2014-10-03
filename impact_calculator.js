/* impact_calculator.js
*  
*  Contains the function calculateImpact which takes a charity id and donation amount as input
*  and returns a list of possible impacts produced by the charity.
*/


function pricePoint(price, item)
{
	this.price = price;
	this.item = item;
}

function charity(id, name, pricePoints, overheadMultiplier)
{
	this.id = id;
	this.name = name;
	this.pricePoints = pricePoints;  // An array of pricePoint objects
	this.overheadMultiplier = overheadMultiplier;  // Currently incomplete data, overheadMultiplier reduces the donation to cover the charity's operating costs
}

// The charities - these should be stored in a database for easier modification
var AgainstMalariaFoundation = new charity(0, "Against Malaria Foundation",
		[new pricePoint(1, "Dollars toward providing long-lasting insecticide-treated bed nets to help prevent the spread of malaria"),
		new pricePoint(3, "Malaria nets, each protecting an average of 1.8 people for 3 years"),
		new pricePoint(60, "Lives saved, according to the Against Malaria Foundation and Dr. Christen Lengeler of the Swiss Tropical Institute"),
		new pricePoint(3400, "Lives saved, according to a conservative estimate by GiveWell")],
		1.0);
var DispensersForSafeWater = new charity(1, "Dispensers for Safe Water",
		[new pricePoint(1, "Dollars toward providing chlorine-dispensers for safe drinking water"),
		new pricePoint(0.5, "Community members provided with safe water for an entire year")],
		1.0);
var DewormTheWorld = new charity(2, "Deworm the World",
		[new pricePoint(1, "Dollars toward protecting students against neglected tropical diseases"),
		new pricePoint(0.5, "Students protected from neglected tropical diseases for one year, reducing absenteeism by 25%, and increasing future wages by 23% and work hours by 12%")],
		1.0);
var FistulaFoundation = new charity(3, "Fistula Foundation",
		[new pricePoint(1, "Dollars toward funding the associated costs of fistula repair surgery for women"),
		new pricePoint(25, "Women's transportation to and from the hospital (on average)"),
		new pricePoint(50, "Anesthetists provided for women's surgeries (on average)"),
		new pricePoint(85, "Patients provided with nursing care (on average)"),
		new pricePoint(450, "Women's fistula repair surgeries funded in entirety (on average)")],
		1.0);
var FredHollowsFoundation = new charity(4, "Fred Hollows Foundation",
		[new pricePoint(1, "Dollars toward eliminating global preventable blindness and vision impairment"),
		new pricePoint(25, "Cataract surgeries (in some developing countries) preventing avoidable blindness")],
		1.0);
var GiveDirectly = new charity(5, "Give Directly",
		[new pricePoint(1, "Dollars given directly to poor households in Kenya and Uganda to use as they wish, increasing recipients' assets and food security while reducing stress and depression during the following years"),
		new pricePoint(200, "Household members funded for one to two years"),
		new pricePoint(1000, "Households funded for one to two years")],
		0.9);
var charities = [AgainstMalariaFoundation,  DispensersForSafeWater, DewormTheWorld,
		FistulaFoundation, FredHollowsFoundation, GiveDirectly]


function impact(number, item)
{
	this.number = number;
	this.item = item;
}

//  Returns an array of impact objects, which have a number an item property
//  only returns a certain impact in the list if the donation is large enough to cover at least one
function calculateImpact(charityId, donation) {
	var selectedCharity = charities[charityId];
	var impacts = [];
	for (i = 0; i < selectedCharity.pricePoints.length; i++) {
		var pp = selectedCharity.pricePoints[i]
		var usableDonation = selectedCharity.overheadMultiplier*donation
		if (usableDonation >= pp.price) {
			impacts.push(new impact(Math.floor(usableDonation/pp.price), pp.item));
		}
	}
	return impacts;
};



function test() {
	var testDonation = 5000;
	for (id = 0; id < 6; id++) {
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
		