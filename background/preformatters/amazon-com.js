var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;

	//preformatting function
	function preformatData(metaData, parser) {


		//fix type for kindle edition
		if (metaData["citation_type"] == "digital-text") metaData["citation_type"] = "book";

		//fix authors on amazon
		metaData["citation_authors"] = metaData["citation_authors"].replace(/[\ ;]*(?:Entdecken|Suchergebnisse|Erfahren|検索結果|著者セントラルはこちら|Visit|Search|Learn|Visita|Resultados|Consulter|résultats|Infos)\ [^;]*/gi,"");

		//preformat publisher
		let data = metaData["citation_misc"];
		let dataPart = data.replace(/\([^\(\)]*\)[\ ]*$/,"").match(/(?:Verlag|Herausgeber|Uitgever|出版社|Publisher|Editor[a]?|Editore|Éditeur|Editor)[^;\(]*/i);
		if (dataPart != null && dataPart.length > 0) metaData["citation_publisher"] = dataPart[0].replace(/^(?:Verlag|Herausgeber|Uitgever|出版社|Publisher|Editor[a]?|Editore|Éditeur|Editor)[\s ]*[:]*/i,"").trim();

		//extract ISBN
		dataPart = data.match(/ISBN\-13[:\ 0-9X\-]*/i);
		if (dataPart == null || dataPart.length == 0) dataPart = data.match(/ISBN[:\ 0-9X\-]*/i);
		if (dataPart != null && dataPart.length > 0) {
			dataPart = dataPart[0];
			metaData["citation_issn"] = dataPart.replace(/ISBN[^:]*:/,"").trim();
		} else {
			metaData["citation_issn"] = "";
		}

		//preformat date
		data = data.replace(/^.*?(?:Verlag|Herausgeber|Uitgever|出版社|Publisher|Editor[a]?|Editore|Éditeur|Editor)[^;\(]*/i,"");
		dataPart = data.match(/\([^\(\)]*\)\ ;\ /);
		if (dataPart != null && dataPart.length > 0) {
			data = dataPart[0];
		} else {
			dataPart = data.match(/\([^\(\)]*\)/);
			if (dataPart != null && dataPart.length > 0) data = dataPart[0];
		}
		metaData["citation_date"] = data.trim();

		//clear misc field to avoid any further interpretations
		metaData["citation_misc"] = "";

		//set Amazon store as database
		metaData["citation_database"] = metaData["citation_domain"].replace(/^amazon/,"Amazon") + "." + metaData["citation_top_level_domain"] + " Webstore";
	}

	// expose preformatting function
	return { preformatData : preformatData };

}());
