$(document).ready(()=>{
	$('.open-video').click(function(){
		$('.video-player-mask video').eq(0).attr('src',$(this).attr('data-src'));
		$('.video-player-mask').eq(0).css({'opacity':'1','zIndex':9999});
	})
	$('.video-player-mask').click(function(event){
		if(event.target !== this) return;
		$('.video-player-mask video').eq(0).attr('src','');
		$('.video-player-mask').eq(0).css({'opacity':'0','zIndex':-1});
	})
	
	$('.readmore-link').click(function(){
		let height = $(this).parent('.features-width').find('.text-muted').height(),
		now_height = $(this).parent('.features-width').find('.text-muted-out').height();
		$(this).parent('.features-width').find('.text-muted-out').css('height',now_height===66?height+'px':'66px');
	})
	
	// 联系我们
	$('.btn-success').click(function(){
		let name = $('#Name').val(),phone = $('#Phone').val(),message = $('#Message').val();
		if(!(/^1[3-9]\d{9}$/.test(phone))){
			bootstrapMessage('alert-warning','请填写正确的手机号');
			return;
		}
		let params = {
			name,
			phone,
			message
		}
		$('.loading').fadeIn();
		//http://192.168.0.184:8001/       http://news.geebk.com
		$.ajax({
			type:'post',
			url:'http://news.geebk.com/api/concat/',
			data:params,
			success:res=>{
				//console.log(res);
				bootstrapMessage('alert-success',res.meta.msg);
				$('.btn-light').click();
			},
			complete:()=>{
				$('.loading').fadeOut();
			}
		})
	})
	var messageTimer = null;
	//统一alert设置
	var bootstrapMessage = function(type,mess){
		clearTimeout(messageTimer);
		$('#concat-message').addClass(type);
		$('#concat-message').html(mess);
		$('#concat-message').fadeIn();
		messageTimer = setTimeout(()=>{
			$('#concat-message').removeClass(type);
			$('#concat-message').fadeOut();
		},2500);
	}
	//获取appapk
	$.ajax({
		type:'get',
		url:'http://news.geebk.com/api/AppVersion/', //http://192.168.0.184:8001   http://news.geebk.com
		success:res=>{
			if(res.meta&&res.meta.status==200){
				$('#sjh-down .code img').attr('src',res.data.image);
				$('#sjh-down .code a').attr('href',res.data.path);
			}
		}
	})
	//
	$('.regist').click(()=>{
		bootstrapMessage('alert-success','请下载App进行注册');
	})
})