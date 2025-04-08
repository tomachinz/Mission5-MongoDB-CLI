class TraverseDOM {
	constructor(nodelist) {
		// this.init();
        this.depth = 0;
        this.serial = 1;
        this.context = "nodejs";
        this.output = "";
        this.traverseNode(nodelist, "nodejs");
	}
    traverseNode(nodelist, parent) {
        let i = nodelist.length;   
        let element = nodelist.item(1);
        const derka = `${parent} / ${i} `
        const lname = element.localName ? element.localName : "~";
        const nodestring = element.toString();

        this.depth++;
        console.group(`${this.depth}.${this.serial} ${derka} ${lname} ${element.className} ${nodestring}`);

        for (const el of nodelist) {		
            const lname = el.localName ? el.localName : " ";
            const childCount = el.childElementCount;
            if ( el.innerText &&  lname.indexOf("script" ) == -1) {
                console.warn(this.depth, this.serial, lname, el.className)			
                this.log(el.innerText) 		
            } else {
                console.info(`${this.depth}.${this.serial}`);
            }
            if (childCount > 1) {
                this.traverseNode(el.childNodes, `${derka}.${lname}`);
            } 
            this.serial++;
        }
        console.groupEnd();
    }
    log(text) {
        if (this.context == "nodejs") {
             this.output += text + "\n";
        } else {
            console.log(text);
        }
    }
    nodelistToText(nodelist) {
        this.traverseNode(nodelist, "nodejs");
        return this.output;
    }
	init() {
		console.log("TraverseDOM initialized");
		window.addEventListener("load", this.pageLoaded);
	}

	pageLoaded() {
        var docbody = document.body.childNodes;
        this.context = "browser"
        this.traverseNode(docbody, "body");
    }
}
export default TraverseDOM