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

}