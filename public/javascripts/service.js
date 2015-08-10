;(function($){

    if (window.service) _service = service;
            
    service = {
        log: function(){
            try{console.log(arguments);} catch(e) {}
        },
        host: document.location.protocol+'//'+document.location.hostname+':'+document.location.port+'/employee/',
        searchEmployees: function(valor, cb){
            $.ajax({
                type: 'GET',
                url: service.host+'search/'+encodeURIComponent(valor),
                //data: {name:name, tag:tag},
                dataType: "json",
                success: function(data){
                    //service.log(data);
                    if(typeof cb == 'function')
                        cb(data);
                },
                failure: function(data){
                    service.log(data);
                }
            });
        },
        showSearchResults: function(valor){
            service.searchEmployees(valor, function(data){
				service.log(">",data);
				if(data.length>0){
					
					var tmp = '', res = '<div class="row">';
		            tmp += '<div class="large-4 columns">';
		            tmp += '  <div class="row" style="padding:10px 0;background: #ccc;border: 1px solid #999;margin:2px;">';
		            tmp += '    <div class="data small-4 large-4 columns">';
		            tmp += '        <img class="avatar" src="/images/nofoto.jpg" style="width:80px" alt="%nombre%" />';
		            tmp += '    </div>';
		            tmp += '    <div class="data small-8 large-8 columns" style="padding: 0;">';
		            tmp += '        <h3 style="font-size: 18px">%nombre% %apellido%</h3>';
		            tmp += '        <a href="mailto:%email%">%email%</a>';
		            tmp += '    </div>';
		            tmp += '  </div>';
		            tmp += '</div>'; 

					$('#search-results').empty();

					$.each(data, function(i,v){
						service.log(i,v);
						if(i%3==0&&i!=0&&i!=(data.length-1)){
							res += '</div><div class="row">';
						}
						var include = tmp.replace(/%nombre%/g, v['nombre']).replace(/%apellido%/g, v['apellido']).replace(/%email%/g, v['email']);
						res += include;
						
					});
					//add Empty Columns
					if(data.length%3!=0){
						for(var i=0;i<(3-(data.length%3));i++){
							res+='<div class="large-4 columns"></div>';
						}
					}	
					res += '</div>';
					$('#search-results').html(res);

				}else{
					$('#search-results').html('<p class="center">No Results..</p>');
				}

            });
        }
    }

})(jQuery);

$(document).ready(function(){
   $("#searchEmployeeKeyword").keydown(function(e) {
        var key = e.charCode || e.keyCode || 0, keyword="";
                
        switch(key){
            case 13://enter
                keyword = $.trim($(this).val());
                if (keyword.length > 0) {
                    
                    service.showSearchResults(keyword);
                }
                return false;
            break;
        }
    });    

});

