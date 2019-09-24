<?php
include_once(getcwd() . '/include.php');
dataPathDie();
?>

<!DOCTYPE html>
<html>

<head>
  <title>Evan's Repo</title>

  <meta name="author" content="Evan Elias Young">
  <meta name="description" content="Where I host my Cydia tweaks">
  <meta name="keywords" content="jailbreak, Evan, code, cydia">
  <meta name="copyright" content="&copy; 2017-2019 Evan Young">
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, minimum-scale=1, user-scalable=no, minimal-ui, viewport-fit=cover">
  <meta name="robots" content="index, nofollow">
  <meta name="html-valid" content="HTML5, ARIA, SVG1.1, MathML 2.0">
  <meta name="css-valid" content="CSSL 3">
  <meta name="lighthouse" content="281; A+">
  <link rel="stylesheet" type="text/css" href="/styles.css">  <script src="/scripts.js" charset="utf-8"></script>

  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="default">
  <meta name="apple-mobile-web-app-title" content="Evan's Repo">

  <link rel="apple-touch-icon" sizes="180x180" href="/assets/favicon/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon/favicon-16x16.png">
  <link rel="manifest" href="/assets/favicon/site.webmanifest">
  <link rel="mask-icon" href="/assets/favicon/safari-pinned-tab.svg" color="#5BBAD5">
  <link rel="shortcut icon" href="/assets/favicon/favicon.ico">
  <meta name="msapplication-TileColor" content="#2B5797">
  <meta name="msapplication-config" content="/assets/favicon/browserconfig.xml">
  <meta name="navto" content="home">
</head>

<body ontouchstart="">
  <header>
    <div>
      <a href="/cydia/<?= $_GET['repo']; ?>"><?= $data['title'] ?></a>
      <h1>Screenshots</h1>
    </div>
  </header>

  <main>
    <ul style="list-style: none;">
    <?php
    foreach ($data['screenshots'] as $url) {
      echo '<li><img src="/assets/tweaks/' . $url . '" class="screenshot-image"></li>';
    }
    ?>
    </ul>
  </main>

  <footer><?= getFooter(); ?></footer>
</body>

</html>
