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
    cf = parseFloat(document.forms['equity_price']['cf'].value),
    i = parseFloat(document.forms['equity_price']['i'].value),
    n = parseFloat(document.forms['equity_price']['n'].value),
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

function discountPrice(
    fv = parseFloat(document.forms['discount_price']['fv'].value),
    r = parseFloat(document.forms['discount_price']['r'].value),
    t = parseFloat(document.forms['discount_price']['t'].value),
    args = false
) {
    const answer = document.getElementById('discountPriceAnswer');
    const price = fv / (1 + r * (t / 365));
    answer.textContent = price;
    return args ? price : false;
}

function discountFv(
    p = parseFloat(document.forms['discount_fv']['p'].value),
    r = parseFloat(document.forms['discount_fv']['r'].value),
    t = parseFloat(document.forms['discount_fv']['t'].value),
    args = false
) {
    const answer = document.getElementById('discountFvAnswer');
    const fv = p * (1 + r * (t / 365));
    answer.textContent = fv;
    return args ? fv : false;
}

function discountYield(
    s = parseFloat(document.forms['discount_yield']['s'].value),
    b = parseFloat(document.forms['discount_yield']['b'].value),
    t = parseFloat(document.forms['discount_yield']['t'].value),
    args = false
) {
    const answer = document.getElementById('discountYieldAnswer');
    const yield = ((s - b) / b) * (36500 / t);
    answer.textContent = yield;
    return args ? yield : false;

}

function discountRate(
    s = parseFloat(document.forms['discount_rate']['s'].value),
    b = parseFloat(document.forms['discount_rate']['b'].value),
    fv = parseFloat(document.forms['discount_rate']['fv'].value),
    t = parseFloat(document.forms['discount_rate']['t'].value),
    args = false
) {
    const answer = document.getElementById('discountRateAnswer');
    const rate = ((s - b) / fv) * (36500 / t);
    answer.textContent = rate;
    return args ? rate : false;
}