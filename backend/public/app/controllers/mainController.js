angular.module('mainController', ['authServices'])

.controller('mainCtrl', function(Auth, $timeout, $location){
    var app = this;

    this.doLogin = function(loginData){
        
            app.loading = true;
            app.errorMessage = false;
            app.successMessage = false;
    
            Auth.login(app.loginData).then(function(data){
                if(data.data.success)
                {
                    app.loading=false;
                    //create success message
                    app.successMessage = data.data.message + '...Redirecting';
                    //redirect to home page
                    $timeout(function() {
                        $location.path('/');
                    }, 1000)
                }
                else
                {
                    //create an error message
                    app.loading=false;
                    app.errorMessage = data.data.message;
                }
        });
    }
});