var $ = require('jquery');
require('bootstrap');
const downloadFile = require('save-file');

$(function() {
	var fileInput = '#file';
	var openFileDialogBtn = '.open-file';
	var dropzone = '.dropzone';
	var iframe = '.eml-iframe';
	var downloadPage = '#download-eml';
	var viewPage = '#view-eml';
	var details = '.eml-details';
	var headersContent = '.eml-details__content-headers';
	var attachmentsContent = '.eml-details__content-attachments';

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
				showDetails({headers: data.headers, attachments: data.attachments})
			}
		});
	}

	function showDetails(data) {
		var headers = data.headers;
		var attachments = data.attachments;

		var headersToDisplay = ['subject', 'from', 'to', 'cc', 'date'];
		var headersElements = [];
		headersToDisplay.forEach(function (headerKey) {
			if (headers[headerKey]) {
				var el = document.createElement('div');
				var key = document.createElement('b');
				key.appendChild(document.createTextNode(headerKey + ': '));
				var value = document.createElement('span');
				value.appendChild(document.createTextNode( headers[headerKey]));

				el.append(key, value);
				headersElements.push(el);
			}
		});
        $(headersContent).html('').append(headersElements);

		if (attachments && attachments.length > 0) {
			var attachmentsElements = [];
			attachments.forEach(function (attachment) {
				var el = document.createElement('button');
				el.appendChild(document.createTextNode('download ' + attachment.fileName));
				el.addEventListener( 'click', function() {
					downloadFile(attachment.content.data, attachment.fileName);
				});
				attachmentsElements.push(el);
			});
			$(attachmentsContent).html('').append(attachmentsElements);
		} else {
			$(attachmentsContent).html('No attachments');
		}

		$(details).show();
	}
});