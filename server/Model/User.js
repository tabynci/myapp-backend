// https://bjanderson.github.io/js-models/
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Not_a_constructor


class User {
    constructor(obj){
      this.id =obj.id
        this.username = obj.username
        this.email = obj.email
        this.age = obj.age
        this.password=obj.password
     }

     CheckAge= function() {
        console.log("CheckAge")
        if(this.age<18){
            return "invalid age so user cannot create account"
        }else{
            return true;
        }

    }

    Isvalid=function(){
        return CheckAge()
    }
}

module.exports.User=User;
