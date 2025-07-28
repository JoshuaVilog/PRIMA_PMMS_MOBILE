
let process = new Process();

process.PopulateJobOrder($("#selectJobOrder"));


$("#btnScanUserQR").click(function(){
    
    screen.orientation.lock('portrait');

    cordova.plugins.barcodeScanner.scan(
        function (result) {
            let scanResult = result.text;

            console.log(scanResult);
            $("#txtUser").val(scanResult)
            $("#txtDisplayUser").val(scanResult);
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

            console.log(scanResult);
            $("#txtProcess").val(scanResult)
            $("#txtDisplayProcess").val(scanResult);
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

function checkProcessStatus(){


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
