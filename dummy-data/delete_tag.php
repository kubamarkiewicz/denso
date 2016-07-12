<?php

$data = json_decode(file_get_contents('get_tags.json'));

if ($_GET['Id']) {
	unset($data->Get_TagsResult->{$_GET['Id']});
}

file_put_contents('get_tags.json', json_encode($data, JSON_PRETTY_PRINT));
