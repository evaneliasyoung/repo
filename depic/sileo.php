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

foreach ($data['changelog'] as $change) {
  array_push($out['tabs'][1]['views'], array(
    'title' => $change['version'],
    'useBoldText' => true,
    'useBottomMargin' => true,
    'class' => 'DepictionSubheaderView'
  ));
  array_push($out['tabs'][1]['views'], array(
    'markdown' => '<ul><li>' . implode('</li><li>', $change['changes']) . '</li></ul>',
    'useSpacing' => false,
    'class' => 'DepictionMarkdownView'
  ));
  array_push($out['tabs'][1]['views'], array(
    'markdown' => '<small style="color: #999; margin-top: -8px;">' . $change['date'] . '</small>',
    'useSpacing' => true,
    'class' => 'DepictionMarkdownView'
  ));
}

$socialArray = array();
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

header('Content-type: application/json');
http_response_code(200);
die(json_encode($out, JSON_UNESCAPED_SLASHES));
?>
