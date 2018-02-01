'use strict';
module.exports.updateTags = {
    "data": [
        {
            "id": "rfjn9II8V21LSeEgyMT9x-905100",
            "type": "rule_status",
            "attributes": {
                "status": "block"
            },
            "relationships": {
                "rule": {
                    "data": {
                        "id": "905100",
                        "type": "rule"
                    }
                },
                "waf": {
                    "data": {
                        "id": "rfjn9II8V21LSeEgyMT9x",
                        "type": "waf"
                    }
                }
            }
        },
        {
            "id": "rfjn9II8V21LSeEgyMT9x-905110",
            "type": "rule_status",
            "attributes": {
                "status": "block"
            },
            "relationships": {
                "rule": {
                    "data": {
                        "id": "905110",
                        "type": "rule"
                    }
                },
                "waf": {
                    "data": {
                        "id": "rfjn9II8V21LSeEgyMT9x",
                        "type": "waf"
                    }
                }
            }
        }] //and so on for all the rule(s) in a tag in WAF
};