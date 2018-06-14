$(function(){
	var $image = $('input:file');
	var $newName = $('#newName');
	var $newSurName = $('#newSurName');
	var $newPhoneNumber = $('#newPhoneNumber');
	var $submit = $('#submit');
	var $contact = $('#contact');
	var $contactTemplate = $('#contactTemplate');
	var $deleteBtn = $('.delete');
	var $emptyTheWholeBook = $('#emptyTheWholeBook');
	
	$submit.on('click', addItemsToPhoneBook);
	$contact.on('click', "button", deleteRow);
	$emptyTheWholeBook.on('click', emptyTheWholeBook);

	$('input[type=text]').on('keyup', check);


	function check() {
		if($newName.val() == '' || $newSurName.val() == '' || $newPhoneNumber.val() == ''){
			$submit.attr('disabled', 'disabled');
		} else {
			$submit.removeAttr('disabled');
		};
	};

	
	function addItemsToPhoneBook(){
		var $contactLine = $contactTemplate.html().replace('{{image}}', $image.val())
							  .replace('{{newName}}', $newName.val())
							  .replace('{{newSurName}}', $newSurName.val())
							  .replace('{{newPhoneNumber}}', $newPhoneNumber.val());
		$contact.append($contactLine);
	}

	function deleteRow(){
		var $tr = $(this).closest('tr');
		$tr.remove();
	}


	function emptyTheWholeBook(){
		var finalDecision = confirm("Do you want to delete the whole book");

		if(finalDecision){
			var $td = $("#contact td");
			$td.remove();
		}
	}
});
