<?php

require "vendor/autoload.php";  // Ensure this path is correct

use GeminiAPI\Client;
use GeminiAPI\Resources\Parts\TextPart;

$data = json_decode(file_get_contents("php://input"));
$text = $data->text;

$client = new Client("AIzaSyCDL89UL8h7SSXUNTcolArbATstfe4BbbQ");

$response = $client->geminiPro()->generateContent(new TextPart($text));  

echo $response->text();
?>
