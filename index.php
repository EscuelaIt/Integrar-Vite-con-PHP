<?php
require_once __DIR__ . '/vendor/autoload.php';

use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

$isDev = $_ENV['APP_ENV'] === 'development';

if($isDev) {
    $scriptSrc = $_ENV['VITE_JS_URL'];
} else {
    $manifest = json_decode(file_get_contents('./dist/.vite/manifest.json'), true);
    $script = $manifest['js/index.js']['file'];
    $scriptSrc = $_ENV['PROD_JS_URL'] . $script;

    $styleFile = $manifest['js/index.js']['css'][0];
    $stylesSrc = $_ENV['PROD_JS_URL'] . $styleFile;
}

?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ejemplo para trabajar con vite</title>
    <?php
        if(!$isDev):
            foreach($manifest['js/index.js']['css'] as $styleFile):
                $stylesSrc = $_ENV['PROD_JS_URL'] . $styleFile; 
    ?>
                <link rel="stylesheet" href="<?= $stylesSrc ?>">
    <?php
            endforeach;
        endif;
    ?>
</head>
<body>
    <h1>Ejemplo de uso de vite con PHP en modo <?= $_ENV['APP_ENV'] ?></h1>

    <countdown-to-year-end></countdown-to-year-end>

    <script type="module" src="<?= $scriptSrc ?>"></script>
</body>
</html>
