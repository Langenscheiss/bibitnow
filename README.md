# bibitnow
Site adjustors for browser plugin "bibitnow"
Download developer version of BibItNow for Chrome/Chromium, Opera, Firefox and Safari
https://aqpl.mc2.chalmers.se/PDSU/files.html

"BibItNow" is a browser plugin that requires only a single click to extract bibliographic data from abstract pages of journal articles, books and theses, and to translate this data to the Bibtex,RIS,Endnote or (B)arnold S. format. With a second click, this data is then either in the clipboard or accessible as a download, ready to be copied into your bibliography system of choice. The main purpose of this plugin is to separate the task of extracting bibliographic data from the bibliographic library functionality itself, thereby offering the benefit of a simpler and more streamlined export procedure compared to otherwise much more powerful library tools such as JabRef or Zotero. Compared to the latter, particular effort has been spent on a natural and simple integration of the bibtex format.   

To achieve its goal, BitItNow relies on a combination of a meta data extractor with a carefully chosen set of standard queries on the one hand, and, on the other hand, on a number of website specific translators (which btw. ARE NOT SIMPLY taken from Zotero). This is exactly where your help is needed. This github allows you to contribute to the development of "BitItNow", by developing and publishing website specific adjustors. These adjustors allow you to do the following:
- using CSS queries, search the static website data for all supported bibliographic fields (authors, title, journal, etc.)
- extract and format website specific citation download link from which the plugin can dynamically download citation data (essentially emulating the action of the website's export button)
- preformat extracted data before it is passed on to the main parser, and control how the static data is merged with any dynamically downloaded data.

All this functionality is implemented in 2 different javascript files per website, and a single xml file linking these files to a specific url. More precisely, 
1.) nameResources/urlSpecificAdjustorList.xml -- links url to selectors and preformatters. URLs are always matched without the http(s)://scheme and without the "www" subdomain. The rest is processed in the following order:
full domain without subpaths, full domain with first sudomain removed and without subpaths, full domain with first and second (if available) subdomain removed and without subpaths, ..., full domain with all but the last remaining subdomain removed and without subpaths, full domain with first subpath, full domain with first subpath and with the first subdomain removed, ... . Matching stops as soon as the first match is encountered.
2.) Preferred selectors and Preformatters TODO
Please refer to the sample files in each subfolder for further instructions.
