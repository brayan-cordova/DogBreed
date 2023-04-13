angular.module('userController', ['userServices'])

.controller('registerController', function($http, $location, $timeout, User){

    var app = this;

    this.registerUser = function(regData){

        app.loading = true;
        app.errorMessage = false;
        app.successMessage = false;

        User.create(app.regData).then(function(data){
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
})