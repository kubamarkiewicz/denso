<?php

session_start();
$_SESSION['pos'] = !$_SESSION['pos'];

echo file_get_contents('get_agv_positions'.($_SESSION['pos'] ? '' : '_2').'.json');