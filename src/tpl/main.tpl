<div class="block-hello">
    Добрый день, {username}!
    <div class="block-notify" id="block-notify">
    </div>
</div>
<div class="block-balance">
    <div class="block-currency" id="currency-change" onclick="openDropDown()">
        <span id="current-currency-name">{current_currency_name}</span>
        <img src="{current_currency_path}" id="current-currency-image" class="currency-image" alt="">
    </div>
    <div id="changeCurrencyDropdown" class="dropdown-content">
        {dropdown_content}
    </div>
    <div class="block-money" id="block_money">
        <span id="money-currency" class="span-money-currency">{current_currency_cdr}</span>
        <span id="money-balance">{user_balance}</span>
    </div>
    <!--<div class="block-money-notify">
        -300,00 ₽ за покупку в EATHER
    </div>-->
</div>
