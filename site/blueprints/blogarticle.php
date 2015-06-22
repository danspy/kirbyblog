<?php if(!defined('KIRBY')) exit ?>

title: Blogarticle
pages: false
files:
  type:
    - image
    - video
  sortable: true
fields:
  title:
    label: Title
    type:  text
  text:
    label: Text
    type:  textarea
  bgcolor:
    label: Hintergrundfarbe (Hex)
    type: text
    width: 1/4
  textcolor:
    label: Schriftfarbe (Hex)
    type: text
    width: 1/4
  linkcolor:
    label: Linkfarbe (Hex)
    type: text
    width: 1/4
  tags:
    label: Tags
    type:  tags