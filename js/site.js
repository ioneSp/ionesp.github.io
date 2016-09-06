'use strict';
jQuery(function($) {
	var $supportModal = $('#support-modal'),
		supportModalBusy = false;
	$supportModal.find('.send-request').on('click', function() {
		if (supportModalBusy) {return false;}
		supportModalBusy = true;
		$.post(
			$supportModal.data('url'),
			{
				subject: $supportModal.find('select').val(),
				body: $supportModal.find('textarea').val()
			},
			function (response/*, textStatus, xhr*/) {
				if (response.status === 'ok') {
					$supportModal.find('.alert').hide();
					$supportModal.modal('hide');
					$('#support-modal-success').modal();
				} else {
					$supportModal.find('.alert')
						.html(response.message)
						.show();
				}
			},
			'json'
		).always(function() {
			supportModalBusy = false;
		});
	});

	var $settingsModal = $('#profile-settings'),
		$settingsModalSuccess = $('#profile-settings-success'),
		settingsModalBusy = false;

	$settingsModal.find('.password-change').on('click', function() {
		if (settingsModalBusy) {return false;}
		settingsModalBusy = true;
		$.post(
			$settingsModal.data('url'),
			{
				old_password: $settingsModal.find('input[name = old_password]').val(),
				new_password: $settingsModal.find('input[name = new_password]').val()
			},
			function (response/*, textStatus, xhr*/) {
				if (response.status === 'ok') {
					$settingsModal.find('.alert').hide();
					$settingsModal.modal('hide');
					$settingsModalSuccess.modal();
				} else {
					$settingsModal.find('.alert')
						.html(response.message)
						.show();
				}
			},
			'json'
		).always(function() {
				settingsModalBusy = false;
			});
	});

});
