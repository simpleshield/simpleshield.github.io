/*
BSD 3-Clause License

Copyright (c) 2019, YourNetworkNerd (https://twitter.com/YourNetworkNerd)
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its
   contributors may be used to endorse or promote products derived from
   this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

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
    return `&lt;a href="${cx.link}"&gt;<br>&lt;img src="${cx.shield}" alt="${cx.label}"&gt;<br>&lt;/a&gt;`;
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
$('#link').change(function() {
    cx.link = this.value;
})
$('#color').change(function() {
    cx.color = this.value;
})
$('#useBrandLogo').click(function() {
    cx.useLogo = $('#useBrandLogo').is(':checked');
})
$('#useBrandColor').click(function() {
    cx.useBrandColor = $('#useBrandColor').is(':checked');
})
$('#useBrandColorOnLogo').click(function() {
    cx.useColorLogo = $('#useBrandColorOnLogo').is(':checked');
})
$('#renderShield').click(function() {
    updateShield();
    $('#resultHtml').html(renderHtml());
    $('#resultBBcode').html(renderBbc());
    $('#resultMarkdown').html(renderMarkdown());
    $('#codes').show();
})
