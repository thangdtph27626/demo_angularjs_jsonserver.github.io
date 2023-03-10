<p align="center">
 <h2 align="center"> CRUD trong Angular JS với Jsonserver</h2>
</p>

<div align="center">
 <table >
  <theader>
  <th>
   Nội Dung 
   </th>
   </theader>
  <tbody>
  <td>
   <a href="#WhatisAngularJS">1: AngularJS là gì?</a> </br>
   <a href="#WhatisJsonServer">2: JSON SERVER là gì?</a> </br>
  <a href="#WhatisAngularJS">3: Hoạt Động CRUD là gì?</a> </br>
   <a href="#WhatisAngularJS">4:Triển khai crud trong Angularjs với Json-server?</a>
   </td>
   </tbody>
   </table>
</div>

<h1 id="WhatisAngularJS">AngularJS là gì?</h1>

AngularJS là một khung phát triển giao diện người dùng mã nguồn mở triển khai kiến trúc MVVM (Model-View-ViewModel). AngularJS dựa trên JavaScript. Nó được duy trì bởi Google và được cho là một trong những framework phổ biến nhất. Điều này chủ yếu là do nó nhận được sự hỗ trợ tuyệt đối từ Google và kết hợp các xu hướng thị trường mới nhất. AngularJS chủ yếu được sử dụng để phát triển các ứng dụng một trang hoặc SPA. /

<h1 id="WhatisJsonServer">JSON SERVER là gì?</h1>

JSON là viết tắt cho " JavaScript Object Notation "\
Một cách sử dụng phổ biến của JSON là trao đổi dữ liệu đến từ một máy chủ web.\
JSON chẳng qua là một định dạng tệp chuẩn mở và định dạng trao đổi dữ liệu.\
 JSON Server là một Node Module mà bạn có thể sử dụng để tạo các dịch vụ JSON REST demo trong một khoảng thời gian ngắn.
 
 > bạn có thể đọc thêm về json [tại đây](https://www.npmjs.com/package/json-server)
 
 <h1 id="WhatisJsonServer"> Hoạt Động CRUD là gì?</h1>
 
 CRUD về cơ bản là viết tắt của Tạo Đọc Cập nhật Xóa dữ liệu khỏi máy chủ hoặc Cơ sở dữ liệu.
 
  <h1 id="WhatisJsonServer"> Triển khai crud trong Angularjs với Json-server?</h1>
  
  ## Cấu trúc file 
  
  ![image](https://user-images.githubusercontent.com/109157942/224309790-eb1198c9-9f53-4da4-8ff9-6a3dac604f5e.png)


  ## Tạo Json server 
  
  tạo file data.json với một số dữ liệu 
  
  ```
  
{
    "products":[
        {"id": 0, "ten":"Áo 1", "gia":12222},
        {"id": 1, "ten":"Áo 2", "gia":22222}
    ]
}
    
  ```
  
  Bắt đầu máy chủ JSON
  
  ```
  json-server --watch data.json
  ```
  
> các API thao tác

<table>
                    <thead>
                        <th>method</th>
                        <th>url</th>
                        <th>code</th>
                        <th>respone</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td><a href="#getAll">GET</a></td>
                            <td>/products</td>
                            <td>200</td>
                            <td>List</td>
                        </tr>
                        <tr>
                            <td><a href="#post">POST</a></td>
                            <td>/products</td>
                            <td>201</td>
                            <td>products</td>
                        </tr>
                        <tr>
                            <td><a href="#put">PUT</a></td>
                            <td>/products/:id</td>
                            <td>200</td>
                            <td>products</td>
                        </tr>
                        <tr>
                            <td><a href="#delete">DELETE</a></td>
                            <td>/products/:id</td>
                            <td>200</td>
                            <td>products</td>
                        </tr>
          </tbody>
</table>


<h2 id="getAll"> Hiển thị dữ liệu lên trên table </h2>

> index.html

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./public/bootstrap.min (1).css">
    <title>Document</title>
</head>
<body ng-app="myapp">
    <div class="" ng-controller="productController">


        <!-- hiển thị sản phẩm -->
        <table class="table align-middle">
            <thead>
              <th>stt</th>
              <th>tên</th>
              <th>giá</th>
              <th colspan="2">Hành động</th>
            </thead>
            <tbody>
              <tr ng-repeat="product in products">
                <td>{{$index +1}}</td>
                <td>{{product.ten}}</td>
                <td>{{product.gia}}</td>
                <td><button ng-click="sua($event,$index)" class="btn btn-primary">update</button></td>
                <td><button ng-click="delete($event,$index)" class="btn btn-danger"> delete</button></td>
              </tr>
            </tbody>
          </table>
    </div>
    
    <script src="./public/bootstrap.min.js"></script>
    <script src="./public/angular.min.js"></script>
    <script src="main.js"></script>
</body>
</html>

```

> main.js

```

var app = angular.module("myapp", []);

app.controller("productController", productController)

function productController($scope, $http){

    $scope.products = []

    $http.get("http://localhost:3000/products").then(function(response){
        $scope.products = response.data
    })
}

```
  
<h2 id="post"> Thêm mới sản phẩm  </h2>
  
 > index.html 
 
 tạo form thêm mới sản phẩm 
 
 ```
 
 <form name="form_product">
            <h2>Quản lý sản phẩm</h2>
            <div class="modal-body">
              <div class="mb-3 row">
                <label for="exampleInputEmail1" class="form-label col-2">Tên sản phẩm</label>
                <div class="col-10">
                  <input type="text" class="form-control" name="ten" id="exampleInputEmail1" required ng-model="product.ten"
                    aria-describedby="emailHelp">
                  <span class="text-danger" ng-show="form_product.ten.$invalid && form_product.ten.$touched">
                    Không được để trống
                  </span>
        
                </div>
              </div>
              <div class="mb-3 row">
                <label for="exampleInputPassword1" class="form-label col-2">giá</label>
                <div class="col-10">
                  <input type="number" class="form-control" name="gia" id="exampleInputPassword1" required
                    ng-model="product.gia">
                  <span class="text-danger" ng-show="form_product.gia.$error.number && form_product.gia.$touched">
                    Phải nhập số
                  </span>
                  <span class="text-danger" ng-show="form_product.gia.$error.required && form_product.gia.$touched">
                    Không được để trống
                  </span>
                </div>
              </div>
              <div class="modal-footer ">
                <button type="submit" class="btn btn-primary" ng-click="save($event)">Save changes</button>
              </div>
          </form>
 
 ```
 
 > main.js
 
 ```
 
  $scope.product ={id:0,ten:"", gia:0}
 
  $scope.save = function(event){
        event.preventDefault()
        if($scope.form_product.$valid){ // kiểm tra validate form 
                $http.post("http://localhost:3000/products", $scope.product).then(
                    $scope.products.push($scope.product)
                ) 
        }else{
            $scope.message = "vui lòng không bỏ trống"
        }
    }
 
 ```
 
  
  
 <h2 id="put"> Sửa sản phẩm  </h2> 
 
 > index.html 
 
 thêm button sửa trong table 
 
 ```
 
 <td><button ng-click="sua($event,$index)" class="btn btn-primary">update</button></td>
 
 ```
 
 >  main.js
 
 ```
 // vị trí của sản phẩm trong mảng sản phẩm 
 $scope.submit = -1;
 
 // hiển thị dữ liệu lên trên form 
 
 $scope.sua = function(event, index){
        event.preventDefault()
        $scope.product =  $scope.products[index]
        // update vị trí của sản phẩm trong mảng 
        $scope.submit = index;
    }
    
    $scope.save = function(event){
        event.preventDefault() 
        // nếu vị trí của sản phẩm là -1 thì thêm mới và ngược lại
        if($scope.submit == -1){
            $http.post("http://localhost:3000/products", $scope.product).then(
                $scope.products.push($scope.product)
            ) 
        }else{
            $http.put('http://localhost:3000/products' +"/"+ $scope.product.id ,$scope.product ).then(
                $scope.products.splice($scope.submit,1,$scope.product)
                
            )
                // update lại vị trí cảu mảng là -1 
            $scope.submit = -1
        }
    }
 
 ```
  
  <h2 id="delete"> xóa sản phẩm  </h2> 
   
> index.js 
   
 thêm button xóa trong table 
  
 ```
 
  <td><button ng-click="delete($event,$index)" class="btn btn-danger"> delete</button></td>
 
 ```
    
    
> main.js
    
    
```
    
     $scope.delete = function(event, index){
        event.preventDefault()
        $scope.product =  $scope.products[index]
        $http.delete("http://localhost:3000/products" +"/"+ $scope.product.id ).then(
            $scope.products.splice(index,1)
        )
    }
    
 ```
    
    

> toàn bộ code trong bài viết có thể lấy [tại đây] (https://github.com/thangdtph27626/demo_angularjs_jsonserver.github.io)
    
   
  
