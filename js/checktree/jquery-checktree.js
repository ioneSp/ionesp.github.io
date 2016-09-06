$(function(){

// $('.simple-tree-view').find('input[type="checkbox"]:first').click(function(e) {
//   return false;
// });
var tree = {};

$(document).ready(function(){

	var checkboxes = $('.simple-tree-view input[type="checkbox"]');

	checkboxes.each(function(){

		var $this = $(this),
			parent = $this.data('parent');

		if (parent === undefined) {
			$this.data('parent', -1);
			parent = -1;
			//return;
		}

		if (tree[parent] === undefined) {
			tree[parent] = checkboxes.filter('[data-parent = ' + parent + ']');
		}

	});
});


$(document).find('input[type="checkbox"]').change(function(e) {
  var checked   = $(this).prop("checked"),
      container = $(this).parent().parent(),
      siblings  = container.siblings();



    container.find('input[type="checkbox"]').prop({
      indeterminate: false,
      checked: checked
    });

    $(this).closest('li').find('input[type="checkbox"]').each(function() {
      $('.geo option[value='+$(this).data("code")+']').remove();
    });

	/* TODO: закончить.
	var filled = {}, branch;

	for (var element in tree) {

		if (!tree.hasOwnProperty(element)) {
			continue;
		}

		branch = tree[element];

		filled[element] = (branch.length === branch.filter(':checked').length);

		if (branch.length === branch.filter(':checked').length) {
			var input = $('input[type="checkbox"][data-id = ' + element + ']');
			//$('.geo').append('<option value="'+$this.data('code')+'">'+$this.data('name')+'</option>');
			$('.geo option[value='+input.data("code")+']').remove();
			$('.geo').append('<option value="'+input.data('code')+'">'+input.data('name')+'</option>');



		} else {

			branch.filter(':checked').each(function() {

				var $this = $(this);

				if($this.data('code') != undefined) {
					$('.geo').append('<option value="'+$this.data('code')+'">'+$this.data('name')+'</option>');
				}
			});




		}

	}

	console.log(filled);*/

	/*for (var element in filled) {

		if (!filled.hasOwnProperty(element)) {
			continue;
		}

		branch = tree[element];

		filled[element] = (branch.length === branch.filter(':checked').length);

	}*/


	//console.log(filled);


    container.find('input[type="checkbox"]:checked').each(function() {

	    var $this = $(this);

	    if($this.data('code') != undefined) {
			$('.geo').append('<option value="'+$this.data('code')+'">'+$this.data('name')+'</option>');
		}
    });

	checkSiblings(container);

    // if($('.simple-tree-view').find('input[type="checkbox"]:checked').length == 0)
    // {
    //   $('.simple-tree-view').find('input[type="checkbox"]:first').prop("checked", true);
    // }

  function checkSiblings(el) {

    var parent = el.parent().parent().parent(),
        all = true;
    el.siblings().each(function() {
      return all = ($(this).children().children('input[type="checkbox"]').prop("checked") === checked);
    });

    if (all && checked) {

      parent.children().children('input[type="checkbox"]').prop({
        indeterminate: false,
        checked: checked
      });

      checkSiblings(parent);

    } else if (all && !checked) {

      parent.children().children('input[type="checkbox"]').prop("checked", checked);

      parent.children().children('input[type="checkbox"]').prop("indeterminate", (parent.find('input[type="checkbox"]:checked').length > 0));
      checkSiblings(parent);

    } else {

      el.parents("li").children().children('input[type="checkbox"]').prop({
        indeterminate: true,
        checked: false
      });

    }

  }


    // if($('.simple-tree-view').find('input[type="checkbox"]:checked').length == 0)
    // {
    //   $('.simple-tree-view').find('input[type="checkbox"]:first').prop("checked", true);
    // }
});
})