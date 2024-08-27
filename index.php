<?php
date_default_timezone_set('Europe/Moscow');
function getTemplate(string $template): false|string
{
    ob_start();
    include(__DIR__.'/src/tpl/' . $template . ".tpl");
    return ob_get_clean();
}
$currencies = [
    'usd' => [
        'active' => true,
        'border' => 'border-bottom-1',
        'cdr' => '$'
    ],
    'eur' => [
        'active' => true,
        'border' => 'border-bottom-1',
        'cdr' => '€'
    ],
    'rub' => [
        'active' => true,
        'border' => 'border-bottom-1',
        'cdr' => '₽'
    ],
    'jpy' => [
        'active' => true,
        'border' => 'border-bottom-1',
        'cdr' => '¥'
    ],
    'gbp' => [
        'active' => true,
        'border' => 'border-bottom-1',
        'cdr' => '£'
    ],
    'aud' => [
        'active' => true,
        'border' => 'border-bottom-1',
        'cdr' => 'AU$'
    ],
    'cad' => [
        'active' => true,
        'border' => 'border-bottom-1',
        'cdr' => 'CA$'
    ],
    'chf' => [
        'active' => true,
        'border' => 'border-bottom-1',
        'cdr' => '₣'
    ],
    'cny' => [
        'active' => true,
        'border' => 'border-bottom-1',
        'cdr' => '¥'
    ],
    'hkd' => [
        'active' => true,
        'border' => 'border-bottom-1',
        'cdr' => 'HK$'
    ],
    'nzd' => [
        'active' => true,
        'border' => '',
        'cdr' => 'NZ$'
    ],
]
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
        <?php
        $main_tpl = getTemplate('main');
        $dropdown_content = '';
        $balance_separator = '<span class="span-money-currency">,';
        $username = 'NAN';
        $balance = 0;
        $current_currency = 'rub';
        if (isset($currencies[$current_currency]))
        {
            $user_currency = [$current_currency, $currencies[$current_currency]];
        }else{
            $user_currency = ['rub', $currencies['rub']];
        }

        $currenciesList = '';
        $currencyTpl = getTemplate('currency');
        foreach ($currencies as $code => $params) {
            if ($params['active']) {
                $currenciesList .= str_replace(array(
                    '{lower_name}',
                    '{border}',
                    '{upper_name}',
                    '{path}'
                ), array(
                    $code,
                    $params['border'],
                    strtoupper($code),
                    'src/flags/' . $code . '.jpg'
                ), $currencyTpl);
            }
        }

        echo str_replace(array(
            '{username}',
            '{current_currency_name}',
            '{current_currency_path}',
            '{dropdown_content}',
            '{current_currency_cdr}',
            '{user_balance}'
        ), array(
            $username,
            strtoupper($user_currency[0]),
            'src/flags/' . $user_currency[0] . '.jpg',
            $currenciesList,
            $user_currency[1]['cdr'],
            number_format($balance, 2, $balance_separator, ' ').'</span>'
        ), $main_tpl);

        ?>
    </div>
    <div class="block-news" id="news-block">
        <div class="block-news-title">
            Новости и предложения
        </div>
        <div class="item-news">
            <img class="item-news-image" alt="" src="src/images/update.jpg">
            <div class="item-news-about">
                <div class="item-news-title">
                    Обновление 0.1.0-dev
                </div>
                <div class="item-news-description">
                    Данное обновление означает только то, что наше приложение наконец официально появилось на GitHub!
                    Разработка идёт очень активно, и в скором времени вы сможете увидеть полную версию кошелька.
                    Наш кошелёк будет интегрирован в наш интернет-магазин для проведения оплаты заказов.
                </div>
            </div>
        </div>
        <div class="block-news-end">
            На этом новости и предложения закончились...
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
            <img src="src/images/duck.gif" alt="">
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