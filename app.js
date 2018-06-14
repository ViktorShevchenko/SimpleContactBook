$(function(){

/*

1. Не получается сделать проверку заполненности всех полей.
Здесь самовызывающая функция, но кнопка или активна постоянно или неактивна постоянно.
Добиться того, чтобы кнопка стала сразу активной после заполнения всех полей - не могу.

2. Не знаю, как сделать, чтобы переменна $contactLine передавала значения в ${newName.val()}
и других таких полях. 

3. Не могу удалить строку с контактами при нажатии на кнопку "delete".

Прошу не судить строго и дать подсказки, где и как искать решения этих "затыков".


1. У вас самовызывающаяся функция, но вызвывается она только один раз.
Нужно сделать обычную функцию и навесить ее в качестве обработчика
события

2. Насколько я вижу вы пытаетесь использовать ES6 синтаксис для
темплентированных-строк. Но в таком случае строка должа быть обернута
не в кавычки, как у вас, а апострофы (обычно находится рядом с кнопкой
Tab). Но сейчас можете использовать обыную конкатенацию строк (через +).
А вобще на лекции мы рассматривали шаблоны в теге script и правильным решенем был бы именно шаблон

3. Вы навешиваете колбек в самом начале, еще до добавления строк.
Поэтому коллекция пустая и колбек по факту не на что не вешается.
Правильным решением здесь будет навесить колбек на table,
но фильтровать события по селектору кнопки. На лекции мы рассматривали
такой вариант (вызов on с тремя параметрами)

*/ 
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


	// function check() {
	// 	if($newName.val() !== '' && $newSurName.val() !=='' && $newPhoneNumber.val() !== ''){
	// 		$submit.removeAttr('disabled');
	// 	} else {
	// 		$submit.attr('disabled', 'disabled');
	// 	};
	// };

	function check() {
		if($newName.val() == '' || $newSurName.val() == '' || $newPhoneNumber.val() == ''){
			$submit.attr('disabled', 'disabled');
		} else {
			$submit.removeAttr('disabled');
		};
	};

	// function imageInput(){

	// }
	
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