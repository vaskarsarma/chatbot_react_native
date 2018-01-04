export const validation={
    name:{
        presence:{
            message:'Please enter your name'
        },
        format:
        {
            pattern:/^[a-zA-Z ]+$/,
            message:'Please enter a valid name'
        }
    }
}

export function validate(nameField,value){
    let resp=[null, null];
    if(validation.hasOwnProperty(nameField)){
        let v=validation[nameField];
        if(value=='' || value == null){
            console.log("validation null");
            resp[0]=true
            resp[1]=v['presence']['message']
        }else if(v.hasOwnProperty('format') && 
          !v['format']['pattern'].test(value))
          {
            console.log("validation format error");
            resp[0]=true
            resp[1]=v['format']['message']
          }
        }
        else
        {
            resp[0]=false
            resp[1]=""
        }
    return resp;
}