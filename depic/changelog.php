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
      <a href="/cydia/<?= $_GET['repo']; ?>"><?= $data['title'] ?></a>
      <h1>Full Changelog</h1>
    </div>
  </header>

  <main>
    <ul style="list-style: none;">
    <?php
    foreach ($data['changelog'] as $chg) {
      echo '<li>' .
      '<p><strong>Changes in Version ' . $chg['version'] . '</strong><span class="fright">' . $chg['date'] . '</span></p>' .
      '<p></p>' .
      '<ul><li>' . implode('</li><li>', $chg['changes']) . '</li></ul>' .
      '</li>';
    }
    ?>
    </ul>
  </main>

  <footer><?= getFooter(); ?></footer>
</body>

</html>
