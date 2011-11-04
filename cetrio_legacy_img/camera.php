<?php
function my_shadow($image, $size, $x, $y, $shadow, $textcolor, $font, $str) {
    for ($j = -1; $j <= +1; $j += 1) {
        for ($i = -1; $i <= +1; $i += 1) {
            ImageTTFText($image, $size, 0, $x+$i, $y+$j, $shadow, $font, $str);
        }
    }
    ImageTTFText($image, $size, 0, $x, $y, $textcolor, $font, $str);
}

header("Content-type: image/jpeg");

$id = $_GET['id'];
$caption = $_GET['caption'];

$font = './tahomabd.ttf';
$imgurl = 'http://transito.rio.rj.gov.br/imagens1/'.$id.'.jpg';

$ch = curl_init($imgurl);
try {
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FILETIME, true);

    $imgdata = curl_exec($ch);
    $info = curl_getinfo($ch);
    if ($info['http_code'] == 200) {
        $filetime = $info['filetime'];
        $image = ImageCreateFromString($imgdata);

        $image_sx = ImageSX($image);
        $image_sy = ImageSY($image);

        $black  = ImageColorAllocate($image, 0, 0, 0);
        $yellow = ImageColorAllocate($image, 255, 0xd2, 0);

        $fmtdate = '(desconhecido)';
        if ($filetime != -1) {
            $fmtdate = date('Y-m-d H:i:s', $filetime);
        }
        $fsize = 12;
        $bbox = ImageTTFBBox($fsize, 0, $font, $fmtdate);
        $x = $image_sx - ($bbox[4]-$bbox[6])-6;
        $y = 17;
        my_shadow($image, $fsize, $x, $y, $black, $yellow, $font, $fmtdate);

        if ($caption) {
            $fsize = 10;
            $x = 5;
            $y = $image_sy - 6;
            my_shadow($image, $fsize, $x, $y, $black, $yellow, $font, $caption);
        }

        ImageJpeg($image);
        ImageDestroy($image);
    }
} catch (HttpException $ex) {
    echo $ex;
}
curl_close($ch);
?>
