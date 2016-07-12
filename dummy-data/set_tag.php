<?php

$data = json_decode(file_get_contents('get_tags.json'));

$tag = new stdClass();
$tag->Id = $_GET['Id'];
$tag->X = $_GET['X'];
$tag->Y = $_GET['Y'];
$tag->IsVertical = $_GET['IsVertical'];

if ($tag->Id) {
	$data->Get_TagsResult->{$_GET['Id']} = $tag;
}

file_put_contents('get_tags.json', json_encode($data, JSON_PRETTY_PRINT));
