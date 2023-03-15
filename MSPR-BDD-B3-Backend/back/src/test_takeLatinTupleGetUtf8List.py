# Generated by Selenium IDE
import pytest
from main_test import takeLatinTupleGetUtf8List


class TesttakeLatinTupleGetUtf8List():

    def test_takeLatinTupleGetUtf8List(input_tuple):
        input_tuple = ('éàç', 'êïö', 'ù')
        encode_tuple = tuple(word.encode('utf-8').decode('latin-1')
                             for word in input_tuple)
        expected_output = ['éàç', 'êïö', 'ù']
        assert takeLatinTupleGetUtf8List(encode_tuple) == expected_output

        input_tuple = ('hello', 123, True)
        expected_output = ['hello', 123, True]
        assert takeLatinTupleGetUtf8List(input_tuple) == expected_output

        input_tuple = ('éàç', 123, 'êïö', True, 'ù')
        encode_tuple = tuple(
            word.encode(
                'utf-8').decode('latin-1') if isinstance(word, str) else word
            for word in input_tuple
        )
        expected_output = ['éàç', 123, 'êïö', True, 'ù']
        assert takeLatinTupleGetUtf8List(encode_tuple) == expected_output
