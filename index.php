<?php 

$json = file_get_contents('http://ddragon.leagueoflegends.com/cdn/5.18.1/data/en_US/champion.json');
$champions = json_decode($json);
?>

<?php

$championsArray = array();
foreach($champions->data as $champion){
  $championsArray[] = $champion->id;
}
shuffle($championsArray);
$speed = 1000;
$count = count($championsArray);
?>
<!DOCTYPE html>
<html lang="en" class="demo1 no-js">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
    <title>Last pick - Who should i use as support</title>
    <meta name="description" content="Rotating text is a very simple idea where you can add more content to a text area without consuming much space by rotating an individual word with a collection of others" />
    <meta name="keywords" content="League of legends, Last Pick< Support" />
    <meta name="author" content="Mike Wright" />
    <link rel="stylesheet" type="text/css" href="style.css" />
    <link href='https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,200italic' rel='stylesheet' type='text/css'>
    
        <script type="text/javascript" src="http://code.jquery.com/jquery-1.9.1.js"></script>
      <link rel="stylesheet" href="jquery.wordrotator.css">
      <script src="jquery.wordrotator.js"></script>

  </head>
  <body class="main">
  <h1> Last pick - Who should i play as support? </h1>
    <div class="container">
    <p><h1 id="myWords"></h1>
    </p>
    <div class="click"> <button class="button" href="#" onclick="erm()">Go!</button>
    </div>
</div>
    
<script type="text/javascript">
</script>
  
    
  </body>
</html>