class Main {

    constructor(){
        this.systemIP = "http://172.16.102.15:8080/";
        this.systemLocalStorageTitle = "pmms";
        this.root = this.systemIP+"1_PMMS/";
        this.lsEmployeeList = this.systemLocalStorageTitle +"-employee-list";
        this.lsProcessList = this.systemLocalStorageTitle +"-process-list";
    }
    
    /* GetEmployeeRecords(){
        let self = this;
        $.ajax({
            url: self.root + "php/controllers/Allocation/EmployeeRecords.php",
            method: "POST",
            data: {},
            datatype: "json",
            success: function(response){
                // console.log(response);
                let list = response.data;

                localStorage.setItem(self.lsEmployeeList, JSON.stringify(list));
                // console.log(list);
            },
            error: function(err){
                console.log("Error:"+JSON.stringify(err));
            },
        });
    } */
    GetProcessRecords(){
        let self = this;
        $.ajax({
            url: self.root + "php/controllers/Process/Records.php",
            method: "POST",
            data: {},
            datatype: "json",
            success: function(response){
                // console.log(response);
                let list = response.data;

                localStorage.setItem(self.lsProcessList, JSON.stringify(list));
            },
            error: function(err){
                console.log("Error:"+JSON.stringify(err));
            },
        });
    }



    /* SetEmployeeName(id){
        let list = JSON.parse(localStorage.getItem(this.lsEmployeeList));
        
        if(id == 1){
            return "SYSTEM ADMIN"
        } else {
            let result = list.find(element => element.RFID === id);

            return result ? result.EMPLOYEE_NAME: "";
        }
    } */

    CheckConnection(callback){
        let self = this;
        $.ajax({
            url: self.root+'/config/connectionTest.php',
            type: 'POST',
            data:{},
            success: function(response) {

                callback('<span class="text-success">'+response+'</span>');
    
            },
            error: function(response){
                callback('<span class="text-danger">ERROR CONNECTION</span>');
            },
        });
    }
    SetIP(){
        return this.systemIP;
    }
}

let main = new Main();

// main.GetMachineList();
// main.GetEmployeeRecords();
// main.GetPurposeRecords();