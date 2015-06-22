<!DOCTYPE html>
<html lang="en">
<head>

  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0">

  <title><?php echo $site->title()->html() ?> | <?php echo $page->title()->html() ?></title>
  <meta name="description" content="<?php echo $site->description()->html() ?>">
  <meta name="keywords" content="<?php echo $site->keywords()->html() ?>">

  <link href='http://fonts.googleapis.com/css?family=Roboto:400,300,700,100' rel='stylesheet' type='text/css'>

  <?php echo css('assets/css/main.css') ?>

</head>
<body<?php if($page->isHomepage()) {echo ' id="homepage"';} ?>>

  <header id="main-header" role="banner">
    <h2<?php if($page->isHomepage()) {echo ' class="home"';} ?>><a class="logo" href="<?php echo url() ?>">Blog</a></h2>
  </header>