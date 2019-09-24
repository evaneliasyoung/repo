<?php
include_once(getcwd() . '/include.php');
dataPathDie();

$out = array(
  'class' => 'DepictionTabView',
  'minVersion' => '0.1',
  'headerImage' => 'https://repo.evaneliasyoung.com/assets/banner.png',
  'tintColor' => '#003366',
  'tabs' => array(
    array(
      'class' => 'DepictionStackView',
      'tabname' => 'Details',
      'views' => array(
        array(
          'class' => 'DepictionScreenshotsView',
          'itemCornerRadius' => 8,
          'itemSize' => '{160, 284}',
          'screenshots' => array()
        ),
        array(
          'class' => 'DepictionSeparatorView'
        ),
        array(
          'markdown' => $data['desc'],
          'useSpacing' => true,
          'class' => 'DepictionMarkdownView'
        ),
        array(
          'class' => 'DepictionSeparatorView'
        ),
        array(
          'title' => 'Information',
          'class' => 'DepictionHeaderView'
        ),
        array(
          'title' => 'Version',
          'text' => $data['changelog'][0]['version'],
          'class' => 'DepictionTableTextView'
        ),
        array(
          'title' => 'Updated',
          'text' => $data['changelog'][0]['date'],
          'class' => 'DepictionTableTextView'
        ),
        array(
          'title' => 'License',
          'text' => 'Free Package',
          'class' => 'DepictionTableTextView'
        ),
        array(
          'title' => 'Supported iOS Versions',
          'text' => $data['minVer'] . '-' . $data['maxVer'],
          'class' => 'DepictionTableTextView'
        ),
        array(
          'class' => 'DepictionSeparatorView'
        ),
        array(
          'title' => 'Social Media',
          'class' => 'DepictionHeaderView'
        )
      )
    ),
    array(
      'class' => 'DepictionStackView',
      'tabname' => 'Changelog',
      'views' => array()
    )
  )
);

if (count($data['screenshots']) > 0) {
  foreach ($data['screenshots'] as $url) {
    array_push($out['tabs'][0]['views'][0]['screenshots'], array(
      'accessibilityText' => 'Screenshot',
      'url' => 'https://repo.eey.pw/assets/tweaks/' . $url
    ));
  }
} else {
  array_splice($out['tabs'][0]['views'], 0, 2);
}

foreach ($socials as $name => $url) {
  array_push($out['tabs'][0]['views'], array(
    'title' => $name,
    'action' => $url,
    'class' => 'DepictionTableButtonView'
  ));
}

array_push($out['tabs'][0]['views'], array(
  'spacing' => 16,
  'class' => 'DepictionSpacerView'
));
array_push($out['tabs'][0]['views'], array(
  'spacing' => 20,
  'class' => 'DepictionSpacerView'
));

foreach ($data['changelog'] as $change) {
  array_push($out['tabs'][1]['views'], array(
    'title' => $change['version'],
    'useBoldText' => true,
    'useBottomMargin' => false,
    'class' => 'DepictionSubheaderView'
  ));
  array_push($out['tabs'][1]['views'], array(
    'markdown' => '<ul><li style="text-indent: -0.25rem; margin-left: -0.25rem">' . implode('</li><li style="text-indent: -0.25rem; margin-left: -0.25rem;">', $change['changes']) . '</li></ul>',
    'useSpacing' => true,
    'useRawFormat' => true,
    'class' => 'DepictionMarkdownView'
  ));
  /*array_push($out['tabs'][1]['views'], array(
    'markdown' => '<small style="color: #999; margin-top: -8px;">' . $change['date'] . '</small>',
    'useSpacing' => true,
    'class' => 'DepictionMarkdownView'
  ));*/
  array_push($out['tabs'][1]['views'], array(
    'class' => 'DepictionSeparatorView'
  ));
}

header('Content-type: application/json');
http_response_code(200);
die(json_encode($out, JSON_UNESCAPED_SLASHES));
?>
