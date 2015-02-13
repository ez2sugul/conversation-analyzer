var ConversationReader = require('../lib/conversation-reader');
var expect = require('chai').expect;
var should = require('chai').should();
var Analyzer = require('../lib/analyzer.js');
var path = require('path');
var appRoot = require('app-root-path');

describe('ConversationReader', function() {
	reader = new ConversationReader();
	console.log(path.dirname(require.main.filename));
	console.log('app-root-path : ' + appRoot);

	describe('#readFile', function() {
		it('should return array of lines', function(done) {
			var sFilePath = appRoot + '/data/KakaoTalkChats.txt';
			reader.readFile(sFilePath, function(err, aLines) {
				if (err) {
					throw err;
				}
				aLines.length.should.equal(27004);
				done();
			});
		});

		it('should return 115 for line count', function(done) {
			var hwangFile = appRoot + "/data/KakaoTalkChats-hwang.txt";
			reader.readFile(hwangFile, function(err, aLines) {
				if (err) {
					throw err;
				}

				aLines.length.should.equal(115);
				done();
			});
		});
	});
});



describe('analyzer.js', function() {
	var aLines = ['2013년 2월 7일 오후 3:14, 심언국 : 그렇군',
'2013년 2월 7일 오후 3:14, 심언국 : 넌?',
'2013년 2월 7일 오후 3:15, 회원님 : 환존했러',
'2013년 2월 7일 오후 3:16, 심언국 : 얼마?',
'2013년 2월 7일 오후 3:16, 회원님 : 15만원'];
	analyzer = new Analyzer();
	analyzer.setTextArray(aLines);

	describe('#toString', function(done) {
		it('should return its name', function(done) {
			analyzer.toString().should.equal('Analyzer');
			done();
		});
	});

	describe('#parse', function() {
		
		it('should parse text to user name and user message', function(done) {
			analyzer.parse(function(err, aoData) {
				aoData.length.should.equal(5);
				done();
			});
		});

		it('should have 심언국 at first element and its message should equal to 그렇군', function(done) {
			analyzer.parse(function(err, aoData) {
				aoData[0].user.should.equal('심언국');
				aoData[0].message.should.equal('그렇군');
				done();
			});
		});
	});
});