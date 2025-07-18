	/*  Wizard */
	jQuery(function ($) {
		"use strict";
		$('form#wrapped2').attr('action', 'reservation_send.php');
		$("#wizard_container2").wizard({
			stepsWrapper: "#wrapped2",
			submit: ".submit",
			beforeSelect: function (event, state) {
				if ($('input#website2').val().length != 0) {
					return false;
				}
				if (!state.isMovingForward)
					return true;
				var inputs = $(this).wizard('state').step.find(':input');
				return !inputs.length || !!inputs.valid();
			}
		}).validate({
			errorPlacement: function (error, element) {
				if (element.is(':radio') || element.is(':checkbox')) {
					error.insertBefore(element.next());
				} else {
					error.insertAfter(element);
				}
			}
		});
		//  progress bar
		$("#progressbar2").progressbar();
		$("#wizard_container2").wizard({
			afterSelect: function (event, state) {
				$("#progressbar2").progressbar("value", state.percentComplete);
				$("#location2").text("(" + state.stepsComplete + "/" + state.stepsPossible + ")");
			}
		});
		/* Submit loader mask */
		$('form').on('submit',function() {
			var form = $("form#wrapped2");
			form.validate();
			if (form.valid()) {
				$("#loader_form2").fadeIn();
			}
		});
	});