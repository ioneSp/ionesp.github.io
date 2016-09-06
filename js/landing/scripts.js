var create_discount_system,
	activeWindow = true;


$(document).ready(function ()
{
	$(window).scroll(function () {
		if($('.anchor-list').hasClass('mob-show')){
			$('.anchor-list').removeClass('mob-show').addClass('mob-hide');
			$('.mobile-button').toggleClass('close-btn');
		}
	});
	$('.anchor').on('click',function (e) {
		if($('.anchor-list').hasClass('mob-show')){
			$('.anchor-list').removeClass('mob-show').addClass('mob-hide');
			$('.mobile-button').toggleClass('close-btn');
			return;
		}
	});
	$(document).on('click', function (e){ // событие клика по веб-документу
		if (!$(".anchor-list").is(e.target) && $(".anchor-list").has(e.target).length === 0) { // и не по его дочерним элементам
			if($('.anchor-list').hasClass('mob-show')){
				$('.anchor-list').removeClass('mob-show').addClass('mob-hide');
				$('.mobile-button').toggleClass('close-btn');
				return;
			}
			if($(".mobile-button").is(e.target)) {
				$('.anchor-list').toggleClass('mob-hide mob-show');
				$('.mobile-button').toggleClass('close-btn');
			}
		}
	});
	$(document).on('touchmove', function (e){ // событие клика по веб-документу
		if($('.anchor-list').hasClass('mob-show')){
			$('.anchor-list').removeClass('mob-show').addClass('mob-hide');
			$('.mobile-button').toggleClass('close-btn');
			return;
		}
	});
	$(window).resize(function () {
		if($(window).width()>768 && $('.anchor-list').hasClass('mob-show')){
			$('.anchor-list').removeClass('mob-show').addClass('mob-hide');
			$('.mobile-button').toggleClass('close-btn');
		}
	});
	// Подключение плагинов
	$('.fancybox').fancybox({
		beforeClose: function(){
			activeWindow = true;
		},
		beforeShow: function(){
			activeWindow = false;

			var discount_data = localStorage["discount"],
				value = $('#discount-size'),
				limits = $('#discount-limits');

			if (!discount_data) {
				value.addClass('hide');
				limits.addClass('hide');
				return;
			}

			var discount = JSON.parse(discount_data);

			discount = Number(parseFloat(discount.value).toFixed(2));

			if (discount > 0 && $('#regForm').attr('action').indexOf('discount') !== -1) {

				value.removeClass('hide');
				limits.removeClass('hide');

				value.find('span').html(discount + '%');
				limits.find('.offer').html(
					'от ' + (minPrice * discount / 100).toFixed(2) + ' руб. до ' +
					 (maxPrice * discount / 100).toFixed(2) + ' руб.'
				);

			} else {
				value.addClass('hide');
				limits.addClass('hide');
			}

		}
	});

	$('.line5 .bxslider').bxSlider({
		slideMargin: 10
	});

	$('.line9 .bxslider').bxSlider({
		slideMargin: 10,
		auto: true
	});

	// хз
	$('.counter').countdown('2016/06/19', function (event)
	{
		$(this).html(event.strftime('<div>%H <span> :</span></div>&nbsp;<div>%M <span> :</span></div><div>%S </div>'));
	});

	setAnchorWhistle();

	setUp();

	if (!ipRegistered) {
		create_discount_system();
	} else {
		$('.sales_block').remove();
		localStorage.removeItem("discount");
	}
});

function setAnchorWhistle()
{
	var anchors = $('.anchor-list li');

	anchors.mouseenter(function(){
		$('.anchor-list li.active').removeClass('active');
		$(this).addClass('active')
	});

	anchors.mouseleave(function(){
		$(this).removeClass('active');
		$('.anchor-list li:first-child').addClass('active');
	});
}

function scrollWindow(scrollTo)
{
	var container = $('body');

	container.animate({
		scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop() - 35
	}, 500);
}

$('a.anchor').click(function(e){

	var anchor = $(this).attr('href').substr(1),
		scrollTo = $('a[name=' + anchor + ']');

	scrollWindow(scrollTo);

	e.preventDefault();
	return false;
});

$('a.publink').click(function(e){

	var $this = $(this),
		id = $this.data('id'),
		title = $this.data('title'),
		target = $this.data('target'),
		$block = $('.article-block[data-id=' + id + ']');

	$block.find('.article-block-title').html(title);
	$block.find('.article-block-article').css({'max-height': document.documentElement.clientHeight - 300});

	$(target).slideToggle(500);
	$block.slideToggle(500);
	$block.find('.article-block-article img[src="' + $this.attr('href') + '"]').addClass('image-active').slideToggle(500);

	e.preventDefault();
	return false;
});

$('a.article-block-back').click(function(e){
	collapseBlock($(this));
	e.preventDefault();
	return false;
});

$('.article-block').click(function(e){
	collapseBlock($(this));
});

$('.article-block img').click(function(e){
	e.stopPropagation();
	e.preventDefault();
	return false;
});

function collapseBlock($this)
{
	var id = $this.data('id'),
		target = $this.data('target'),
		$block = $('.article-block[data-id=' + id + ']');

	$(target).slideToggle(500);
	$block.slideToggle(500);
	$block.find('.article-block-article img.image-active').removeClass('image-active').slideToggle(500);
}

function setUp() {

	var btn = $('.button-up');

	if(btn.length) {
		(function() {
			btn.click(function() {
				$("html:not(:animated), body:not(animated)").animate({
					scrollTop: 0
				}, 600);
			});

			var timer;

			$(window).scroll(function() {
				if($('.anchor-list').hasClass('mob-show')){
					$('.anchor-list').removeClass('mob-show').addClass('mob-hide');
					$('.mobile-button').toggleClass('close-btn');
				}
				var st = $(window).scrollTop();

				btn[st > 250 ? "addClass" : "removeClass"]("show");

				if(timer) {
					clearTimeout(timer);
					timer = null;
				}

				timer = setTimeout(function() {
					$('.button-up').removeClass('onscroll');
				}, 400);

				btn.addClass("onscroll");
			});
		})();
	}
}

$(window).on({
	focus:function(){
		if (!$('.fancybox-overlay').length) {
			activeWindow = true;
		}
	},
	blur:function(){
		activeWindow = false;
	}
});

create_discount_system = function(){
	var step_time = 720,
		max_timeout_time = 60,
		start_value = 0,
		slow_period = 2.5,
		max_value = 5,
		discount_step = 0.02,
		needUpdateElement = true;

	if (!$('.sales_block').length) {
		return false;
	}

	increase(true);
	setInterval(function(){
		increase();
	}, step_time);

	function increase(firstTime){
		var discount = localStorage["discount"],
			value,
			time,
			now_time = new Date(),
			element = $('.sales_block .discount_value');

		if(!activeWindow){
			return false;
		}
		if(discount){
			discount = JSON.parse(discount);
			value = Number(parseFloat(discount.value).toFixed(2));
			time = new Date(discount.time);
			if(now_time - time > max_timeout_time*1000){
				value = start_value;
				time = now_time;
				localStorage.removeItem("discount");
			}
		} else {
			value = start_value;
			time = now_time;
		}

		if(!firstTime && value < max_value){

			if(value>=slow_period){
				if(Math.round(Math.random())){
					value+=discount_step;
				}
			}
			else{
				value += discount_step;
			}

		}
		var new_discount = {
			value : value,
			time : now_time
		};
		localStorage["discount"] = JSON.stringify(new_discount);
		if(needUpdateElement){
			element.text(value.toFixed(2));
		}
		if(value == max_value){
			needUpdateElement = false;
		}
	}

}
