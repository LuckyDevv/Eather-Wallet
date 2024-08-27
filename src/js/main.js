var intl = new Intl.NumberFormat("ru", {minimumFractionDigits: 2, maximumFractionDigits: 2});
var currency_signs = {
    'usd': '$',
    'eur': '€',
    'rub': '₽',
    'jpy': '¥',
    'gbp': '£',
    'aud': 'AU$',
    'cad': 'CA$',
    'chf': '₣',
    'cny': '¥',
    'hkd': 'HK$',
    'nzd': 'NZ$'
}
var start_currency = {
    'balance': 0,
    'currency': ''
};
var current_currency = {
    'balance': 0,
    'currency': ''
}

function setCookie(cookie_name, cookie_value) {
    document.cookie = `${cookie_name}=${cookie_value};max-age=7200;path=/`;
    console.log(document.cookie);
}
function empty(mixed_var) {
    return (mixed_var === "" || mixed_var === 0 || mixed_var === null || mixed_var === false || mixed_var === undefined || mixed_var.length === 0);
}
function getCookie(name) {
    var end;
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin === -1) {
        begin = dc.indexOf(prefix);
        if (begin !== 0){
            return null;
        }
    }
    else
    {
        begin += 2;
        end = document.cookie.indexOf(";", begin);
        if (end === -1) {
            end = dc.length;
        }
    }
    return decodeURI(dc.substring(begin + prefix.length, end));
}


function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

(function($) {
    $.fn.hasScrollBar = function() {
        return this.get(0).scrollHeight > this.height();
    }
})(jQuery);

function loadCookieContent() {
    var cookie = getCookie('nav');
    if (empty(cookie)) {
        cookie = 'home';
    }
    switch (cookie)
    {
        case 'home':
            setBlock('nav-home');
            break;
        case 'history':
            setBlock('nav-history');
            break;
    }
}

$(document).ready(function (){
    loadCookieContent();
    reportWindowSize();
    window.addEventListener('resize', reportWindowSize);
});

$(document).on("click", function (event) {
    var el_id = event.target.id;
    if (el_id !== 'currency-change' && el_id !== 'current-currency-name' && el_id !== 'current-currency-image')
    {
        var drop1 = document.getElementById('changeCurrencyDropdown');
        var currency = document.getElementById('currency-change');
        if (drop1 instanceof HTMLElement && currency instanceof HTMLElement)
        {
            if (drop1.classList.contains('show'))
            {
                currency.style.borderRadius = '80px';
                drop1.classList.remove('show');
            }
        }
    }
});

function changeCurrentCurrency(element)
{
    var current_currency_name = document.getElementById('current-currency-name');
    var current_currency_image = document.getElementById('current-currency-image');
    var money_currency_sign = document.getElementById('money-currency');
    var money_balance = document.getElementById('money-balance');
    if (current_currency_name instanceof HTMLElement && current_currency_image instanceof HTMLElement && money_currency_sign instanceof HTMLElement && money_balance instanceof HTMLElement)
    {
        var currency_name = document.querySelectorAll('#' + element.id + ' span');
        if (currency_name.length === 0) return true;

        var currency_image = document.querySelectorAll('#' + element.id + ' img');
        if (currency_image.length === 0) return true;

        var currency = currency_name[0].innerText;
        if (!(currency.toLowerCase() in currency_signs)) return true;

        try { var balance = parseFloat(money_balance.innerText);
        }catch(e){ return true; }

        if (start_currency.currency !== currency)
        {
            try { balance = parseFloat(fx(start_currency.balance).from(start_currency.currency).to(currency)).toFixed(2);
            }catch(e){ return true; }
        }else{
            balance = start_currency.balance;
        }
        current_currency.balance = balance;
        current_currency.currency = currency_signs[currency.toLowerCase()];
        money_balance.innerText = intl.format(balance);
        current_currency_name.innerText = currency;
        current_currency_image.src = currency_image[0].src;
        money_currency_sign.innerText = currency_signs[currency.toLowerCase()];
    }
}

function openDropDown()
{
    var drop1 = document.getElementById('changeCurrencyDropdown');
    var currency = document.getElementById('currency-change');
    if (drop1 instanceof HTMLElement && currency instanceof HTMLElement)
    {
        if (drop1.classList.contains('show'))
        {
            currency.style.borderRadius = '80px';
            currency.style.borderBottom = 'none';
            drop1.classList.remove('show');
        }else{
            currency.style.borderRadius = '20px 20px 0 0';
            currency.style.borderBottom = '1px solid #636363';
            drop1.classList.add('show');
            drop1.style.width = currency.style.width;
        }
    }
}

function reportWindowSize() {
    var device_width = window.innerWidth;
    var content_element = document.getElementById('content');
    var no_support_element = document.getElementById('no-support');
    var min_width = 345;
    if ($(document).hasScrollBar())
    {
        min_width = 340;
    }
    if (device_width < min_width || device_width > 500)
    {
        content_element.style.display = 'none';
        content_element.setAttribute('hidden', '');
        no_support_element.style.display = 'flex';
        no_support_element.removeAttribute('hidden');
    }else{
        no_support_element.style.display = 'none';
        no_support_element.setAttribute('hidden', '');
        content_element.style.display = '';
        content_element.removeAttribute('hidden');
        loadStartCurrency();
        updateNavigationPanel();
        updateBalanceFontSize();
        updateTransactionImages();
        updateTransactionPaidFontSize();
        cropTransactionDescription();
    }
}

function loadStartCurrency()
{
    var current_currency_name = document.getElementById('current-currency-name');
    var money_balance = document.getElementById('money-balance');
    if (current_currency_name instanceof HTMLElement && money_balance instanceof HTMLElement)
    {
        try { var balance = parseFloat(money_balance.innerText);
        }catch(e){ return true; }

        var currency = current_currency_name.innerText

        if (!(currency.toLowerCase() in currency_signs)) return true;

        start_currency.balance = balance;
        start_currency.currency = currency;
    }
}

function updateNavigationPanel()
{
    var main_block_hidden = document.getElementById('main-block')?.getAttribute('hidden')  === 'hidden';
    var history_block_hidden = document.getElementById('history-block')?.getAttribute('hidden') === 'hidden';

    if (!main_block_hidden && history_block_hidden)
    {
        document.getElementById('nav-home').classList.add('active');
        document.getElementById('nav-history').classList.remove('active');
    }else if(main_block_hidden && !history_block_hidden)
    {
        document.getElementById('nav-history').classList.add('active');
        document.getElementById('nav-home').classList.remove('active');
    }
}

function updateBalanceFontSize()
{
    if (document.getElementById('main-block').getAttribute('hidden') !== 'hidden')
    {
        var balance_element = document.getElementById('block_money');
        if (balance_element instanceof HTMLElement)
        {
            var balance_length = balance_element.innerText.trim().length;
            if (balance_length === 10)
            {
                balance_element.style.fontSize = '55px';
            }else if(balance_element.innerText.length > 10 && balance_length <= 13)
            {
                balance_element.style.fontSize = '45px';
            }else if(balance_length > 13 && balance_length <= 17)
            {
                balance_element.style.fontSize = '35px';
            }else if(balance_length > 17)
            {
                balance_element.style.fontSize = '35px';
                console.log(balance_element.innerText);
                balance_element.innerText = current_currency.balance.toString().trim().substr(0, 14) + '.. ';
            }
        }
    }
}

function updateTransactionPaidFontSize()
{
    var transaction_paid_elements = document.querySelectorAll('.transaction-paid');
    transaction_paid_elements.forEach((element) => {
        var paidLength = element.innerText.length;
        if (paidLength > 17 && paidLength <= 19)
        {
            element.style.fontSize = '15px';
        }else if (paidLength > 19 && paidLength <= 22)
        {
            element.style.fontSize = '13px';
        }else if (paidLength > 22)
        {
            element.style.fontSize = '13px';
            element.innerText = element.innerText.substr(0, 18) + '.. ' + current_currency.currency;
        }
    });
}

function cropTransactionDescription()
{
    var transaction_description_elements = document.querySelectorAll('.transaction-description');
    transaction_description_elements.forEach((element) => {
        if (element.innerText.length > 10)
        {
            element.innerText = element.innerText.substr(0, 8) + '..' + current_currency.currency;
        }
    });
}

function updateTransactionImages()
{
    var imgs = $('.transaction-image');
    imgs.imgcolr(function (img, color) {
        color = hexToRgb(color);
        color = ''+ color.r +','+ color.g +','+ color.b +'';
        img.style = '' +
            'background: rgba(120, 120, 120, 0.6); ' +
            'background: radial-gradient(circle, rgba('+color+',1) 0%, rgba(120, 120, 120, 0.6) 100%);';
    });
}

function setBlock(id)
{
    switch (id)
    {
        case 'nav-home':
            setCookie('nav', 'home');
            document.getElementById('main-block').removeAttribute('hidden');
            document.getElementById('news-block').removeAttribute('hidden');
            document.getElementById('history-block').setAttribute('hidden', 'hidden');
            break;
        case 'nav-swap':
            setCookie('nav', 'home');
            document.getElementById('main-block').removeAttribute('hidden');
            document.getElementById('news-block').removeAttribute('hidden');
            document.getElementById('history-block').setAttribute('hidden', 'hidden');
            break;
        case 'nav-history':
            setCookie('nav', 'history');
            document.getElementById('history-block').removeAttribute('hidden');
            document.getElementById('main-block').setAttribute('hidden', 'hidden');
            document.getElementById('news-block').setAttribute('hidden', 'hidden');
            break;
        case 'nav-bell':
            setCookie('nav', 'home');
            document.getElementById('main-block').removeAttribute('hidden');
            document.getElementById('news-block').removeAttribute('hidden');
            document.getElementById('history-block').setAttribute('hidden', 'hidden');
            break;
        case 'nav-settings':
            setCookie('nav', 'home');
            document.getElementById('main-block').removeAttribute('hidden');
            document.getElementById('news-block').removeAttribute('hidden');
            document.getElementById('history-block').setAttribute('hidden', 'hidden');
            break;
    }
    updateNavigationPanel();
}