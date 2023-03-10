var app = angular.module("myapp", []);

app.controller("productController", productController)

function productController($scope, $http){

    $scope.products = []
    $scope.product ={id:0,ten:"", gia:0}

    $http.get("http://localhost:3000/products").then(function(response){
        $scope.products = response.data
    })

    $scope.submit = -1;

    $scope.save = function(event){
        event.preventDefault() 
        if($scope.submit == -1){
            $http.post("http://localhost:3000/products", $scope.product).then(
                $scope.products.push($scope.product)
            ) 
        }else{
            $http.put('http://localhost:3000/products' +"/"+ $scope.product.id ,$scope.product ).then(
                $scope.products.splice($scope.submit,1,$scope.product)
                
            )
                
            $scope.submit = -1
        }
    }

    $scope.clear = function(event){
        event.preventDefault()
        $scope.submit = -1;
        $scope.product={
            name:"",
            price:0
        }
    }

    $scope.sua = function(event, index){
        event.preventDefault()
        $scope.product =  $scope.products[index]
        $scope.submit = index;
    }

    $scope.delete = function(event, index){
        event.preventDefault()
        $scope.product =  $scope.products[index]
        $http.delete("http://localhost:3000/products" +"/"+ $scope.product.id ).then(
            $scope.products.splice(index,1)
        )
    }
}