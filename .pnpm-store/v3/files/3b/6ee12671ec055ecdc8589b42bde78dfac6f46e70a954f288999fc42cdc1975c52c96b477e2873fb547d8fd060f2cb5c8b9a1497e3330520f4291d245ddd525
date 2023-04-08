export default function objectToGetParams(object) {
    var params = Object.entries(object)
        .filter(function (_a) {
        var value = _a[1];
        return value !== undefined && value !== null;
    })
        .map(function (_a) {
        var key = _a[0], value = _a[1];
        return "".concat(encodeURIComponent(key), "=").concat(encodeURIComponent(String(value)));
    });
    return params.length > 0 ? "?".concat(params.join('&')) : '';
}
