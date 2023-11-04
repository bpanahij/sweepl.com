#!/bin/bash

aws s3 sync ../assets s3://sweeplcomassets/ --acl public-read