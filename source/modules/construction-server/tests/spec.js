// Check out more Qunit possibilities here: http://qunitjs.com/
test('The plugin has loaded', function() {
    expect(2);
    var $fixture = $('.construction-server');

    // Check that the element we're looking for exists in the test dom
    equal($fixture.length, 1, 'The fixture element exists.');

    // Start the plugin
    $fixture.siteConstruction();

    // Check that the plugin can be instantiated
    ok(typeof($fixture.data('plugin_siteConstruction')) !== 'undefined',
        'The plugin has been instantiated');
});