<?php
header("Content-type: text/html");

$id = 21; //$_GET['id'];

$trafficurl = 'http://transito.rio.rj.gov.br/iframeTrechosCamera.cfm?codigo=' . $id;

$ch = curl_init($trafficurl);
#echo '<html><head><link type="text/css" rel="stylesheet" href="default.css" /></head><body>';
try {
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $trafficdata = curl_exec($ch);
    $info = curl_getinfo($ch);
    if ($info['http_code'] == 200) {
        preg_match('%<table.*?>.*?</table>%is', $trafficdata, $matches);
        $result = preg_replace('%<img src=".*?title="%is', '(', $matches[0]);
        $result = preg_replace('%" />%is', ')&nbsp;', $result);
        $result = preg_replace('%<.*?>%is', '', $result);
        $result = preg_replace('%(\n|\r)%is', '', $result);
        $result = preg_replace('%\s{3,}%is', '<br/>', trim($result));
        echo trim($result);
    }
} catch (HttpException $ex) {
    echo $ex;
}
#echo '</body></html>';
curl_close($ch);
?>
