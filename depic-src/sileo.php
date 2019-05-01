<?php

if (empty($_GET['repo'])) {
    http_response_code(404);
    die();
}

$path = getcwd() . '/assets/data/' . $_GET['repo'] . '.json';
if (!file_exists($path)) {
    http_response_code(404);
    die();
}

$data = json_decode(file_get_contents($path), true);
$out = array(
    'minVersion' => '0.1',
    'headerImage' => '',
    'tintColor' => '#003366',
    'tabs' => array(
        array(
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
                ),
                array(
                    'title' => 'Donate to Further Development',
                    'action' => 'https://paypal.me/DocCodes',
                    'class' => 'DepictionTableButtonView'
                ),
                array(
                    'title' => 'Follow on Twitter',
                    'action' => 'https://eey.pw/@',
                    'class' => 'DepictionTableButtonView'
                ),
                array(
                    'title' => 'View on GitHub',
                    'action' => 'https://eey.pw/<>',
                    'class' => 'DepictionTableButtonView'
                ),
                array(
                    'title' => 'View on Reddit',
                    'action' => 'https://eey.pw/^_^',
                    'class' => 'DepictionTableButtonView'
                ),
                array(
                    'spacing' => 16,
                    'class' => 'DepictionSpacerView'
                ),
                array(
                    'spacing' => 20,
                    'class' => 'DepictionSpacerView'
                )
            ),
            'class' => 'DepictionStackView'
        ),
        array(
            'tabname' => 'Changelog',
            'views' => array()
        )
    ),
    'class' => 'DepictionTabView'
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

header('Content-type: application/json');
http_response_code(200);
die(json_encode($out, JSON_UNESCAPED_SLASHES));

?>
