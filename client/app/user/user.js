// user controller for interacting with
// the user object in various templates
angular.module('lightCMS.user', [])
    .controller('UserController', function($scope, User, $state){
      //error message to display on login error
      $scope.loginStatusMessage = "";

      // used for storing/updating user profile into
      $scope.hero = User.hero;

      // all of these just sort of delegate to the User service
      $scope.update = function() {
        // pass our user entered data to the server
        User.update($scope.hero)
          .then(function(data){
            //console.log('->', data);
            // update our local hero info
            $scope.hero.author = data.data.author;
            $scope.hero.bio = data.data.bio;

            // set state to a page reload
            $state.go('articles')
            toastr.success('Bio information updated');

          }, function(error){
            toastr.error('There was an error updating your bio information', err);
          });
      };

      $scope.cancel = function(){
          $state.go("articles");
      };

      $scope.isAuthed = function() {
        return User.isAuthed();
      };

      $scope.signin = function() {
        $scope.loginStatusMessage = "Logging in...";
        User.signin($scope.user, function(err){
          if(err) {
            $scope.loginStatusMessage = err;
          } else {
            $scope.loginStatusMessage = "";
          }
        });
      };

      $scope.signout = function() {
        User.signout();
      }
});
