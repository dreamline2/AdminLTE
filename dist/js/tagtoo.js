var Tagtoo = {
	API_host: "//localhost:1234",
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


				if($('#sidebar-menu .' + res[i].classify).length == 0 ) {
					// create
					// console.log(res[i].classify)
					row = 
					'<li class="header ' + res[i].classify + '">' + res[i].classify + '</li>'+
				    '<li class="treeview">'+
		              '<a class="get_options" href="#" name="' + res[i].name + '">'+
		                '<i class="fa fa-share"></i> <span>' + res[i].name + '</span>'+
		                '<i class="fa fa-angle-left pull-right"></i>'+
		              '</a>'+
		            '</li>';
					$('#sidebar-menu').append(row);

				} else {

					row =
				    '<li class="treeview">'+
		              '<a class="get_options" href="#" name="' + res[i].name + '">'+
		                '<i class="fa fa-share"></i> <span>' + res[i].name + '</span>'+
		                '<i class="fa fa-angle-left pull-right"></i>'+
		              '</a>'+
		            '</li>';

		            $('#sidebar-menu .' + res[i].classify).after(row);
				}
 
			};
			// console.log(res.length)
			// console.log(row)

			

			
			$('.get_options').on({
				click: function (event) {
					event.preventDefault();
					var key = $(this).attr('name');
					if(typeof Tagtoo.options[key] === "undefined") {
						Tagtoo.get_options(key);
					} else {
						console.log(Tagtoo.options[key])
					}

				}
			});
		});
	},

	get_options: function (type_name) {
		Tagtoo.request('get', Tagtoo.API_host + '/rest/targeting/' + type_name + '/options', function (res) {
			console.log(res)
			var row = '';

			for (var i = 0; i < res.length; i++) {
				if (res[i].name) {				
					row += 
					'<ul class="treeview-menu" style="display: none;">'+
						'<li><input type="checkbox" value="' + res[i].name + '"/><i class="fa fa-circle"></i></li>'+
						'<li><a href="#"><i class="fa fa-circle-o"></i> Level One</a></li>'+
					'</ul>';
				}
			};
			Tagtoo.options[type_name] = res;
			$('.get_options[name=' + type_name + ']').after(row);
			$.AdminLTE.tree('#sidebar');
			$('.get_options[name=' + type_name + ']').click();
			// $('#targeting').html(row);
			// $.AdminLTE.tree('#sidebar');
		});
	}
}

$(function(){
	Tagtoo.init();

})


