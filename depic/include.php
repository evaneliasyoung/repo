<?php

$COPYRIGHT = '&copy; Evan Elias Young 2017-' . date('Y');

function loadAllTweaks() {
  global $allTweaks;
  $allTweaks = json_decode(file_get_contents(getcwd() . '/assets/data/all.json'), true);
  asort($allTweaks, SORT_FLAG_CASE | SORT_NATURAL);
}

function loadSocials() {
  global $socials;
  $socials = json_decode(file_get_contents(getcwd() . '/assets/data/socials.json'), true);
}

function loadVersion() {
  global $version;
  $ua = $_SERVER['HTTP_USER_AGENT'];
  $version = 'Unknown';

  if (strpos($ua, ' OS ') !== false && strpos($ua, ' like') !== false) {
    $version = str_replace('_', '.', substr($ua, strpos($ua, ' OS ') + 4, strpos($ua, ' like') - strpos($ua, ' OS ') - 4));
  }
}

function isCydia() {
  return !!strpos($_SERVER['HTTP_USER_AGENT'], 'Cydia/');
}

function isZebra() {
  return !!strpos($_SERVER['HTTP_USER_AGENT'], 'Zebra (Cydia)');
}

function getDisplayMode() {
  if (isZebra()) {
    if (strpos($_SERVER['HTTP_USER_AGENT'], 'Zebra (Cydia) Dark Oled')) {
      return 'oled';
    }
    if (strpos($_SERVER['HTTP_USER_AGENT'], 'Zebra (Cydia) Dark')) {
      return 'dark';
    }
  }
  return 'light';
}

function dataPathDie() {
  global $path, $data;

  $path = getcwd() . '/assets/data/' . $_GET['repo'] . '.json';

  if (empty($_GET['repo'])) {
    http_response_code(404);
    die();
  }

  if (!file_exists($path)) {
    http_response_code(404);
    die();
  }

  $data = json_decode(file_get_contents($path), true);
}

function getFooter() {
  global $allTweaks, $version;

  return 'Hosting ' . count(array_keys($allTweaks)) . ' Packages' .
  '<br>' .
  'iOS ' . $version .
  '<br>' .
  $COPYRIGHT;
}

function compareVersion($a, $b) {
  $liA = explode('.', $a);
  $liB = explode('.', $b);

  array_push($liA, 0, 0, 0);
  array_push($liB, 0, 0, 0);

  for ($i = 0; $i < 3; $i++) {
    if ($liA[$i] > $liB[$i]) {
      return 1;
    }
    if ($liA[$i] < $liB[$i]) {
      return -1;
    }
  }

  return 0;
}

function getCompat() {
  global $data, $version;
  if ($version === 'Unknown') {
    return 'Unknown';
  }

  return compareVersion($version, $data['minVer']) >= 0 && compareVersion($version, $data['maxVer']) <= 0 ? 'Yes' : 'No';
}

function getSocials() {
  global $socials;
  $ret = '';
  foreach ($socials as $name => $url) {
    $ret .= '<li><a href="' . $url . '" role="button">' . $name . '</a></li>';
  }
  return $ret;
}

loadAllTweaks();
loadSocials();
loadVersion();
?>
