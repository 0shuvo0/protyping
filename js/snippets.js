var codeSnippets = [
	{
		snippet: `<!doctype html>
<html>
	<head>
		<title>Page title</title>
	</head>
	<body>
		<p>Hello world</p>
	</body>
</html>`,
		type: "xml"
	},
	{
		snippet: `body{
	font-family: 'Sans-serif';
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}`,
		type: "css"
	},
	{
		snippet: `for(let i = 0; i < 10; i++){
	console.log(i)
}`,
		type: "javascript"
	},
	{
		snippet: `function $(selector, parent = document){
	return parent.querySelector(selector)
}

//targeting paragraph element
var p = $("p")
console.log(p.innerText)`,
		type: "javascript"
	},
	{
		snippet: `function isValid(contactNo){
	var phoneRe = /^[2-9]\d{2}[2-9]\d{2}\d{4}$/;
	var digits = contactNo.replace(/\D/g, "");
	return phoneRe.test(digits);
}`,
		type: "javascript"
	},
	{
		snippet: `<form action="login">
	<input type="text" name="uid" />
	<input type="text" name="pwd" />
	<button type="submit">login</button>
</form>`,
		type: "xml"
	},
	{
		snippet: `.flex-center{
	display: flex;
	justify-content: center;
	align-items: center;
}`,
		type: "css"
	},
	{
		snippet: `function debounce(fn, delay){
	var id
	return function(...args){
		if(id) clearTimeout(id)
		id = setTimeout(function(){
			fn(...args)
		}, delay)
	}
}`,
		type: "javascript"
	},
	{
		snippet: `<p>H<sub>2</sub>SO<sub>4</sub></p>`,
		type: "xml"
	}
	
	/*{
		snippet: ,
		type: ""
	}*/
	


]