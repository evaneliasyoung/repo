<?php

$COPYRIGHT = '&copy; Evan Elias Young 2017-' . date('Y');
$URL = 'https://repo.evaneliasyoung.com/';
$ua = $_SERVER['HTTP_USER_AGENT'];

function loadAllTweaks() {
  global $allTweaks;

  $allTweaks = json_decode(file_get_contents(getcwd() . '/assets/data/all.json'), true);
  asort($allTweaks, SORT_FLAG_CASE | SORT_NATURAL);
}

function loadSocials() {
  global $socials;

  $socials = json_decode(file_get_contents(getcwd() . '/assets/data/socials.json'), true);
}

function loadDevice() {
  global $device, $ua;

  $machineid = json_decode(file_get_contents(getcwd() . '/assets/data/machineid.json'), true);
  $device = 'Device Unknown';

  if (isset($_SERVER['HTTP_X_MACHINE']) && array_key_exists($_SERVER['HTTP_X_MACHINE'], $machineid)) {
    $device = $machineid[$_SERVER['HTTP_X_MACHINE']];
  } elseif (!!strpos($ua, 'iPhone')) {
    $device = 'iPhone';
  } elseif (!!strpos($ua, 'iPad')) {
    $device = 'iPad';
  } elseif (!!strpos($ua, 'iPod')) {
    $device = 'iPod';
  }
}

function loadVersion() {
  global $version, $ua;

  $version = 'Unknown';

  if (isset($_SERVER['HTTP_X_FIRMWARE'])) {
    $version = $_SERVER['HTTP_X_FIRMWARE'];
  } elseif (!!strpos($ua, ' OS ') && !!strpos($ua, ' like')) {
    $version = str_replace('_', '.', substr($ua, strpos($ua, ' OS ') + 4, strpos($ua, ' like') - strpos($ua, ' OS ') - 4));
  }
}

function loadManager() {
  global $manager;

  if (!!strpos($_SERVER['HTTP_USER_AGENT'], 'Zebra (Cydia)')) {
    $manager = 'zebra';
  }
  elseif (!!strpos($_SERVER['HTTP_USER_AGENT'], 'Cydia/')) {
    $manager = 'cydia';
  } else {
    $manager = 'unknown';
  }
}

function loadDisplayMode() {
  global $manager, $display;

  if ($manager === 'zebra') {
    if (isset($_SERVER['HTTP_OLED']) && $_SERVER['HTTP_OLED'] === 'YES') {
      $display = 'oled';
    } elseif (isset($_SERVER['HTTP_DARK'])  && $_SERVER['HTTP_DARK'] === 'YES') {
      $display = 'dark';
    } else {
      $display = 'light';
    }
  } else {
    $display = 'light';
  }
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

function getFooter() {
  global $allTweaks, $version, $manager, $device, $COPYRIGHT;

  return 'Hosting ' . count(array_keys($allTweaks)) . ' Packages' .
  '<br>' .
  $device . ' - iOS ' . $version .
  '<br>' .
  $COPYRIGHT;
}

loadAllTweaks();
loadSocials();
loadDevice();
loadVersion();
loadManager();
loadDisplayMode();
?>
