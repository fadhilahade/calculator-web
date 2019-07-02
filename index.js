(function() {

    //get element
    let elem = function(element) {
        if (element.charAt(0) === "#") {
            return document.querySelector(element)
        }
        return document.querySelectorAll(element)
    }

    //variables
    let viewer = elem(".viewer"),
        equal = elem(".equal"),
        num = elem(".number"),
        ops = elem(".ops"),
        theNumber = "",
        oldNumber = "",
        resultNumber,
        operator

    let setNumber = function() {

        if (resultNumber) {
            theNumber = this.getAttribute("data-num")
            resultNumber = "";
        } else {
            theNumber += this.getAttribute("data-num")
        }



        viewer.innerHTML = theNumber;
        console.log(viewer);
    }

    let moveNumber = function() {
        oldNumber = theNumber;
        theNumber = ""
        operator = this.getAttribute("data-ops");

        equal.setAttribute("data-result", "")
    }


    let displayNumber = function() {
        oldNumber = parseFloat(oldNumber);
        theNumber = parseFloat(theNumber);

        switch (operator) {
            case "plus":
                resultNumber = oldNumber + theNumber;
                break;

            case "minus":
                resultNumber = oldNumber - theNumber;
                break;

            case "times":
                resultNumber = oldNumber * theNumber;
                break;

            case "divided by":
                resultNumber = oldNumber / theNumber;
                break;

            default:
                resultNumber = theNumber;
        }

        if (!isFinite(resultNumber)) {
            if (isNaN(resultNumber)) {
                resultNumber = "you broke it";
            } else {
                resultNumber = "look!!!"
                elem('.calculator').classList.add("broken");
                elem('.reset').classList.add("show")
            }
        }

        viewer.innerHTML = resultNumber;
        equal.setAttribute("data-result", resultNumber);

        oldNumber = 0;
        theNumber = resultNumber;
    }

    let clearAll = function() {
        oldNumber = ""
        theNumber = ""
        viewer.innerHTML = "0"
        equal.setAttribute("data-result", resultNumber)
    }

    for (let i = 0, l = num.length; i < l; i++) {
        num[i].onclick = setNumber;
    }

    for (let i = 0, l = ops.length; i < l; i++) {
        ops[i].onclick = moveNumber;
    }

    equal.onclick = displayNumber;

    elem(".clear").onclick = clearAll;

    elem(".reset").onclick = function() {
        window.location = window.location;
    }




}())