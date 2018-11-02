function copy(text) {
    var fakeElem = document.body.appendChild(document.createElement('textarea'));
    fakeElem.style.position = 'absolute';
    fakeElem.style.left = '-99999px';
    fakeElem.setAttribute('readonly', '');
    fakeElem.value = text;
    fakeElem.select();

    try {
        return document.execCommand('copy');
    } catch (err) {
        return false;
    } finally {
        fakeElem.remove();
    }
};