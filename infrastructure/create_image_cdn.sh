#!/bin/bash

aws s3api create-bucket --bucket sweeplcomassets --region us-west-2 --create-bucket-configuration LocationConstraint=us-west-2
aws cloudfront create-distribution --origin-domain-name sweeplcomassets.s3.ap-west-2.amazonaws.com