<?php
include_once(getcwd() . '/include.php');
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

<body onload="rootLoad()" ontouchstart="">
  <header>
    <div>
      <h1>Evan's Repo</h1>
    </div>
  </header>

  <main>
    <h2>Automatic Setup</h2>
    <ul>
      <li><a href="cydia://url/https://cydia.saurik.com/api/share#?source=https://repo.evaneliasyoung.com/" role="button" class="cydia_blank">Add to Cydia</a></li>
      <li><a href="sileo://source/https://repo.evaneliasyoung.com/" role="button" class="cydia_blank">Add to Sileo</a></li>
    </ul>

    <h2>Manual Setup</h2>
    <ul>
      <li>
        <p>1. Open Cydia</p>
      </li>
      <li>
        <p>2. Tap the <em>Sources</em> tab</p>
      </li>
      <li>
        <p>3. Tap the <em>Edit</em> button</p>
      </li>
      <li>
        <p>4. Tap the <em>Add</em> button</p>
      </li>
      <li>
        <p>5. Type: <strong>repo.evaneliasyoung.com</strong> or <strong>repo.eey.pw</strong></p>
      </li>
      <li>
        <p>6. Tap <em>Add Source</em></p>
      </li>
      <li>
        <p>7. Profit!</p>
      </li>
    </ul>

    <h2>Tweaks</h2>
    <ul>
      <?php
        foreach ($allTweaks as $bundle => $title) {
            echo '<li><a href="/cydia/' . $bundle . '" role="button" cydia="cydia_blank">' . $title . '</a></li>';
        }
        ?>
    </ul>

    <h2>Social Media</h2>
    <ul>
      <?= getSocials(); ?>
    </ul>
  </main>

  <footer><?= getFooter(); ?></footer>
</body>

</html>
