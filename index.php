<?php
date_default_timezone_set('Europe/Moscow');
function getTemplate(string $template): false|string
{
    ob_start();
    include(__DIR__.'/src/tpl/' . $template . ".tpl");
    return ob_get_clean();
}
?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <link href="src/css/main.css" rel="stylesheet">
    <link rel="icon" type="image/png" href="src/images/logo.png">
    <title>EATHER Wallet - Удобный кошелёк</title>
</head>
<body>
<div class="container-main" id="content"  hidden="hidden" style="display: none;">
    <div class="block-main" id="main-block">
        <div class="block-hello">
            Добрый день, Lucky!
            <div class="block-notify" id="block-notify">
            </div>
        </div>
        <div class="block-balance">
            <div class="block-currency" id="currency-change" onclick="openDropDown()">
                <span id="current-currency-name">RUB</span>
                <img src="src/flags/rub.jpg" id="current-currency-image" class="currency-image" alt="">
            </div>
            <div id="changeCurrencyDropdown" class="dropdown-content">
                <div id="usd-dropdown-currency" class="block-currency-dropdown border-bottom-1" onclick="changeCurrentCurrency(this)">
                    <span>USD</span>
                    <img src="src/flags/usd.jpg" class="currency-image" alt="">
                </div>
                <div id="eur-dropdown-currency" class="block-currency-dropdown border-bottom-1" onclick="changeCurrentCurrency(this)">
                    <span>EUR</span>
                    <img src="src/flags/eur.jpg" class="currency-image" alt="">
                </div>
                <div id="rub-dropdown-currency" class="block-currency-dropdown border-bottom-1" onclick="changeCurrentCurrency(this)">
                    <span>RUB</span>
                    <img src="src/flags/rub.jpg" class="currency-image" alt="">
                </div>
                <div id="jpy-dropdown-currency" class="block-currency-dropdown border-bottom-1" onclick="changeCurrentCurrency(this)">
                    <span>JPY</span>
                    <img src="src/flags/jpy.jpg" class="currency-image" alt="">
                </div>
                <div id="gbp-dropdown-currency" class="block-currency-dropdown border-bottom-1" onclick="changeCurrentCurrency(this)">
                    <span>GBP</span>
                    <img src="src/flags/gbp.jpg" class="currency-image" alt="">
                </div>
                <div id="aud-dropdown-currency" class="block-currency-dropdown border-bottom-1" onclick="changeCurrentCurrency(this)">
                    <span>AUD</span>
                    <img src="src/flags/aud.jpg" class="currency-image" alt="">
                </div>
                <div id="cad-dropdown-currency" class="block-currency-dropdown border-bottom-1" onclick="changeCurrentCurrency(this)">
                    <span>CAD</span>
                    <img src="src/flags/cad.jpg" class="currency-image" alt="">
                </div>
                <div id="chf-dropdown-currency" class="block-currency-dropdown border-bottom-1" onclick="changeCurrentCurrency(this)">
                    <span>CHF</span>
                    <img src="src/flags/chf.jpg" class="currency-image" alt="">
                </div>
                <div id="cny-dropdown-currency" class="block-currency-dropdown border-bottom-1" onclick="changeCurrentCurrency(this)">
                    <span>CNY</span>
                    <img src="src/flags/cny.jpg" class="currency-image" alt="">
                </div>
                <div id="hkd-dropdown-currency" class="block-currency-dropdown border-bottom-1" onclick="changeCurrentCurrency(this)">
                    <span>HKD</span>
                    <img src="src/flags/hkd.jpg" class="currency-image" alt="">
                </div>
                <div id="nzd-dropdown-currency" class="block-currency-dropdown" onclick="changeCurrentCurrency(this)">
                    <span>NZD</span>
                    <img src="src/flags/nzd.jpg" class="currency-image" alt="">
                </div>
            </div>
            <div class="block-money" id="block_money">
                <span id="money-currency" class="span-money-currency">₽</span>
                <span id="money-balance">100,00</span>
            </div>
            <!--<div class="block-money-notify">
                -300,00 ₽ за покупку в EATHER
            </div>-->
        </div>
    </div>
    <div class="block-history" id="history-block" hidden="hidden">
        <?php
        $transactions = '';
        $transaction_tpl = getTemplate('transaction');
        $expenses = 0;
        $receipts = 0;
        $history = getTemplate('history');
        for ($i = 0; $i < 7; $i++) {
            $expenses += 299;
            $transactions .= str_replace(array(
                '{path}',
                '{name}',
                '{type}',
                '{date}',
                '{amount}',
                '{receipt}'
            ), array(
                'src/images/spotify.png',
                'Spotify',
                'Подписка',
                date('d.m.Y H:i'),
                '- '.number_format(299, 2, ',', ' ').' ₽',
                ''
            ), $transaction_tpl);
        }
        $month = 'Август';
        $expenses = number_format($expenses, 2, ',', ' ').' ₽';
        $receipts = number_format($receipts, 2, ',', ' ').' ₽';;
        echo str_replace(array(
            '{month}',
            '{expenses}',
            '{receipts}',
            '{transactions}'
        ), array(
            $month,
            $expenses,
            $receipts,
            $transactions
        ), $history);
        ?>
    </div>
    <div class="block-navigation">
        <img src="src/svg/home.svg" alt="" id="nav-home" onclick="setBlock(this.id);">
        <img src="src/svg/swap.svg" alt="" id="nav-swap" onclick="setBlock(this.id);">
        <img src="src/svg/history.svg" alt="" id="nav-history" onclick="setBlock(this.id);">
        <img src="src/svg/bell.svg" alt="" id="nav-bell" onclick="setBlock(this.id);">
        <img src="src/svg/settings.svg" alt="" id="nav-settings" onclick="setBlock(this.id);">
    </div>
</div>
<div class="no-support-device" hidden id="no-support" style="display: none;">
    <div class="no-support-container">
        <div class="no-support-message">
            <img src="src/images/duck.gif">
            <div>
                Извините, наше приложение не поддерживается на вашем устройстве :(
            </div>
        </div>
    </div>
</div>

<div id="js">
    <script src="src/js/jquery.min.js"></script>
    <script src="src/js/imgcolr.html5.min.js"></script>
    <script src="https://www.cbr-xml-daily.ru/money.js"></script>
    <script src="src/js/main.js"></script>
</div>
</body>