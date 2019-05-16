InterruptedArrayIterator = function(array){
	this._currentIndex = 0;
	this._inArr = array;
};

InterruptedArrayIterator.prototype.nextItem = function (callBackFn) {
	var clientDeferrant = new jQuery.Deferred();
	var that = this;
	var to1 = setTimeout(function () {
		clientDeferrant.done(function () {
			that._currentIndex++;
			if (that._currentIndex < that._inArr.length) {
				return that.nextItem(callBackFn);
			} else {
				callBackFn.apply(that, [undefined, undefined]);
			}
		});
		clearTimeout(to1);
	});
	return callBackFn.apply(this, [this._inArr[this._currentIndex], clientDeferrant]);
};

// InterruptedArrayIterator class done

// Create new instance of InterruptedArrayIterator
var iter = new InterruptedArrayIterator([1,2,3,4]);

// Iterate over array as you keep resolving the deferred object
iter.nextItem(function(item, clientDeferrant){
	if(item){
		console.log(item);
		clientDeferrant.resolve();
	}else{
		console.log("i am done");
	}
});