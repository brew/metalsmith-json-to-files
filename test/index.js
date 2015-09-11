// Remove when 0.12 is no longer needed to be supported
require('harmonize')();

var expect        = require('chai').expect
var equal         = require('assert-dir-equal');
var Metalsmith    = require('metalsmith');
var json_to_files = require('../lib');


describe('metalsmith-json-to-files basic', function(){
    
    var test_path = 'test/fixtures/basic';
    
    it('should fail without source_path', function (done){

        new Metalsmith(test_path)
        .use(json_to_files())
        .build(function(err){
            
            expect(err).to.be.an('error');
            done();
        });
    });

    it('should do standard file copying', function (done){

        new Metalsmith(test_path)
        .use(json_to_files({
            source_path: '../json/'
        }))
        .build(function(err){
            if (err){ return done(err); }
            
            equal(test_path + '/expected', test_path + '/build');
            done();
        });
    });

});


describe('metalsmith-json-to-files file generation', function(){
    
    var test_path = 'test/fixtures/file_generation';
    
    it('should do basic file generation', function (done){

        new Metalsmith(test_path)
        .use(json_to_files({
            source_path: '../json/'
        }))
        .build(function(err){
            if (err){ return done(err); }
            
            equal(test_path + '/expected', test_path + '/build');
            done();
        });
    });
});


// TODO: Test missing json file
// TODO: Test filename not being able to be generated
// TODO: Test with handlebars templates