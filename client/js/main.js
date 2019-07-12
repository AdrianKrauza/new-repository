// $('div').html('d')
		
$.ajax({
	url: 'http://localhost:3000/get',
	method: 'POST',
	data: { list: 'some info' }
}).done(function(data) {
	//if we have a successful post request ...
	if (data.success) {
		console.log(data);
		data.message.map(element=>{
			console.log(element);
			
			// alert()
			$('div').append(element + '<br>')

		})
		
	}
});
