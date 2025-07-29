
let process = new Process();

process.PopulateJobOrder($("#selectJobOrder"));


$("#selectJobOrder").change(function(){
    let value = $(this).val();
    let process = $("#txtProcess").val();
    let user = $("#txtUser").val();

    process.user = user;
    process.registerID = value;
    process.process = process;

    checkProcessStatus(process);

});

$("#btnScanUserQR").click(function(){
    
    screen.orientation.lock('portrait');

    cordova.plugins.barcodeScanner.scan(
        function (result) {
            let scanResult = result.text;
            let registerID = $("#selectJobOrder").val();
            let processs = $("#txtProcess").val();
            console.log(scanResult);

            $("#txtUser").val(scanResult)
            $("#txtDisplayUser").val(scanResult);

            process.user = scanResult;
            process.registerID = registerID;
            process.process = processs;

            checkProcessStatus(process);

            /* let isValid = operation.CheckUserQR(scanResult);
            let machineCode = $("#txtMachineCode").val();

            if(isValid == true){
                $("#txtUser").val(scanResult)
                $("#txtDisplayUser").val(scanResult + " - " + main.SetEmployeeName(scanResult));

                checkMachineLogs(machineCode, scanResult)
            } else if(isValid == false){

                Swal.fire({
                    title: 'Invalid QR Code',
                    text: 'Please scan the correct code',
                    icon: 'warning'
                })

                $("#txtUser").val("")
                $("#txtDisplayUser").val("");
                $("#btnOut").hide();
                $("#btnIn").hide();
            } */

        },
        function (error) {
            alert("Scanning failed: " + error);
        },
        {
            preferFrontCamera : false, // iOS and Android
            showFlipCameraButton : true, // iOS and Android
            showTorchButton : true, // iOS and Android
            torchOn: false, // Android, launch with the torch switched on (if available)
            saveHistory: false, // Android, save scan history (default false)
            prompt : "Place a QR CODE inside the scan area", // Android
            resultDisplayDuration: 0, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
            formats : "QR_CODE", // default: all but PDF_417 and RSS_EXPANDED
            orientation : "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
            disableAnimations : true, // iOS
            disableSuccessBeep: true // iOS and Android
        }
    );
});


$("#btnScanProcessQR").click(function(){
    
    screen.orientation.lock('portrait');

    cordova.plugins.barcodeScanner.scan(
        function (result) {
            let scanResult = result.text;
            let parts = scanResult.split('_');
            scanResult = parseInt(parts[parts.length - 1], 10);

            let registerID = $("#selectJobOrder").val();
            let user = $("#txtUser").val();
            console.log(scanResult);

            $("#txtProcess").val(scanResult)
            $("#txtDisplayProcess").val(scanResult);

            process.process = scanResult;
            process.registerID = registerID;
            process.user = user;

            checkProcessStatus(process);

            /* let isValid = operation.CheckUserQR(scanResult);
            let machineCode = $("#txtMachineCode").val();

            if(isValid == true){
                $("#txtUser").val(scanResult)
                $("#txtDisplayUser").val(scanResult + " - " + main.SetEmployeeName(scanResult));

                checkMachineLogs(machineCode, scanResult)
            } else if(isValid == false){

                Swal.fire({
                    title: 'Invalid QR Code',
                    text: 'Please scan the correct code',
                    icon: 'warning'
                })

                $("#txtUser").val("")
                $("#txtDisplayUser").val("");
                $("#btnOut").hide();
                $("#btnIn").hide();
            } */

        },
        function (error) {
            alert("Scanning failed: " + error);
        },
        {
            preferFrontCamera : false, // iOS and Android
            showFlipCameraButton : true, // iOS and Android
            showTorchButton : true, // iOS and Android
            torchOn: false, // Android, launch with the torch switched on (if available)
            saveHistory: false, // Android, save scan history (default false)
            prompt : "Place a QR CODE inside the scan area", // Android
            resultDisplayDuration: 0, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
            formats : "QR_CODE", // default: all but PDF_417 and RSS_EXPANDED
            orientation : "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
            disableAnimations : true, // iOS
            disableSuccessBeep: true // iOS and Android
        }
    );
});

function checkProcessStatus(record){
    let self = this;
    let registerID = record.registerID;
    let user = record.user;
    let processs = record.process;

    if(registerID != "" && user != "" && processs != ""){
        process.CheckProcessStatus(process, function(data){
            let status = data.status;
            let rid = data.rid;

            if(status == "IN"){

                $("#btnIn").show();
                $("btnOut").hide();
                $("#divOut").hide();
            } else if(status == "OUT"){

                $("#btnIn").hide();
                $("#btnOut").show();
                $("#divOut").show();
                $("#selectStatus").val("");
                $("#txtRemarks").val("");
                process.PopulateStatus($("#selectStatus"));
                $("#hiddenRID").val(rid);
            }

        });
    }
}

$("#btnIn").click(function(){
    let registerID = $("#selectJobOrder").val();
    let processs = $("#txtProcess").val();
    let user = $("#txtUser").val();

    process.registerID = registerID;
    process.process = processs;
    process.user = user;

    process.InProcess(process);
    clearForm();
});

$("#btnOut").click(function(){
    let user = $("#txtUser").val();
    let rid = $("#hiddenRID").val();
    let status = $("#selectStatus").val();
    let remarks = $("#txtRemarks").val();
    
    process.user = user;
    process.rid = rid;
    process.status = status;
    process.remarks = remarks;

    process.OutProcess(process, function(response){
        if(response == true){
            clearForm();
        }
    });
});

$("#btnClear").click(function(){

    clearForm();
})

function clearForm(){

    $("#btnIn").hide();
    $("#btnOut").hide();
    $("#divOut").hide();
    process.PopulateJobOrder($("#selectJobOrder"))
    $("#txtDisplayUser").val("");
    $("#txtUser").val("");
    $("#txtDisplayProcess").val("");
    $("#txtProcess").val("");
}




$("#btnOpenModalConnection").click(function(){
    main.CheckConnection(function(response){

        $("#modalConnection").modal("show");
        $("#displayConnectionStatus").html(response);
        $("#displayIP").text(main.SetIP());
    })
});

$("#btnCheckConnection").click(function(){

    $("#displayConnectionStatus").html("-");
    $("#displayIP").html("-");

    setTimeout(() => {
        main.CheckConnection(function(response){

            $("#displayConnectionStatus").html(response);
            $("#displayIP").text(main.SetIP());
        })
    }, 1000);
});
