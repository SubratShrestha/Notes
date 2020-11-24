function presentValue(
    cf = parseFloat(document.forms['present_value']['cf'].value),
    i = parseFloat(document.forms['present_value']['i'].value),
    t = parseFloat(document.forms['present_value']['t'].value),
    args = false
) {
    const presentValue = cf / Math.pow((1 + i), t);
    const answer = document.getElementById('presentValueAnswer');
    args ? null : answer.textContent = presentValue;
    return args ? presentValue : false;
}

function price(
    cf = parseFloat(document.forms['price_form']['cf'].value),
    i = parseFloat(document.forms['price_form']['i'].value),
    n = parseFloat(document.forms['price_form']['n'].value),
    args = false
) {
    const answer = document.getElementById('priceAnswer');
    let price = 0;
    for (let j = 1; j <= n; j++) {
        price += presentValue(cf, i, j, true);
    }
    answer.textContent = price;
    return args ? price : false;
}

function right(
    r = parseFloat(document.forms['value_right']['r'].value),
    sub = parseFloat(document.forms['value_right']['sub'].value),
    n = parseFloat(document.forms['value_right']['n'].value),
    args = false
) {
    const answer = document.getElementById('rightAnswer');
    const value = (n * (r - sub)) / (n + 1);
    answer.textContent = value;
    return args ? value : false;
}