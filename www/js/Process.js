class Process extends Main{

    constructor(){
        super()

    }

    DisplayRegisterUndone(callback){

        let self = this;

        $.ajax({
            url: self.root + "php/controllers/Register/RegisterUndone.php",
            method: "POST",
            data: {},
            datatype: "json",
            success: function(response){
                console.log(response);
                let list = response.data;

                callback(list)
            },
            error: function(err){
                console.log("Error:"+JSON.stringify(err));
            },
        });
    }

    PopulateJobOrder(selectElem){
        this.DisplayRegisterUndone(function(list){
            let option = '<option value="">-Select-</option>'
            
            for(let index = 0; index < list.length; index++){

                option += '<option value="'+list[index].RID+'">'+list[index].MOLD_CODE+'</option>'
            }
            
            selectElem.html(option);

            selectElem.select2({
                placeholder: '-Select-',
                
            });
        });
    }

    PopulateStatus(selectElem){
        let list = this.GetStatusList();
        let option = '<option value="">-Select-</option>'
            
        for(let index = 0; index < list.length; index++){
            if(list[index].a != 0){

                option += '<option value="'+list[index].a+'">'+list[index].b+'</option>'
            }
        }
        
        selectElem.html(option);

        selectElem.select2({
            placeholder: '-Select-',
            
        });
    }

    CheckProcessStatus(record, callback){
        let self = this;
        let registerID = record.registerID;
        let user = record.user;
        let process = record.process;
        
        console.log(registerID + " - " + user + " - " + process);
        $.ajax({
            url: self.root + "php/controllers/Process/CheckProcessValidation.php",
            method: "POST",
            data: {
                registerID: registerID,
                user: user,
                process: process,
            },
            datatype: "json",
            success: function(response){
                console.log(response);
                
                callback(response);
                
            },
            error: function(err){
                console.log("Error:"+JSON.stringify(err));
            },
        });
    }
    InProcess(record){
        let self = this;
        let registerID = record.registerID;
        let user = record.user;
        let process = record.process;

        $.ajax({
            url: self.root + "php/controllers/Process/InsertProcessMasterlist.php",
            method: "POST",
            data: {
                registerID: registerID,
                user: user,
                process: process,
            },
            datatype: "json",
            success: function(response){
                console.log(response);
                
                // callback(response);
                Swal.fire({
                    title: 'IN Status Success!',
                    text: '',
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Proceed!',
                    timer: 2000,
                    willClose: () => {
                        // window.location.href = "dashboard";
                        // self.DisplayRecords(attendance.date, attendance.table);
                    },
                })
                
            },
            error: function(err){
                console.log("Error:"+JSON.stringify(err));
            },
        });

    }
    OutProcess(record, callback){
        let self = this;
        let rid = record.rid;
        let user = record.user;
        let status = record.status;
        let process = record.process;
        let remarks = record.remarks;

        if(status == ""){
            Swal.fire({
                title: 'Incomplete Form.',
                text: 'Please complete the login form.',
                icon: 'warning'
            })
            callback(false);
        } else {
            $.ajax({
                url: self.root + "php/controllers/Process/UpdateProcessMasterlist.php",
                method: "POST",
                data: {
                    user: user,
                    process: process,
                    status: status,
                    remarks: remarks,
                    rid: rid,
                },
                datatype: "json",
                success: function(response){
                    console.log(response);
                    
                    callback(true);
                    Swal.fire({
                        title: 'Out Status Success!',
                        text: '',
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Proceed!',
                        timer: 2000,
                        willClose: () => {
                            // window.location.href = "dashboard";
                            // self.DisplayRecords(attendance.date, attendance.table);
                        },
                    })
                    
                },
                error: function(err){
                    console.log("Error:"+JSON.stringify(err));
                    callback(false);
                },
            });
        }
    }

}