<?php
include_once(getcwd() . '/include.php');
dataPathDie();
?>

<!DOCTYPE html>
<html lang="en" class="<?= $GLOBALS['display'] ?> <?= $GLOBALS['manager']; ?>">

<head>
  <?php include_once(getcwd() . '/head.php'); ?>
</head>

<body ontouchstart="">
  <header>
    <div>
      <a href="/">Repo</a>
      <h1><?= $data['title'] ?></h1>
    </div>
  </header>

  <main>
    <h2>Description</h2>
    <ul>
      <li><?= $data['desc'] ?></li>
      <li>
        <strong>Compatible</strong>
        <span class="fright"><?= getCompat(); ?></span>
      </li>
      <?php
        if (count($data['screenshots']) > 0) {
          echo '<li><a href="/screenshots/' . $_GET['repo'] . '" role="button" class="cydia_blank">View Screenshots</a></li>';
        }
      ?>
    </ul>

    <h2>Information</h2>
    <ul class="tablelike">
      <li>
        <span>Version</span>
        <span><?= $data['changelog'][0]['version'] ?></span>
      </li>
      <li>
        <span>Updated</span>
        <span><?= $data['changelog'][0]['date'] ?></span>
      </li>
      <li>
        <span>License</span>
        <span>Free Package</span>
      </li>
      <li>
        <span>Supported iOS Versions</span>
        <span><?= $data['minVer']; ?>-<?= $data['maxVer']; ?></span>
      </li>
      <li>
        <span>Compatible</span>
        <span><?= getCompat(); ?></span>
      </li>
    </ul>

    <h2>Changelog</h2>
    <ul>
      <li>
        <p>
          <strong>Changes in Version <?= $data['changelog'][0]['version'] ?></strong>
          <span class="fright"><?= $data['changelog'][0]['date']; ?></span>
        </p>
        <p>
          <ul><li><?= implode('</li><li>', $data['changelog'][0]['changes']) ?></li></ul>
        </p>
      </li>
      <li>
        <a href="/changelog/<?= $_GET['repo'] ?>" role="button" class="cydia_blank">Full Changelog</a>
      </li>
    </ul>

    <h2>HEADERS</h2>
    <ul>
      <?php

        foreach (getallheaders() as $key => $value) {
          echo '<li><p>' . '<strong>' . $key . '</strong>' . '<span class="fright">' . $value . '</span>' . '</p></li>';
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
