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
		metaData["citation_authors"] = metaData["citation_authors"].replace(/[\s\u200F\u200E\;]*(?:Entdecken|Suchergebnisse|Erfahren|検索結果|著者セントラルはこちら|Visit|Search|Learn|Visita|Resultados|Consulter|résultats|Infos)[\s\u200F\u200E][^;]*/gi,"");

		//preformat publisher
		let data = metaData["citation_misc"];
		let dataPart = data.replace(/\([^\(\)]*\)[\s\u200F\u200E]*$/,"").match(/(?:Verlag|Herausgeber|Uitgever|出版社|Publisher|Editor[a]?|Editore|Éditeur|Editor)[^;\(]*/i);
		if (dataPart != null && dataPart.length > 0) metaData["citation_publisher"] = dataPart[0].replace(/^(?:Verlag|Herausgeber|Uitgever|出版社|Publisher|Editor[a]?|Editore|Éditeur|Editor)[\s\u200F\u200E]*[:]*[\s\u200F\u200E]*/i,"").trim();

		//extract ISBN
		dataPart = data.match(/ISBN\-13[^;]*(?:;|$)/i)
		if (dataPart == null || dataPart.length == 0) dataPart = data.match(/ISBN[^;]*(?:;|$)/i);
		if (dataPart != null && dataPart.length > 0) {
			dataPart = dataPart[0];
			metaData["citation_issn"] = dataPart.replace(/ISBN[^:]*[:>]/,"").trim();
		} else {
			metaData["citation_issn"] = "";
		}

		//preformat date
		data = data.replace(/^.*?(?:Verlag|Herausgeber|Uitgever|出版社|Publisher|Editor[a]?|Editore|Éditeur|Editor)[^;\(]*/i,"");
		dataPart = data.match(/\([^\(\)]*\)[\s\u200F\u200E];[\s\u200F\u200E]/);
		if (dataPart != null && dataPart.length > 0) {
			data = dataPart[0];
		} else {
			dataPart = data.match(/\([^\(\)]*\)/);
			if (dataPart != null && dataPart.length > 0) data = dataPart[0];
		}
		metaData["citation_date"] = data.trim();

		//clear misc field to avoid any further interpretations
		metaData["citation_misc"] = "";

		//fix language
		metaData["citation_language"] = "zh";

		//set Amazon store as database
		metaData["citation_database"] = "Amazon.cn Webstore";
	}

	// expose preformatting function and raw preformatting function
	return { preformatData : preformatData };

}());
