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
