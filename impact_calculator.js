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

function charity(id, name, overhead, pricePoints)
{
	this.id = id;
	this.name = name;
	this.overhead = overhead;  // Currently incomplete data, overheadMultiplier reduces the donation to cover the charity's operating costs
	this.pricePoints = pricePoints;  // An array of pricePoint objects
	
}

// The charities - these should be stored in a database for easier modification
var AgainstMalariaFoundation = new charity(0, "Against Malaria Foundation", 0.0,
		[new pricePoint(1, "Dollars toward providing long-lasting insecticide-treated bed nets to help prevent the spread of malaria"),
		new pricePoint(3, "Malaria nets, each protecting an average of 1.8 people for 3 years"),
		new pricePoint(60, "Lives saved, according to the Against Malaria Foundation and Dr. Christen Lengeler of the Swiss Tropical Institute"),
		new pricePoint(3400, "Lives saved, according to a conservative estimate by GiveWell")]);
var DispensersForSafeWater = new charity(1, "Dispensers for Safe Water", 0.0,
		[new pricePoint(1, "Dollars toward providing chlorine-dispensers for safe drinking water"),
		new pricePoint(0.5, "Community members provided with safe water for an entire year")]);
var DewormTheWorld = new charity(2, "Deworm the World", 0.0,
		[new pricePoint(1, "Dollars toward protecting students against neglected tropical diseases"),
		new pricePoint(0.5, "Students protected from neglected tropical diseases for one year, reducing absenteeism by 25%, and increasing future wages by 23% and work hours by 12%")]);
var FistulaFoundation = new charity(3, "Fistula Foundation", 0.153,
		[new pricePoint(1, "Dollars toward funding the associated costs of fistula repair surgery for women"),
		new pricePoint(25, "Women's transportation to and from the hospital (on average)"),
		new pricePoint(50, "Anesthetists provided for women's surgeries (on average)"),
		new pricePoint(85, "Patients provided with nursing care (on average)"),
		new pricePoint(450, "Women's fistula repair surgeries funded in entirety (on average)")]);
var FredHollowsFoundation = new charity(4, "Fred Hollows Foundation", 0.245,
		[new pricePoint(1, "Dollars toward eliminating global preventable blindness and vision impairment"),
		new pricePoint(25, "Cataract surgeries (in some developing countries) preventing avoidable blindness")]);
var GiveDirectly = new charity(5, "Give Directly", 0.1,
		[new pricePoint(1, "Dollars given directly to poor households in Kenya and Uganda to use as they wish, increasing recipients' assets and food security while reducing stress and depression during the following years"),
		new pricePoint(200, "Household members funded for one to two years"),
		new pricePoint(1000, "Households funded for one to two years")]);
var Oxfam = new charity(6, "Oxfam", 0.212,
		[new pricePoint(1, "Dollars toward creating lasting solutions to the injustice of poverty where needed most in the 90+ countries where Oxfam works"),
		new pricePoint(35, "Children provided with school meal programs for one year"),
		new pricePoint(50, "Farming households provided with seeds and tools"),
		new pricePoint(100, "Latrines built to protect the health of families displaced by natural disasters"),
		new pricePoint(180, "Hand washing stations built at rural schools to prevent the spread of disease"),
		new pricePoint(400, "Communities provided with legal support to take on a mining company"),
		new pricePoint(1500, "Girls' schools built")]);
var PopulationServicesIntl = new charity(7, "Population Services International", 0.0656,
		[new pricePoint(1, "Dollars toward helping people in the developing world to lead healthier lives and plan the families they desire"),
		new pricePoint(0.13, "Male condoms delivered, helping to reduce the spread of HIV and improve family planning"),
		new pricePoint(6.98, "Long-lasting insecticide treated nets delivered to help reduce the spread of malaria"),
		new pricePoint(0.53, "Oral contraceptives delivered, improving the ability of women to plan for the families they desire, improving their health and the health of their children"),
		new pricePoint(1.34, "Children provided with malaria treatment (ACT)"),
		new pricePoint(32.06, "Years of healthy life (DALYs) added")]);
var Possible = new charity(8, "Possible", 0.104,
		[new pricePoint(1, "Dollars toward providing high-quality, low-cost healthcare to the World's poor"),
		new pricePoint(25, "Patients provided with high-quality health care in rural Nepal")]);
var ProjectHealthyChildren = new charity(9, "Project Healthy Children", 0.305,
		[new pricePoint(1, "Dollars toward designing and implementing country-wide, market-based food fortification programs"),
		new pricePoint(0.26, "People provided with fortified food for one year")]);
// SCI values are quoted in British pounds, I'm using a long-term exchange rate of 1.6 £/$ -> http://scharts.co/1EU0Oeh
var SCI = new charity(10, "Schistosomiasis Control Initiative", 0.14,
		[new pricePoint(1, "Dollars toward helping those who are at risk and suffering from neglected tropical diseases in sub-Saharan Africa"),
		new pricePoint(0.8, "Children and at-risk adults treated against debilitating neglected tropical diseases for one year"),
		new pricePoint(800, "Entire schools treated against neglected tropical diseases for one year")]);
var SevaFoundation = new charity(11, "Seva Foundation", 0.144,
		[new pricePoint(1, "Dollars toward preventing blindness, providing eyesight-restoring surgeries, and developing sustainable eye care programs in the world's most impoverished communities"),
		new pricePoint(15, "People in need provided with eyeglasses"),
		new pricePoint(50, "Blind individuals' eyesight restored"),
		new pricePoint(100, "Children provided with specialized sight-restoring pediatric surgery and follow-up care"),
		new pricePoint(1500, "Days of eye camp and outreach services funded, each day restoring sight to 30 people"),
		new pricePoint(150000, "Rural eye hospitals built, equipped, and brought into operation with a surgical theater and full-time opthalmologist")]);
var ProvenImpactFund = new charity(12, "Proven Impact Fund", 0.0,
		[new pricePoint(1, "Dollars toward implementing and scaling up programs which have been demonstrated to be impactful and cost-effective")]);
var charities = [AgainstMalariaFoundation,  DispensersForSafeWater, DewormTheWorld,
		FistulaFoundation, FredHollowsFoundation, GiveDirectly, Oxfam, PopulationServicesIntl, 
		Possible, ProjectHealthyChildren, SCI, SevaFoundation, ProvenImpactFund];


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
		var pp = selectedCharity.pricePoints[i];
		var overheadMultiplier = 1.0 - selectedCharity.overhead;
		var usableDonation = overheadMultiplier*donation;
		if (usableDonation >= pp.price) {
			impacts.push(new impact(Math.floor(usableDonation/pp.price), pp.item));
		}
	}
	return impacts;
};


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
*/

//test();

// function to display impact in an html element with id="impact"
// see test.html for form
function displayImpact() {
    //alert("Submitted");
    var charityId =  document.getElementById("charitySelector").selectedIndex;
    var donation = document.getElementById("donation").value;
    
    var text = "With your donation ";
    text += charities[charityId].name;
    text += " could provide:<br/><br/>";

    impacts = calculateImpact(charityId, donation);
    for (i = 0; i < impacts.length; i++) {
        text += " - "
        text += impacts[i].number.toString();
        text += " ";
        text += impacts[i].item;
        text += "<br/>";
    }
    
    document.getElementById("impact").innerHTML = text;
}

// jquery validate.js form validation
$("#impactCalculator").validate({submitHandler: function(form) {
    form.submit();}});

		