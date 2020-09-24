<?php
require_once "vendor/autoload.php";

define("DEFAULT_URL","https://project2020-93dda.firebaseio.com/");
define("DEFAULT_TOKEN","HDio1eSqvtIzK5raTdBBfQ9SZ5q6YwBdy1Kf8a50");

$test = [];
$test = [
  [
    "name" => "tiyu",
    "age" => 12
  ],
  [
    "name" => "yuu",
    "age" => 17
  ]
];
 
$firebase = new \Firebase\FirebaseLib(DEFAULT_URL,DEFAULT_TOKEN);
 
// set
$firebase->set("/users",$test);
 
// get
$user = $firebase->get("/users");
 
echo $user;