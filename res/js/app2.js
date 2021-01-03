$('#splash').show();

const start = Date.now();
const maxt = 1000; // 1 sec

function myTimer() {
	const millis = Date.now() - start;
	if (Math.floor(millis / maxt) > 0) {
		clearInterval(myVar);
		$('#splash').hide();
		$('#calculator').show();
	}
}

$(document).ready(function() {
	myVar = setInterval(myTimer, 10);
	var _firstname = '';
	var _age = 0;
	var _gender = '';
	var _height = 0;
	var _weight = 0;
	var bmiClass = '';
	var bmiNumber = 0;
	var stepper = new Stepper($('.bs-stepper')[0]);
	stepper.to(1);

	function animate() {
		var splash = new Splash({ background: 'white' });
		var indeterminate = () => {
			splash.fromCSSAnimation('res/css/custom-anim.css',
				'<div id="loader-wrapper">\n' +
				'     <div id="loader"></div>\n' +
				'</div>', false
			);
		};

		splash.indeterminateLoad(indeterminate, function (callback) {
			var stop = callback;
			setTimeout(function () {
				stop();
				calculate();
				stepper.to(3);
			}, 4000);
		});
	}

	function calculate() {
		_height = _height / 100;
		bmiNumber = _weight / (_height * _height);

		if (bmiNumber < 16) {
			bmiClass = 'súlyos soványság';
		}
		else if (bmiNumber >= 16 && bmiNumber <= 16.99) {
			bmiClass = 'mérsékelt soványság';
		}
		else if (bmiNumber >= 17 && bmiNumber <= 18.49) {
			bmiClass = 'enyhe soványság';
		}
		else if (bmiNumber >= 18.5 && bmiNumber <= 24.99) {
			bmiClass = 'normális testsúly';
		}
		else if (bmiNumber >= 25 && bmiNumber <= 29.99) {
			bmiClass = 'túlsúlyos';
		}
		else if (bmiNumber >= 30 && bmiNumber <= 34.99) {
			bmiClass = 'I. fokú elhízás';
		}
		else if (bmiNumber >= 35 && bmiNumber <= 39.99) {
			bmiClass = 'II. fokú elhízás';
		}
		else if (bmiNumber >= 40) {
			bmiClass = 'III. fokú elhízás';
		}

		var _class = (_gender === "male") ? "male" : "female";
		$('.userinfo_final #bmiNumber').text(bmiNumber.toFixed(2));
		$('.userinfo_final #bmiNumber').removeClass();
		$('.userinfo_final #bmiNumber').addClass(_class);
		$('.userinfo_final #bmiClass').text(bmiClass);

		return true;
	}

	function clearAll() {
		_firstname = '';
		_age = 0;
		_gender = '';
		_height = 0;
		_weight = 0;
		$('span.firstName').text('');
		$('span.age').text('');
		$('span.weight').text('');
		$('span.height').text('');
		$('span.gender').text('');
		$('#firstname').val('');
		$('#height').val('');
		$('#weight').val('');

		$("#ageval").text(0);
		$('#age').slider('refresh');
		$("#gender-male").prop("checked", false);
		$("#gender-female").prop("checked", false);
	}
	clearAll();

	$(".onlynum").on("keypress keyup blur",function (event) {    
		$(this).val($(this).val().replace(/[^\d].+/, ""));
		if ((event.which < 48 || event.which > 57)) {
			event.preventDefault();
		}
	});

	$('#btn_forward_1').click(function(){
		_valid_1 = _valid_2 = _valid_3 = false;

		if (_firstname == '') {
			$('#firstname').next('.valid-feedback').hide();
			$('#firstname').next('.valid-feedback').next('.invalid-feedback').show();
			_valid_1 = false;
		}
		else {
			$('#firstname').next('.valid-feedback').show();
			$('#firstname').next('.valid-feedback').next('.invalid-feedback').hide();
			_valid_1 = true;
		}
		if (_age == 0) {
			$('#ageCurrentSliderValLabel').next('.valid-feedback').hide();
			$('#ageCurrentSliderValLabel').next('.valid-feedback').next('.invalid-feedback').show();
			_valid_2 = false;
		}
		else {
			$('#ageCurrentSliderValLabel').next('.valid-feedback').show();
			$('#ageCurrentSliderValLabel').next('.valid-feedback').next('.invalid-feedback').hide();
			_valid_2 = true;
		}
		if (_gender == '') {
			$('.customRadio.sr').next('.valid-feedback').hide();
			$('.customRadio.sr').next('.valid-feedback').next('.invalid-feedback').show();
			_valid_3 = false;
		}
		else {
			$('.customRadio.sr').next('.valid-feedback').show();
			$('.customRadio.sr').next('.valid-feedback').next('.invalid-feedback').hide();
			_valid_3 = true;
		}
		if (_valid_1 && _valid_2 && _valid_3) {
			stepper.to(2);	
		}
	});

	$('#btn_forward_2').click(function(){
		_valid_1 = _valid_2 = false;

		if (_height == 0) {
			$('#height').next('span').next('.valid-feedback').hide();
			$('#height').next('span').next('.valid-feedback').next('.invalid-feedback').show();
			_valid_1 = false;
		}
		else {
			$('#height').next('span').next('.valid-feedback').show();
			$('#height').next('span').next('.valid-feedback').next('.invalid-feedback').hide();
			_valid_1 = true;
		}
		if (_weight == 0) {
			$('#weight').next('span').next('.valid-feedback').hide();
			$('#weight').next('span').next('.valid-feedback').next('.invalid-feedback').show();
			_valid_2 = false;
		}
		else {
			$('#weight').next('span').next('.valid-feedback').show();
			$('#weight').next('span').next('.valid-feedback').next('.invalid-feedback').hide();
			_valid_2 = true;
		}
		if (_valid_1 && _valid_2) {
			animate();
		}
	});
	$('#btn_backward_2').click(function(){
		stepper.to(1);
	});
	$('#btn_backward_3').click(function(){
		clearAll();
		stepper.to(1);
	});
	$('#btn_forward_3').click(function(){
		stepper.to(1);
	});

	$("#age").slider();
	$("#age").on("slide", function(slideEvt) {
		$("#ageval").text(slideEvt.value);
		$('span.age').text(slideEvt.value);
		_age = slideEvt.value;
	});

	$('#firstname').focusout(function() {
		$('span.firstName').text($(this).val());
		_firstname = $(this).val();
	})
	.keyup(function() {
		$('span.firstName').text($(this).val());
		_firstname = $(this).val();
	});

	$('#height').focusout(function() {
		$('span.height').text($(this).val());
		_height = $(this).val();
	})
	.keyup(function() {
		$('span.height').text($(this).val());
		_height = $(this).val();
	});

	$('#weight').focusout(function() {
		$('span.weight').text($(this).val());
		_weight = $(this).val();
	})
	.keyup(function() {
		$('span.weight').text($(this).val());
		_weight = $(this).val();
	});


	$('input[type="radio"]').click(function(){
		if ($(this).is(':checked')) {
			if ($(this).val() == 'male') {
				$('span.gender').text('férfi');
			}
			if ($(this).val() == 'female') {
				$('span.gender').text('nő');
			}
			_gender = $(this).val();
		}
	});

	$('.clear-all').click(function(){
		clearAll();
		stepper.to(1);
	});

});
