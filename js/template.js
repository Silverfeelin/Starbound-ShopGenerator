var shopTemplate = {
  "count": 1,
  "name": "marketstall3",
  "parameters": {
    "thankYou": "Special thanks to IHazBagels over at ILB for this template.",
    "color": "default",
    "shortdescription": "^violet;Custom Shop",
    "interactAction": "OpenCraftingInterface",
    "interactData": {
      "config": {
        "filter": [],
        "noCategoryFilters": true,
        "paneLayout": {
          "background": {
            "fileBody": "/interface/crafting/shopbody.png",
            "fileFooter": "/interface/crafting/craftingfooter.png",
            "fileHeader": "/interface/crafting/craftingheader.png",
            "type": "background"
          },
          "btnCraft": {
            "base": "/interface/button.png",
            "caption": "Buy",
            "hover": "/interface/buttonhover.png",
            "position": [
              274,
              38
            ],
            "type": "button"
          },
          "btnFilterHaveMaterials": {
            "base": "/interface/crafting/checkboxnocheck.png",
            "baseImageChecked": "/interface/crafting/checkboxcheck.png",
            "checkable": true,
            "checked": false,
            "position": [
              26,
              40
            ],
            "type": "button"
          },
          "close": {
            "base": "/interface/x.png",
            "hover": "/interface/xhover.png",
            "position": [
              322,
              261
            ],
            "press": "/interface/xpress.png",
            "type": "button"
          },
          "description": {
            "position": [
              190,
              50
            ],
            "size": [
              140,
              220
            ],
            "type": "widget"
          },
          "lblAmountInput": {
            "file": "/interface/crafting/amount.png",
            "position": [
              208,
              39
            ],
            "type": "image",
            "zlevel": -3
          },
          "lblProduct": {
            "hAnchor": "left",
            "position": [
              71,
              39
            ],
            "type": "label",
            "value": "CAN AFFORD"
          },
          "lblProducttitle": {
            "hAnchor": "mid",
            "position": [
              265,
              244
            ],
            "type": "label",
            "value": "PRODUCT DETAILS"
          },
          "lblSchematics": {
            "hAnchor": "mid",
            "position": [
              88,
              244
            ],
            "type": "label",
            "value": "GOODS"
          },
          "lbllvlSort": {
            "file": "/interface/crafting/cost.png",
            "position": [
              123,
              232
            ],
            "type": "image",
            "zlevel": -3
          },
          "panefeature": {
            "type": "panefeature"
          },
          "rarities": {
            "buttons": [{
              "baseImage": "/interface/crafting/sortcommon.png",
              "baseImageChecked": "/interface/crafting/sortcommonselected.png",
              "data": {
                "rarity": [
                  "common"
                ]
              },
              "position": [
                8,
                232
              ]
            }, {
              "baseImage": "/interface/crafting/sortuncommon.png",
              "baseImageChecked": "/interface/crafting/sortuncommonselected.png",
              "data": {
                "rarity": [
                  "uncommon"
                ]
              },
              "position": [
                14,
                232
              ]
            }, {
              "baseImage": "/interface/crafting/sortrare.png",
              "baseImageChecked": "/interface/crafting/sortrareselected.png",
              "data": {
                "rarity": [
                  "rare"
                ]
              },
              "position": [
                20,
                232
              ]
            }, {
              "baseImage": "/interface/crafting/sortlegendary.png",
              "baseImageChecked": "/interface/crafting/sortlegendaryselected.png",
              "data": {
                "rarity": [
                  "legendary"
                ]
              },
              "position": [
                26,
                232
              ]
            }],
            "toggleMode": true,
            "type": "radioGroup"
          },
          "scrollArea": {
            "children": {
              "itemList": {
                "schema": {
                  "listTemplate": {
                    "background": {
                      "file": "/interface/crafting/craftablebackground.png",
                      "position": [
                        0,
                        0
                      ],
                      "type": "image",
                      "zlevel": -1
                    },
                    "itemIcon": {
                      "callback": "null",
                      "position": [
                        1,
                        1
                      ],
                      "type": "itemslot"
                    },
                    "itemName": {
                      "hAnchor": "left",
                      "position": [
                        21,
                        11
                      ],
                      "type": "label",
                      "value": "Replace Me",
                      "wrapWidth": 116
                    },
                    "level": {
                      "hAnchor": "mid",
                      "position": [
                        138,
                        9
                      ],
                      "type": "label",
                      "value": "Lvl. 100"
                    },
                    "moneyIcon": {
                      "file": "/interface/money.png",
                      "position": [
                        126,
                        1
                      ],
                      "type": "image"
                    },
                    "notcraftableoverlay": {
                      "file": "/interface/crafting/notcraftableoverlay.png",
                      "position": [
                        0,
                        0
                      ],
                      "type": "image",
                      "zlevel": 1
                    },
                    "priceLabel": {
                      "hAnchor": "left",
                      "position": [
                        138,
                        1
                      ],
                      "type": "label",
                      "value": "0"
                    }
                  },
                  "memberSize": [
                    156,
                    20
                  ],
                  "selectedBG": "/interface/crafting/craftableselected.png",
                  "spacing": [
                    0,
                    1
                  ],
                  "unselectedBG": "/interface/crafting/craftablebackground.png"
                },
                "type": "list"
              }
            },
            "rect": [
              5,
              50,
              174,
              230
            ],
            "type": "scrollArea"
          },
          "spinCount": {
            "position": [
              202,
              40
            ],
            "type": "spinner",
            "upOffset": 34
          },
          "tbSpinCount": {
            "hint": "",
            "maxWidth": 15,
            "position": [
              214,
              40
            ],
            "regex": "x?\\\\d{0,3}",
            "textAlign": "center",
            "type": "textbox"
          },
          "windowtitle": {
            "icon": {
              "file": "/interface/crafting/craftingicon.png",
              "position": [
                0, -20
              ],
              "type": "image",
              "zlevel": -1
            },
            "position": [-5,
              252
            ],
            "subtitle": "  ^violet;Try making edits!",
            "title": "   ^#E5E5E5;An Example Shop",
            "type": "title"
          }
        },
        "requiresBlueprint": false,
        "titleFromEntity": true,
        "tooltip": {
          "itemList": {
            "position": [
              2,
              3
            ],
            "schema": {
              "listTemplate": {
                "count": {
                  "hAnchor": "right",
                  "position": [
                    118,
                    0
                  ],
                  "type": "label",
                  "value": "19/99"
                },
                "itemIcon": {
                  "callback": "null",
                  "position": [
                    1,
                    1
                  ],
                  "type": "itemslot"
                },
                "itemName": {
                  "hAnchor": "left",
                  "position": [
                    22,
                    10
                  ],
                  "type": "label",
                  "value": "Golden Moustache",
                  "wrapWidth": 116
                }
              },
              "memberSize": [
                125,
                25
              ],
              "spacing": [
                0,
                0
              ]
            },
            "type": "list"
          },
          "panefeature": {
            "type": "panefeature"
          }
        }
      },
      "filter": [
        "molemerchant"
      ],
      "recipes": []
    }
  }
}