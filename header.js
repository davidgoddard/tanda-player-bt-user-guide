/*
Generate page header including date last Tanda Player code version was updated
*/

function generate_header(){

		function loadDoc(container, prefix) {
		  var xhttp = new XMLHttpRequest();
		  xhttp.onreadystatechange = function() {
		    if (this.readyState == 4 && this.status == 200) {

		    	var data = JSON.parse(this.responseText);
		    	console.log(data)

	    		var version = data["Code"]
	    		var latest = version.sort(function(a,b){
		    		if ( parseFloat(a.version) > parseFloat(b.version) ) return -1;
		    		if ( parseFloat(a.version) < parseFloat(b.version) ) return 1;
		    		return 0;
		    	})[0].released;

			    container.innerHTML = prefix + ': <span id="lastUpdate">' + latest + '</span>';
		    }
		  };
		  xhttp.open("GET", "downloads.js", true);
		  xhttp.send();
		}

	var container = document.getElementsByTagName('header')[0];
	var main = document.createElement("div")
	container.appendChild(main);
	var heading = document.createElement("h1")
	main.appendChild(heading);
	heading.className = "notranslate"
	heading.appendChild(document.createTextNode('Tanda Player'))
	var s = document.createElement("span")
	heading.appendChild(s);
	s.appendChild(document.createTextNode(' by David Goddard'))
	var lines = [
			'Analyse & Discover your Tango music',
			'Create a library of beautiful tandas',
			'Find & Play Tandas, not tracks!'
	]
	lines.forEach(function(l){
		var em =  document.createElement("em")
		main.appendChild(em);
		em.appendChild(document.createTextNode(l))
	})
	var lines = [
	'A guide to the features of the Tanda Player'
	]

	var list = document.createElement('ul')
	container.appendChild(list);

	var links = [
		{page: 'features.html', label: 'Main Features' },
		{page: 'applications.html', label: 'Overview of the applications' },
		{page: 'extensions.html', label: 'Tanda Player Extensions' },
		{page: 'building.html', label: 'Building a Tanda Player' },
		{page: 'insights.html', label: 'Classification versus Organisation' },
		{page: 'history.html', label: 'History' },
		{page: 'downloads.html', label: 'Latest Available Download' }
	]
	links.forEach(function(l){
		var item = document.createElement('li')
		list.appendChild(item)
		var link = document.createElement('a')
		item.appendChild(link)
		link.href='/' + l.page
		link.appendChild(document.createTextNode(l.label))
	})

	/* Add translator */

	var translator = document.createElement('div')
	container.appendChild(translator)
	translator.id = 'google_translate_element'


	/* Add version and last date */

 	var version = document.createElement('div')
 	container.appendChild(version);
 	version.className = 'version';
 	loadDoc(version, 'Last Software Update')


    var script = document.createElement("script"); // Make a script DOM node
	script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
	document.body.appendChild(script);
        
}

/* Callback for translation */
function googleTranslateElementInit() {
	new google.translate.TranslateElement({pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.SIMPLE, gaTrack: true, gaId: 'UA-119525663-1'}, 'google_translate_element');
}

generate_header();
