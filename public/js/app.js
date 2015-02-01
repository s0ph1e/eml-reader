$(function() {
	var fileInput = '#file';
	var openFileDialogBtn = '.open-file';
	var dropzone = '.dropzone';
	var iframe = '.eml-iframe';
	var downloadPage = '#download-eml';
	var viewPage = '#view-eml';

	$(document).on('click', openFileDialogBtn, function(e) {
		e.preventDefault();
		$(fileInput).trigger('click');
	});

	$(document).on('change', fileInput, function(e) {
		sendFile($(fileInput)[0].files[0]);
	});

	$(document).on('dragover', dropzone, function(e) {
		console.log('dragover');
		e.preventDefault();
		e.stopPropagation();
		$(this).addClass('dragging');
	});

	$(document).on('dragleave', dropzone, function(e) {
		console.log('dragleave');
		e.preventDefault();
		e.stopPropagation();
		$(this).removeClass('dragging');
	});

	$(document).on('drop', dropzone, function(e) {
		e.preventDefault();
		e.stopPropagation();

		if (e.originalEvent.dataTransfer) {
			if (e.originalEvent.dataTransfer.files.length) {
				e.preventDefault();
				e.stopPropagation();
				sendFile(e.originalEvent.dataTransfer.files[0]);
			}
		}
		return false;
	});

	function sendFile(file) {
		var form = new FormData();
		form.append('file', file);

		$.ajax({
			url: '/read',
			data: form,
			processData: false,
			contentType: false,
			type: 'POST',
			success: function (data) {
				$(dropzone).removeClass('dragging');
				$(downloadPage+':visible').slideUp(function(){
					$(viewPage).fadeIn();
				});
				var doc = $(iframe)[0].contentWindow.document;
				$(doc).find('body').html(data.html || data.text);
			}
		});
	}
});