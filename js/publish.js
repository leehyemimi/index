(function($){
	$.fn.krUI=function(){
		$('.inview_con li').bind('inview', function (event, visible) {
			if (visible == true) {
				$(this).animate({ opacity: 1 }, 600);
			// element is now visible in the viewport
			} else {
			// element has gone out of viewport
			}
		});
		
		// menu scroll
		$(window).scroll(function(){
			var $scrllTop = $(document).scrollTop();
			$(".navigation li").each(function(){
				var $href= $("a",this).attr("href");
				var $top = $($("a",this).attr("href")).offset().top;
				if($top < $scrllTop + 100){
					$(".navigation li a").removeClass("active");
					$(this).find("a").addClass("active");
				} else if($scrllTop > $(document).height() - $("#work").height() + $("#about").height() - 320){
					$(".navigation li a").removeClass("active");
					$(".navigation li").last().find("a").addClass("active");
				}
			});
		});
		
		// menu link
		$(".navigation li a").click(function(){
			var $harf = $(this).attr("href");
			$.scrollTo($($harf), 500);
			$(".navigation li a").removeClass("active");
			$(this).addClass("active");
			return false;
		});

		// work link
		$(window).load(function(){
			var $container = $('.portfolioContainer');
			$container.isotope({
				filter: '*',
				animationOptions: {
					duration: 200,
					easing: 'linear',
					queue: false
				}
			});

			$('.portfolioFilter a').click(function(){
				$('.portfolioFilter .current').removeClass('current');
				$(this).addClass('current');

				var selector = $(this).attr('data-filter');
				$container.isotope({
					filter: selector,
					animationOptions: {
						duration: 200,
						easing: 'linear',
						queue: false
					}
				 });
				 return false;
			});
		});

		// 레이어팝업
		function layer_open(el,img,href,tit,date,skill,i){
			var temp = $('#' + el);
			var bg = temp.prev().hasClass('bg');	//dimmed 레이어를 감지하기 위한 boolean 변수
			$(".pop-conts .img img").attr("src",img);
			$(".pop-conts .ctxt strong").html(tit);
			$(".pop-conts .ctxt .date").html(date);
			$(".pop-conts .ctxt .skill").html(skill);
			$(".pop-conts .btn-r a").attr("href",href);
			if(i==0){
				$(".pop-layer .mark_img").css("display","none");
			}else if(i==1){
				$(".pop-layer .mark_img").css("display","block");
			}
			if(bg){
				$('.layer').fadeIn();	//'bg' 클래스가 존재하면 레이어가 나타나고 배경은 dimmed 된다. 
			}else{
				temp.fadeIn();
			}

			// 화면의 중앙에 레이어를 띄운다.
			if (temp.outerHeight() < $(document).height() ) temp.css('margin-top', '-'+temp.outerHeight()/2+'px');
			else temp.css('top', '0px');
			if (temp.outerWidth() < $(document).width() ) temp.css('margin-left', '-'+temp.outerWidth()/2+'px');
			else temp.css('left', '0px');

			temp.find('a.cbtn').click(function(e){
				if(bg){
					$('.layer').fadeOut(); //'bg' 클래스가 존재하면 레이어를 사라지게 한다. 
				}else{
					temp.fadeOut();
				}
				//e.preventDefault();
			});

			$('.layer .bg').click(function(e){	//배경을 클릭하면 레이어를 사라지게 하는 이벤트 핸들러
				$('.layer').fadeOut();
				e.preventDefault();
			});
		}	

		$(".works_list li a").click(function(){
			var i = 0;
			if($(this).find(".mark_img").length == 1){
				i = 1;
			}
			var $href = $(this).attr("href");
			var $imgs= $("dl dd img",this).attr("src");
			var $tit = $("dl dt strong",this).text();
			var $date= $("dl dt .txt",this).text();
			var $skill= $("dl dt .skills",this).text();
			layer_open('layer',$imgs,$href,$tit,$date,$skill,i);
			return false;
		});

		// work img
		$(".works_list li a").mouseover(function(){
			var $this = $("dl dd img",this);
			TweenMax.to($this, 0.4, {css:{top:"-157px",ease:Quart.easeOut}});
		});

		$(".works_list li a").mouseout(function(){
			var $this = $("dl dd img",this);
			TweenMax.to($this, 0.4, {css:{top:"0px",ease:Quart.easeOut}});
		});

		//Skills
		$(".skills_ico li a").bind("mouseover", position);
		function position(){
			$(".skills_ico li a").each(function(){
				TweenMax.to( $(this), 0.4, { delay:$this*0.1, y:0 } );
			});
			var $this = $(this).parent();
			TweenMax.to( $(this), 0.4, { delay:$this*0.1, y:-20 } );
		}
	}
})(jQuery);

$(function(){
	$("body").krUI();
});