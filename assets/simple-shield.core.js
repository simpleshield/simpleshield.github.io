let cx = {
    label: 'simple',
    value: 'shield',
    color: '000000',
    brandColor: '000000',
    brandName: 'simpleshield',
    useLogo: false,
    useBrandColor: false,
    useColorLogo: false,
    link: 'https://simple-shield.github.io/',
    shield: '',
};
let endpoint = 'https://img.shields.io/badge/';

let fetchBrandData = function(title) {
    let thisBrand = {};
    for(let i = 0; i < brands.length; i++) {
        if(title == brands[i].title) {
            thisBrand = brands[i]
        }
    }
    return thisBrand;
}

let brandEncoded = function(name) {
    return encodeURIComponent(name.toLowerCase());
}

let updateShield = function() {
    let queries = [];
    let color = (cx.useBrandColor == true) ? cx.brandColor : cx.color;
    if(cx.useLogo == true) {
        queries.push(`logo=${cx.brandName}`);
    }
    if(cx.useColorLogo == true) {
        queries.push(`logoColor=${cx.brandColor}`);
    }
    if(queries.length <= 0) {
        cx.shield = `${endpoint}${cx.label}-${cx.value}-${color}.svg`;
    } else {
        cx.shield = `${endpoint}${cx.label}-${cx.value}-${color}.svg?${queries.join('&')}`;
    }
    $('#result').attr('src', cx.shield);
}

let renderHtml = function() {
    let code = `<a href="${cx.link}">\n<img src="${cx.shield} alt="${cx.label}">\n</a>`;
    return code.replace(/</gmi, '&lt;').replace(/>/gmi, '&gt;');
}
let renderBbc = function() {
    return `[url=${cx.link}][img]${cx.shield}[/img][/url]`;
}
let renderMarkdown = function() {
    return `[![${cx.label}](${cx.shield})](${cx.link})`;
}

$(document).ready(function() {
    $('#codes').hide();
    brands.forEach(function(brand) {
        $('#brandSelect').append(`<option value="${brand.title}">${brand.title}</option>`)
    })
})

$('#brandSelect').change(function() {
    let brand = fetchBrandData(this.value);
    cx.brandColor = brand.hex;
    cx.brandName = brandEncoded(brand.title);
});

$('#label').change(function() {
    cx.label = this.value;
})

$('#value').change(function() {
    cx.value = this.value;
})
$('#color').change(function() {
    cx.color = this.value;
})
$('#renderShield').click(function() {
    updateShield();
    $('#resultHtml').html(renderHtml());
    $('#resultBBcode').html(renderBbc());
    $('#resultMarkdown').html(renderMarkdown());
    $('#codes').show();
})
