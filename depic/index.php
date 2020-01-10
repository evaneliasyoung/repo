<?php
include_once(getcwd() . '/include.php');
?>

<!DOCTYPE html>
<html lang="en" class="<?= $GLOBALS['display'] ?> <?= $GLOBALS['manager']; ?>">

<head>
  <?php include_once(getcwd() . '/head.php'); ?>
</head>

<body ontouchstart="">
  <header>
    <div>
      <h1>Evan's Repo</h1>
    </div>
  </header>

  <main>
    <h2>Automatic Setup</h2>
    <ul>
      <li><a href="cydia://url/https://cydia.saurik.com/api/share#?source=<?= $GLOBALS['URL'] ?>" role="button" class="cydia_blank">Add to Cydia</a></li>
      <li><a href="zbra://sources/add/<?= $GLOBALS['URL'] ?>" role="button" class="cydia_blank">Add to Zebra</a></li>
      <li><a href="sileo://source/<?= $GLOBALS['URL'] ?>" role="button" class="cydia_blank">Add to Sileo</a></li>
    </ul>

    <h2>Cydia Setup</h2>
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

    <h2>Zebra Steup</h2>
    <ul>
      <li>
        <p>1. Open Zebra</p>
      </li>
      <li>
        <p>2. Tap the <em>Sources</em> tab</p>
      </li>
      <li>
        <p>3. Tap the <em>+</em> button</p>
      </li>
      <li>
        <p>5. Type: <strong>repo.evaneliasyoung.com</strong> or <strong>repo.eey.pw</strong></p>
      </li>
      <li>
        <p>5. Tap <em>Add</em></p>
      </li>
      <li>
        <p>6. Profit!</p>
      </li>
    </ul>

    <h2>Sileo Setup</h2>
    <ul>
      <li>
        <p>1. Open Sileo</p>
      </li>
      <li>
        <p>2. Tap the <em>Sources</em> tab</p>
      </li>
      <li>
        <p>3. Tap the <em>+</em> button</p>
      </li>
      <li>
        <p>4. Type: <strong>repo.evaneliasyoung.com</strong> or <strong>repo.eey.pw</strong></p>
      </li>
      <li>
        <p>5. Tap <em>Add Source</em></p>
      </li>
      <li>
        <p>6. Profit</p>
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
