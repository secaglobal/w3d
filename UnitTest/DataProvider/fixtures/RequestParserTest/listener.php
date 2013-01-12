<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$request = arr_md5(array_intersect_key($_REQUEST, array_flip(array('model', 'filter', 'action'))));

$exp = arr_md5(array(
  'action' => 'list',
  'filter' => array(
    'where' => array(
      'id' => "7"
    )
  )
));

if ($request == $exp) {
  echo json_encode(array('status' => true, 'response' => array(
    array('id' => 7),
  )));
}

function arr_md5($array) {
  deepKSort($array);

  return md5(serialize($array));
}

function deepKSort(&$array) {
    ksort($array);

    foreach ($array as $k => $v) {
      if (is_array($array[$k])) {
        deepKSort($array[$k]);
      }
    }
  }