var dropdownBtn = document.getElementsByClassName('dropdown-btn'),
    priceBtns = document.querySelectorAll('.input-btn li'),
    inputs =  document.querySelectorAll('input'),
    OPEN_CLASS = 'open',
    DROPDOWN_MENU = '.dropdown-menu',
    DROPDOWN_CONTAINER = '.dropdown-container',
    priceFrom = 0,
    priceTo = 0;

for(var i = 0; i < dropdownBtn.length; i++) {
    var btn = dropdownBtn[i];
    btn.onclick = function() {
        var parent = this.parentElement;
        if (parent.classList) {
            parent.classList.toggle(OPEN_CLASS);
        } else {
            var classes = parent.className.split(' ');
            var existingIndex = classes.indexOf(OPEN_CLASS);

            if (existingIndex >= 0) {
                classes.splice(existingIndex, 1);
            } else {
                classes.push(OPEN_CLASS);
            }

            parent.className = classes.join(' ');
        }
        if (hasClass(parent)) {
            setFocus(parent, 0);
        }
    }
}

for(var i = 0; i < inputs.length; i++) {
    var input = inputs[i];
    input.onchange = function() {
        setPrice(this, true);
    }
}

for(var i = 0; i < priceBtns.length; i++) {
    var priceBtn = priceBtns[i];
    priceBtn.onclick = function () {
        setPrice(this);
    };
}

function setPrice(that,isParent) {
    var priceParent = isParent ? that : that.parentElement,
        id = isParent ? that.id : priceParent.getAttribute('data-for'),
        price = Number(isParent ? that.value : that.innerHTML);

    var input = document.getElementById(id);
    if (!(price > 0)) {
        price = 0;
    }
    if (id === 'from') {
        var focusParent = priceParent.closest(DROPDOWN_MENU);
        setFocus(focusParent, 1);
        priceFrom = price;
    } else {
        price = price < priceFrom ? priceFrom : price;
        var menu = priceParent.closest(DROPDOWN_CONTAINER);
        close(menu);
        priceTo = price;
    }
    input.value = price;
    setBtnTitle(priceFrom, priceTo)
}

function setBtnTitle(from, to) {
    var text = 'Цена от-до в рублях';
    if (from && to) {
        text = from + ' — ' + to;
    }
    dropdownBtn[0].innerHTML = text;

}

function hasClass(element) {
    if (element.classList)
        return element.classList.contains(OPEN_CLASS);
    else
        return new RegExp('(^| )' + OPEN_CLASS + '( |$)', 'gi').test(element.className);
}

function setFocus(element, number) {
    var focusInput = element.querySelectorAll('input')[number];
    focusInput.focus();
}

function close(element) {
    if (element.classList)
        element.classList.remove(OPEN_CLASS);
    else
        element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
}