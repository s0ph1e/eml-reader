$(function() {
	$(document).on('click', '.open-file', function(e) {
		e.preventDefault();
		$('#file').trigger('click');
	});

	$(document).on('change', '#file', function(e) {
		sendFile($("#file")[0].files[0]);
	});

	$(document).on('dragover', '.dropzone', function(e) {
		console.log('dragover');
		e.preventDefault();
		e.stopPropagation();
		$(this).addClass('dragging');
	});

	$(document).on('dragleave', '.dropzone', function(e) {
		console.log('dragleave');
		e.preventDefault();
		e.stopPropagation();
		$(this).removeClass('dragging');
	});

	$(document).on('drop', '.dropzone', function(e) {
		e.preventDefault();
		e.stopPropagation();
		alert("Dropped!");

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
		form.append("file", file);

		$.ajax({
			url: '/read',
			data: form,
			processData: false,
			contentType: false,
			type: 'POST',
			success: function(data){
				alert(data);
			}
		});
	}
});