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

	$('button.open-file').html(__('Choose file'));
        $('.drag-and-drop-label').html(__('or drag and drop here'));
        $('#headingAttachments h4 a').html(__('Attachments'));
        $('#headingHeaders h4 a').html(__('Headers'));

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
				$(doc).find('body').html(data.html || '<div style="font-family: courier;">'+data.text.replace(/\r?\n/g, '<br />')+'</div>');
				showDetails({headers: data.headers, attachments: data.attachments})
			}
		});
	}

	function showDetails(data) {
		var headers = data.headers;
		var attachments = data.attachments;

		var headersToDisplay = {'subject':__('subject: '), 'from':__('from: '), 'to':__('to: '), 'cc':__('cc: '), 'date':__('date: '),
					'eml_error':__('This is not a valid eml-file. Please upload a new one!')};
		var headersElements = [];
		for(var headerKey in headersToDisplay) {
			if (headers[headerKey]) {
                               	if (headerKey == 'eml_error') {
                                	var el = document.createElement('div');
                                       	el.setAttribute('id', 'eml_error_header');
                                       	el.appendChild(document.createTextNode(headersToDisplay[headerKey]));
                               	} else {
                                       	var el = document.createElement('div');
                                       	var key = document.createElement('b');
                                       	key.appendChild(document.createTextNode(headersToDisplay[headerKey]));
                                       	var value = document.createElement('span');
                                       	value.appendChild(document.createTextNode(headers[headerKey]));

                                       	el.append(key, value);
                               	}

				headersElements.push(el);
			}
		};
        	$(headersContent).html('').append(headersElements);

		if (attachments && attachments.length > 0) {
			var attachmentsElements = [];
			attachments.forEach(function (attachment) {
				var el = document.createElement('button');
				el.appendChild(document.createTextNode(__('download ') + attachment.fileName));
				el.addEventListener( 'click', function() {
					downloadFile(attachment.content.data, attachment.fileName);
				});
				attachmentsElements.push(el);
			});
			$(attachmentsContent).html('').append(attachmentsElements);
		} else {
			$(attachmentsContent).html(__('No attachments'));
		}

		$(details).show();
	}
});
