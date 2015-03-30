var Tagtoo = {
	API_host: "//localhost:8000",
	options: {},

	request: function (method, uri, cb) {
		$[method](uri, cb);
	},

	init: function () {
		this.get_targeting();
	},

	get_targeting: function () {
		Tagtoo.request('get', Tagtoo.API_host + '/rest/targeting/', function (res) {
			// console.log(res)
			var row = '';

			for (var i = 0; i < res.length; i++) {

				// 如果進來的 data obj 沒有建立過容器就先建立容器並塞入
				if($('#sidebar .' + res[i].classify).length == 0 ) {
					// create
					// console.log(res[i].classify)
					row = 
					'<li class="treeview ' + res[i].classify + '">'+
						'<a href="#" name="' + res[i].classify + '">'+
							'<i class="fa fa-share"></i> <span>' + res[i].classify + '</span>'+
							'<i class="fa fa-angle-left pull-right"></i>'+
						'</a>'+
					    '<ul class="treeview-menu">'+
			              '<li>'+
							'<a class="get_options" href="#" name="' + res[i].education_statuses + '">'+
							'<i class="fa fa-arrow-circle-right"></i> <span>' + res[i].name + '</span>'+
							'<i class="fa fa-angle-left pull-right"></i>'+
							'</a>'+
			              '</li>'+
			            '</ul>'+
		            '</li>';
					$('#sidebar-menu').append(row);

				// 如果已經有容器直接塞入
				} else {

					row =
		              '<li>'+
						'<a class="get_options" href="#" name="' + res[i].name + '">'+
						  '<i class="fa fa-arrow-circle-right"></i> <span>' + res[i].name + '</span>'+
						  '<i class="fa fa-angle-left pull-right"></i>'+
						'</a>'+
		              '</li>';

		            $('#sidebar-menu li[class~=' + res[i].classify + '] ul').prepend(row);
				}

				// 每一次產父類別底下都在發出 req
				Tagtoo.get_options(res[i].name);
 
			};

			// 全部資料抓回來後綁定展開跟切換事件
			$.AdminLTE.tree('#sidebar');

			// console.log(res.length)
			// console.log(row)

			

			// 點擊每一個 list 才 print 出表單 可以有效將地 req 的數目，但不會寫，因為他 bind 的事件是一次綁定不是分開綁定，最好是一次產完在綁定。
			// $('.get_options').on({
			// 	click: function (event) {
			// 		event.preventDefault(); 
			// 		var key = $(this).attr('name');
			// 		if(typeof Tagtoo.options[key] === "undefined") {
			// 			Tagtoo.get_options(key);
			// 		} else {
			// 			console.log(Tagtoo.options[key])
			// 		}

			// 	}
			// });
		});
	},

	get_options: function (type_name) {
		Tagtoo.request('get', Tagtoo.API_host + '/rest/targeting/' + type_name + '/opts', function (res) {
			// console.log(res)
			var row = '<ul id="'+ type_name +'" class="treeview-menu" style="display: none;">';

			for (var i = 0; i < res.length; i++) {
				if (res[i].name) {				
					row += '<li><input type="checkbox" style="display:none;" value="' + res[i].name + '"/><a href="#"><i class="fa fa-circle-o"></i>' + res[i].name + '<i class="fa fa-circle-o pull-right text-danger"></i></a></li>';
				}
			};

			row += '</ul>';

			Tagtoo.options[type_name] = res;
			$('.get_options[name=' + type_name + ']').after(row);
			$('#' + type_name + ' li a').on({
				click: function (event) {
					event.preventDefault(); 
					$(this).find('i').toggleClass("fa-circle-o fa-circle");
					var name = $(this).parent().find('input').val()
					console.log(name);

					var list = 
		              '<li>'+
						'<a class="get_options" href="#" name="' + name + '">'+
						  '<i class="fa fa-arrow-circle-right"></i> <span>' + type_name + ' > ' + name + '</span>'+
						  '<i class="fa fa-circle pull-right text-green"></i>'+
						'</a>'+
		              '</li>';

					$('#result-menu').append(list);
// 					var checkBoxes = $(this).parent().find('li input');
// 					checkBoxes.prop("checked", !checkBoxes.prop("checked"));
// 					$(this).attr('checked').map(function () {
//     console.log(this)
// })
				}
			});

// 			// 綁事件
// var bound = false;
// if(!bound)
// {
// $.AdminLTE.tree('#sidebar');
// bound = true;
// }

			


			// var display = true;
			// if ( display === true ) {
			//   $( "#foo" ).show();
			// } else if ( display === false ) {
			//   $( "#foo" ).hide();
			// }
			// $('.get_options[name=' + type_name + ']').click();
			// $('#targeting').html(row);
			// $.AdminLTE.tree('#sidebar');
		});
	},


	get_adset: function () {
		$('#' + type_name + ' li a').on({
			click: function (event) {
				event.preventDefault(); 
				$(this).find('i').toggleClass("fa-circle-o fa-circle");
				var name = $(this).parent().find('input').val()
				console.log(name);

				var list = 
	              '<li>'+
					'<a class="get_options" href="#" name="' + name + '">'+
					  '<i class="fa fa-arrow-circle-right"></i> <span>' + type_name + ' > ' + name + '</span>'+
					  '<i class="fa fa-circle pull-right text-green"></i>'+
					'</a>'+
	              '</li>';

	       //                "name": "Puget Sound AdSet", 
        // "is_autobid": false, 
        // "bid_info": "{u'IMPRESSIONS': 500}", 
        // "bid_type": "CPM", 
        // "campaign_group_id": "6023427431832", 
        // "campaign_status": "PAUSED", 
        // "daily_budget": "3600", 
        // "lifetime_budget": "0", 
        // "start_time": "2015-03-10T21:14:05+0800", 
        // "end_time": null, 
        // "promoted_object": null, 
        // "targeting": "{u'age_max': 65, u'geo_locations': {u'countries': [u'US']}, u'age_min': 18}"
			}
		});
	}
}

$(function(){
	Tagtoo.init();

})


