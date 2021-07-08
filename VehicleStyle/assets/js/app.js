window.onload = () => {
    let items = document.getElementsByClassName("form-check-input");
    let labels = document.getElementsByClassName("form-check-label");
    let outputList = {};
    for (let i = 0; i < 20; i++) {
        outputList[i] = 0;
    }

    function calculateOutput() {
        let binaryValue = "";
        let outputText = "";
        for (let i = 19; i > -1; i--) {
            binaryValue += outputList[i];
            if (outputList[i] == 1) {
                outputText += "<span class=\"primary\">" + outputList[i].toString() + "</span>";
            } else {
                outputText += outputList[i].toString();
            }
        }
		
        let realNumber = parseInt(binaryValue, 2);

        document.getElementById("binary-output").innerHTML = outputText;
        $("#input-style").val(realNumber);
		
    }
    $("#all-on").click(() => {
        for (let i in items) {
            items[i].checked = true;
        }
        for (let i = 0; i < 20; i++) {
            outputList[i] = 1;
        }
        calculateOutput();
    });
    $("#all-off").click(() => {
        for (let i in items) {
            items[i].checked = false;
        }
        for (let i = 0; i < 20; i++) {
            outputList[i] = 0;
        }
        calculateOutput();
    });
    $("#all-invert").click(() => {
        let index = 0;
        for (let i in items) {
            outputList[index] = !items[i].checked ? 1 : 0;
            items[i].checked = !items[i].checked;
            index++;
        }
        calculateOutput();
    });
    $("#all-cars").click(() => {
        $("#input-style").val(231807);
        checkFlags();
    });

    $("#all-airs").click(() => {
        $("#input-style").val(391551);
        checkFlags();
    });

    function checkFlags() {
        let input = document.getElementById("input-style").value;
        if (input !== undefined && input !== null && input.length > 0 && !isNaN(parseInt(input))) {
            let value = parseInt(input);
            let binary = value.toString(2);
            while (binary.length < 20) {
                binary = "0" + binary;
            }
            for (let i = 19; i > -1; i--) {
                if (binary[i] == 1) {
                    outputList[19 - i] = 1;
                    items[19 - i].checked = true;
                } else {
                    outputList[19 - i] = 0;
                    items[19 - i].checked = false;
                }
            }
        }
        calculateOutput();
    }

    $("#input-style").keyup((e) => {
        //if (e.key == "Enter") {
            checkFlags();
        //}
    });
    $(".form-check").change((item) => {
        outputList[item.target.getAttribute("id").split("-")[1]-1] = item.target.checked ? 1 : 0;
        calculateOutput();
    });

};