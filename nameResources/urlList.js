//list linking urls to site adjustors. Positive matching requires at least valid "scheme" and "top"
let urlList = [
		{ scheme: "publications\\.rwth-aachen" , top: "de" , prefselector: "aachen" , preformatter: "aachen" },
		{ scheme: "pubs\\.acs" , top: "org" , prefselector: "acs" , preformatter: "acs" },
		{ scheme: "aappublications" , top: "org" , prefselector: "aap" , preformatter: "aap" },
		{ scheme: "dl\\.acm" , top: "org" , prefselector: "acm" , preformatter: "acm" },
		{ scheme: "aip\\.scitation" , top: "org" , prefselector: "aip" , preformatter: "aip" },
		{ scheme: "agris\\.fao" , top: "org" , prefselector: "agris" },
		{ scheme: "ajas" , top: "info" , prefselector: "ajas" , preformatter: "ajas" },
		{ scheme: "ascopubs" , top: "org" , prefselector: "ascopubs" , preformatter: "ascopubs" },
		{ 	scheme: "amazon" , prefselector: "amazon" ,
			top: 	[
					{ scheme: "com" , preformatter: "amazon-com" },
					{ scheme: "de" , preformatter: "amazon-de" },
					{ scheme: "it" , preformatter: "amazon-it" },
					{ scheme: "fr" , preformatter: "amazon-fr" },
					{ scheme: "es" , preformatter: "amazon-es" },
					{ scheme: "nl" , preformatter: "amazon-nl" },
					{ scheme: "in" , preformatter: "amazon-com" },
					{ scheme: "cn" , preformatter: "amazon-cn" }
				]
		},
		{ 	scheme: "amazon\\.com" , prefselector: "amazon" ,
			top: 	[
					{ scheme: "au" , preformatter: "amazon-com" },
					{ scheme: "br" , preformatter: "amazon-es" },
					{ scheme: "mx" , preformatter: "amazon-es" }
				]
		},
		{ 	scheme: "amazon\\.co" , prefselector: "amazon" ,
			top: 	[
					{ scheme: "uk" , preformatter: "amazon-com" },
					{ scheme: "jp" , preformatter: "amazon-jp" }
				]
		},
		{ scheme: "annualreviews" , top: "org" , prefselector: "annualreviews" , preformatter: "annualreviews" },
		{ scheme: "bmj" , top: "com" , path: "content" , prefselector: "bmj" , preformatter: "bmj" },
		{ scheme: "journals\\.aps" , top: "org" , prefselector: "aps" , preformatter: "aps" },
		{ scheme: "arxiv" , top: "org" , prefselector: "arxiv" , preformatter: "arxiv" },
		{ scheme: "bioone" , top: "org" , preformatter: "bioone" , prefselector: "bioone" },
		{ scheme: "degruyter" , top: "com" , prefselector: "degruyter" , preformatter: "degruyter" },
		{ scheme: "elsevier" , top: "com" , path: "books" , prefselector: "elsevier-book" , preformatter: "elsevier-book" },
		{ scheme: "genialokal" , top: "de" , prefselector: "genialokal" , preformatter: "genialokal" },
		{ scheme: "goodreads" , top: "com" , prefselector: "goodreads" , preformatter: "goodreads" },
		{ scheme: "books\\.google(?:|\\.co|\\.com)" , top: "[0-9a-z]+" , prefselector: "google-book" , preformatter: "google-book" },
		{ scheme: "hindawi" , top: "com" , prefselector: "hindawi" , preformatter: "hindawi" },
		{ scheme: "ieeexplore\\.ieee" , top: "org", path: "document" , prefselector: "ieee" , preformatter: "ieee" },
		{ scheme: "ingentaconnect" , top: "com" , prefselector: "ingentaconnect" , preformatter: "ingentaconnect" },
		{ scheme: "iopscience\\.iop" , top: "org" , prefselector: "iop" , preformatter: "iop" },
		{ scheme: "mdpi" , top: "com" , prefselector: "mdpi" , preformatter: "mdpi" },
		{ scheme: "nytimes" , top: "com" , prefselector: "nytimes" , preformatter: "nytimes" },
		{ scheme: "ojs\\.darwin\\.edu" , top: "ar" , preformatter: "darwiniana" , prefselector: "darwiniana" },
		{ scheme: "global\\.oup" , top: "com" , preformatter: "oup" , prefselector: "oup" },
		{ scheme: "academic\\.oup" , top: "com" , preformatter: "oup-journals" , prefselector: "oup-journals" },
		{ scheme: "ora\\.ox\\.ac" , top: "uk" , prefselector: "oxford-archive" , preformatter: "oxford-archive"  },
		{ scheme: "pubs\\.rsc" , top: "org" , prefselector: "rsc" , preformatter: "rsc"  },
		{ scheme: "jps" , top: "jp" , path: "doi" , preformatter: "jps" , prefselector: "jps" },
		{ scheme: "nature" , top: "com" , preformatter: "nature" , prefselector: "nature" },
		{ scheme: "nejm" , top: "org" , preformatter: "nejm" , prefselector: "nejm" },
		{ 	
			scheme: "ncbi\\.nlm\\.nih" , top: "gov" ,
			path: 	[
					{ scheme: "pubmed" , prefselector: "pubmed" , preformatter: "pubmed" },
					{ scheme: "pmc" , prefselector: "pmc" , preformatter: "pmc" },
					{ scheme: "books" , prefselector: "ncbi-book" , preformatter: "ncbi-book" } 
				]
			
		},
		{ scheme: "research\\.chalmers" , top: "se" , prefselector: "cpl" , preformatter: "cpl" },
		{ scheme: "journals\\.sagepub" , top: "com" , prefselector: "sagepub" , preformatter: "sagepub" },
		{ 	scheme: "sciencedirect" , top: "com" ,
			path:	[
					{ scheme: "science-book" , prefselector: "sciencedirect-book" , preformatter: "sciencedirect-book" },
					{ scheme: "science-article" , prefselector: "sciencedirect" , preformatter: "sciencedirect" }
				]			
		},
		{ scheme: "scopus" , top: "com" , prefselector: "scopus" , preformatter: "scopus" },
		{ 	
			scheme: "link\\.springer" , top: "com" , 
			path:	[
					{ scheme: "(?:article|protocol)" , prefselector: "springer" , preformatter: "springer" },
					{ scheme: "book" , prefselector: "springer-link-book" , preformatter: "springer-link-book" }
				]
		},
		{ scheme: "pnas" , top: "org"  , prefselector: "pnas" , preformatter: "pnas" },
		{ scheme: "press\\.princeton" , top: "edu" , prefselector: "princeton" , preformatter: "princeton" },
		{ scheme: "search\\.proquest" , top: "com" , prefselector: "proquest" , preformatter: "proquest" },
		{ scheme: "springer" , top: "com" , path: "gp" , prefselector: "springer-book" , preformatter: "springer-book" },
		{ scheme: "(?:|[0-9a-z\\-]+[\\.]+)sciencemag" , top: "org" , prefselector: "science" , preformatter: "science" },
		{ scheme: "tandfonline" , top: "com" , prefselector: "taylorandfrancis" , preformatter: "taylorandfrancis" },
		{ 
			scheme: "onlinelibrary\\.wiley" , top: "com" ,
			path:	[
					{ scheme: "book" , prefselector: "wiley-book" , preformatter: "wiley-book"  },
					{ scheme: "(?:doi|wol1\\-doi)" , prefselector: "wiley" , preformatter: "wiley"  }
				]
		},
		{ scheme: "washingtonpost" , top: "com" , prefselector: "washingtonpost" , preformatter: "washingtonpost" },
		{ 
			scheme: "worldscientific-com-doi" , top: "com" ,
			path:	[
					{ scheme: "doi" , prefselector: "worldscientific" , preformatter: "worldscientific"  },
					{ scheme: "worldscibooks" , prefselector: "worldscientific-book" , preformatter: "worldscientific-book"  }
				]
		}
	];