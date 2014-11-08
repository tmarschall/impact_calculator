/*
*  edit_charities.js
*
*/

// structure of price point objects (see charities.json)
function pricePoint(price, action, item)
{
	var self = this;
	
	self.price = ko.observable(price);
	self.action = ko.observable(action);
	self.item = ko.observable(item);
}

// structure of the charity object (see charities.json)
function charity(id, name, overhead, pricePoints)
{
	var self = this;
	
	self.id = ko.observable(id);
	self.name = ko.observable(name);
	self.overhead = ko.observable(overhead);
	self.pricePoints = ko.observableArray(ko.utils.arrayMap(pricePoints, function(pp) {
		return { price: pp.price, action: pp.action, item: pp.item };
	}));
	
}

function CharitiesModelView(charities)
{
	var self = this;
	
	self.charities = ko.observableArray(ko.utils.arrayMap(charities, function(cs) {
		return { id: cs.id, name: cs.name, overhead: cs.overhead, pricePoints: cs.pricePoints };
	}));
	
	self.addCharity = function() {
		var newid = self.charities.length
		self.charities.push({ 
			id: newid, 
			name: "", 
			overhead: 0.0, 
			pricePoints: [{ price: 1, item: "Dollars toward..."}]
		});
	};
	
	self.removeCharity = function(charity) {
		self.charities.remove(charity);
	};
	
	self.addPricePoint = function(charity) {
		charity.pricePoints.push(new pricePoint(1,""));
	};
	
	self.removePricePoint = function(pp) {
		$.each(self.charities(), function() { this.pricePoints.remove(pp) })
	};
}