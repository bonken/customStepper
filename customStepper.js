/*
 args = {
 leftImage:
 rightImage:
 width:
 height:
 top:
 }

 */

exports.createStepper = function(args) {
	var container = Ti.UI.createView(args);
	container.layout = 'horizontal';

	var minusButton = Ti.UI.createButton({
		top : 0,
		left : 3,
		width : 30,
		height : 30,
		backgroundImage : args.leftImage,
		backgroundSelectedImage : args.lefttSelectedImage,
		title : args.leftTitle
	});

	var plusButton = Ti.UI.createButton({
		top : 0,
		left : 3,
		width : 30,
		height : 30,
		backgroundImage : args.rightImage,
		backgroundSelectedImage : args.rightSelectedImage,
		title : args.rightTitle
	});

	container.add(minusButton);
	container.add(plusButton);

	var value = args.value;

	plusButton.addEventListener('singletap', function(e) {
		if(value >= args.max) {
			value = args.min;
		} else {
			value += args.stepValue;
		}

		container.fireEvent('change', {

			value : value
		});

	});
	minusButton.addEventListener('longpress', function(e) {
		Ti.API.info('Longpress!');
	});

	minusButton.addEventListener('singletap', function(e) {
		if(value <= args.min) {
			value = args.max;
		} else {
			value -= args.stepValue;
		}
		container.fireEvent('change', {

			value : value
		});

	});
	/*
	 plusButton.addEventListener('longpress', function(e) {
	 Ti.API.info(JSON.stringify(e));
	 }); */
	var timer, timePressed = 0;
	minusButton.addEventListener('touchstart', function(e) {
		timePressed = 0;
		timer = setInterval(function() {
			timePressed += 200;
		if(value <= args.min) {
			value = args.max;
		} else {
			value -= args.stepValue;
		}
		container.fireEvent('change', {

			value : value
		});
			//here you can control how much time the button has been pressed
			//vibrate the phone or anything else
		}, 200);
	});

	minusButton.addEventListener('touchend', function(e) {
		clearInterval(timer);

		if(timePressed > 500) {
			Ti.API.info('yeah, thats a long click!');
		}
	});
	plusButton.addEventListener('touchstart', function(e) {
		timePressed = 0;
		timer = setInterval(function() {
			timePressed += 200;
		if(value >= args.max) {
			value = args.min;
		} else {
			value += args.stepValue;
		}

		container.fireEvent('change', {

			value : value
		});
			//here you can control how much time the button has been pressed
			//vibrate the phone or anything else
		}, 200);
	});

	plusButton.addEventListener('touchend', function(e) {
		clearInterval(timer);

		if(timePressed > 500) {
			Ti.API.info('yeah, thats a long click!');
		}
	});
	return container;
};
